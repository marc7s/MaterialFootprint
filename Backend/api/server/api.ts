import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

/* Utils */
import express, { Response, NextFunction, Router } from 'express';
import { validateEmissionsInput, validateModelInput } from 'server/validator';
import { fetchMaterials, fetchMaterialCostForClient, fetchSurfaceTreatmentCostForClient, fetchSurfaceTreatments, fetchModels, fetchPart, fetchClients, fetchMaximalMaterialCostForClient, fetchMaximalSurfaceTreatmentCostForClient, fetchMinimalMaterialCostForClient, fetchMaterial, fetchMinimalSurfaceTreatmentCost } from 'server/dbInterface';

/* Shared */
import { log, logError } from '@shared/utils';
import { MaterialEmission, SurfaceTreatmentEmission, Material, Emission, EmissionCost, Model, ModelPart, ModelDatabaseEntry, ModelPartDatabaseEntry, SurfaceTreatment } from '@shared/interfaces';
import { DatabaseQueryResultError } from './errors';

const router: Router = express.Router();

// Calculates the emissions for a single part
// Request format:
/* 
  {
    partName: string, 
    clientID: number, 
    area: number, 
    volume: number, 
    materialID: number, 
    surfaceTreatmentIDs: [number]
  }
*/
router.post('/calculate-part-emission', validateEmissionsInput, async (req: any, res: Response, next: NextFunction) => {
    log('Calculating part emission...');
    res.json(await calculatePartEmission(req)
    .catch(err => next(err)));
});

// Gets a list of the clients
// No request parameters
router.get('/clients', async (req: any, res: Response, next: NextFunction) => {
  log('Getting clients...');
  res.json(await fetchClients()
    .catch(err => next(err)));
});

// Gets a list of the materials
// No request parameters
router.get('/materials', async (req: any, res: Response, next: NextFunction) => {
  log('Getting materials...');
  res.json(await fetchMaterials()
    .catch(err => next(err)));
});

// Gets a list of the surface treatments
// No request parameters
router.get('/surface-treatments', async (req: any, res: Response, next: NextFunction) => {
  log('Getting surface treatments...');
  res.json(await fetchSurfaceTreatments()
    .catch((err) => {next(err)}));
});

// Gets a list of the models
// No request parameters
router.get('/models', async (req: any, res: Response, next: NextFunction) => {
  log('Getting models...');
  res.json(await getModels(req)
    .catch(err => next(err)));
});

// Redirects to a link of a 3D model object to be used in the 3D viewer
// Request format:
/*
  {
    modelID: number
  }
*/
router.get('/model-object', validateModelInput, async (req: any, res: Response, next: NextFunction) => {
  const modelID: number = req.modelID;
  log(`Getting model object with ID ${modelID}...`);
  res.redirect(`/model-objects/${modelID}.glb`);
});


// Calculates the emissions for a specified part
async function calculatePartEmission(req: any): Promise<Emission | null> {
  // Get the request parameters
  const partName: string = req.partName;
  const clientID: number = req.clientID;
  const materialID: number = req.materialID;
  const surfaceTreatmentIDs: number[] = req.surfaceTreatmentIDs;
  const volume: number = req.volume;
  const area: number = req.area;
  
  /* Material emissions */

  // Get material cost
  const materialEmission: MaterialEmission | null = await fetchMaterialCostForClient(clientID, materialID)
    .catch(err => { throw err });

  if(materialEmission === null) {
    logError(`Material with ID ${materialID} not found for client with ID ${clientID}.`)
    return Promise.resolve(null);
  }

  // Calculate material emission
  const materialCost: EmissionCost = {
    co2Amount: materialEmission.co2AmountPerM3 * volume,
    h2oAmount: materialEmission.h2oAmountPerM3 * volume,
    priceInSEK: materialEmission.pricePerM3 * volume
  }

  // Get minimal material emission
  const minMaterialEmission: MaterialEmission = await fetchMinimalMaterialCostForClient(clientID)
    .catch(err => { throw err });

  // Calculate minimal material emission
  const minMaterialCost: EmissionCost = {
    co2Amount: minMaterialEmission.co2AmountPerM3 * volume,
    h2oAmount: minMaterialEmission.h2oAmountPerM3 * volume,
    priceInSEK: minMaterialEmission.pricePerM3 * volume
  }
  
  // Get maximal material emission
  const maxMaterialEmission: MaterialEmission = await fetchMaximalMaterialCostForClient(clientID)
    .catch(err => { throw err });

  // Calculate maximal material emission
  const maxMaterialCost: EmissionCost = {
    co2Amount: maxMaterialEmission.co2AmountPerM3 * volume,
    h2oAmount: maxMaterialEmission.h2oAmountPerM3 * volume,
    priceInSEK: maxMaterialEmission.pricePerM3 * volume
  }

  
  
  /* Surface Treatment emissions */

  // Accumulator for all surface treatment emissions
  const totSurfaceTreatmentCost: EmissionCost = {
    co2Amount: 0,
    h2oAmount: 0,
    priceInSEK: 0
  }

  // Sum surface treatment emissions
  for(const surfaceTreatmentID of surfaceTreatmentIDs) {
    // Get the surface treatment cost
    const surfaceTreatmentEmission: SurfaceTreatmentEmission | null = await fetchSurfaceTreatmentCostForClient(clientID, surfaceTreatmentID)
      .catch(err => { throw err });

    if(surfaceTreatmentEmission === null) {
      logError(`Surface treatment with ID ${surfaceTreatmentID} not found for client with ID ${clientID}.`)
      return Promise.resolve(null);
    }
      
    // Add the surface treatment emission to the total
    totSurfaceTreatmentCost.co2Amount += surfaceTreatmentEmission.co2AmountPerM2 * area;
    totSurfaceTreatmentCost.h2oAmount += surfaceTreatmentEmission.h2oAmountPerM2 * area;
    totSurfaceTreatmentCost.priceInSEK += surfaceTreatmentEmission.pricePerM2 * area;
  };

  // Get minimal surface treatment emission
  const minSurfaceEmission: SurfaceTreatmentEmission = await fetchMinimalSurfaceTreatmentCost()
      .catch(err => { throw err });

  // Get maximal surface treatment emission
  const maxSurfaceEmission: SurfaceTreatmentEmission = await fetchMaximalSurfaceTreatmentCostForClient(clientID)
      .catch(err => { throw err });

  // Totals (material + surface)
  const emissionCost: EmissionCost = { 
    co2Amount: materialCost.co2Amount + totSurfaceTreatmentCost.co2Amount,
    h2oAmount: materialCost.h2oAmount + totSurfaceTreatmentCost.h2oAmount,
    priceInSEK: materialCost.priceInSEK + totSurfaceTreatmentCost.priceInSEK
  }

  // Total minimal emission cost (material + surface)
  const minEmissionCost: EmissionCost = { 
    co2Amount: minMaterialCost.co2Amount + minSurfaceEmission.co2AmountPerM2 * area,
    h2oAmount: minMaterialCost.h2oAmount + minSurfaceEmission.h2oAmountPerM2 * area,
    priceInSEK: minMaterialCost.priceInSEK + minSurfaceEmission.pricePerM2 * area
  }

  // Total maximal emission cost (material + surface)
  const maxEmissionCost: EmissionCost = { 
    co2Amount: maxMaterialCost.co2Amount + maxSurfaceEmission.co2AmountPerM2 * area,
    h2oAmount: maxMaterialCost.h2oAmount + maxSurfaceEmission.h2oAmountPerM2 * area,
    priceInSEK: maxMaterialCost.priceInSEK + maxSurfaceEmission.pricePerM2 * area
  }

  // Create response
  const response: Emission = { 
    partName: partName, 
    emissionCost: emissionCost, 
    minEmissionCost: minEmissionCost,
    maxEmissionCost: maxEmissionCost 
  };
  return Promise.resolve(response);
}

// Gets all models from the database
async function getModels(req: any): Promise<Model[]> {
  // Get the model metadata themselves
  const modelsDatabase: ModelDatabaseEntry[] = await fetchModels();

  // For each model, get the individual parts it consists of from the database
  const models: Model[] = await Promise.all(modelsDatabase.map(async (modelDatabaseEntry: ModelDatabaseEntry) => {
    // Get the parts from the database
    const parts: ModelPart[] = [];
    await Promise.all(modelDatabaseEntry.partIDs.map(async (id: number) => {
      const part = await getPart(req, id).catch(err => { throw err });
      if(part !== null)
        parts.push(part);
    })).catch(err => { throw err });

    // Create the model
    const model: Model = {
      id: modelDatabaseEntry.id,
      name: modelDatabaseEntry.name,
      url: `http://localhost:${process.env.PORT}/model-object?modelID=${modelDatabaseEntry.id}`,
      parts: parts
    }
    return model;
  })).catch(err => { throw err });
  
  return Promise.resolve(models);
}


// Gets a specific model part from the database
async function getPart(req: any, partID: number): Promise<ModelPart | null> {
  // Get the part metadata from the database
  const partDatabaseEntry: ModelPartDatabaseEntry | null = await fetchPart(partID);
  if(partDatabaseEntry === null)
    return Promise.resolve(null);

  // Get the part's specified material
  const material: Material | null = await fetchMaterial(partDatabaseEntry.materialID).catch(err => { throw err });
  if (material === null)
    throw new DatabaseQueryResultError('Material not found');

  // Get all surface treatments from the database
  const surfaceTreatments: SurfaceTreatment[] = await fetchSurfaceTreatments().catch(err => {throw err});
  
  // Filters the surface treatments to only include the ones that are specified for the part
  const filteredSurfaceTreatments: SurfaceTreatment[] = surfaceTreatments.filter(
    (surfaceTreatment: SurfaceTreatment) => partDatabaseEntry.surfaceTreatmentIDs.includes(surfaceTreatment.id)
  );
  
  // Create the response
  const part: ModelPart = {
    id: partDatabaseEntry.id,
    name: partDatabaseEntry.name,
    area: partDatabaseEntry.area,
    volume: partDatabaseEntry.volume,
    material: material,
    surfaceTreatments: filteredSurfaceTreatments
  }
  return Promise.resolve(part);
}

module.exports = router;

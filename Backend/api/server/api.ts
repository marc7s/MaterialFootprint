import { log, logError } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

/* Utils */
import express, { Response, NextFunction, Router } from 'express';
import { validateEmissionsInput, validateModelInput } from 'server/validator';
import { fetchMaterials, fetchMaterialCostForClient, fetchSurfaceTreatmentCostForClient, fetchSurfaceTreatments, fetchModels, fetchPart, fetchClients, fetchMaximalMaterialCostForClient, fetchMaximalSurfaceTreatmentCostForClient } from 'server/dbInterface';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, Emission, EmissionCost, Model, ModelPart, ModelDatabaseEntry, ModelPartDatabaseEntry, SurfaceTreatment, Client } from '@shared/interfaces';

const router: Router = express.Router();

// input: {partName: string, clientID: number, area: number, volume: number, materialID: number, surfaceTreatmentIDs: [number]}
router.post('/calculate-part-emission', validateEmissionsInput, async (req: any, res: Response, next: NextFunction) => {
    log('Calculating part emission...');
    res.json(await calculatePartEmission(req)
    .catch(err => next(err)));
});

router.get('/clients', async (req: any, res: Response, next: NextFunction) => {
  log('Getting clients...');
  res.json(await getClients()
    .catch(err => next(err)));
});

router.get('/materials', async (req: any, res: Response, next: NextFunction) => {
  log('Getting materials...');
  res.json(await getMaterials()
    .catch(err => next(err)));
});

router.get('/surface-treatments', async (req: any, res: Response, next: NextFunction) => {
  log('Getting surface treatments...');
  res.json(await getSurfaceTreatments()
    .catch((err) => {next(err)}));
});

router.get('/models', async (req: any, res: Response, next: NextFunction) => {
  log('Getting models...');
  res.json(await getModels(req)
    .catch(err => next(err)));
});

router.get('/model-object', validateModelInput, async (req: any, res: Response, next: NextFunction) => {
  const modelID: number = req.modelID;
  log(`Getting model object with ID ${modelID}...`);
  res.redirect(`/model-objects/${modelID}.glb`);
});

async function calculatePartEmission(req: any): Promise<Emission | null> {
  const partName: string = req.partName;
  const clientID: number = req.clientID;
  const materialID: number = req.materialID;
  const surfaceTreatmentIDs: number[] = req.surfaceTreatmentIDs;
  const volume: number = req.volume;
  const area: number = req.area;
  
  /* Material */

  // Calculate material emission
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
    priceInDollar: materialEmission.pricePerM3 * volume
  }

  // Get maximal material emission
  const maxMaterialEmission: MaterialEmission = await fetchMaximalMaterialCostForClient(clientID)
    .catch(err => { throw err });


  // Calculate material emission
  const maxMaterialCost: EmissionCost = {
    co2Amount: maxMaterialEmission.co2AmountPerM3 * volume,
    h2oAmount: maxMaterialEmission.h2oAmountPerM3 * volume,
    priceInDollar: maxMaterialEmission.pricePerM3 * volume
  }

  
  
  /* Surface Treatments */

  // Accumulator for all surface treatment emissions
  const totSurfaceTreatmentCost: EmissionCost = {
    co2Amount: 0,
    h2oAmount: 0,
    priceInDollar: 0
  }

  // Sum surface treatment emissions
  for(const surfaceTreatmentID of surfaceTreatmentIDs) {
    const surfaceEmission: SurfaceTreatmentEmission | null = await fetchSurfaceTreatmentCostForClient(clientID, surfaceTreatmentID)
      .catch(err => { throw err });

    if(surfaceEmission === null) {
      logError(`Surface treatment with ID ${surfaceTreatmentID} not found for client with ID ${clientID}.`)
      return Promise.resolve(null);
    }
      
    totSurfaceTreatmentCost.co2Amount += surfaceEmission.co2AmountPerM2 * area;
    totSurfaceTreatmentCost.h2oAmount += surfaceEmission.h2oAmountPerM2 * area;
    totSurfaceTreatmentCost.priceInDollar += surfaceEmission.pricePerM2 * area;
  };

  // Get maximal surface treatment emission
  const maxSurfaceEmission: SurfaceTreatmentEmission = await fetchMaximalSurfaceTreatmentCostForClient(clientID)
      .catch(err => { throw err });

  // Totals (material + surface)
  const emissionCost: EmissionCost = { 
    co2Amount: materialCost.co2Amount + totSurfaceTreatmentCost.co2Amount,
    h2oAmount: materialCost.h2oAmount + totSurfaceTreatmentCost.h2oAmount,
    priceInDollar: materialCost.priceInDollar + totSurfaceTreatmentCost.priceInDollar
  }

  // Total maximal emission cost (material + surface)
  const maxEmissionCost: EmissionCost = { 
    co2Amount: maxMaterialCost.co2Amount + maxSurfaceEmission.co2AmountPerM2 * area,
    h2oAmount: maxMaterialCost.h2oAmount + maxSurfaceEmission.h2oAmountPerM2 * area,
    priceInDollar: maxMaterialCost.priceInDollar + maxSurfaceEmission.pricePerM2 * area
  }

  // Create response
  const response: Emission = { partName: partName, emissionCost: emissionCost, maxEmissionCost: maxEmissionCost };
  return Promise.resolve(response);
}

async function getClients(): Promise<Client[]> {
  return fetchClients();
}

async function getMaterials(): Promise<Material[]> {
  return fetchMaterials();
}

async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
  return fetchSurfaceTreatments();
}

async function getModels(req: any): Promise<Model[]> {
  // fetches all models from database
  const modelsDatabase: ModelDatabaseEntry[] = await fetchModels();

  // transforms ModelDatabaseEntry[] to Model[]
  const models: Model[] = await Promise.all(modelsDatabase.map(async (modelDatabaseEntry: ModelDatabaseEntry) => {
    // transforms partIDs into ModelPart[]
    const parts: ModelPart[] = await Promise.all(modelDatabaseEntry.partIDs.map(async (id: number) => {
      return await getPart(req, id).catch(err => { throw err });
    })).catch(err => { throw err });

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

async function getPart(req: any, partID: number): Promise<ModelPart> {
  // fetches database for specific part
  const partDatabaseEntry: ModelPartDatabaseEntry = await fetchPart(partID);
  const materials: Material[] = await fetchMaterials().catch(err => {throw err});
  // finds the parts specified material
  const material: Material | undefined = materials.find((material: Material) => material.id == partDatabaseEntry.materialID)
  if (material == undefined) {
    throw new Error('Material not found');
  }
  const surfaceTreatments: SurfaceTreatment[] = await fetchSurfaceTreatments().catch(err => {throw err});
  // filters the parts specified surface treatments
  const filteredSurfaceTreatments: SurfaceTreatment[] = surfaceTreatments.filter(
    (surfaceTreatment: SurfaceTreatment) => partDatabaseEntry.surfaceTreatmentIDs.includes(surfaceTreatment.id)
  );

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

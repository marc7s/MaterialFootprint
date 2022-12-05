import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

/* Utils */
import express, { Response, NextFunction, Router } from 'express';
import { validateEmissionsInput } from 'server/validator';
<<<<<<< HEAD
import { fetchMaterials, fetchMaterialCostForClient, fetchSurfaceTreatmentCostForClient, fetchSurfaceTreatments } from 'server/dbInterface';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, Emission, EmissionCost, SurfaceTreatment } from '@shared/interfaces';
=======
import { fetchMaterials, fetchMaterialCostForCompany, fetchSurfaceTreatmentCostForCompany, fetchModels, fetchPart, fetchSurfaceTreatments } from 'server/dbInterface';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, EmissionResponse, EmissionCost, Model, ModelPart, ModelDatabaseEntry, ModelPartDatabaseEntry, SurfaceTreatment } from '@shared/interfaces';
>>>>>>> 45da73a (Add models endpoint)

const router: Router = express.Router();

// input: {partName: string, clientID: number, area: number, volume: number, material: Material, surfaceTreatmentIDs: [number]}
router.post('/calculate-part-emission', validateEmissionsInput, async (req: any, res: Response, next: NextFunction) => {
    log('Calculating part emission...');
    res.json(await calculatePartEmission(req)
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
  // temporarily returns empty json
  
  res.json(await getModels(req).catch(err => next(err)));

  //res.json(getModels(req, next));
});

async function calculatePartEmission(req: any): Promise<Emission> {
  const partName: string = req.partName;
  const clientID: number = req.clientID;
  const material: Material = req.material;
  const surfaceTreatmentIDs: number[] = req.surfaceTreatmentIDs;
  const volume: number = req.volume;
  const area: number = req.area;
  
  // Calculate material emission
<<<<<<< HEAD
  const materialEmission: MaterialEmission = await fetchMaterialCostForClient(clientID, material.id);
=======
  const materialEmission: MaterialEmission = await fetchMaterialCostForCompany(clientID, materialID)
    .catch(err => {throw err});
>>>>>>> 45da73a (Add models endpoint)

  // Calculate material emission
  const materialCost: EmissionCost = {
    co2Amount: materialEmission.co2AmountPerM3 * volume,
    h2oAmount: materialEmission.h2oAmountPerM3 * volume,
    priceInDollar: materialEmission.pricePerM3 * volume
  }

  // Accumulator for all surface treatment emissions
  const totSurfaceTreatmentCost: EmissionCost = {
    co2Amount: 0,
    h2oAmount: 0,
    priceInDollar: 0
  }

  // Sum surface treatment emissions
  for(const surfaceTreatmentID of surfaceTreatmentIDs) {
<<<<<<< HEAD
    const surfaceEmission: SurfaceTreatmentEmission = await fetchSurfaceTreatmentCostForClient(clientID, surfaceTreatmentID);
=======
    const surfaceEmission: SurfaceTreatmentEmission = await fetchSurfaceTreatmentCostForCompany(clientID, surfaceTreatmentID)
      .catch(err => {throw err});
>>>>>>> 45da73a (Add models endpoint)

    totSurfaceTreatmentCost.co2Amount += surfaceEmission.co2AmountPerM2 * area;
    totSurfaceTreatmentCost.h2oAmount += surfaceEmission.h2oAmountPerM2 * area;
    totSurfaceTreatmentCost.priceInDollar += surfaceEmission.pricePerM2 * area;
  };

  // Totals (material + surface)
  const emissionCost: EmissionCost = { 
    co2Amount: materialCost.co2Amount + totSurfaceTreatmentCost.co2Amount,
    h2oAmount: materialCost.h2oAmount + totSurfaceTreatmentCost.h2oAmount,
    priceInDollar: materialCost.priceInDollar + totSurfaceTreatmentCost.priceInDollar
  }

  // Create response
  const response: Emission = { partName: partName, material: material, emissionCost: emissionCost }
  return Promise.resolve(response);
}

async function getMaterials(): Promise<Material[]> {
  return fetchMaterials();
}

<<<<<<< HEAD
async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
  return fetchSurfaceTreatments();
}

// Todo update signature to Model[]
async function getModels(req: any, next: NextFunction): Promise<any[]> {
  return Promise.resolve([]);
=======
async function getModels(req: any): Promise<Model[]> {
  // fetches all models from database
  const modelsDatabase: ModelDatabaseEntry[] = await fetchModels();

  // transforms ModelDatabaseEntry[] to Model[]
  const models: Model[] = await Promise.all(modelsDatabase.map(async (modelDatabaseEntry: ModelDatabaseEntry) => {
    // transforms partIDs into ModelPart[]
    const parts: ModelPart[] = await Promise.all(modelDatabaseEntry.partIDs.map(async (id: number) => {
      return await getPart(id).catch(err => {throw err});
    })).catch(err => {throw err});

    const model: Model = {
      id: modelDatabaseEntry.id,
      name: modelDatabaseEntry.name,
      parts: parts
    }
    return model
  })).catch(err => {throw err});
  
  return Promise.resolve(models);
}

async function getPart(partID: number): Promise<ModelPart> {
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
    image: partDatabaseEntry.imageURL,
    material: material,
    surfaceTreatments: filteredSurfaceTreatments
  }
  return Promise.resolve(part);
>>>>>>> 45da73a (Add models endpoint)
}

module.exports = router;
import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

/* Utils */
import express, { Response, NextFunction, Router } from 'express';
import { validateEmissionsInput } from 'server/validator';
import { fetchMaterials, fetchMaterialCostForCompany, fetchSurfaceTreatmentCostForCompany } from 'server/dbInterface';

/* Shared */
import { Emission, EmissionCost, EmissionCostSurfaceTreatment, Material, EmissionRequest, EmissionResponse } from '@shared/interfaces';

const router: Router = express.Router();

// input: {clientID: number, area: number, volume: number, materialID: number, surfaceTreatmentIDs: [number]}
router.post('/emissions', validateEmissionsInput, async (req: any, res: Response, next: NextFunction) => {
    log('Getting emissions...');
    res.json(await calculateEmissions(req)
    .catch((err) => {next(err)}));
});

router.get('/materials', async (req: any, res: Response, next: NextFunction) => {
  log('Getting materials...');
  res.json(await getMaterials()
    .catch((err) => {next(err)}));
});

router.get('/models', async (req: any, res: Response, next: NextFunction) => {
  log('Getting models...');
  // temporarily returns empty json
  res.json([]);

  //res.json(getModels(req, next));
});

async function calculateEmissions(req: any): Promise<EmissionResponse> {
  
  // Calculate material emission
  var materialEmission: EmissionCost = await fetchMaterialCostForCompany(req.clientID, req.materialID)
    .catch((err) => {
      log('Error calculating emissions cost')
      throw err
    });
  materialEmission.priceInDollar = materialEmission.priceInDollar * req.volume;
  materialEmission.co2AmountPerKg = materialEmission.co2AmountPerKg*req.volume;
  materialEmission.h2oAmountPerKg = materialEmission.h2oAmountPerKg*req.volume;
  
  // Calculate surface emission
  var totSurfaceEmission: EmissionCostSurfaceTreatment = {priceInDollar: 0, co2AmountPerM2: 0, h2oAmountPerM2: 0};
  for (var surfaceID of req.surfaceTreatmentIDs){
    const surfaceEmission: EmissionCostSurfaceTreatment = await fetchSurfaceTreatmentCostForCompany(req.clientID, surfaceID)
    .catch((err) => {
      log('Error calculating emissions cost')
      throw err
    });
    totSurfaceEmission.priceInDollar += surfaceEmission.priceInDollar*req.area;
    totSurfaceEmission.co2AmountPerM2 += surfaceEmission.co2AmountPerM2*req.area;
    totSurfaceEmission.h2oAmountPerM2 += surfaceEmission.h2oAmountPerM2*req.area;
  }

  // Totals (material + surface)
  const price: number = materialEmission.priceInDollar + totSurfaceEmission.priceInDollar;
  const co2: number = materialEmission.co2AmountPerKg + totSurfaceEmission.co2AmountPerM2;
  const h2o: number = materialEmission.h2oAmountPerKg + totSurfaceEmission.h2oAmountPerM2;

  const emissionCost: EmissionCost = {priceInDollar: price, co2AmountPerKg: co2, h2oAmountPerKg: h2o}

  // Create response
  const response: EmissionResponse = {partID: req.partID, emissionCost: emissionCost}

  return Promise.resolve(response);
}

async function getMaterials(): Promise<Material[]> {
  return fetchMaterials();
}

// Todo update signature to Model[]
async function getModels(req: any, next: NextFunction): Promise<any[]> {
  return Promise.resolve([]);
}

module.exports = router;
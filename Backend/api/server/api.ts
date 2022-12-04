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
    // temporarily returns empty json
    res.json([]);

    //res.json(calculateEmissions(req, next));

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

async function calculateEmissions(req: EmissionRequest, next: NextFunction): Promise<EmissionResponse> {

  // Calculate material emission
  var materialEmission: EmissionCost = await fetchMaterialCostForCompany(req.clientID, req.materialID);
  materialEmission.priceInDollar = materialEmission.priceInDollar*req.volume;
  materialEmission.co2AmountPerKg = materialEmission.co2AmountPerKg*req.volume;
  materialEmission.h2oAmountPerKg = materialEmission.h2oAmountPerKg*req.volume;

  // Calculate surface emission
  var totSEmission: EmissionCostSurfaceTreatment = {priceInDollar: 0, co2AmountPerM2: 0, h2oAmountPerM2: 0};
  for (var surfaceID of req.surfaceTreatmentIDs){
    const sEmission: EmissionCostSurfaceTreatment = await fetchSurfaceTreatmentCostForCompany(req.clientID, surfaceID);

    totSEmission.co2AmountPerM2 += sEmission.co2AmountPerM2*req.area;
    totSEmission.h2oAmountPerM2 += sEmission.h2oAmountPerM2*req.area;
    totSEmission.priceInDollar += sEmission.priceInDollar;
  }

  // Totals (material + surface)
  const price: number = materialEmission.priceInDollar + totSEmission.priceInDollar;
  const c2o: number = materialEmission.co2AmountPerKg + totSEmission.co2AmountPerM2;
  const h2o: number = materialEmission.h2oAmountPerKg + totSEmission.h2oAmountPerM2;

  const emissionCost: EmissionCost = {priceInDollar: price, co2AmountPerKg: c2o, h2oAmountPerKg: h2o}

  // Create response
  const respons: EmissionResponse = {partID: req.partID, emissionCost: emissionCost}

  return Promise.resolve(respons);
}

async function getMaterials(): Promise<Material[]> {
  return fetchMaterials();
}

// Todo update signature to Model[]
async function getModels(req: any, next: NextFunction): Promise<any[]> {
  return Promise.resolve([]);
}

module.exports = router;
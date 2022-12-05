import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

/* Utils */
import express, { Response, NextFunction, Router } from 'express';
import { validateEmissionsInput } from 'server/validator';
import { fetchMaterials, fetchMaterialCostForCompany, fetchSurfaceTreatmentCostForCompany } from 'server/dbInterface';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, EmissionResponse, EmissionCost } from '@shared/interfaces';

const router: Router = express.Router();

// input: {clientID: number, area: number, volume: number, materialID: number, surfaceTreatmentIDs: [number]}
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
  res.json([]);

  //res.json(getModels(req, next));
});

async function calculatePartEmission(req: any): Promise<EmissionResponse> {
  const partID: number = req.partID;
  const clientID: number = req.clientID;
  const materialID: number = req.materialID;
  const surfaceTreatmentIDs: number[] = req.surfaceTreatmentIDs;
  const volume: number = req.volume;
  const area: number = req.area;
  
  // Calculate material emission
  const materialEmission: MaterialEmission = await fetchMaterialCostForCompany(clientID, materialID);

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
    const surfaceEmission: SurfaceTreatmentEmission = await fetchSurfaceTreatmentCostForCompany(clientID, surfaceTreatmentID);

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
  const response: EmissionResponse = { partID: partID, emissionCost: emissionCost }

  return Promise.resolve(response);
}

async function getMaterials(): Promise<Material[]> {
  return fetchMaterials();
}

async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
  return fetchSurfaceTreatments();
}

// Todo update signature to Model[]
async function getModels(req: any, next: NextFunction): Promise<any[]> {
  return Promise.resolve([]);
}

module.exports = router;
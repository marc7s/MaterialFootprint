import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission } from '@shared/interfaces';
import { validateEmissionsInput } from './validator';
import { fetchMaterials, fetchMaterialCostForCompany, fetchSurfaceTreatmentCostForCompany } from '../../database/dbInterface';
import fs from 'fs';


const router: Router = express.Router();

// input: {clientID: number, area: number, volume: number, materialID: number, surfaceTreatmentIDs: [number]}
router.post('/emissions', validateEmissionsInput, (req: any, res: Response, next: NextFunction) => {
    log('Getting emissions...');
    // temporarily returns empty json
    res.json([]);

    //res.json(calculateEmissions(req, next));

});

router.get('/materials', async (req: any, res: Response, next: NextFunction) => {
  log('Getting materials...');
  res.json(await getMaterials(next)
    .catch((err) => {next(err)}));
});

router.get('/models', (req: any, res: Response, next: NextFunction) => {
  log('Getting models...');
  // temporarily returns empty json
  getModels(req, next);
  res.json([]);

  //res.json(getModels(req, next));

});

async function calculateEmissions(req: any, next: NextFunction): Promise<Emission[]> {
  return Promise.resolve([]);
}

async function getMaterials(next: NextFunction): Promise<Material[]> {
  return fetchMaterials();
}

// Todo update signature to Model[]
async function getModels(req: any, next: NextFunction): Promise<any[]> {
  getModelFromCache(1);
  return Promise.resolve([]);
}

function getModelFromCache(modelID: number): any {
  console.log('Getting model from cache...');
  fs.mkdtemp('cache', (err, folder) => {
    if (err) throw err;
    console.log(folder);
  });
}

module.exports = router;
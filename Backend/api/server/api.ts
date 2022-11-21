import { log } from '@shared/utils';
import { connectToDb } from './db';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission } from '@shared/interfaces';
import { validateEmissionsInput } from './validator';
import { fetchMaterials, fetchMaterialCostForCompany, fetchSurfaceTreatmentCostForCompany } from '../../database/dbInterface';

const router: Router = express.Router();

// input: {clientID: number, area: number, volume: number, materialID: number, surfaceTreatmentIDs: [number]}
router.post('/emissions', validateEmissionsInput, (req: any, res: Response, next: NextFunction) => {
    log('Getting emissions...');
    // temporarily returns empty json
    res.json([]);

    //res.json(calculateEmissions(req, next));

});

router.get('/connect', (req: any, res: Response) => {
  log('Connecting to database...');
  connectToDb();
});

router.get('/materials', (req: any, res: Response) => {
    log('Getting materials...');
    // temporary mock data
    const materials: Material[] = [
      {
        id: 1,
        name: 'Plastic',
        color: 'yellow'
      },
      {
        id: 2,
        name: 'Leather',
        color: 'brown'
      }
    ];
    res.json(materials);
});

router.get('/models', (req: any, res: Response, next: NextFunction) => {
  log('Getting models...');
  // temporarily returns empty json
  res.json([]);

  //res.json(getModels(req, next));
});

async function calculateEmissions(req: any, next: NextFunction): Promise<Emission[]> {
  return Promise.resolve([]);
}

async function getMaterials(): Promise<Material[]> {
  return fetchMaterials();
}

// Todo update signature to Model[]
async function getModels(req: any, next: NextFunction): Promise<any[]> {
  return Promise.resolve([]);
}

module.exports = router;
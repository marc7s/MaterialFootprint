import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission } from '@shared/interfaces';
import { validateEmissionsInput } from './validator';

const router: Router = express.Router();

// input: {clientID: number, area: number, volume: number, materialID: number, surfaceTreatmentID: [number]}
router.post('/emissions', validateEmissionsInput, (req: any, res: Response, next: NextFunction) => {
    log('Getting emissions...');
    // temporarily returns empty json
    res.json({})

    //res.json(calculateEmissions(req, next));

});

router.get('/materials', (req: any, res: Response) => {
  log('Getting materials...');
  // temporarily returns empty json
  res.json({});

  //res.json(getMaterials(req, next));

});

router.get('/models', (req: any, res: Response) => {
  log('Getting models...');
  // temporarily returns empty json
  res.json({});

  //res.json(getModels(req, next));

});

async function calculateEmissions(req: any, next: NextFunction) {
  return {}
}

async function getMaterials(req: any, next: NextFunction) {
}

async function getModels(req: any, next: NextFunction) {

}


module.exports = router;
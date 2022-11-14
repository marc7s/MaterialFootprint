import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission, EmissionsInput } from '@shared/interfaces';
import { validateEmissionsInput, validateMaterialsInput, validateModelsInput } from './validator';

const router: Router = express.Router();

// input: {clientId: number, area: number, volume: number, material: number, surfaceTreatment: String}
router.post('/emissions', validateEmissionsInput, (req: any, res: Response, next: NextFunction) => {
    log('Getting emissions...');
    // temporarily returns empty json
    res.json({})
    res.json(calculateEmissions(req, next));
 
    // validate input
    // calculate emissions (fetch database etc)
    // return emissions

});

router.post('/materials', validateMaterialsInput, (req: any, res: Response, next: NextFunction) => {
  log('Getting materials...');
  // temporarily returns empty json
  res.json({});
  res.json(getMaterials(req, next));

  // validate input
  // fetch materials from database
  // return materials

});

router.post('/models', validateModelsInput, (req: any, res: Response, next: NextFunction) => {
  log('Getting models...');
  // temporarily returns empty json
  res.json({});
  res.json(getModels(req, next));
  // validate input
  // fetch models from database
  // return models

});

async function calculateEmissions(req: any, next: NextFunction) {
  return {}
}

async function getMaterials(req: any, next: NextFunction) {
}

async function getModels(req: any, next: NextFunction) {

}


module.exports = router;
import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission } from '@shared/interfaces';

const router: Router = express.Router();

// input: {clientId: number, area: number, volume: number, material: number, surfaceTreatment: String}
router.get('/emissions', (req: any, res: Response) => {
    log('Getting emissions...');
    // temporarily returns empty json
    res.json({});

    // validate input
    // calculate emissions (fetch database etc)
    // return emissions

});

router.get('/materials', (req: any, res: Response) => {
  log('Getting emissions...');
  // temporarily returns empty json
  res.json({});

  // validate input
  // fetch materials from database
  // return materials

});

router.get('/models', (req: any, res: Response) => {
  log('Getting emissions...');
  // temporarily returns empty json
  res.json({});

  // validate input
  // fetch models from database
  // return models

});

async function calculateEmissions() {

}

async function getMaterials() {
}

async function getModels() {

}


module.exports = router;
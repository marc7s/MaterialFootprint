import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission } from '@shared/interfaces';

const router: Router = express.Router();

// input: {clientId: number, area: number, volume: number, material: number, surfaceTreatment: String}
router.get('/emissions', (req: any, res: Response) => {
    log('Getting emissions...');
    // temporary mock data
    const emissions: Emission[] = [
      {
        material: {
            id: 1,
            name: 'Plastic',
            color: 'yellow'
          },
        co2CountInKg: 1,
        h2oCountInL: 2,
        priceInDollar: 3
      }
    ];
    res.json(emissions);



    // validate input
    // calculate emissions (fetch database etc)
    // return emissions

});


async function calculateEmissions() {

}


module.exports = router;
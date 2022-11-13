import { log } from '@shared/utils';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { Material, Emission } from '@shared/interfaces';

const router: Router = express.Router();

router.get('/ping', (req: any, res: Response) => {
    log('Pinged, responding with pong...');
    res.send('Pong!');
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
        h2oCountInL: 2
      }
    ];
    res.json(emissions);
});

module.exports = router;
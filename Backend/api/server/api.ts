import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '../.env'});

import express, { Response, NextFunction, Router } from 'express';
import { log } from './server';

const router: Router = express.Router();

router.get('/ping', (req: any, res: Response) => {
    log('Pinged, responding with pong...');
    res.send('Pong!');
});

module.exports = router;
import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '/../.env'});

import express, { Application, Request, Response, NextFunction } from 'express';

import { ErrorMessage, NotFoundError, ApiRequestMalformedError } from './errors';
import { log, logError } from '@shared/utils';

const app: Application = express();
const cors = require('cors');

app.use(cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`
}));

app.use(express.json());
app.use('/', require('./api'));

app.get('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Incorrect path: ${req.baseUrl + req.path}`));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(err) {
        if(err instanceof NotFoundError)
            return sendError(res, 404, err.message);
        
        if(err instanceof ApiRequestMalformedError)
            return sendError(res, 406, err.message);
        
        switch (err.message) {
            default: return sendError(res, 500, err.message);
        }
    } else {
        next();
    }
});

app.listen(process.env.port, () => {
    log(`Running on http://localhost:${process.env.port}. Environment: ${app.get('env')}`);
});

function sendError(res: Response, statusCode: number, message: string, errorDetails?: Error) {
    const payload: ErrorMessage = {
        status: 'ERROR',
        errorMessage: message
    };
    logError(message, payload);
    if(!errorDetails)
        return res.status(statusCode).send(payload);

    payload.error = errorDetails;
    return res.status(statusCode).send(payload);
}
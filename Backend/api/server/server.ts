import 'module-alias/register';
import * as dotenv from 'dotenv';
dotenv.config({path: __dirname + '/../.env'});

/* Utils */
import express, { Application, Request, Response, NextFunction } from 'express';
import { ErrorMessage, NotFoundError, ApiRequestMalformedError } from 'server/errors';
import { connectToDb } from 'server/db';
import path from 'path';

/* Shared */
import { log, logError } from '@shared/utils';


const app: Application = express();
const cors = require('cors');

// Connect to the database on startup
connectToDb();

// Activate CORS for the frontend URL
app.use(cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`
}));

// Serve static files inside the `public` folder
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON requests
app.use(express.json());

// Use the API routes specified in the api file for all paths
app.use('/', require('./api'));

// If the route is not found in the api file, return a 404 error
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Incorrect path: ${req.baseUrl + req.path}`));
});

// If an error occured, respond with the appropriate status code and error message
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(err) {
        if(err instanceof NotFoundError)
            return sendError(res, 404, err.message);
        
        if(err instanceof ApiRequestMalformedError)
            return sendError(res, 406, err.message);
        
        // Allow for custom behaviour based on the specific error
        switch (err.message) {
            default: return sendError(res, 500, err.message);
        }
    } else {
        next();
    }
});

// Start the server on the specified port
app.listen(process.env.port, () => {
    log(`Running on http://localhost:${process.env.port}. Environment: ${app.get('env')}`);
});

// Helper function that responds with an error and logs it
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

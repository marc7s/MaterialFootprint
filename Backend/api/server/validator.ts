import { ErrorMessage, NotFoundError, ApiRequestMalformedError } from './errors';
import { Request, Response, NextFunction } from 'express';

// validates the input for the emissions endpoint
export function validateEmissionsInput(req: any, res: Response, next: NextFunction): void {
    
    // TODO remove hardcoded checks, make general function
    if(!req.body.clientID || !req.body.area || !req.body.volume || !req.body.materialID || !req.body.surfaceTreatmentID)
        return next(new ApiRequestMalformedError('Missing required parameters. Required parameters: clientId, area, volume, material, surfaceTreatment'));
    if (req.body.clientID < 0)
        return next(new ApiRequestMalformedError('clientID must be a positive number'));
    if (req.body.area < 0)
        return next(new ApiRequestMalformedError('area must be a positive number'));
    if (req.body.volume < 0)
        return next(new ApiRequestMalformedError('volume must be a positive number'));
    if (req.body.materialID < 0)
        return next(new ApiRequestMalformedError('materialID must be a positive number'));
    
    req.clientID = req.body.clientID;
    req.area = req.body.area;
    req.volume = req.body.volume;
    req.materialID = req.body.materialID;
    req.surfaceTreatmentID = req.body.surfaceTreatmentID;
    next();
}
import { ErrorMessage, NotFoundError, ApiRequestMalformedError } from './errors';
import { Request, Response, NextFunction } from 'express';

// validates the input for the emissions endpoint
export function validateEmissionsInput(req: any, res: Response, next: NextFunction): void {
    
    // TODO remove hardcoded checks, make general function
    if(!req.body.clientId || !req.body.area || !req.body.volume || !req.body.material || !req.body.surfaceTreatment)
        return next(new ApiRequestMalformedError('Missing required parameters. Required parameters: clientId, area, volume, material, surfaceTreatment'));
    if (req.body.clientId < 0)
        return next(new ApiRequestMalformedError('clientId must be a positive number'));
    if (req.body.area < 0)
        return next(new ApiRequestMalformedError('area must be a positive number'));
    if (req.body.volume < 0)
        return next(new ApiRequestMalformedError('volume must be a positive number'));
    if (req.body.material < 0)
        return next(new ApiRequestMalformedError('material must be a positive number'));
    
    req.clientId = req.body.clientId;
    req.area = req.body.area;
    req.volume = req.body.volume;
    req.material = req.body.material;
    req.surfaceTreatment = req.body.surfaceTreatment;
    next();
}

// validates the input for the materials endpoint
export function validateMaterialsInput(req: any, res: Response, next: NextFunction): void {
    if (!req.body.clientId || !req.body.materialId)
        throw new ApiRequestMalformedError('Missing required parameters. Required parameters: clientId, materialId');
    if (req.body.clientId < 0)
        throw new ApiRequestMalformedError('clientId must be a positive number');
    if (req.body.materialId < 0)
        throw new ApiRequestMalformedError('materialId must be a positive number');
    req.clientId = req.body.clientId;
    req.materialId = req.body.materialId;
    next()
}

// validates the input for the models endpoint
export function validateModelsInput(req: any, res: Response, next: NextFunction): void {
    if (!req.body.clientId || !req.body.modelId)
        throw new ApiRequestMalformedError('Missing required parameters. Required parameters: clientId, modelId');
    if (req.body.clientId < 0)
        throw new ApiRequestMalformedError('clientId must be a positive number');
    if (req.body.modelId < 0)
        throw new ApiRequestMalformedError('modelId must be a positive number');
    req.clientId = req.body.clientId;
    req.modelId = req.body.modelId;
    next()
}
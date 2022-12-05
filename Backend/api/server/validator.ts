/* Utils */
import { ApiRequestMalformedError } from 'server/errors';
import { Response, NextFunction } from 'express';

// validates the input for the emissions endpoint
export function validateEmissionsInput(req: any, res: Response, next: NextFunction): void {
    // TODO remove hardcoded checks, make general function
    if(!req.body.partName || !req.body.clientID || !req.body.area || !req.body.volume || !req.body.materialID || !req.body.surfaceTreatmentIDs)
        return next(new ApiRequestMalformedError('Missing required parameters. Required parameters: partName, clientID, area, volume, materialID, surfaceTreatmentIDs'));

    if (isNaN(req.body.clientID))
        return next(new ApiRequestMalformedError('clientID must be a number'));
    if (isNaN(req.body.area))
        return next(new ApiRequestMalformedError('area must be a number'));
    if (isNaN(req.body.volume))
        return next(new ApiRequestMalformedError('volume must be a number'));
    if (req.body.clientID < 0)
        return next(new ApiRequestMalformedError('clientID must be a positive number'));
    if (req.body.materialID < 0)
        return next(new ApiRequestMalformedError('materialID must be a positive number'));
    if (req.body.area < 0)
        return next(new ApiRequestMalformedError('area must be a positive number'));
    if (req.body.volume < 0)
        return next(new ApiRequestMalformedError('volume must be a positive number'));

    if (!Array.isArray(req.body.surfaceTreatmentIDs))
        return next(new ApiRequestMalformedError('surfaceTreatmentIDs must be an array'));
  
    const allNumbers = req.body.surfaceTreatmentIDs.every((id: number) => !isNaN(id));
    if (!allNumbers)
        return next(new ApiRequestMalformedError('surfaceTreatmentIDs must be an array of numbers'));

    const allPositive = req.body.surfaceTreatmentIDs.every((id: number) => id >= 0); 
    if (!allPositive) 
        return next(new ApiRequestMalformedError('surfaceTreatmentIDs must be a list of positive numbers'));

    req.partName = req.body.partName;
    req.clientID = req.body.clientID;
    req.area = req.body.area;
    req.volume = req.body.volume;
    req.materialID = req.body.materialID;
    req.surfaceTreatmentIDs = req.body.surfaceTreatmentIDs;
    next();
}
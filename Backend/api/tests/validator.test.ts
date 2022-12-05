/* Utils */
import { Material } from "@shared/interfaces";
import { NextFunction, Request, Response } from "express";
import { ApiRequestMalformedError } from "server/errors";
import { validateEmissionsInput } from "server/validator";

const emptyReq: Request = {
    body: {}
} as Request;

const validMaterial: Material = {
    id: 1,
    name: "test material",
    color: "test color"
} as Material;

const validReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: 1,
        volume: 1,
        material: validMaterial,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const negativeClientIDValReq: Request = {
    body: {
        partName: "test",
        clientID: -1,
        area: 1,
        volume: 1,
        material: validMaterial,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const areaValIsStringReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: "g",
        volume: 1,
        material: validMaterial,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const missingAreaReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        volume: 1,
        material: validMaterial,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const surfaceTreatmentIDsNotAllNumbersReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: 1,
        volume: 1,
        material: validMaterial,
        surfaceTreatmentIDs: [1, "g"]
    }
} as Request;

const materialMissingColorReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: 1,
        volume: 1,
        material: {
            id: 1,
            name: "test material"
        },
        surfaceTreatmentIDs: [1, "g"]
    }
} as Request;

const emptyRes: Response = {} as Response;
const next: NextFunction = (a: any) => a;

test('validateEmissionsInput with valid parameters', () => {
    const response = validateEmissionsInput(validReq, emptyRes, next);
    expect(response).toBeUndefined();
});

test('validateEmissionsInput with no parameters', () => {
    const response = validateEmissionsInput(emptyReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('Missing required parameters');
});

test('validateEmissionsInput with negative parameter', () => {
    const response = validateEmissionsInput(negativeClientIDValReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('clientID must be a positive number');
});

test('validateEmissionsInput with wrong datatype parameter', () => {
    const response = validateEmissionsInput(areaValIsStringReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('area must be a number');
});

test('validateEmissionsInput missing area parameter', () => {
    const response = validateEmissionsInput(missingAreaReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('Missing required parameters');
});

test('validateEmissionsInput surfaceTreatmentIDs with not all numbers', () => {
    const response = validateEmissionsInput(surfaceTreatmentIDsNotAllNumbersReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('surfaceTreatmentIDs must be an array of numbers');
});

test('validateEmissionsInput material missing color', () => {
    const response = validateEmissionsInput(materialMissingColorReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('material must be of Material type');
});
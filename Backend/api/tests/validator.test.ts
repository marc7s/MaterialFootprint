/* Utils */
import { NextFunction, Request, Response } from "express";
import { ApiRequestMalformedError } from "server/errors";
import { validateEmissionsInput } from "server/validator";

// Mock requests for testing
const emptyReq: Request = {
    body: {}
} as Request;

const validReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: 1,
        volume: 1,
        materialID: 1,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const negativeClientIDValReq: Request = {
    body: {
        partName: "test",
        clientID: -1,
        area: 1,
        volume: 1,
        materialID: 1,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const areaValIsStringReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: "g",
        volume: 1,
        materialID: 1,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const missingAreaReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        volume: 1,
        materialID: 1,
        surfaceTreatmentIDs: [1]
    }
} as Request;

const surfaceTreatmentIDsNotAllNumbersReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: 1,
        volume: 1,
        materialID: 1,
        surfaceTreatmentIDs: [1, "g"]
    }
} as Request;

const materialIDNegativeReq: Request = {
    body: {
        partName: "test",
        clientID: 1,
        area: 1,
        volume: 1,
        materialID: -1,
        surfaceTreatmentIDs: [1, "g"]
    }
} as Request;

// Empty mock response for testing
const emptyRes: Response = {} as Response;

// Mock next function for testing
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

test('validateEmissionsInput materialID negative', () => {
    const response = validateEmissionsInput(materialIDNegativeReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('materialID must be a positive number');
});
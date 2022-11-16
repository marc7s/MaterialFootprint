import { NextFunction, Request, Response } from "express";
import { ApiRequestMalformedError } from "../server/errors";
import { validateEmissionsInput } from "../server/validator";

const emptyReq: Request = {
    body: {}
} as Request;
const emptyRes: Response = {} as Response;
const next: NextFunction = (a: any) => a;

test('validateEmissionsInput with no parameters', () => {
    const response = validateEmissionsInput(emptyReq, emptyRes, next);
    expect(response).toBeInstanceOf(ApiRequestMalformedError);
    expect((response as any as ApiRequestMalformedError).message).toContain('Missing required parameters');
});
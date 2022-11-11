export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ApiRequestMalformedError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class DatabaseConnectionError extends Error {
    constructor() {
        super("Could not connect to database");
    }
}

export interface ErrorMessage {
    status: string,
    errorMessage: string,
    error?: Error
}
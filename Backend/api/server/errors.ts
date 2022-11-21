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

export class FatalError extends Error {
    constructor() {
        super("Fatal error");
        process.kill(process.pid, 'SIGINT')
    }
}

export interface ErrorMessage {
    status: string,
    errorMessage: string,
    error?: Error
}

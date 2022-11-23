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

export class DatabaseCreateCollectionError extends Error {
    constructor() {
        super("Could not create collection in database");
    }
}

export class DatabaseClearCollectionError extends Error {
    constructor() {
        super("Could not clear collection in database");
    }
}

export class DatabaseInsertMockDataError extends Error {
    constructor() {
        super("Could not insert mock data to database");
    }
}

export interface ErrorMessage {
    status: string,
    errorMessage: string,
    error?: Error
}

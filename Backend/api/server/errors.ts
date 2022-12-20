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
    constructor(message: string) {
        super(message);
    }
}

export class DatabaseQueryError extends Error {
    constructor() {
        super("Query to database failed");
    }
}

export class DatabaseQueryResultError extends Error {
    constructor(message: string) {
        super("Unexpected result from database query: " + message);
    }
}

export class DatabaseInitialisationError extends Error {
    constructor(error: any) {
        super("Could not initialise database: " + error);
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
        super("Could not insert mock data into database");
    }
}

export interface ErrorMessage {
    status: string,
    errorMessage: string,
    error?: Error
}

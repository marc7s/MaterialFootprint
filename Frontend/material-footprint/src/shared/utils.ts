import {v4 as uuidv4} from 'uuid';

// Custom log function that prepends a timestamp
export function log(message: string) {
    const out = `[${new Date().toLocaleString()}] ${message}`;
    console.log(out);
}

// Custom error log function that prepends a timestamp and prints an optional error
export function logError(errorMessage: string, error?: any) {
    console.error(`[${new Date().toLocaleString()}] ${errorMessage}`);
    if(error)
        console.error(error);
}

// Generate a unique ID
export function uniqueID(): string {
    return uuidv4();
}
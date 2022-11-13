import {v4 as uuidv4} from 'uuid';

export function log(message: string) {
    const out = `[${new Date().toLocaleString()}] ${message}`;
    console.log(out);
}

export function logError(errorMessage: string, error?: any) {
    console.error(`[${new Date().toLocaleString()}] ${errorMessage}`);
    if(error)
        console.error(error);
}

export function uniqueID() {
    return uuidv4();
}
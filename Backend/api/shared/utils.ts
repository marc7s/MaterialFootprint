export function log(message: string) {
    const out = `[${new Date().toLocaleString()}] ${message}`;
    console.log(out);
}

export function logError(errorMessage: string, error?: any) {
    console.error(`[${new Date().toLocaleString()}] ${errorMessage}`);
    if(error)
        console.error(error);
}
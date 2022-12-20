/* Components */

/* Utilities */

/* Shared */
import { Model, Material, SurfaceTreatment, Client } from "shared/interfaces";
import { MOCK_MATERIALS, MOCK_SURFACE_TREATMENTS, clients, MOCK_MODELS } from "shared/mockData";

// Determine if the app is running in local mode
export function isLocalMode(): boolean {
    return process.env.REACT_APP_LOCAL_MODE === '1';
}

// Helper function that sends a get request to the API
async function get(endPoint: string, mockData: any, options?: RequestInit): Promise<any> {
    return new Promise((resolve, reject) => {
        // Return mock data if in local mode
        if(isLocalMode())
            return resolve(mockData);

        const baseEndpoint: string | undefined = process.env.REACT_APP_BACKEND_ENDPOINT;
        if(baseEndpoint === undefined)
            reject(new Error('No backend endpoint specified'));

        fetch(new URL(endPoint, baseEndpoint), options)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => console.error(error));
    });
}

// Get a list of all the materials from the API
export async function getMaterials(): Promise<Material[]> {
    const response = await get('materials', MOCK_MATERIALS);
    return response as Material[];
}

// Get a list of all the materials from the API
export async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const response = await get('surface-treatments', MOCK_SURFACE_TREATMENTS);
    return response as SurfaceTreatment[];
}

// Get a list of all the clients from the API
export async function getClients(): Promise<Client[]> {
    const response = await get('clients', clients);
    return response as SurfaceTreatment[];
}

// Get a list of all the models from the API
export async function getModels(): Promise<Model[]> {
    const response = await get('models', MOCK_MODELS);
    return response as Model[];
}
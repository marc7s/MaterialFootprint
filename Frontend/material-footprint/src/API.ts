/* Components */

/* Utilities */

/* Shared */
import { Model, Material, SurfaceTreatment, Client } from "shared/interfaces";
import { materials, surfaceTreatments, clients, models } from "shared/mockData";

export function isLocalMode(): boolean {
    return process.env.REACT_APP_LOCAL_MODE === '1';
}

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
    const response = await get('materials', materials);
    return response as Material[];
}

// Get a list of all the materials from the API
export async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const response = await get('surface-treatments', surfaceTreatments);
    return response as SurfaceTreatment[];
}

// Get a list of all the clients from the API
export async function getClients(): Promise<Client[]> {
    const response = await get('clients', clients);
    return response as SurfaceTreatment[];
}

// Get a list of all the models from the API
export async function getModels(): Promise<Model[]> {
    const response = await get('models', models);
    return response as Model[];
}
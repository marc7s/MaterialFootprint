/* Components */

/* Utilities */

/* Shared */
import { Model, Material, SurfaceTreatment } from "shared/interfaces";


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
    const mockData = [
        {
            id: 1,
            name: 'Plastic',
            color: 'yellow'
        },
        {
            id: 2,
            name: 'Leather',
            color: 'red'
        },
        {
            id: 3,
            name: 'Steel',
            color: 'lightgray'
        },
        {
            id: 4,
            name: 'Textile',
            color: 'purple'
        }
    ];
    const response = await get('materials', mockData);
    return response as Material[];
}

// Get a list of all the materials from the API
export async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const mockData = [
        {
            id: 1,
            name: 'Laquer'
        },
        {
            id: 2,
            name: 'Paint'
        }
    ];
    const response = await get('surface-treatments', mockData);
    return response as SurfaceTreatment[];
}

// Get a list of all the models from the API
export async function getModels(): Promise<Model[]> {
    const materials = await getMaterials();
    const surfaceTreatments = await getSurfaceTreatments();

    const mockData = [
        {
            id: 1,
            name: 'Koenigsegg',
            url: 'model-objects/koenigsegg.glb',
            parts: [
                {
                    id: 1,
                    name: 'Aero',
                    area: 7,
                    volume: 8,
                    material: materials.find(material => material.name === 'Leather')!,
                    surfaceTreatments: []
                },
                {
                    id: 2,
                    name: 'Windshield',
                    area: 7,
                    volume: 8,
                    material: materials.find(material => material.name === 'Steel')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer'].includes(surfaceTreatment.name))
                },
                {
                    id: 3,
                    name: 'Intakes',
                    area: 7,
                    volume: 8,
                    material: materials.find(material => material.name === 'Plastic')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: 4,
                    name: 'Body',
                    area: 7,
                    volume: 8,
                    material: materials.find(material => material.name === 'Textile')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer', 'Paint'].includes(surfaceTreatment.name))
                }
            ]
        },
        {
            id: 2,
            name: 'Chair',
            url: 'model-objects/chair.glb',
            parts: [
                {
                    id: 5,
                    name: 'Seat',
                    area: 1,
                    volume: 2,
                    material: materials.find(material => material.name === 'Leather')!,
                    surfaceTreatments: []
                },
                {
                    id: 6,
                    name: 'Front legs',
                    area: 5,
                    volume: 6,
                    material: materials.find(material => material.name === 'Plastic')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: 7,
                    name: 'Back legs',
                    area: 7,
                    volume: 8,
                    material: materials.find(material => material.name === 'Steel')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer'].includes(surfaceTreatment.name))
                },
                {
                    id: 8,
                    name: 'Backrest',
                    area: 3,
                    volume: 4,
                    material: materials.find(material => material.name === 'Textile')!,
                    surfaceTreatments: []
                }
            ]
        }
    ]

    const response = await get('models', mockData);
    return response as Model[];
}
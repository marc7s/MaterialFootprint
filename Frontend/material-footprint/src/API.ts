/* Components */

/* Utilities */
import seat from 'assets/configurator/chair/Seat.png';
import frame from 'assets/configurator/chair/Frame.png';
import armrests from 'assets/configurator/chair/Armrests.png';
import accent from 'assets/configurator/chair/Accent.png';

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
            color: 'brown'
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
            name: 'Chair',
            parts: [
                {
                    id: 1,
                    name: 'Seat',
                    area: 1,
                    volume: 2,
                    image: seat,
                    material: materials.find(material => material.name === 'Leather')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer'].includes(surfaceTreatment.name))
                },
                {
                    id: 2,
                    name: 'Frame',
                    area: 3,
                    volume: 4,
                    image: frame,
                    material: materials.find(material => material.name === 'Steel')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: 3,
                    name: 'Armrests',
                    area: 5,
                    volume: 6,
                    image: armrests,
                    material: materials.find(material => material.name === 'Plastic')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer', 'Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: 4,
                    name: 'Accent',
                    area: 7,
                    volume: 8,
                    image: accent,
                    material: materials.find(material => material.name === 'Textile')!,
                    surfaceTreatments: []
                }
            ]
        },
        {
            id: 2,
            name: 'Chair 2',
            parts: [
                {
                    id: 1,
                    name: 'Seat',
                    area: 1,
                    volume: 2,
                    image: seat,
                    material: materials.find(material => material.name === 'Leather')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer'].includes(surfaceTreatment.name))
                },
                {
                    id: 2,
                    name: 'Frame',
                    area: 3,
                    volume: 4,
                    image: frame,
                    material: materials.find(material => material.name === 'Steel')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: 3,
                    name: 'Armrests',
                    area: 5,
                    volume: 6,
                    image: armrests,
                    material: materials.find(material => material.name === 'Plastic')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer', 'Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: 4,
                    name: 'Accent',
                    area: 7,
                    volume: 8,
                    image: accent,
                    material: materials.find(material => material.name === 'Textile')!,
                    surfaceTreatments: []
                }
            ]
        }
    ]

    const response = await get('models', mockData);
    return response as Model[];
}
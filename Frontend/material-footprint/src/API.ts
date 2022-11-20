/* Components */

/* Utilities */
import { Model, ModelPart } from "Configurator/interfaces";

import seat from 'assets/configurator/chair/Seat.png';
import frame from 'assets/configurator/chair/Frame.png';
import armrests from 'assets/configurator/chair/Armrests.png';
import accent from 'assets/configurator/chair/Accent.png';

/* Shared */
import { Emission, Material, SurfaceTreatment } from "shared/interfaces";
import { uniqueID } from "shared/utils";


// Get a list of all the materials from the API
export async function getMaterials(): Promise<Material[]> {
    return [
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
    ]
}

// Get a list of all the materials from the API
export async function getSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    return [
        {
            id: 1,
            name: 'Laquer'
        },
        {
            id: 2,
            name: 'Paint'
        }
    ]
}

// Get a list of all the models from the API
export async function getModels(): Promise<Model[]> {
    const materials = await getMaterials();
    const surfaceTreatments = await getSurfaceTreatments();

    return [
        {
            id: 1,
            name: 'Chair',
            parts: [
                {
                    id: uniqueID(),
                    name: 'Seat',
                    image: seat,
                    material: materials.find(material => material.name === 'Leather')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer'].includes(surfaceTreatment.name))
                },
                {
                    id: uniqueID(),
                    name: 'Frame',
                    image: frame,
                    material: materials.find(material => material.name === 'Steel')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: uniqueID(),
                    name: 'Armrests',
                    image: armrests,
                    material: materials.find(material => material.name === 'Plastic')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer', 'Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: uniqueID(),
                    name: 'Accent',
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
                    id: uniqueID(),
                    name: 'Seat',
                    image: seat,
                    material: materials.find(material => material.name === 'Leather')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer'].includes(surfaceTreatment.name))
                },
                {
                    id: uniqueID(),
                    name: 'Frame',
                    image: frame,
                    material: materials.find(material => material.name === 'Steel')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: uniqueID(),
                    name: 'Armrests',
                    image: armrests,
                    material: materials.find(material => material.name === 'Plastic')!,
                    surfaceTreatments: surfaceTreatments.filter(surfaceTreatment => ['Laquer', 'Paint'].includes(surfaceTreatment.name))
                },
                {
                    id: uniqueID(),
                    name: 'Accent',
                    image: accent,
                    material: materials.find(material => material.name === 'Textile')!,
                    surfaceTreatments: []
                }
            ]
        }
    ]
}

// Get a list of all the materials from the API
export async function getEmissions(modelParts: ModelPart[]): Promise<Emission[]> {
    const materials = await getMaterials();
    return [
        {
            partName: "Seat",
            material: materials.find(material => material.name === 'Textile')!,
            emissionCost: {
                co2CostInDollar: 100,
                h2oCostInDollar: 200,
                priceInDollar: 300
            }
        },
        {
            partName: "Armrests",
            material: materials.find(material => material.name === 'Plastic')!,
            emissionCost: {
                co2CostInDollar: 1000,
                h2oCostInDollar: 2000,
                priceInDollar: 3000
            }
        },
        {
            partName: "Frame",
            material: materials.find(material => material.name === 'Steel')!,
            emissionCost: {
                co2CostInDollar: 10000,
                h2oCostInDollar: 20000,
                priceInDollar: 30000
            }
        }
    ]
}
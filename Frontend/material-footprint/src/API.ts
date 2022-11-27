/* Components */

/* Utilities */
import { Model } from "Configurator/interfaces";

import seat from 'assets/configurator/chair/Seat.png';
import frame from 'assets/configurator/chair/Frame.png';
import armrests from 'assets/configurator/chair/Armrests.png';
import accent from 'assets/configurator/chair/Accent.png';

/* Shared */
import { Material, SurfaceTreatment } from "shared/interfaces";
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
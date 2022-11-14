import { Model, ModelPart } from "./Configurator/interfaces";
import { Emission, Material } from "./shared/interfaces";
import { uniqueID } from "./shared/utils";


import seat from './assets/configurator/chair/Seat.png';
import frame from './assets/configurator/chair/Frame.png';
import armrests from './assets/configurator/chair/Armrests.png';
import accent from './assets/configurator/chair/Accent.png';

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

// Get a list of all the models from the API
export async function getModels(): Promise<Model[]> {
    const materials = await getMaterials();
    return [
        {
            id: 1,
            name: 'Chair',
            parts: [
                {
                    id: uniqueID(),
                    name: 'Seat',
                    image: seat,
                    material: materials.find(material => material.name === 'Leather')!
                },
                {
                    id: uniqueID(),
                    name: 'Frame',
                    image: frame,
                    material: materials.find(material => material.name === 'Steel')!
                },
                {
                    id: uniqueID(),
                    name: 'Armrests',
                    image: armrests,
                    material: materials.find(material => material.name === 'Plastic')!
                },
                {
                    id: uniqueID(),
                    name: 'Accent',
                    image: accent,
                    material: materials.find(material => material.name === 'Textile')!
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
                    material: materials.find(material => material.name === 'Leather')!
                },
                {
                    id: uniqueID(),
                    name: 'Frame',
                    image: frame,
                    material: materials.find(material => material.name === 'Steel')!
                },
                {
                    id: uniqueID(),
                    name: 'Armrests',
                    image: armrests,
                    material: materials.find(material => material.name === 'Plastic')!
                },
                {
                    id: uniqueID(),
                    name: 'Accent',
                    image: accent,
                    material: materials.find(material => material.name === 'Textile')!
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
            co2CountInKg: 100,
            h2oCountInL: 200,
            priceInDollar: 300
        },
        {
            partName: "Armrests",
            material: materials.find(material => material.name === 'Plastic')!,
            co2CountInKg: 1000,
            h2oCountInL: 2000,
            priceInDollar: 3000
        },
        {
            partName: "Frame",
            material: materials.find(material => material.name === 'Steel')!,
            co2CountInKg: 10000,
            h2oCountInL: 20000,
            priceInDollar: 30000
        }
    ]
}
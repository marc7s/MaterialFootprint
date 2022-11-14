import { Model } from "./Configurator/interfaces";
import { Material } from "./shared/interfaces";
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
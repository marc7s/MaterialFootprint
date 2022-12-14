import { 
    Material, 
    SurfaceTreatment, 
    Client, 
    ModelPartDatabaseEntry, 
    ModelDatabaseEntry, 
    ClientMaterialCostDatabaseEntry, 
    ClientSurfaceTreatmentCostDatabaseEntry, 
    Model, 
    ModelPart, 
    MaterialDatabaseEntry
} from './interfaces';

export const materials: Material[] = [
    { 
        id: 1, 
        name: 'Plastic', 
        color: '#FFAB5C',
        isMetallic: false,
        textureMap: {
            normalMapURL: "/material-textures/plastic_normal.jpg",
            roughnessMapURL: "/material-textures/plastic_roughness.jpg",
            occlusionMapURL: "/material-textures/plastic_occlusion.jpg"
        }
    },
    {
        id: 2,
        name: 'Leather',
        color: "#F72E41",
        isMetallic: false,
        textureMap: {
            normalMapURL: "/material-textures/leather_normal.jpg",
            roughnessMapURL: "/material-textures/leather_roughness.jpg",
            occlusionMapURL: "/material-textures/leather_occlusion.jpg"
        }
    },
    { 
        id: 3, 
        name: 'Steel', 
        color: "#B2B8BD",
        isMetallic: true,
        textureMap: {
            normalMapURL: "/material-textures/steel_normal.jpg",
            roughnessMapURL: "/material-textures/steel_roughness.jpg",
            occlusionMapURL: "/material-textures/steel_occlusion.jpg"
        }
    },
    { 
        id: 4, 
        name: 'Textile', 
        color: "#7650FF",
        isMetallic: false,
        textureMap: {
            normalMapURL: "/material-textures/textile_normal.jpg",
            roughnessMapURL: "/material-textures/textile_roughness.jpg",
            occlusionMapURL: "/material-textures/textile_occlusion.jpg"
        }
    }
];

export const materialDatabaseEntry: MaterialDatabaseEntry[] = [
    { 
        id: 1, 
        name: 'Plastic', 
        color: '#FFAB5C',
        isMetallic: false,
        normalMapURL: "/material-textures/plastic_normal.jpg",
        roughnessMapURL: "/material-textures/plastic_roughness.jpg",
        occlusionMapURL: "/material-textures/plastic_occlusion.jpg"
    },
    {
        id: 2,
        name: 'Leather',
        color: "#F72E41",
        isMetallic: false,
        normalMapURL: "/material-textures/leather_normal.jpg",
        roughnessMapURL: "/material-textures/leather_roughness.jpg",
        occlusionMapURL: "/material-textures/leather_occlusion.jpg"
    },
    { 
        id: 3, 
        name: 'Steel', 
        color: "#B2B8BD",
        isMetallic: true,
        normalMapURL: "/material-textures/steel_normal.jpg",
        roughnessMapURL: "/material-textures/steel_roughness.jpg",
        occlusionMapURL: "/material-textures/steel_occlusion.jpg"
    },
    { 
        id: 4, 
        name: 'Textile', 
        color: "#7650FF",
        isMetallic: false,
        normalMapURL: "/material-textures/textile_normal.jpg",
        roughnessMapURL: "/material-textures/textile_roughness.jpg",
        occlusionMapURL: "/material-textures/textile_occlusion.jpg"
    }
];


export const surfaceTreatments: SurfaceTreatment[] = [
    { 
        id: 1, 
        name: 'Laquer'
    },
    {
        id: 2,
        name: 'Paint'
    }
];

export const clients: Client[] = [
    {
        id: 1,
        name: "Ericsson"
    },
    {
        id: 2,
        name: "Rapid Images"
    }
];

export const modelpartsDatabaseEntry: ModelPartDatabaseEntry[] = [
    {
        id: 1,
        name: "Aero",
        area: 3,
        volume: 0.09,
        materialID: 2,
        surfaceTreatmentIDs: []
    },
    {
        id: 2,
        name: "Windshield",
        area: 2,
        volume: 0.06,
        materialID: 3,
        surfaceTreatmentIDs: [1]
    },
    {
        id: 3,
        name: "Intakes",
        area: 0.8,
        volume: 0.02,
        materialID: 1,
        surfaceTreatmentIDs: [2]
    },
    {
        id: 4,
        name: "Body",
        area: 20,
        volume: 0.5,
        materialID: 4,
        surfaceTreatmentIDs: [1, 2]
    },
    {
        id: 5,
        name: "Seat",
        area: 1.5,
        volume: 0.015,
        materialID: 2,
        surfaceTreatmentIDs: []
    },
    {
        id: 6,
        name: "Front legs",
        area: 0.1,
        volume: 0.001,
        materialID: 1,
        surfaceTreatmentIDs: [2]
    },
    {
        id: 7,
        name: "Back legs",
        area: 0.1,
        volume: 0.001,
        materialID: 3,
        surfaceTreatmentIDs: [1]
    },
    {
        id: 8,
        name: "Backrest",
        area: 2,
        volume: 0.02,
        materialID: 4,
        surfaceTreatmentIDs: []
    }
];

export const modelsDataBaseEntry: ModelDatabaseEntry[] = [
    {
        id: 1,
        name: "Koenigsegg",
        partIDs: [1, 2, 3, 4]
    },
    {
        id: 2,
        name: "Chair",
        partIDs: [5, 6, 7, 8]
    }
];

export const modelParts: ModelPart[] = [
    {
        id: 1,
        name: 'Aero',
        area: 3,
        volume: 0.09,
        material: materials[1],
        surfaceTreatments: []
    },
    {
        id: 2,
        name: 'Windshield',
        area: 2,
        volume: 0.06,
        material: materials[2],
        surfaceTreatments: [surfaceTreatments[0]]
    },
    {
        id: 3,
        name: 'Intakes',
        area: 0.8,
        volume: 0.02,
        material: materials[0],
        surfaceTreatments: [surfaceTreatments[1]]
    },
    {
        id: 4,
        name: 'Body',
        area: 20,
        volume: 0.5,
        material: materials[3],
        surfaceTreatments: [surfaceTreatments[0], surfaceTreatments[1]]
    },
    {
        id: 5,
        name: 'Seat',
        area: 1.5,
        volume: 0.015,
        material: materials[1],
        surfaceTreatments: []
    },
    {
        id: 6,
        name: 'Front legs',
        area: 0.1,
        volume: 0.001,
        material: materials[0],
        surfaceTreatments: [surfaceTreatments[1]]
    },
    {
        id: 7,
        name: 'Back legs',
        area: 0.1,
        volume: 0.001,
        material: materials[2],
        surfaceTreatments: [surfaceTreatments[0]]
    },
    {
        id: 8,
        name: 'Backrest',
        area: 2,
        volume: 0.02,
        material: materials[3],
        surfaceTreatments: []
    }
];

export const models: Model[] = [
    {
        id: 1,
        name: 'Koenigsegg',
        url: 'model-objects/koenigsegg.glb',
        parts: [modelParts[0], modelParts[1], modelParts[2], modelParts[3]]
    },
    {
        id: 2,
        name: 'Chair',
        url: 'model-objects/chair.glb',
        parts: [modelParts[4], modelParts[5], modelParts[6], modelParts[7]]
    }
];

export const clientMaterialCosts: ClientMaterialCostDatabaseEntry[] = [
    {
        clientID: 1,
        materialID: 1,
        co2AmountPerM3: 8100,
        h2oAmountPerM3: 145,
        pricePerM3: 8789

    },
    {
        clientID: 1,
        materialID: 2,
        co2AmountPerM3: 3000,
        h2oAmountPerM3: 12000,
        pricePerM3: 94721
    },
    {
        clientID: 1,
        materialID: 3,
        co2AmountPerM3: 16000,
        h2oAmountPerM3: 2200,
        pricePerM3: 68354
    },
    {
        clientID: 1,
        materialID: 4,
        co2AmountPerM3: 5666,
        h2oAmountPerM3: 28000,
        pricePerM3: 24816
    },
    {
        clientID: 2,
        materialID: 1,
        co2AmountPerM3: 7900,
        h2oAmountPerM3: 137,
        pricePerM3: 8624

    },
    {
        clientID: 2,
        materialID: 2,
        co2AmountPerM3: 2000,
        h2oAmountPerM3: 10000,
        pricePerM3: 92675
    },
    {
        clientID: 2,
        materialID: 3,
        co2AmountPerM3: 13000,
        h2oAmountPerM3: 2100,
        pricePerM3: 67210
    },
    {
        clientID: 2,
        materialID: 4,
        co2AmountPerM3: 4333,
        h2oAmountPerM3: 25000,
        pricePerM3: 24695
    }
];

export const clientSurfaceTreatmentCosts: ClientSurfaceTreatmentCostDatabaseEntry[] = [
    {
        clientID: 1,
        surfaceID: 1,
        co2AmountPerM2: 4,
        h2oAmountPerM2: 17.1,
        pricePerM2: 5236
    },
    {
        clientID: 1,
        surfaceID: 2,
        co2AmountPerM2: 6,
        h2oAmountPerM2: 12.5,
        pricePerM2: 451
    },
    {
        clientID: 2,
        surfaceID: 1,
        co2AmountPerM2: 3.8,
        h2oAmountPerM2: 16.9,
        pricePerM2: 4840
    },
    {
        clientID: 2,
        surfaceID: 2,
        co2AmountPerM2: 5.6,
        h2oAmountPerM2: 12.3,
        pricePerM2: 429
    }
];
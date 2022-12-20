/* Utils */
import { MaterialModel } from 'setupDatabase/models/Material';
import { SurfaceTreatmentModel } from 'setupDatabase/models/SurfaceTreatment';
import { ClientMaterialCostModel } from 'setupDatabase/models/ClientMaterialCost';
import { ClientSurfaceTreatmentCostModel } from 'setupDatabase/models/ClientSurfaceTreatmentCost';
import { ClientModel } from 'setupDatabase/models/Client';
import { ModelModel } from 'setupDatabase/models/Model';
import { PartModel } from 'setupDatabase/models/Part';
import { DatabaseQueryError } from 'server/errors';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, ModelDatabaseEntry, ModelPartDatabaseEntry, SurfaceTreatment, Client } from '@shared/interfaces';



// Fetch all clients from database
export async function fetchClients(): Promise<Client[]> {
    const docs = await ClientModel.find({})
        .catch(() => { throw new DatabaseQueryError(); });
    const clients: Client[] = docs.map(doc => ({ id: doc.id, name: doc.name }));
    return Promise.resolve(clients); 
} 

// Fetch all materials from database
export async function fetchMaterials(): Promise<Material[]> {
    const docs = await MaterialModel.find({})
        .catch(() => { throw new DatabaseQueryError(); });
    // Base URL for the texture maps
    const baseURL = "http://localhost:" + process.env.PORT + "/";
    
    // Create the response
    const materials: Material[] = docs.map(doc => (
        { 
            id: doc.id, 
            name: doc.name, 
            color: doc.color, 
            isMetallic: doc.isMetallic, 
            textureMap: {
                normalMapURL: baseURL + doc.normalMapURL, 
                roughnessMapURL: baseURL + doc.roughnessMapURL, 
                occlusionMapURL: baseURL + doc.occlusionMapURL
            } 
        }
    ));
    return Promise.resolve(materials);
} 

// Fetch all surface treatments from the database
export async function fetchSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const docs = await SurfaceTreatmentModel.find({})
        .catch(() => { throw new DatabaseQueryError(); });
    const surfaceTreatments: SurfaceTreatment[] = docs.map(doc => ({ id: doc.id, name: doc.name }));
    return Promise.resolve(surfaceTreatments); 
} 

// Fetch material cost for the specified client and specified material
export async function fetchMaterialCostForClient(clientID: number, materialID: number): Promise<MaterialEmission | null> {
    const doc = await ClientMaterialCostModel.findOne({clientID: clientID, materialID: materialID})
        .catch(() => { throw new DatabaseQueryError(); });
    
    if(doc === null) 
        return Promise.resolve(null);
    
    // Create the response
    const clientMaterialEmission: MaterialEmission = { 
        co2AmountPerM3: doc.co2AmountPerM3, 
        h2oAmountPerM3: doc.h2oAmountPerM3, 
        pricePerM3: doc.pricePerM3 
    };
    return Promise.resolve(clientMaterialEmission);
} 

// Fetch minimal material cost for the specified client
export async function fetchMinimalMaterialCostForClient(clientID: number): Promise<MaterialEmission> {
    const docs = await ClientMaterialCostModel.find({clientID: clientID})
        .catch(() => { throw new DatabaseQueryError(); });
    
    // Initialise the minimum values with infinity to guarantee that the first found value will be smaller
    let minCo2AmountPerM3: number = Infinity;
    let minH2oAmountPerM3: number = Infinity;
    let minPricePerM3: number = Infinity;
    
    // Find the best material for each parameter. Note: the minimum values can come from different materials
    docs.forEach(doc => {
        if(doc.co2AmountPerM3 < minCo2AmountPerM3) minCo2AmountPerM3 = doc.co2AmountPerM3;
        if(doc.h2oAmountPerM3 < minH2oAmountPerM3) minH2oAmountPerM3 = doc.h2oAmountPerM3;
        if(doc.pricePerM3 < minPricePerM3) minPricePerM3 = doc.pricePerM3;
    });
    
    // Create the response
    const minClientMaterialEmission: MaterialEmission = { 
        co2AmountPerM3: minCo2AmountPerM3, 
        h2oAmountPerM3: minH2oAmountPerM3, 
        pricePerM3: minPricePerM3
    };
    return Promise.resolve(minClientMaterialEmission);
}

// Fetch maximal material cost for the specified client
export async function fetchMaximalMaterialCostForClient(clientID: number): Promise<MaterialEmission> {
    const docs = await ClientMaterialCostModel.find({clientID: clientID})
        .catch(() => { throw new DatabaseQueryError(); });
    
    // Initialise the maximum values with 0 to guarantee that the first found value will be equal or larger
    let maxCo2AmountPerM3: number = 0;
    let maxH2oAmountPerM3: number = 0;
    let maxPricePerM3: number = 0;
    
    // Find the worst material for each parameter. Note: the maximum values can come from different materials
    docs.forEach(doc => {
        if(doc.co2AmountPerM3 > maxCo2AmountPerM3) maxCo2AmountPerM3 = doc.co2AmountPerM3;
        if(doc.h2oAmountPerM3 > maxH2oAmountPerM3) maxH2oAmountPerM3 = doc.h2oAmountPerM3;
        if(doc.pricePerM3 > maxPricePerM3) maxPricePerM3 = doc.pricePerM3;
    });
    
    // Create the response
    const maxClientMaterialEmission: MaterialEmission = { 
        co2AmountPerM3: maxCo2AmountPerM3, 
        h2oAmountPerM3: maxH2oAmountPerM3, 
        pricePerM3: maxPricePerM3
    };
    return Promise.resolve(maxClientMaterialEmission);
}

// Fetch surface treatment costs for the specified client and specified surface treatment
export async function fetchSurfaceTreatmentCostForClient(clientID: number, surfaceID: number): Promise<SurfaceTreatmentEmission | null> {
    const doc = await ClientSurfaceTreatmentCostModel.findOne({clientID: clientID, surfaceID: surfaceID})
        .catch(() => { throw new DatabaseQueryError(); });

    if(doc === null)
        return Promise.resolve(null);

    const clientSurfaceEmission: SurfaceTreatmentEmission = { co2AmountPerM2: doc.co2AmountPerM2, h2oAmountPerM2: doc.h2oAmountPerM2, pricePerM2: doc.pricePerM2 };
    return Promise.resolve(clientSurfaceEmission); 
}

// Fetch minimal surface treatment cost for the specified client
export async function fetchMinimalSurfaceTreatmentCost(): Promise<SurfaceTreatmentEmission> {
    // The lowest cost is when no surface treatment is applied
    const minClientSurfaceTreatmentEmission: SurfaceTreatmentEmission = { 
        co2AmountPerM2: 0, 
        h2oAmountPerM2: 0, 
        pricePerM2: 0
    };
    return Promise.resolve(minClientSurfaceTreatmentEmission);
}

// Fetch maximal surface treatment cost for the specified client
export async function fetchMaximalSurfaceTreatmentCostForClient(clientID: number): Promise<SurfaceTreatmentEmission> {
    const docs = await ClientSurfaceTreatmentCostModel.find({clientID: clientID})
        .catch(() => { throw new DatabaseQueryError(); });
    
    // Initialise the maximum values with 0 to guarantee that the first found value will be equal or larger
    let totalCo2AmountPerM2: number = 0;
    let totalH2oAmountPerM2: number = 0;
    let totalPricePerM2: number = 0;
    
    // The maximal cost is when all surface treatments are applied
    docs.forEach(doc => {
        totalCo2AmountPerM2 += doc.co2AmountPerM2;
        totalH2oAmountPerM2 += doc.h2oAmountPerM2;
        totalPricePerM2 += doc.pricePerM2;
    });
    
    // Create the response
    const maxClientSurfaceTreatmentEmission: SurfaceTreatmentEmission = { 
        co2AmountPerM2: totalCo2AmountPerM2, 
        h2oAmountPerM2: totalH2oAmountPerM2, 
        pricePerM2: totalPricePerM2
    };
    return Promise.resolve(maxClientSurfaceTreatmentEmission);
}

// Fetch all models from the database
export async function fetchModels(): Promise<ModelDatabaseEntry[]> {
    const docs = await ModelModel.find({})
        .catch(() => { throw new DatabaseQueryError(); });
    const models: ModelDatabaseEntry[] = docs.map(doc => ({ id: doc.id, name: doc.name, partIDs: doc.partIDs }));
    return Promise.resolve(models); 
} 

// Fetch a specific part from the database
export async function fetchPart(partID: number): Promise<ModelPartDatabaseEntry | null> {
    const doc = await PartModel.findOne({id: partID})
        .catch(() => { throw new DatabaseQueryError(); });
    
    if(doc === null) 
        return Promise.resolve(null);
    
    // Create the response
    const modelPart: ModelPartDatabaseEntry = { 
        id: doc.id, 
        name: doc.name, 
        area: doc.area, 
        volume: doc.volume, 
        materialID: doc.materialID, 
        surfaceTreatmentIDs: doc.surfaceTreatmentIDs 
    };
    return Promise.resolve(modelPart); 
}

// Fetch a specific material from the database
export async function fetchMaterial(materialID: number): Promise<Material | null> {
    const doc = await MaterialModel.findOne({ id: materialID })
        .catch(() => { throw new DatabaseQueryError(); });

    if(doc === null) 
        return Promise.resolve(null);

    // Base URL for the texture maps
    const baseURL = "http://localhost:" + process.env.PORT + "/";
    
    // Create the response
    const material: Material = { 
        id: doc.id, 
        name: doc.name, 
        color: doc.color, 
        isMetallic: doc.isMetallic, 
        textureMap: {
            normalMapURL: baseURL + doc.normalMapURL, 
            roughnessMapURL: baseURL + doc.roughnessMapURL, 
            occlusionMapURL: baseURL + doc.occlusionMapURL
        } 
    };
    return Promise.resolve(material);
}
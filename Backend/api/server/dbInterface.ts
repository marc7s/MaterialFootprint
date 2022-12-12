/* Utils */
import { MaterialModel } from 'setupDatabase/models/Material';
import { SurfaceTreatmentModel } from 'setupDatabase/models/SurfaceTreatment';
import { ClientMaterialCostModel } from 'setupDatabase/models/ClientMaterialCost';
import { ClientSurfaceTreatmentCostModel } from 'setupDatabase/models/ClientSurfaceTreatmentCost';
import { ClientModel } from 'setupDatabase/models/Client';
import { ModelModel } from 'setupDatabase/models/Model';
import { PartModel } from 'setupDatabase/models/Part';
import { DatabaseConnectionError } from 'server/errors';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, ModelDatabaseEntry, ModelPartDatabaseEntry, SurfaceTreatment, Client } from '@shared/interfaces';



// Fetch all clients, return array of Clients
export async function fetchClients(): Promise<Client[]> {
    const docs = await ClientModel.find({})
        .catch(() => { throw new DatabaseConnectionError(); });
    const clients: Client[] = docs.map(doc => ({ id: doc.id, name: doc.name }));
    return Promise.resolve(clients); 
} 

// Fetch all materials, return array of Materials
export async function fetchMaterials(): Promise<Material[]> {
        const docs = await MaterialModel.find({})
            .catch(() => { throw new DatabaseConnectionError(); });
        const materials: Material[] = docs.map(doc => ({ id: doc.id, name: doc.name, color: doc.color }));
        return Promise.resolve(materials); 
} 

// Fetch all surface treatments, return array of Materials
export async function fetchSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const docs = await SurfaceTreatmentModel.find({})
        .catch(() => { throw new DatabaseConnectionError(); });
    const surfaceTreatments: SurfaceTreatment[] = docs.map(doc => ({ id: doc.id, name: doc.name }));
    return Promise.resolve(surfaceTreatments); 
} 

// Fetch material cost for the specified client and specified material, 
export async function fetchMaterialCostForClient(clientID: number, materialID: number): Promise<MaterialEmission | null> {
    const doc = await ClientMaterialCostModel.findOne({clientID: clientID, materialID: materialID})
        .catch(() => { throw new DatabaseConnectionError(); });
    
    if(doc === null) 
        return Promise.resolve(null);
    
    const clientMaterialEmission: MaterialEmission = { 
        co2AmountPerM3: doc.co2AmountPerM3, 
        h2oAmountPerM3: doc.h2oAmountPerM3, 
        pricePerM3: doc.pricePerM3 
    };
    return Promise.resolve(clientMaterialEmission);
} 

// Fetch maximal material cost for the specified client
export async function fetchMaximalMaterialCostForClient(clientID: number): Promise<MaterialEmission> {
    const docs = await ClientMaterialCostModel.find({clientID: clientID})
        .catch(() => { throw new DatabaseConnectionError(); });
    
    let maxCo2AmountPerM3: number = 0;
    let maxH2oAmountPerM3: number = 0;
    let maxPricePerM3: number = 0;
    
    // Find the worst material for each parameter
    docs.forEach(doc => {
        if(doc.co2AmountPerM3 > maxCo2AmountPerM3) maxCo2AmountPerM3 = doc.co2AmountPerM3;
        if(doc.h2oAmountPerM3 > maxH2oAmountPerM3) maxH2oAmountPerM3 = doc.h2oAmountPerM3;
        if(doc.pricePerM3 > maxPricePerM3) maxPricePerM3 = doc.pricePerM3;
    });
    
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
        .catch(() => { throw new DatabaseConnectionError(); });

    if(doc === null)
        return Promise.resolve(null);

    const clientSurfaceEmission: SurfaceTreatmentEmission = { co2AmountPerM2: doc.co2AmountPerM2, h2oAmountPerM2: doc.h2oAmountPerM2, pricePerM2: doc.pricePerM2 };
    return Promise.resolve(clientSurfaceEmission); 
}

// Fetch maximal surface treatment cost for the specified client
export async function fetchMaximalSurfaceTreatmentCostForClient(clientID: number): Promise<SurfaceTreatmentEmission> {
    const docs = await ClientSurfaceTreatmentCostModel.find({clientID: clientID})
        .catch(() => { throw new DatabaseConnectionError(); });
    
    let totalCo2AmountPerM2: number = 0;
    let totalH2oAmountPerM2: number = 0;
    let totalPricePerM2: number = 0;
    
    // The maximal cost is when all surface treatments are applied
    docs.forEach(doc => {
        totalCo2AmountPerM2 += doc.co2AmountPerM2;
        totalH2oAmountPerM2 += doc.h2oAmountPerM2;
        totalPricePerM2 += doc.pricePerM2;
    });
    
    const maxClientSurfaceTreatmentEmission: SurfaceTreatmentEmission = { 
        co2AmountPerM2: totalCo2AmountPerM2, 
        h2oAmountPerM2: totalH2oAmountPerM2, 
        pricePerM2: totalPricePerM2
    };
    return Promise.resolve(maxClientSurfaceTreatmentEmission);
}

// fetch all models
export async function fetchModels(): Promise<ModelDatabaseEntry[]> {
    const docs = await ModelModel.find({})
        .catch(() => { throw new DatabaseConnectionError(); });
    const models: ModelDatabaseEntry[] = docs.map(doc => ({ id: doc.id, name: doc.name, partIDs: doc.partIDs }));
    return Promise.resolve(models); 
} 

// fetch part for the specified partId
export async function fetchPart(partID: number): Promise<ModelPartDatabaseEntry> {
    const docs = await PartModel.find({id: partID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const modelPart: ModelPartDatabaseEntry[] = docs.map(doc => ({ id: doc.id, name: doc.name, area: doc.area, volume: doc.volume, materialID: doc.materialID, surfaceTreatmentIDs: doc.surfaceTreatmentIDs }));
    return Promise.resolve(modelPart[0]); 
} 

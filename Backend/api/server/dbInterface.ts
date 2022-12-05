/* Utils */
import { MaterialModel } from 'setupDatabase/models/Material';
import { SurfaceTreatmentModel } from 'setupDatabase/models/SurfaceTreatment';
import { ClientMaterialCostModel } from 'setupDatabase/models/ClientMaterialCost';
import { ClientSurfaceTreatmentCostModel } from 'setupDatabase/models/ClientSurfaceTreatmentCost';
import { DatabaseConnectionError } from 'server/errors';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, SurfaceTreatment } from '@shared/interfaces';


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
export async function fetchMaterialCostForClient(clientID: number, materialID: number): Promise<MaterialEmission> {
    const docs = await ClientMaterialCostModel.find({clientID: clientID, materialID: materialID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const clientMaterialEmission: MaterialEmission[] = docs.map(doc => ({ co2AmountPerM3: doc.co2AmountPerM3, h2oAmountPerM3: doc.h2oAmountPerM3, pricePerM3: doc.pricePerM3 }));
    return Promise.resolve(clientMaterialEmission[0]);
} 

// Fetch surface treatment costs for the specified client and specified surface treatment
export async function fetchSurfaceTreatmentCostForClient(clientID: number, surfaceID: number): Promise<SurfaceTreatmentEmission> {
    const docs = await ClientSurfaceTreatmentCostModel.find({clientID: clientID, surfaceID: surfaceID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const clientSurfaceEmission: SurfaceTreatmentEmission[] = docs.map(doc => ({ co2AmountPerM2: doc.co2AmountPerM2, h2oAmountPerM2: doc.h2oAmountPerM2, pricePerM2: doc.pricePerM2 }));
    return Promise.resolve(clientSurfaceEmission[0]); 
} 
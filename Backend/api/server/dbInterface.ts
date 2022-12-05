/* Utils */
import { MaterialModel } from 'setupDatabase/models/Material';
import { CompanyMaterialCostModel } from 'setupDatabase/models/CompanyMaterialCost';
import { CompanySurfaceCostModel } from 'setupDatabase/models/CompanySurfaceCost';
import { DatabaseConnectionError } from 'server/errors';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, Model, ModelPart, ModelDatabaseEntry, ModelPartDatabaseEntry, SurfaceTreatment } from '@shared/interfaces';
import { ModelModel } from 'setupDatabase/models/Model';
import { PartModel } from 'setupDatabase/models/Part';
import { SurfaceModel } from 'setupDatabase/models/Surface';


// fetch all materials, return array of Materials
export async function fetchMaterials(): Promise<Material[]> {
        const docs = await MaterialModel.find({})
            .catch(() => { throw new DatabaseConnectionError(); });
        const materials: Material[] = docs.map(doc => ({ id: doc.id, name: doc.name, color: doc.color }));
        return Promise.resolve(materials); 
} 

// fetch material cost for the specified company and specified material, 
export async function fetchMaterialCostForCompany(companyID: number, materialID: number): Promise<MaterialEmission> {
    const docs = await CompanyMaterialCostModel.find({companyID: companyID, materialID: materialID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const companyMaterialEmission: MaterialEmission[] = docs.map(doc => ({ co2AmountPerM3: doc.co2AmountPerM3, h2oAmountPerM3: doc.h2oAmountPerM3, pricePerM3: doc.pricePerM3 }));
    return Promise.resolve(companyMaterialEmission[0]);
} 

// fetch surface treatment costs for the specified client and specified surface treatment
export async function fetchSurfaceTreatmentCostForCompany(companyID: number, surfaceID: number): Promise<SurfaceTreatmentEmission> {
    const docs = await CompanySurfaceCostModel.find({companyID: companyID, surfaceID: surfaceID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const companySurfaceEmission: SurfaceTreatmentEmission[] = docs.map(doc => ({ co2AmountPerM2: doc.co2AmountPerM2, h2oAmountPerM2: doc.h2oAmountPerM2, pricePerM2: doc.pricePerM2 }));
    return Promise.resolve(companySurfaceEmission[0]); 
} 
// fetch all surfaceTreatments
export async function fetchSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const docs = await SurfaceModel.find({})
        .catch(() => { throw new DatabaseConnectionError(); });
    const surfaceTreatments: SurfaceTreatment[] = docs.map(doc => ({ id: doc.id, name: doc.name }));
    return Promise.resolve(surfaceTreatments); 
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
    const modelPart: ModelPartDatabaseEntry[] = docs.map(doc => ({ id: doc.id, name: doc.name, imageURL: doc.imageURL, materialID: doc.materialID, surfaceTreatmentIDs: doc.surfaceTreatmentIDs }));
    return Promise.resolve(modelPart[0]); 
} 

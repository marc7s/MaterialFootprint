/* Utils */
import { MaterialModel } from 'setupDatabase/models/Material';
import { SurfaceTreatmentModel } from 'setupDatabase/models/SurfaceTreatment';
import { CompanyMaterialCostModel } from 'setupDatabase/models/CompanyMaterialCost';
import { CompanySurfaceCostModel } from 'setupDatabase/models/CompanySurfaceCost';
import { DatabaseConnectionError } from 'server/errors';

/* Shared */
import { MaterialEmission, SurfaceTreatmentEmission, Material, SurfaceTreatment } from '@shared/interfaces';


// fetch all materials, return array of Materials
export async function fetchMaterials(): Promise<Material[]> {
        const docs = await MaterialModel.find({})
            .catch(() => { throw new DatabaseConnectionError(); });
        const materials: Material[] = docs.map(doc => ({ id: doc.id, name: doc.name, color: doc.color }));
        return Promise.resolve(materials); 
} 

// fetch all surface treatments, return array of Materials
export async function fetchSurfaceTreatments(): Promise<SurfaceTreatment[]> {
    const docs = await SurfaceTreatmentModel.find({})
        .catch(() => { throw new DatabaseConnectionError(); });
    const surfaceTreatments: SurfaceTreatment[] = docs.map(doc => ({ id: doc.id, name: doc.name }));
    return Promise.resolve(surfaceTreatments); 
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
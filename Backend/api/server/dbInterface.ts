/* Utils */
import { MaterialModel } from 'setupDatabase/models/Material';
import { CompanyMaterialCostModel } from 'setupDatabase/models/CompanyMaterialCost';
import { CompanySurfaceCostModel } from 'setupDatabase/models/CompanySurfaceCost';
import { DatabaseConnectionError } from 'server/errors';

/* Shared */
import { EmissionCost, EmissionCostSurfaceTreatment, Material } from '@shared/interfaces';


// fetch all materials, return array of Materials
export async function fetchMaterials(): Promise<Material[]> {
        const docs = await MaterialModel.find({})
            .catch(() => { throw new DatabaseConnectionError(); });
        const materials: Material[] = docs.map(doc => ({ id: doc.id, name: doc.name, color: doc.color }));
        return Promise.resolve(materials); 
} 

// fetch material cost for the specified company and specified material, 
export async function fetchMaterialCostForCompany(companyID: number, materialID: number): Promise<EmissionCost[]> {
    const docs = await CompanyMaterialCostModel.find({companyID: companyID, materialID: materialID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const companyMaterialCost: EmissionCost[] = docs.map(doc => ({ priceInDollar: doc.costPerKg, co2AmountPerKg: doc.co2AmountPerKg, h2oAmountPerKg: doc.h2oAmountPerKg }));
    return Promise.resolve(companyMaterialCost);
} 

// fetch surface treatment costs for the specified client and specified surface treatment
export async function fetchSurfaceTreatmentCostForCompany(companyID: number, surfaceID: number): Promise<EmissionCostSurfaceTreatment[]> {
    const docs = await CompanySurfaceCostModel.find({companyID: companyID, surfaceID: surfaceID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const companySurfaceCost: EmissionCostSurfaceTreatment[] = docs.map(doc => ({ priceInDollar: doc.costPerM2, co2AmountPerM2: doc.co2AmountPerM2, h2oAmountPerM2: doc.h2oAmountPerM2 }));
    return Promise.resolve(companySurfaceCost); 
} 
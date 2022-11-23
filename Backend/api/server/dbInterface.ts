import { EmissionCost, EmissionCostSurfaceTreatment, Material } from '@shared/interfaces';

import { MaterialModel } from 'setupDatabase/models/Material';
import { CompanyMaterialCostModel } from 'setupDatabase/models/CompanyMaterialCost';
import { CompanySurfaceCostModel } from 'setupDatabase/models/CompanySurfaceCost';
import { DatabaseConnectionError } from 'server/errors';


// fetch all materials, return array of Materials
export async function fetchMaterials(): Promise<Material[]> {
        const docs = await MaterialModel.find({})
            .catch(() => { throw new DatabaseConnectionError(); });
        const materials: Material[] = docs.map((docs) => { return { id: docs.id, name: docs.name, color: docs.color } });
        return Promise.resolve(materials); 
} 

// fetch material cost for the specified company and specified material, 
export async function fetchMaterialCostForCompany(companyID: number, materialID: number): Promise<EmissionCost[]> {
    const docs = await CompanyMaterialCostModel.find({companyID: companyID, materialID: materialID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const companyMaterialCost: EmissionCost[] = docs.map((docs) => {
         return { priceInDollar: docs.CostPerKg, co2AmountPerKg: docs.co2AmountPerKg, h2oAmountPerKg: docs.h2oAmountPerKg } 
        });
    return Promise.resolve(companyMaterialCost);
} 

// fetch surface treatment costs for the specified client and specified surface treatment
export async function fetchSurfaceTreatmentCostForCompany(companyID: number, surfaceID: number): Promise<EmissionCostSurfaceTreatment[]> {
    const docs = await CompanySurfaceCostModel.find({companyID: companyID, surfaceID: surfaceID})
        .catch(() => { throw new DatabaseConnectionError(); });
    const companySurfaceCost: EmissionCostSurfaceTreatment[] = docs.map((docs) => { 
        return { priceInDollar: docs.CostPerM2, co2AmountPerM2: docs.co2AmountPerM2, h2oAmountPerM2: docs.h2oAmountPerM2 }
    });
    return Promise.resolve(companySurfaceCost); 
} 
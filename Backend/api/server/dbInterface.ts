import { log } from '@shared/utils';
import { EmissionCost, Material } from '@shared/interfaces';

import { MaterialModel } from '../setupDatabase/models/Material';
import { CompanyMaterialCostModel } from '../setupDatabase/models/CompanyMaterialCost';
import { CompanySurfaceCostModel } from '../setupDatabase/models/CompanySurfaceCost';


// fetch all materials, return array of Materials
export async function fetchMaterials(): Promise<Material[]> {
    var material: Material[] = [];
    const query = MaterialModel.find({});
    query.getFilter();
    const documents = await query.exec();
    documents.forEach((doc) => {
        var id: number = doc.id;
        var name: string = doc.name;
        var color: string = doc.color;
        var materialx: Material = {id: id, name: name, color: color};
        material.push(materialx);
    });
    console.log(material);
    return Promise.resolve(material); 
} 

// should return the cost of the material for the specified client (price, co2, h2o)
export async function fetchMaterialCostForCompany(companyID: number, materialID: number): Promise<EmissionCost[]> {
    var emissionCost: EmissionCost[] = [];
    const query = CompanyMaterialCostModel.find({companyID: companyID, materialID: materialID});
    query.getFilter();
    const documents = await query.exec();
    documents.forEach((doc) => {
        var price: number = doc.CostPerKg;
        var co2: number = doc.CO2AmountPerKg;
        var h20: number = doc.H2OAmountPerKg;
        var emissionCostx: EmissionCost = {co2AmountPerKg: co2, h2oAmountPerKg: h20, priceInDollar: price};
        emissionCost.push(emissionCostx);
    });
    console.log(emissionCost);
    return Promise.resolve(emissionCost);
} 

// should return the cost of the surfaceTreatment for the specified client (price, co2, h2o)
export async function fetchSurfaceTreatmentCostForCompany(companyID: number, surfaceID: number): Promise<EmissionCost[]> {
    var emissionCost: EmissionCost[] = [];
    const query = CompanySurfaceCostModel.find({companyID: companyID, surfaceID: surfaceID});
    query.getFilter();
    const documents = await query.exec();
    documents.forEach((doc) => {
        var price: number = doc.CostPerM2;
        var co2: number = doc.CO2AmountPerM2;
        var h20: number = doc.H2OAmountPerM2;
        var emissionCostx: EmissionCost = {co2AmountPerKg: co2, h2oAmountPerKg: h20, priceInDollar: price};
        emissionCost.push(emissionCostx);
    });
    console.log(emissionCost);
    return Promise.resolve(emissionCost); 
} 
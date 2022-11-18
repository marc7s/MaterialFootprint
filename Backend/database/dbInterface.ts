import { EmissionCost, Material } from '@shared/interfaces';
// fetch all materials, return array of Materials
async function fetchMaterials(): Promise<Material[]> {
    // temporary mock data
    const material: Material = {id: 1, name: 'wood', color: 'brown'};
    return Promise.resolve(material); 
} 

// should return the cost of the material for the specified client (price, co2, h2o)
async function fetchMaterialCostForCompany(ClientID: number, materialID: number): Promise<EmissionCost> {
    // temporary mock data
    const emissionCost: EmissionCost = {priceInDollar: 10, co2CostInDollar: 2, h2oCostInDollar: 5};
    return Promise.resolve(emissionCost);
} 

// should return the cost of the surfaceTreatment for the specified client (price, co2, h2o)
async function fetchSurfaceTreatmentCostForCompany(ClientID: number, surfaceTreatmentID: number): Promise<EmissionCost> {
    // temporary mock data
    const emissionCost: EmissionCost = {priceInDollar: 10, co2CostInDollar: 2, h2oCostInDollar: 5};
    return Promise.resolve(emissionCost); 
} 
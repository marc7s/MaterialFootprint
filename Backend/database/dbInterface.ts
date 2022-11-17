import { log } from '@shared/utils';
const Material = require('../api/setupDatabase/models/Material');
const Surface = require('../api/setupDatabase/models/Surface');

export async function fetchMaterial(material: String) {
    const response = await Material.find({name: material});
    return response;
}

// should return the cost of the surfaceTreatment for the specified client (price, co2, h2o)
export async function fetchSurfaceTreatmentCostForCompany(ClientID: number, surfaceTreatmentID: number): Promise<EmissionCost> {
    // temporary mock data
    const emissionCost: EmissionCost = {priceInDollar: 10, co2CostInDollar: 2, h2oCostInDollar: 5};
    return Promise.resolve(emissionCost); 
} 
export type Material = {
    id: number;
    name: string;
    color: string;
}

export type Emission = {
    material: Material;
    emissionCost: EmissionCost;
}

export type surfaceTreatment = {
    id: number;
    name: string;
}

export type EmissionCost = {
    co2CostInDollar: number;
    h2oCostInDollar: number;
    priceInDollar: number;
}
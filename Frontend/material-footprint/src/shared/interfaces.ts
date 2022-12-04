export type Material = {
    id: number;
    name: string;
    color: string;
}

export type Emission = {
    partName: string;
    material: Material;
    emissionCost: EmissionCost;
}

export type SurfaceTreatment = {
    id: number;
    name: string;
}

export type EmissionCost = {
    co2AmountPerKg: number;
    h2oAmountPerKg: number;
    priceInDollar: number;
}

export type EmissionCostSurfaceTreatment = {
    co2AmountPerM2: number;
    h2oAmountPerM2: number;
    priceInDollar: number;
}

export type EmissionRequest = {
    partID: number,
    clientID: number,
    materialID: number,
    surfaceTreatmentIDs: number[],
    volume: number,
    area: number;
  }

export type EmissionResponse = {
    partID: number,
    //Emission or is emissionCost enough?
    emissionCost: EmissionCost
  }

export enum Size {
    SMALL = "small",
    LARGE = "large"
}
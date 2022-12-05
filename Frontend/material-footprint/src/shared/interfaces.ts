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
    co2Amount: number;
    h2oAmount: number;
    priceInDollar: number;
}

export type MaterialEmission = {
    co2AmountPerM3: number;
    h2oAmountPerM3: number;
    pricePerM3: number;
}

export type SurfaceTreatmentEmission = {
    co2AmountPerM2: number;
    h2oAmountPerM2: number;
    pricePerM2: number;
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
    emissionCost: EmissionCost
}

export interface ModelPart {
    id: string;
    name: string;
    image: string;
    material: Material;
    surfaceTreatments: SurfaceTreatment[];
}

export interface Model {
    id: number;
    name: string;
    parts: ModelPart[];
}

export enum Size {
    SMALL = "small",
    LARGE = "large"
}
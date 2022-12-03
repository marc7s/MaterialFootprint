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
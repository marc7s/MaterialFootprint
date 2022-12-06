export type Material = {
    id: number;
    name: string;
    color: string;
}

export type Emission = {
    partName: string;
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

export interface ModelPart {
    id: number;
    name: string;
    area: number;
    volume: number;
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

export interface ModelDatabaseEntry {
    id: number;
    name: string;
    partIDs: number[];
}

export interface ModelPartDatabaseEntry {
    id: number;
    name: string;
    area: number;
    volume: number;
    imageID: number;
    materialID: number;
    surfaceTreatmentIDs: number[];
}
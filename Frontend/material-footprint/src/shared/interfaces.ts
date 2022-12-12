import * as THREE from "three";
export type Material = {
    id: number;
    name: string;
    color: string;
    isMetallic: boolean;
    textureMap: TextureMap;
}

export type MaterialDatabaseEntry = {
    id: number;
    name: string;
    color: string;
    isMetallic: boolean;
    normalMapURL: string;
    roughnessMapURL: string;
    occlusionMapURL: string;
}

export type Emission = {
    partName: string;
    emissionCost: EmissionCost;
    maxEmissionCost: EmissionCost;
}

export type SurfaceTreatment = {
    id: number;
    name: string;
}

export type EmissionCost = {
    co2Amount: number;
    h2oAmount: number;
    priceInSEK: number;
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
    material: Material;
    surfaceTreatments: SurfaceTreatment[];
}

export interface Model {
    id: number;
    name: string;
    url: string;
    parts: ModelPart[];
}

export enum Size {
    SMALL = "small",
    LARGE = "large"
}

export enum EmissionIcon {
    CO2,
    WATER,
    MONEY
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
    materialID: number;
    surfaceTreatmentIDs: number[];
}

export interface Client {
    id: number;
    name: string;
}

export interface TextureMap {
    normalMapURL: string;
    roughnessMapURL: string;
    occlusionMapURL: string;
}

export interface MaterialTexture {
    material: Material;
    normalMap: THREE.Texture
    roughnessMap: THREE.Texture
    occlusionMap: THREE.Texture
}

export interface ClientMaterialCostDatabaseEntry {
    clientID: number;
    materialID: number;
    co2AmountPerM3: number;
    h2oAmountPerM3: number;
    pricePerM3: number;
}

export interface ClientSurfaceTreatmentCostDatabaseEntry {
    clientID: number;
    surfaceID: number;
    co2AmountPerM2: number;
    h2oAmountPerM2: number;
    pricePerM2: number;
}

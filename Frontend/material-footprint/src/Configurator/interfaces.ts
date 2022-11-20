import { Material, SurfaceTreatment } from "shared/interfaces";

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
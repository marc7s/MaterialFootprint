import { Material } from "../shared/interfaces";

export interface ModelPart {
    id: string;
    name: string;
    image: string;
    material: Material;
}

export interface Model {
    id: number;
    name: string;
    parts: ModelPart[];
}
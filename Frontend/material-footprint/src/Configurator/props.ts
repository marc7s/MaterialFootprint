import { Model, ModelPart } from "./interfaces";

export interface ModelPartProp {
    part: ModelPart;
}

export interface ConfiguratorPartProp {
    part: ModelPart;
    onMaterialChange: (materialID: number) => void;
}

export interface ModelProp {
    model: Model;
    active: boolean;
    onModelChange: (modelID: number) => void;
}

export interface ModelConfiguratorProp {
    model: Model;
    onPartMaterialChange: (partID: string, materialID: number) => void;
}
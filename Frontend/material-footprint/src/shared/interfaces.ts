export type Material = {
    id: number;
    name: string;
    color: string;
}

export type Emission = {
    material: Material;
    co2CountInKg: number;
    h2oCountInL: number;
}
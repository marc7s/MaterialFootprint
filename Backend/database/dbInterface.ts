import { log } from '@shared/utils';
const Material = require('../api/setupDatabase/models/Material');
const Surface = require('../api/setupDatabase/models/Surface');

export async function fetchMaterial(material: String) {
    const response = await Material.find({name: material});
    return response;
} 

async function fetchMaterialCostForCompany() {
    
} 
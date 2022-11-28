/* Utils */
import mongoose from 'mongoose';

const companyMaterialCostSchema = new mongoose.Schema({
    companyID: {
        type: Number,
        required: true,
    },
    materialID: {
        type: Number,
        required: true,
    },
    co2AmountPerKg: {
        type: Number,
        required: true,
    },
    h2oAmountPerKg: {
        type: Number,
        required: true,
    },
    costPerKg: {
        type: Number,
        required: true,
    },
});

export const CompanyMaterialCostModel = mongoose.model('CompanyMaterialCost', companyMaterialCostSchema);
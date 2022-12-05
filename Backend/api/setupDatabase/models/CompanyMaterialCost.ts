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
    co2AmountPerM3: {
        type: Number,
        required: true,
    },
    h2oAmountPerM3: {
        type: Number,
        required: true,
    },
    pricePerM3: {
        type: Number,
        required: true,
    },
});

export const CompanyMaterialCostModel = mongoose.model('CompanyMaterialCost', companyMaterialCostSchema);
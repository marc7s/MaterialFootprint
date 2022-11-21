import mongoose from 'mongoose';

export const companymaterialcostSchema = new mongoose.Schema({
    companyID: {
        type: Number,
        required: true,
    },
    materialID: {
        type: Number,
        required: true,
    },
    CO2AmountPerKg: {
        type: Number,
        required: true,
    },
    H2OAmountPerKg: {
        type: Number,
        required: true,
    },
    CostPerKg: {
        type: Number,
        required: true,
    },
});

export const CompanyMaterialCostModel = mongoose.model('CompanyMaterialCost', companymaterialcostSchema);
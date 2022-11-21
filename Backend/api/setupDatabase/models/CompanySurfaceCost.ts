import mongoose from 'mongoose';

export const companysurfacecostSchema = new mongoose.Schema({
    companyID: {
        type: Number,
        required: true,
    },
    materialID: {
        type: Number,
        required: true,
    },
    CO2AmountPerM2: {
        type: Number,
        required: true,
    },
    H2OAmountPerM2: {
        type: Number,
        required: true,
    },
    CostPerM2: {
        type: Number,
        required: true,
    },
});

export const CompanySurfaceCostModel = mongoose.model('CompanySurfaceCost', companysurfacecostSchema);
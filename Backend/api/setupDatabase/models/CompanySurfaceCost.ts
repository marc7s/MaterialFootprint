/* Utils */
import mongoose from 'mongoose';

const companySurfaceCostSchema = new mongoose.Schema({
    companyID: {
        type: Number,
        required: true,
    },
    surfaceID: {
        type: Number,
        required: true,
    },
    co2AmountPerM2: {
        type: Number,
        required: true,
    },
    h2oAmountPerM2: {
        type: Number,
        required: true,
    },
    costPerM2: {
        type: Number,
        required: true,
    },
});

export const CompanySurfaceCostModel = mongoose.model('CompanySurfaceCost', companySurfaceCostSchema);
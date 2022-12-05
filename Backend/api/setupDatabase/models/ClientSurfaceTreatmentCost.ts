/* Utils */
import mongoose from 'mongoose';

const clientSurfaceTreatmentCostSchema = new mongoose.Schema({
    clientID: {
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
    pricePerM2: {
        type: Number,
        required: true,
    },
});

export const ClientSurfaceTreatmentCostModel = mongoose.model('ClientSurfaceTreatmentCost', clientSurfaceTreatmentCostSchema);
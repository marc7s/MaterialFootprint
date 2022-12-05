/* Utils */
import mongoose from 'mongoose';

const clientMaterialCostSchema = new mongoose.Schema({
    clientID: {
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

export const ClientMaterialCostModel = mongoose.model('ClientMaterialCost', clientMaterialCostSchema);
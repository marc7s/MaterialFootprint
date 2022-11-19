import mongoose from 'mongoose';


export const surfaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
    co2CountInKg: {
        type: Number,
        required: true,
    },
    h2oCountInL: {
        type: Number,
        required: true,
    },
    priceInDollar: {
        type: Number,
        required: true,
    },
});

export const SurfaceModel = mongoose.model('Surface', surfaceSchema);
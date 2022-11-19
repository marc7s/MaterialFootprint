import mongoose from 'mongoose';
import { surfaceSchema } from './Surface';

export const materialSchema = new mongoose.Schema({
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

export const MaterialModel = mongoose.model('Material', materialSchema);
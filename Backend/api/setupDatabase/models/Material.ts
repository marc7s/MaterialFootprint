import mongoose from 'mongoose';

export const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
});

export const MaterialModel = mongoose.model('Material', materialSchema);
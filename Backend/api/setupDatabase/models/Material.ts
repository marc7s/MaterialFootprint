/* Utils */
import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    isMetallic: {
        type: Boolean,
        required: true,
    },
    normalMapURL: {
        type: String,
        required: true,
    },
    roughnessMapURL: {
        type: String,
        required: true,
    },
    occlusionMapURL: {
        type: String,
        required: true,
    },

});

export const MaterialModel = mongoose.model('Material', materialSchema);
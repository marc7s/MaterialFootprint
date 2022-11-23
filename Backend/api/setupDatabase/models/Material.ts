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
});

export const MaterialModel = mongoose.model('Material', materialSchema);
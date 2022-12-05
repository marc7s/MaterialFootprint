import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    materialID: {
        type: Number,
        required: true,
    },
    surfaceTreatmentIDs: {
        type: [Number],
    }
});

export const PartModel = mongoose.model('Part', partSchema);

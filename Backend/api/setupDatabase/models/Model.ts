import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    partIDs: {
        type: [Number],
    }
});

export const ModelModel = mongoose.model('Model', modelSchema);

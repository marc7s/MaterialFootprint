import mongoose from 'mongoose';


export const surfaceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
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

export const SurfaceModel = mongoose.model('Surface', surfaceSchema);
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
});

export const SurfaceModel = mongoose.model('Surface', surfaceSchema);
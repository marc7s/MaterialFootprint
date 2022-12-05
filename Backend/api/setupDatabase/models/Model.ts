import mongoose from 'mongoose';
import { MaterialModel } from './Material';
import { SurfaceModel } from './Surface';

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

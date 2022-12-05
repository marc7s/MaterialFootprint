import mongoose from 'mongoose';
import { MaterialModel } from './Material';
import { SurfaceModel } from './Surface';

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

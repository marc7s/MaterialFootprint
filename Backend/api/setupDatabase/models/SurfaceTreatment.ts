/* Utils */
import mongoose from 'mongoose';

const surfaceTreatmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    }
});

export const SurfaceTreatmentModel = mongoose.model('SurfaceTreatment', surfaceTreatmentSchema);
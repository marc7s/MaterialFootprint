/* Utils */
import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export const ClientModel = mongoose.model('Client', clientSchema);
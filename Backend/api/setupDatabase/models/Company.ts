/* Utils */
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
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

export const CompanyModel = mongoose.model('Company', companySchema);
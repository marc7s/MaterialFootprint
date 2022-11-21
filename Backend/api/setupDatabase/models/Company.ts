import mongoose from 'mongoose';

export const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export const CompanyModel = mongoose.model('Company', companySchema);
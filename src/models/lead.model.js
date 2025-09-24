import mongoose, { Schema } from "mongoose";

const LeadSchema = new Schema({
    leadID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    employeeCode: {
        type: String,
    },
    mobile: {
        type: String,
        required: true,
    },
    leadType: {
        type: String,
        required: true,
    },
    leadStatus: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    alternateNo: {
        type: String,
    },
    leadDate: {
        type: Date,
        required: true,
    },
    leadSource: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export const Lead = mongoose.model('Lead', LeadSchema);
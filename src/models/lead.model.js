import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
        default:null
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
        type: [String],
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
    leadDates: {
        type: [Date],
        required: true,
    },
    leadSource: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    report_id:{
        type:[String],
        default:[]
    },
}, {
    timestamps: true
})

LeadSchema.plugin(mongooseAggregatePaginate)
export const Lead = mongoose.model('Lead', LeadSchema);
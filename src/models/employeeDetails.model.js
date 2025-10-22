import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const EmployeeDetailsSchema = new Schema({
    employeeUsername: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
    },
    employeeCode: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    alternateNumber: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    address: {
        type: String,
    },
    document_number: {
        type: String,
        required: true,
    },
    adharCardFront: {
        type: String,
    },
    adharCardBack: {
        type: String,
    },
    highestQualification: {
        type: String,
    },
    employeeStatus: {
        type: String,
        required: true,
    },
    dateOfJoin: {
        type: Date,
        required: true
    },
    dateOfLeave: {
        type: Date,
    },
    workDates: {
        type: [Date]
    },
    sessionsType: {
        type: [String]
    }
},
    {
        timestamps: true
    })

export const EmployeeDetails = mongoose.model('EmployeeDetails', EmployeeDetailsSchema)
EmployeeDetailsSchema.plugin(mongooseAggregatePaginate)
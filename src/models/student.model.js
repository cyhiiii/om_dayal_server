import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const StudentSchema = new Schema({
    leadID: {
        type: String,
        required: true,
        unique: true,
    },
    studentID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    class: {
        type: String,
    },
    boards: {
        type: String,
    },
    subjects: {
        type: [String],
    },
    fatherName: {
        type: String,
    },
    motherName: {
        type: String,
    },
    parentContact: {
        type: String,
        required: true,
    },
    alternateNumber:{
        type: String,
    }
},{
    timestamps: true
})

StudentSchema.plugin(mongooseAggregatePaginate);
export const Student = mongoose.model('Student', StudentSchema);
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const StudentSchema = new Schema({
    studentID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    boards: {
        type: String,
        required: true,
    },
    subjects: {
        type: [String],
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    parentContact: {
        type: String,
        required: true,
    },
    alternateNumber:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

StudentSchema.plugin(mongooseAggregatePaginate);
export const Student = mongoose.model('Student', StudentSchema);
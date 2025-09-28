import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const TeacherSchema = new Schema({
    teacher_id:{
        type: String,
        required: true
    },
    teacherName:{
        type: String,
        required: true
    },
    teacherEmail:{
        type: String,
        required: true
    },
    teacherMobile:{
        type: String,
        required: true
    },
    subject:{
        type: [String],
        required: true
    },
    class:{
        type: [String],
        required: true
    },
    boards:{
        type: [String],
        required: true
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
    }
}, {
    timestamps: true
})

TeacherSchema.plugin(mongooseAggregatePaginate)
export const Teacher = mongoose.model('Teacher', TeacherSchema)
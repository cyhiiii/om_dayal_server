import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const JobSchema = new Schema({
    jobID:{
        type: String,
        required: true
    },
    employeeCode:{
        type: String,
        required: true,
    },
    jobTitle:{
        type: String,
        required: true,
    },
    studentID:{
        type: String,
        required: true,
    },
    teacher_id:{
        type: [String],
        required: true,
    },
    remark:{
        type: [String],
        required: true,
    }
})

export const Job = mongoose.model('Job', JobSchema);
JobSchema.plugin(mongooseAggregatePaginate);
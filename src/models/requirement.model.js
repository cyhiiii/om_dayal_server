import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const RequirementSchema = new Schema({
    leadID:{
        type: String,
        required: true
    },
    requirementID:{
        type: String,
        required: true,
    },
    employeeCode:{
        type: String,
        required: true,
    },
    tutionPlace:{
        type: String,
        required: true,
    },
    studentClass:{
        type: String,
        required: true,
    },
    boards:{
        type: String,
        required: true,
    },
    subject:{   
        type: String,
        required: true,
    },
    sitting:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    budget:{
        type: String,
        required: true,
    },
    genderPreference:{
        type: String,
        required: true,
    }

})

export const Requirement = mongoose.model('Requirement', RequirementSchema);
RequirementSchema.plugin(mongooseAggregatePaginate);
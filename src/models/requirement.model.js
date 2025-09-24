import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const RequirementSchema = new Schema({
    leadID:{
        type: String,
        required: true,
        unique: true,
    },
    requirementID:{
        type: String,
        required: true,
        unique: true,
    },
    employeeCode:{
        type: String,
        required: true,
    },
    tutionPlace:{
        type: String,
    },
    studentClass:{
        type: String,
    },
    sitting:{
        type: String,
    },
    duration:{
        type: String,
    },
    budget:{
        type: String,
    },
    genderPreference:{
        type: String,
    }

})

export const Requirement = mongoose.model('Requirement', RequirementSchema);
RequirementSchema.plugin(mongooseAggregatePaginate);
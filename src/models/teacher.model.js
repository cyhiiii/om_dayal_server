import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const TeacherSchema = new Schema({
    teacher_id: {
        type: String,
        required: true,
        unique:true
    },
    teacherImage: {
        type: String,
    },
    teacherName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    ratePerClass: {
        type: String,
    },
    teacherEmail: {
        type: String,
    },
    teacherMobile: {
        type: String,
    },
    stream: [
        {
            subject: {
                type: String,
            },
            class: {
                type: [String],
            },
            boards: {
                type: [String],
            },
        }
    ],
    longitude: {
        type: String,
    },
    latitude: {
        type: String,
    },
    address: {
        type: String,
    },
    professionalExperience: {
        type: String,
    },
    alternateContact: {
        type: String,
    },
    adharCardNo: {
        type: String,
    },
    adharCardFront: {
        type: String,
    },
    adharCardBack: {
        type: String,
    },
    highestQualificationCertificate: {
        type: String,
    },
    teacherStatus: {
        type: String,
        default: 'active'
    },
    qualification: {
        type: String,
    },
    aboutYourself: {
        type: String
    }
}, {
    timestamps: true
})

TeacherSchema.plugin(mongooseAggregatePaginate)
export const Teacher = mongoose.model('Teacher', TeacherSchema)
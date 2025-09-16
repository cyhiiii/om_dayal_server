import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const employeeSchema = new Schema({
    employeeUsername: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    employeeStatus: {
        type: String,
        required: true,
    },
    passwordChange: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    })

employeeSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()

})

employeeSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

employeeSchema.methods.genrateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.EMPLOYEE_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.EMPLOYEE_ACCESS_TOKEN_EXPIRY
        }
    )
}


export const Employee = mongoose.model('Employee', employeeSchema)
employeeSchema.plugin(mongooseAggregatePaginate)
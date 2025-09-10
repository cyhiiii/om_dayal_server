import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.model.js"
import { Employee } from "../models/employee.model.js"


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken")

        if (!admin) {
            throw new ApiError(401, "Unauthorized request")
        }

        req.admin = admin
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
    }
})


export const employeeVerifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.EMPLOYEE_ACCESS_TOKEN_SECRET)

        const employee = await Employee.findById(decodedToken?._id).select("-password")

        if (!employee) {
            throw new ApiError(401, "Unauthorized request")
        }

        req.employee = employee
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
    }
})


export const teacherVerifyJWT = asyncHandler(async (req,_,next) => {
    
})
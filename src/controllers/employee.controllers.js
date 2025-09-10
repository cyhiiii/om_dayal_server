import { Employee } from '../models/employee.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const genrateAccessAndTokens = async (userId) => {
    try {
        const employee = await Employee.findById(userId)
        const accessToken = employee.genrateAccessToken()

        return { accessToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const loginEmployee = asyncHandler(async (req, res) => {

    const { employeeUsername, password } = req.body

    if (employeeUsername === '' || password === '') {
        throw new ApiError(400, 'Required Inputs')
    }

    const findUsername = await Employee.findOne({ employeeUsername: employeeUsername })

    if (!findUsername) {
        throw new ApiError(401, 'Invalid Credentials')
    }

    const isPasswordValid = await findUsername.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid Credentials')
    }

    const { accessToken } = genrateAccessAndTokens(findUsername._id)

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, {}, "User logged In Successfully")
        )
})

const logoutEmployee = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "Admin Logged Out Successfully")
        )
})

const changePassword = asyncHandler(async (req, res) => {

})

export {
    loginEmployee,
    logoutEmployee,
    changePassword,
}
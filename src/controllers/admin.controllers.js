import { Admin } from '../models/admin.model.js';
import { Employee } from '../models/employee.model.js';
import { EmployeeDetails } from '../models/employeeDetails.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// const registerUser = asyncHandler(async (req, res) => {
//     const { username,password,email,mobile,name } = req.body
//     if (
//         [username,password,email,mobile,name].some((item)=>item?.trim()==="")
//     ) {
//         throw new ApiError(400,'Required Fields')
//     }
//     const saveUser = await Admin.create({
//         username,
//         password,
//         email,
//         mobile,
//         name
//     })
//     const findAdmin = await Admin.findById(saveUser._id)
//     if (!findAdmin) {
//         throw new ApiError(500,'Server Error')
//     }
//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200,[],'Admin Registered')
//     )
// })


//Genrate Tokens

const genrateAccessAndRefreshTokens = async (userId) => {
    try {
        const admin = await Admin.findById(userId)
        const accessToken = admin.genrateAccessToken()
        const refreshToken = admin.genrateRefreshToken()

        admin.refreshToken = refreshToken
        admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

//Refresh Access Token

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const admin = await Admin.findById(decodedToken._id)

        if (!admin) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await genrateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

//Login Controller

const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (username === "" || password === "") {
        throw new ApiError(400, 'Required Inputs')
    }

    const findAdmin = await Admin.findOne({ username: username })

    if (!findAdmin) {
        throw new ApiError(401, 'Wrong Credentials')
    }

    const isPasswordValid = await findAdmin.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'Wrong Credentials')
    }

    const { accessToken, refreshToken } = await genrateAccessAndRefreshTokens(findAdmin._id)


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const adminLogout = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

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

const addEmployee = asyncHandler(async (req, res) => {
    const { employeeUsername, employeeCode, name, email, mobile, alternateNumber, fatherName, address, document_number } = req.body

    // if (
    //     [employeeUsername, employeeCode, name, email, mobile, alternateNumber, fatherName, address, document_number]
    // ) {
    //     throw new ApiError(400, 'Required Inputs')
    // }

    const filesName = ["profileImage", "adharCardFront", "adharCardBack", "highestQualification"]

    var filesToUpload = []

    filesName.map((item) => {
        const imgArr = req.files[item]

        if (imgArr?.length > 0 && imgArr[0].path) {
            filesToUpload.push(imgArr[0])
        }
    })

    const existedEmployee = await Employee.findOne({ employeeUsername: employeeUsername })

    if (existedEmployee) {
        throw new ApiError(422, 'Employee Already Exists')
    }

    var filesToSaved = {profileImage:"",adharCardFront:"",adharCardBack:"",highestQualification:""}

    filesToUpload.map(async(item)=>{
        await uploadOnCloudinary(item.path).then((res)=>{
            if (res?.url) {
                console.log(item.fieldname)
                filesToSaved[item.fieldname] = res.url
            }else{
                throw new ApiError(500,`Image Upload Failed With Error ${res.toSting()}`)
            }
        }).catch((err)=>{
            throw new ApiError(500,`Image Upload Failed With Error ${err.toSting()}`)
        })
    })

    console.log(filesToSaved)

    // const addEmployeeToDatabase  = await EmployeeDetails.create({

    // })
})

export {
    loginAdmin,
    adminLogout,
    addEmployee,
}
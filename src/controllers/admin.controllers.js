import { Admin } from '../models/admin.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

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

    const { accessToken, refreshToken } = await genrateAccessAndRefreshTokens(user._id)


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

export {
    loginAdmin,
    adminLogout
}
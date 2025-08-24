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

const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (username === "" || password === "") {
        throw new ApiError(400, 'Required Inputs')
    }

    
})

export {
    loginAdmin
}
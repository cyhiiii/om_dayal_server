import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const createLead = asyncHandler(async (req, res) => {

    const { email, mobile, leadType, leadStatus, longitude, latitude, address, alternateNo, leadDate, leadSource, name } = req.body

    if (
        [email, mobile, leadType, leadStatus, longitude, latitude, address, alternateNo, leadDate, leadSource, name].some((item) => item === '' || item === undefined)
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, 'Lead created successfully')
        )

})


export {
    createLead,
}
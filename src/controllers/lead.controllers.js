import { Lead } from '../models/lead.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { genrateLeadID } from '../utils/CreateIDs.js'


const createLead = asyncHandler(async (req, res) => {

    const { email, mobile, leadType, leadStatus, longitude, latitude, address, alternateNo, leadDate, leadSource, name } = req.body

    if (
        [email, mobile, leadType, leadStatus, longitude, latitude, address, alternateNo, leadDate, leadSource, name].some((item) => item === '' || item === undefined)
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    var leadID = ''
    var conditions = true

    while (conditions) {
        leadID = genrateLeadID()
        const existedLeadID = await Lead.findOne({ leadID: leadID })
        if (!existedLeadID) {
            conditions = false
        }
    }

    const createLead = await Lead.create({
        leadID,
        email,
        mobile,
        leadType,
        leadStatus,
        longitude,
        latitude,
        address,
        alternateNo,
        leadDate,
        leadSource,
        name
    })

    if (!createLead) {
        throw new ApiError(500, 'Lead creation failed')
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
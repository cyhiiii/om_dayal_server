import { Job } from '../models/job.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const createInvoice = asyncHandler(async (req, res) => {

    const { leadID, invoice_date, totalAmount, dueDate  } = req.body

    if (
        [leadID, invoice_date, totalAmount, dueDate].some((item)=>
        item===''||item===undefined)
    ) {
        throw new ApiError(400,'Required Inputs')
    }

    const getJobDetails = await Job.findOne({leadID:leadID})

})

const collectPayment = asyncHandler(async (req, res) => {

})

const viewInvoice = asyncHandler(async (req, res) => {

})

const createReceipt = asyncHandler(async (req, res) => {

})

const cancelReceipt = asyncHandler(async (req, res) => {

})


export {
    createInvoice,
    collectPayment,
    createReceipt,
    cancelReceipt,
    viewInvoice
}
import { Lead } from '../models/lead.model.js'
import { Requirement } from '../models/requirement.model.js'
import { Student } from '../models/student.model.js'
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
        leadID = await genrateLeadID()
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
            new ApiResponse(200, { leadID }, 'Lead created successfully')
        )

})

const allotLeads = asyncHandler(async (req, res) => {
    const { leadID, employeeCode } = req.body
    
    if (leadID === '' || leadID === undefined || employeeCode === '' || employeeCode === undefined) {
        throw new ApiError(400, 'All fields are required')
    }

    const findLead = await Lead.findOne({ leadID: leadID })

    if (!findLead) {
        throw new ApiError(404, 'Lead not found')
    }

    const findEmployeeInLead = await Requirement.findOne({ leadID: leadID, employeeCode: employeeCode })

    if (findEmployeeInLead) {
        throw new ApiError(422, 'This lead is already allotted to this employee')
    }

    var requirementID = leadID.replace('LD', 'RQ')
    var studentID = leadID.replace('LD', 'SL')

    const exisedStudent = await Student.findOne({ leadID: leadID })

    if (exisedStudent) {
        throw new ApiError(423, 'Student with this leadID already exists')
    }

    const createRequirement = await Requirement.create({
        leadID:leadID,
        employeeCode: employeeCode,
        requirementID: requirementID,
        tutionPlace: '',
        studentClass: '',
        sitting: '',
        duration: '',
        budget: '',
        genderPreference: ''
    })

    const createStudent = await Student.create({
        leadID: leadID,
        studentID: studentID,
        name: findLead.name,
        email: findLead.email,
        address: findLead.address,
        class: '',
        boards: '',
        subjects: [],
        fatherName: '',
        motherName: '',
        parentContact: findLead.mobile,
        alternateNumber: findLead.alternateNo
    })

    if (!createRequirement || !createStudent) {
        throw new ApiError(500, 'Allotment failed')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { requirementID, studentID }, 'Lead allotted successfully')
        )
})

const postRequirement = asyncHandler(async (req, res) => {
//Requirement Schema
// tutionPlace
// studentClass
// sitting
// duration
// budget
// genderPreference

//Student Schema

// class
// boards
// subjects
// fatherName
// motherName

    const { leadID, employeeCode, tutionPlace, studentClass, boards, subject, sitting, duration, budget, genderPreference } = req.body

    if (
        [leadID, employeeCode, tutionPlace, studentClass, boards, subject, sitting, duration, budget, genderPreference].some((item) => item === '' || item === undefined)
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const exisedLead = await Requirement.findOne({ leadID: leadID })

    if (exisedLead) {
        throw new ApiError(422, 'Requirement with this leadID already exists')
    }

    var requirementID = leadID.replace('LD', 'RQ')

    const createRequirement = await Requirement.create({
        leadID,
        requirementID,
        employeeCode,
        tutionPlace,
        studentClass,
        boards,
        subject,
        sitting,
        duration,
        budget,
        genderPreference
    })

    if (!createRequirement) {
        throw new ApiError(500, 'Requirement creation failed')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { requirementID }, 'Requirement created successfully')
        )

})

const getAllLeads = asyncHandler(async (req, res) => {

    const leads = await Lead.find()

    if (!leads) {
        throw new ApiError(404, 'No leads found')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { leads }, 'Leads fetched successfully')
        )
})

export {
    createLead,
    allotLeads,
    postRequirement,
    getAllLeads
}
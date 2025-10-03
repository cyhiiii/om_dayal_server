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

    var leadID;
    let isUnique = false;

    while (!isUnique) {
        leadID = await genrateLeadID();
        const existedLeadID = await Lead.findOne({ leadID });
        if (!existedLeadID) {
            isUnique = true;
        }
    }

    var dates = new Date(leadDate)
    // set time to current time
    dates.setHours(new Date().getHours())
    dates.setMinutes(new Date().getMinutes())
    dates.setSeconds(new Date().getSeconds())

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
        leadDates: dates,
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
        leadID: leadID,
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

    findLead.employeeCode = employeeCode
    findLead.save()

    if (!createRequirement || !createStudent) {
        throw new ApiError(500, 'Allotment failed')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { leadID }, 'Lead allotted successfully')
        )
})

const postRequirement = asyncHandler(async (req, res) => {

    const { leadID, name, fatherName, motherName, email, mobile, alternateNo, address, tutionPlace, studentClass, boards, subject, sitting, duration, budget, genderPreference } = req.body

    if (
        [leadID, name, fatherName, motherName, email, mobile, alternateNo, address, tutionPlace, studentClass, boards, subject, sitting, duration, budget, genderPreference].some((item) => item === '' || item === undefined)
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    var requirementID = leadID.replace('LD', 'RQ')

    const updateRequirement = await Requirement.updateOne(
        { leadID: leadID },
        {
            tutionPlace: tutionPlace,
            studentClass: studentClass,
            sitting: sitting,
            duration: duration,
            budget: budget,
            genderPreference: genderPreference
        })

    const updateStudent = await Student.updateOne(
        { leadID: leadID },
        {
            class: studentClass,
            boards: boards,
            subjects: subject,
            fatherName: fatherName,
            motherName: motherName
        })

    const updateLeads = await Lead.updateOne(
        { leadID: leadID },
        {
            $push: {
                leadStatus: 'Open',
                leadDates: new Date()
            }
        }
    );


    if (!updateRequirement.acknowledged || !updateStudent.acknowledged || !updateLeads.acknowledged) {
        throw new ApiError(500, 'Requirement update failed')
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

const searchLeads = asyncHandler(async (req, res) => {

    const { params } = req.params


    const leadIDs = await Lead.find({ leadID: { $regex: params, $options: 'i' } })

    if (!leadIDs) {
        throw new ApiError(404, 'No leads found')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { leadIDs }, 'Leads fetched successfully')
        )


})

const changeLeadStatus = asyncHandler(async (req, res) => {

    const { leadID, leadStatus, leadDates } = req.body

    if (
        [leadID, leadStatus, leadDates].some((item) => item === '' || item === undefined)
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const findLead = await Lead.findOne({ leadID: leadID })

    if (!findLead) {
        throw new ApiError(404, 'Lead not found')
    }

    var dates = new Date(leadDates)
    // set time to current time
    dates.setHours(new Date().getHours())
    dates.setMinutes(new Date().getMinutes())
    dates.setSeconds(new Date().getSeconds())

    findLead.leadStatus.push(leadStatus)
    findLead.leadDates.push(dates)
    await findLead.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200, { leadID }, 'Lead status updated successfully')
        )

})

const getRequirementWithLeadID = asyncHandler(async (req, res) => {
    const { leadID } = req.params;

    if (!leadID || leadID.trim() === '') {
        throw new ApiError(400, 'Lead ID is required');
    }

    const requirement = await Requirement.findOne({ leadID });

    if (!requirement) {
        throw new ApiError(404, 'Requirement not found');
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { requirement }, 'Requirement fetched successfully')
        );
})

export {
    createLead,
    allotLeads,
    postRequirement,
    getAllLeads,
    searchLeads,
    changeLeadStatus,
    getRequirementWithLeadID
}
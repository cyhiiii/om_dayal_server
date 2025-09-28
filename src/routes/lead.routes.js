import { Router } from "express";
import { employeeVerifyJWT, verifyJWT } from "../middlewares/auth.middlewares.js";
import { allotLeads, changeLeadStatus, createLead, getAllLeads, postRequirement, searchLeads } from "../controllers/lead.controllers.js";


const router = Router()

//Admin routes
router.route('/createLead').post(verifyJWT, createLead)
router.route('/postRequirement').post(verifyJWT, postRequirement)
router.route('/getAllLeads').get(verifyJWT, getAllLeads)
router.route('/allotLeads').post(verifyJWT, allotLeads)
router.route('/searchLeads/:params').get(verifyJWT, searchLeads)
router.route('/changeLeadStatus').put(verifyJWT, changeLeadStatus)

//Employee routes
router.route('/createEmplLead').post(employeeVerifyJWT, createLead)
router.route('/postEmplRequirement').post(employeeVerifyJWT, postRequirement)
router.route('/getEmplAllLeads').get(employeeVerifyJWT, getAllLeads)
router.route('/searchEmplLeads/:params').get(employeeVerifyJWT, searchLeads)
router.route('/changeEmplLeadStatus').put(employeeVerifyJWT, changeLeadStatus)


export default router
import { Router } from "express";
import { employeeVerifyJWT, verifyJWT } from "../middlewares/auth.middlewares.js";
import { allotLeads, createLead, getAllLeads, postRequirement } from "../controllers/lead.controllers.js";


const router = Router()

//Admin routes
router.route('/createLead').post(verifyJWT, createLead)
router.route('/postRequirement').post(verifyJWT, postRequirement)
router.route('/getAllLeads').get(verifyJWT, getAllLeads)
router.route('/allotLeads').post(verifyJWT, allotLeads)

//Employee routes
router.route('/createEmplLead').post(employeeVerifyJWT, createLead)
router.route('/postEmplRequirement').post(employeeVerifyJWT, postRequirement)
router.route('/getEmplAllLeads').get(employeeVerifyJWT, getAllLeads)


export default router
import { Router } from "express";
import { employeeVerifyJWT, verifyJWT } from "../middlewares/auth.middlewares.js";
import { createLead } from "../controllers/lead.controllers.js";


const router = Router()

//Secured Routes
router.route('/createLead').post(verifyJWT, createLead)
router.route('/createEmplLead').post(employeeVerifyJWT, createLead)


export default router
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createLead } from "../controllers/lead.controllers.js";


const router = Router()

//Secured Routes
router.route('/createLead').post(verifyJWT, createLead)


export default router
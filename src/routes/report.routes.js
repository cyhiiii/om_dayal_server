import { Router } from "express";
import { employeeVerifyJWT, verifyJWT } from "../middlewares/auth.middlewares.js";
import { createReport, searchReport, viewReport, viewUnviewedReport } from "../controllers/report.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router = Router()
//Admin Routes

router.route('/viewReport').put(verifyJWT, viewReport)
router.route('/searchReport').get(verifyJWT, searchReport)
router.route('/viewUnviewedReport').get(verifyJWT, viewUnviewedReport)

//Employee Routes

router.route('/createReportEmployee').post(employeeVerifyJWT,
    upload.fields([
        {
            name: 'supportingDocument', maxCount: 6
        }
    ])
    , createReport
)
router.route('/searchReportEmployee').get(employeeVerifyJWT, searchReport)



export default router;
import { Router } from "express";
import { addEmployee, adminLogout, benchEmployee, getEmployeesDetails, loginAdmin, refreshAccessToken, releaseEmployee } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

//router.route('/register').post(registerUser)
router.route('/login').post(loginAdmin)
router.route('/refreshAccessTokens').post(refreshAccessToken)

//Secured Routes
router.route('/logout').post(verifyJWT, adminLogout)
router.route('/addEmployee').post(verifyJWT,
    upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'adharCardFront', maxCount: 1 },
        { name: 'adharCardBack', maxCount: 1 },
        { name: 'highestQualification', maxCount: 1 }
    ]),
    addEmployee
)
router.route('/benchEmployee').post(verifyJWT, benchEmployee)
router.route('/releaseEmployee').post(verifyJWT, releaseEmployee)
router.route('/employeeDetails').get(verifyJWT, getEmployeesDetails)

export default router
import { Router } from "express";
import { verifyJWT, employeeVerifyJWT } from '../middlewares/auth.middlewares.js'
import { createTeacher, getTeacherDetails, searchTeachersForLead, searchTeachersWithID, updateTeacherDetails } from "../controllers/teacher.controllers.js";
import { upload } from '../middlewares/multer.middlewares.js'

const router = Router();

//Admin Routes


router.route('/addTeacher').post(verifyJWT,
    upload.fields([
        { name: 'adharCardFront', maxCount: 1 },
        { name: 'adharCardBack', maxCount: 1 },
        { name: 'highestQualificationCertificate', maxCount: 1 },
        { name: 'teacherImage', maxCount: 1 }
    ]),
    createTeacher
);
router.route('/updateTeacher').put(verifyJWT,
    upload.fields([
        { name: 'adharCardFront', maxCount: 1 },
        { name: 'adharCardBack', maxCount: 1 },
        { name: 'highestQualificationCertificate', maxCount: 1 },
        { name: 'teacherImage', maxCount: 1 }
    ]),
    updateTeacherDetails
)
router.route('/getTeacherDetails').get(verifyJWT, getTeacherDetails)
router.route('/searchTeachersForLead').get(verifyJWT, searchTeachersForLead)
router.route('/searchTeachersWithID').post(verifyJWT, searchTeachersWithID)

//Employee Routes


router.route('/addTeacherEmployee').post(employeeVerifyJWT,
    upload.fields([
        { name: 'adharCardFront', maxCount: 1 },
        { name: 'adharCardBack', maxCount: 1 },
        { name: 'highestQualificationCertificate', maxCount: 1 },
        { name: 'teacherImage', maxCount: 1 }
    ]),
    createTeacher
);
router.route('/updateTeacherEmployee').put(employeeVerifyJWT,
    upload.fields([
        { name: 'adharCardFront', maxCount: 1 },
        { name: 'adharCardBack', maxCount: 1 },
        { name: 'highestQualificationCertificate', maxCount: 1 },
        { name: 'teacherImage', maxCount: 1 }
    ]),
    updateTeacherDetails
)
router.route('/getTeacherDetailsEmployee').get(employeeVerifyJWT, getTeacherDetails)
router.route('/searchTeachersForLeadEmployee').get(employeeVerifyJWT, searchTeachersForLead)
router.route('/searchTeachersWithIDEmployee').post(employeeVerifyJWT, searchTeachersWithID)


export default router;
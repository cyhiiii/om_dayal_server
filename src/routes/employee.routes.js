import { Router } from "express";
import { changePassword, loginEmployee, logoutEmployee } from "../controllers/employee.controllers.js";
import { employeeVerifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route('/Login').post(loginEmployee)

//Secured Routes

router.route('/Logout').post(employeeVerifyJWT, logoutEmployee)
router.route('/changePassword').post(employeeVerifyJWT , changePassword)

export default router
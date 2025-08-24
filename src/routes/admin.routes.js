import { Router } from "express";
import { loginAdmin } from "../controllers/admin.controllers.js";

const router = Router();

//router.route('/register').post(registerUser)
router.route('/login').post(loginAdmin)

export default router
import { Router } from "express";
import { adminLogout, loginAdmin } from "../controllers/admin.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

//router.route('/register').post(registerUser)
router.route('/login').post(loginAdmin)

//Secured Routes
router.route('/logout').post(verifyJWT, adminLogout)

export default router
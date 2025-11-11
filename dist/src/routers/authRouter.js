import { Router } from "express";
import loginController from "../controllers/loginController.js";
import signupController from "../controllers/signupController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";

const authRouter = Router();
/** Signup
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: "Register a new user"
 *     responses:
 *       201:
 *         description: "User registered successfully"
 *       400:
 *         description: "Bad request"
 */
authRouter.post("/signup", catchErrors(signupController.signup));
/** Login
 * @swagger
 * /auth/login:
 *   post:
 *     summary: "User login"
 *     responses:
 *       200:
 *         description: "Login successful"
 *       401:
 *         description: "Unauthorized"
 */
authRouter.post("/login", catchErrors(loginController.login));
/** Logout
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: "User logout"
 *     responses:
 *       200:
 *         description: "Logout successful"
 */
authRouter.post("/logout", catchErrors(loginController.logout));
export default authRouter;

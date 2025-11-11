import { Router } from "express";
import adminRouter from "./adminRouter.js";
import snippetRouter from "./snippetRouter.js";
import userRouter from "./userRouter.js";
import tagRouter from "./tagRouter.js";
import languageRouter from "./languageRouter.js";
import authRouter from "./authRouter.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
const router = Router();
// Auth routers
router.use("/api/auth", catchErrors(authRouter));
// Admin routers
router.use("/admin", catchErrors(adminRouter));
// Snippet routers
router.use("/api/snippets", catchErrors(snippetRouter));
// User routers
router.use("/api/users", catchErrors(userRouter));
// Tag routers
router.use("/api/tags", catchErrors(tagRouter));
// Language routers
router.use("/api/languages", catchErrors(languageRouter));
router.use(catchErrors);
export default router;

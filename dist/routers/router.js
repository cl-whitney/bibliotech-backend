import { Router } from "express";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import adminRouter from "./adminRouter.js";
import authRouter from "./authRouter.js";
import languageRouter from "./languageRouter.js";
import snippetRouter from "./snippetRouter.js";
import tagRouter from "./tagRouter.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use("/api/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/api/snippets", snippetRouter);
router.use("/api/users", userRouter);
router.use("/api/tags", tagRouter);
router.use("/api/languages", languageRouter);
router.use(catchErrors);
export default router;

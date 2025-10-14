import { Router, type Request, type Response } from "express";
import adminRouter from "./adminRouter";
import snippetRouter from "./snippetRouter";
import userRouter from "./userRouter";
import tagRouter from "./tagRouter";
import languageRouter from "./languageRouter";
import authRouter from "./authRouter";
import { catchErrors } from "../middlewares/errorsHandlers/handlers";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/api/snippets", snippetRouter);
router.use("/api/users", userRouter);
router.use("/api/tags", tagRouter);
router.use("/api/languages", languageRouter);

router.use(catchErrors);

export default router;

import { Router } from "express";
import languageController from "../controllers/languageController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const languageRouter = Router();
languageRouter.get("/", catchErrors(languageController.index));
languageRouter.get("/:id", isAuth, catchErrors(languageController.show));
export default languageRouter;

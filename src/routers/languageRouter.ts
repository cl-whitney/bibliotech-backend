import { Router } from "express";
import languageController from "../controllers/languageController";
import { catchErrors } from "../middlewares/errorsHandlers/handlers";
import isAuth from "../middlewares/isAuth";

const languageRouter = Router();

languageRouter.get("/", catchErrors(languageController.index));
languageRouter.get("/:id", isAuth, catchErrors(languageController.show));

export default languageRouter;

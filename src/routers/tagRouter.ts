import { Router } from "express";
import tagController from "../controllers/tagController";
import { catchErrors } from "../middlewares/errorsHandlers/handlers";
import isAuth from "../middlewares/isAuth";

const tagRouter = Router();

tagRouter.get("/", catchErrors(tagController.index));
tagRouter.get("/:id", isAuth, catchErrors(tagController.show));
tagRouter.post("/", isAuth, catchErrors(tagController.store));
tagRouter.put("/:id", isAuth, catchErrors(tagController.update));
tagRouter.delete("/:id", isAuth, catchErrors(tagController.delete));

export default tagRouter;

import { Router } from "express";
import tagController from "../controllers/tagController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const tagRouter = Router();
tagRouter.get("/", catchErrors(tagController.index));
tagRouter.get("/:id", isAuth, catchErrors(tagController.show));
tagRouter.post("/", isAuth, catchErrors(tagController.store));
tagRouter.put("/:id", isAuth, catchErrors(tagController.update));
tagRouter.delete("/:id", isAuth, catchErrors(tagController.delete));
export default tagRouter;

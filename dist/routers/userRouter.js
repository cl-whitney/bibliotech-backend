import { Router } from "express";
import userController from "../controllers/userController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const usersRouter = Router();
usersRouter.get("/", catchErrors(userController.index));
usersRouter.get("/:id", isAuth, catchErrors(userController.show));
usersRouter.put("/:id", isAuth, catchErrors(userController.update));
usersRouter.delete("/:id", isAuth, catchErrors(userController.delete));
export default usersRouter;

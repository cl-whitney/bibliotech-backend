import { Router } from "express";
import userController from "../controllers/userController";
import { catchErrors } from "../middlewares/errorsHandlers/handlers";
import isAuth from "../middlewares/isAuth";

const UsersRouter = Router();

UsersRouter.get("/", catchErrors(userController.index));
UsersRouter.get("/:id", isAuth, catchErrors(userController.show));
UsersRouter.put("/:id", isAuth, catchErrors(userController.update));
UsersRouter.delete("/:id", isAuth, catchErrors(userController.delete));

export default UsersRouter;

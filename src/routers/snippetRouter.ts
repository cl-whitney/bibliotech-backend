import { Router } from "express";
import snippetController from "../controllers/snippetController";
import { catchErrors } from "../middlewares/errorsHandlers/handlers";
import isAuth from "../middlewares/isAuth";

const snippetRouter = Router();

snippetRouter.get("/", catchErrors(snippetController.index));
snippetRouter.get("/:id", isAuth, catchErrors(snippetController.show));
snippetRouter.post("/", isAuth, catchErrors(snippetController.store));
snippetRouter.put("/:id", isAuth, catchErrors(snippetController.update));
snippetRouter.delete("/:id", isAuth, catchErrors(snippetController.delete));

export default snippetRouter;

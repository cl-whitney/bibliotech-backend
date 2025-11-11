import { Router } from "express";
import adminController from "../controllers/adminController.js";
import snippetController from "../controllers/snippetController.js";
import userController from "../controllers/userController.js";
import tagController from "../controllers/tagController.js";
import languageController from "../controllers/languageController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAdmin from "../middlewares/isAdmin.js";
const adminRouter = Router();
adminRouter.get("/login", adminController.showLoginForm);
// Handle login submission
adminRouter.post("/login", adminController.login);
// Show admin dashboard (admin only)
adminRouter.get("/dashboard", isAdmin, adminController.show);
// Logout route
adminRouter.post("/logout", isAdmin, adminController.adminLogout);
// Snippet management
adminRouter.get("/snippets", isAdmin, catchErrors(snippetController.index));
adminRouter.get("/snippets/form", isAdmin, catchErrors(snippetController.show));
adminRouter.post("/snippets", isAdmin, catchErrors(snippetController.store));
adminRouter.get("/snippets/:id", isAdmin, catchErrors(snippetController.show));
adminRouter.get(
	"/snippets/:id/edit",
	isAdmin,
	catchErrors(snippetController.show),
);
adminRouter.patch(
	"/snippets/:id",
	isAdmin,
	catchErrors(snippetController.update),
);
adminRouter.post(
	"/snippets/:id/delete",
	isAdmin,
	catchErrors(snippetController.delete),
);
// User management
adminRouter.get("/users", isAdmin, catchErrors(userController.index));
adminRouter.patch("/users/:id", isAdmin, catchErrors(userController.update));
// Tag management
adminRouter.get("/tags", isAdmin, catchErrors(tagController.index));
adminRouter.get("/tags/form", isAdmin, catchErrors(tagController.show));
adminRouter.post("/tags/form", isAdmin, catchErrors(tagController.show));
adminRouter.post("/tags", isAdmin, catchErrors(tagController.store));
adminRouter.post("/tags", isAdmin, catchErrors(tagController.show));
adminRouter.post("/tags", isAdmin, catchErrors(tagController.store));
// Language management
adminRouter.get("/languages", isAdmin, catchErrors(languageController.index));
adminRouter.get(
	"/languages/:id",
	isAdmin,
	catchErrors(languageController.show),
);
export default adminRouter;

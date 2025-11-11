import { Router } from "express";
import adminController from "../controllers/adminController.js";
// import { adminSnippetController, adminUserController, adminTagController, adminLanguageController } from "../controllers/adminController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAdmin from "../middlewares/isAdmin.js";

const adminRouter = Router();
/** Show Login Form
 * @swagger
 * /admin/login:
 *   get:
 *     summary: "Show login form"
 *     responses:
 *       200:
 *         description: "Login form"
 *   post:
 *     summary: "Handle login submission"
 *     responses:
 *       200:
 *         description: "Successful login"
 *       401:
 *         description: "Unauthorized"
 */
adminRouter.get("/login/form", catchErrors(adminController.showLoginForm));
/** Login Submission
 * @swagger
 * /admin/login:
 *   post:
 *     summary: "Handle login submission"
 *     responses:
 *       200:
 *         description: "Successful login"
 *       401:
 *         description: "Unauthorized"
 */
adminRouter.post("/login", catchErrors(adminController.login));
/** Dashboard
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: "Show admin dashboard"
 *     responses:
 *       200:
 *         description: "Admin dashboard"
 *       401:
 *         description: "Unauthorized"
 */
adminRouter.get("/dashboard", isAdmin, catchErrors(adminController.show));
/** Logout
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: "Handle logout"
 *     responses:
 *       200:
 *         description: "Successful logout"
 *       401:
 *         description: "Unauthorized"
 */
adminRouter.post("/logout", isAdmin, catchErrors(adminController.adminLogout));
// /** Snippet management
//  * @swagger
//  * /admin/snippets:
//  *   get:
//  *     summary: "List all snippets"
//  *     responses:
//  *       200:
//  *         description: "List of snippets"
//  * /admin/snippet/{id}:
//  *   get:
//  *     summary: "Get snippet by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The snippet ID"
//  *     responses:
//  *       200:
//  *         description: "Snippet details"
//  *   post:
//  *     summary: "Create a new snippet"
//  *     responses:
//  *       201:
//  *         description: "Snippet created successfully"
//  * /admin/snippet/{id}/edit:
//  *   get:
//  *     summary: "Show edit form for a snippet"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The snippet ID"
//  *     responses:
//  *       200:
//  *         description: "Edit form for snippet"
//  * /admin/snippet/{id}:
//  *   patch:
//  *     summary: "Update a snippet by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The snippet ID"
//  *     responses:
//  *       200:
//  *         description: "Snippet updated successfully"
//  * /admin/snippet/{id}/delete:
//  *   post:
//  *     summary: "Delete a snippet by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The snippet ID"
//  *     responses:
//  *	   204:
//  *         description: "Snippet deleted successfully"
//  */
// adminRouter.get("/snippets", isAdmin, catchErrors(adminSnippetController.index));
// adminRouter.get("/snippet/:id", isAdmin, catchErrors(adminSnippetController.show));
// adminRouter.post("/snippet", isAdmin, catchErrors(adminSnippetController.store));
// adminRouter.get("/snippet/:id/edit", isAdmin, catchErrors(adminSnippetController.showSnippetEditForm));
// adminRouter.patch("/snippet/:id", isAdmin, catchErrors(adminSnippetController.update));
// adminRouter.post("/snippet/:id/delete", isAdmin, catchErrors(adminSnippetController.delete));
// /** User management
//  * @swagger
//  * /admin/users:
//  *   get:
//  *     summary: "List all users"
//  *     responses:
//  *       200:
//  *         description: "List of users"
//  * /admin/user/{id}:
//  *   get:
//  *     summary: "Get user by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The user ID"
//  *     responses:
//  *       200:
//  *         description: "User details"
//  *   delete:
//  *     summary: "Delete a user by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The user ID"
//  *     responses:
//  *       204:
//  *         description: "User deleted successfully"
//  */
// adminRouter.get("/users", isAdmin, catchErrors(adminUserController.index));
// adminRouter.get("/user/:id", isAdmin, catchErrors(adminUserController.show));
// adminRouter.delete("/user/:id", isAdmin, catchErrors(adminUserController.delete));
// /* Tag management
//  * @swagger
//  * /admin/tags:
//  *   get:
//  *     summary: "List all tags"
//  *     responses:
//  *       200:
//  *         description: "List of tags"
//  * /admin/tags/{id}:
//  *   get:
//  *     summary: "Get tag by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The tag ID"
//  *     responses:
//  *       200:
//  *         description: "Tag details"
//  *   post:
//  *     summary: "Create a new tag"
//  *     responses:
//  *       201:
//  *         description: "Tag created successfully"
//  * /admin/tags/{id}/edit:
//  *   get:
//  *     summary: "Show edit form for a tag"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *		 required: true
//  *         schema:
//  *           type: string
//  *         description: "The tag ID"
//  *     responses:
//  *       200:
//  *         description: "Edit form for tag"
//  * /admin/tags/{id}:
//  *   patch:
//  *     summary: "Update a tag by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The tag ID"
//  *     responses:
//  *       200:
//  *         description: "Tag updated successfully"
//  * /admin/tags/{id}/delete:
//  *   post:
//  *     summary: "Delete a tag by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The tag ID"
//  *     responses:
//  *       204:
//  *         description: "Tag deleted successfully"
//  */
// adminRouter.get("/tags", isAdmin, catchErrors(adminTagController.index));
// adminRouter.get("/tags/:id", isAdmin, catchErrors(adminTagController.show));
// adminRouter.post("/tags", isAdmin, catchErrors(adminTagController.store));
// adminRouter.get("/tags/:id/edit", isAdmin, catchErrors(adminTagController.showTagEditForm));
// adminRouter.patch("/tags/:id", isAdmin, catchErrors(adminTagController.update));
// adminRouter.post("/tags/:id/delete", isAdmin, catchErrors(adminTagController.delete));
// /* Language management
//  * @swagger
//  * /admin/languages:
//  *   get:
//  *     summary: "List all languages"
//  *     responses:
//  *       200:
//  *         description: "List of languages"
//  * /admin/languages/{id}:
//  *   get:
//  *     summary: "Get language by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The language ID"
//  *     responses:
//  *       200:
//  *         description: "Language details"
//  *   post:
//  *     summary: "Create a new language"
//  *     responses:
//  *       201:
//  *         description: "Language created successfully"
//  * /admin/languages/{id}/edit:
//  *   get:
//  *     summary: "Show edit form for a language"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *		 required: true
//  *         schema:
//  *           type: string
//  *         description: "The language ID"
//  *     responses:
//  *       200:
//  *         description: "Edit form for language"
//  * /admin/languages/{id}:
//  *   patch:
//  *     summary: "Update a language by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The language ID"
//  *     responses:
//  *       200:
//  *         description: "Language updated successfully"
//  * /admin/languages/{id}/delete:
//  *   post:
//  *     summary: "Delete a language by ID"
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: "The language ID"
//  *     responses:
//  *       204:
//  *         description: "Language deleted successfully"
//  */
// adminRouter.get("/languages", isAdmin, catchErrors(adminLanguageController.index));
// adminRouter.get("/languages/:id", isAdmin, catchErrors(adminLanguageController.show));
// adminRouter.post("/languages", isAdmin, catchErrors(adminLanguageController.store));
// adminRouter.get("/languages/:id/edit", isAdmin, catchErrors(adminLanguageController.showLanguageEditForm));
// adminRouter.patch("/languages/:id", isAdmin, catchErrors(adminLanguageController.update));
// adminRouter.post("/languages/:id/delete", isAdmin, catchErrors(adminLanguageController.delete));
export default adminRouter;

import { Router } from "express";
import snippetController from "../controllers/snippetController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const snippetRouter = Router();

/** Search snippets
 * @swagger
 * /snippets/search:
 *   get:
 *     summary: "Search snippets by query"
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: "The search query"
 *     responses:
 *       200:
 *         description: "Search results"
 *       400:
 *         description: "Missing search query"
 */
snippetRouter.get("/search", isAuth, catchErrors(snippetController.search));

/** Get all snippets
 * @swagger
 * /snippets:
 *   get:
 *     summary: "Retrieve a list of snippets"
 *     responses:
 *       200:
 *         description: "A list of snippets"
 */
snippetRouter.get("/", isAuth, catchErrors(snippetController.index));

/** Get snippet by ID
 * @swagger
 * /snippets/{id}:
 *   get:
 *     summary: "Retrieve a snippet by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The snippet ID"
 *     responses:
 *       200:
 *         description: "Snippet details"
 *       404:
 *         description: "Snippet not found"
 */
snippetRouter.get("/:id", isAuth, catchErrors(snippetController.show));

/** Create a new snippet
 * @swagger
 * /snippets:
 *   post:
 *     summary: "Create a new snippet"
 *     responses:
 *       201:
 *         description: "Snippet created successfully"
 *       400:
 *         description: "Bad request"
 */
snippetRouter.post("/", isAuth, catchErrors(snippetController.store));

/** Update snippet by ID
 * @swagger
 * /snippets/{id}:
 *   patch:
 *     summary: "Update a snippet by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The snippet ID"
 *     responses:
 *       200:
 *         description: "Snippet updated successfully"
 *       404:
 *         description: "Snippet not found"
 */
snippetRouter.patch("/:id", isAuth, catchErrors(snippetController.update));

/** Delete snippet by ID
 * @swagger
 * /snippets/{id}:
 *   delete:
 *     summary: "Delete a snippet by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The snippet ID"
 *     responses:
 *       200:
 *         description: "Snippet deleted successfully"
 *       404:
 *         description: "Snippet not found"
 */
snippetRouter.delete("/:id", isAuth, catchErrors(snippetController.delete));

export default snippetRouter;

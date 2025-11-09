import { Router } from "express";
import tagController from "../controllers/tagController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const tagRouter = Router();

/** Get all tags
 * @swagger
 * /tags:
 *   get:
 *     summary: "Retrieve a list of tags"
 *     responses:
 *       200:
 *         description: "A list of tags"
 */
tagRouter.get("/", isAuth, catchErrors(tagController.index));

/** Get tag by ID
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: "Retrieve a tag by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The tag ID"
 *     responses:
 *       200:
 *         description: "Tag details"
 *       404:
 *         description: "Tag not found"
 */
tagRouter.get("/:id", isAuth, catchErrors(tagController.show));

/** Create a new tag
 * @swagger
 * /tags:
 *   post:
 *     summary: "Create a new tag"
 *     responses:
 *       201:
 *         description: "Tag created successfully"
 *       400:
 *         description: "Bad request"
 */
tagRouter.post("/", isAuth, catchErrors(tagController.store));

/** Update tag by ID
 * @swagger
 * /tags/{id}:
 *   patch:
 *     summary: "Update a tag by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The tag ID"
 *     responses:
 *       200:
 *         description: "Tag updated successfully"
 *       404:
 *         description: "Tag not found"
 */
tagRouter.patch("/:id", isAuth, catchErrors(tagController.update));

/** Delete tag by ID
 * @swagger
 * /tags/   {id}:
 *   delete:
 *     summary: "Delete a tag by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The tag ID"
 *     responses:
 *       200:
 *         description: "Tag deleted successfully"
 *       404:
 *         description: "Tag not found"
 */
tagRouter.delete("/:id", isAuth, catchErrors(tagController.delete));

export default tagRouter;

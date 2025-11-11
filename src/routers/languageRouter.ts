import { Router } from "express";
import languageController from "../controllers/languageController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const languageRouter = Router();

/** Get all languages
 * @swagger
 * /languages:
 *   get:
 *     summary: "Retrieve a list of languages"
 *     responses:
 *       200:
 *         description: "A list of languages"
 */
languageRouter.get("/", isAuth, catchErrors(languageController.index));

/** Get language by slug
 * @swagger
 * /languages/{slug}:
 *   get:
 *     summary: "Retrieve a language by slug"
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: "The language slug"
 *     responses:
 *       200:
 *         description: "Language details"
 *       404:
 *         description: "Language not found"
 */
languageRouter.get("/:slug", isAuth, catchErrors(languageController.show));

export default languageRouter;

import { Router } from "express";
import userController from "../controllers/userController.js";
import { catchErrors } from "../middlewares/errorsHandlers/handlers.js";
import isAuth from "../middlewares/isAuth.js";

const usersRouter = Router();

/** Get all users
 * @swagger
 * /users:
 *   get:
 *     summary: "Retrieve a list of users"
 *     responses:
 *       200:
 *         description: "A list of users"
 */
usersRouter.get("/", isAuth, catchErrors(userController.index));

/** Get user by ID
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Retrieve a user by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The user ID"
 *     responses:
 *       200:
 *         description: "User details"
 *       404:
 *         description: "User not found"
 */
usersRouter.get("/:id", isAuth, catchErrors(userController.show));

/** Update user by ID
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: "Update a user by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The user ID"
 *     responses:
 *       200:
 *         description: "User updated successfully"
 *       404:
 *         description: "User not found"
 */
usersRouter.patch("/:id", isAuth, catchErrors(userController.update));

/** Delete user by ID
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Delete a user by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "The user ID"
 *     responses:
 *       204:
 *         description: "User deleted successfully"
 *       404:
 *         description: "User not found"
 */
usersRouter.delete("/:id", isAuth, catchErrors(userController.delete));

export default usersRouter;

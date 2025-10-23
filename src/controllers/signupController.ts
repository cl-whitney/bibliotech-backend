import userDataMapper from "../datamappers/userDatamapper.js";
import type { Request, Response } from "express";
import type { User } from "../types/types.js";
import Scrypt from "../helpers/scrypt.js";
import validateEmail from "../helpers/validateEmail.js";
import type { NextFunction } from "express";

const registerController = {
	async signup(
		req: Request,
		res: Response,
		_next: NextFunction,
	): Promise<void> {
		const { first_name, last_name, email, password, role } = req.body;
		const errors: string[] = [];

		const assignedRole = role === "admin" ? "admin" : "member";

		if (!first_name) {
			errors.push('Le champ "first_name" est obligatoire');
		}
		if (!last_name) {
			errors.push('Le champ "last_name" est obligatoire');
		}
		if (!email) {
			errors.push('Le champ "email" est obligatoire');
		} else if (!validateEmail(email)) {
			errors.push("Le format de l'email est invalide");
		}
		if (!password) {
			errors.push('Le champ "mot de passe" est obligatoire');
		}

		if (errors.length > 0) {
			res.status(400).json({ errors });
			return;
		}

		const existingUser = await userDataMapper.findUserByEmail(email);
		if (existingUser) {
			res.status(409).json({ message: "Email déjà utilisé" });
			return;
		}

		const hashedPassword = await Scrypt.hash(password);

		const newUser = await userDataMapper.createUser({
			first_name,
			last_name,
			email,
			password: hashedPassword,
			role : assignedRole,
		} as User);

		const { password: _, ...safeUser } = newUser;

		res.status(201).json({
			message: "Compte utilisateur créé avec succès",
			user: safeUser,
		});
	},
};

export default registerController;

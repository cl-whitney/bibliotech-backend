import type { NextFunction, Request, Response } from "express";
import passwordValidator from "password-validator";
import userDatamapper from "../datamappers/userDatamapper.js";
import Scrypt from "../helpers/scrypt.js";
import { generateAuthenticationToken } from "../helpers/token.js";
import validateEmail from "../helpers/validateEmail.js";

const loginController = {
	async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
		const { email, password } = req.body;
		const errors: string[] = [];

		const schema = new passwordValidator();
		schema
			.is()
			.min(8)
			.has()
			.uppercase()
			.has()
			.lowercase()
			.has()
			.digits(1)
			.has()
			.not()
			.spaces()
			.is()
			.not()
			.oneOf(["Passw0rd", "Password123"]);

		if (!validateEmail(email)) {
			errors.push("Le format de l'email est invalide");
		}

		if (!schema.validate(password)) {
			errors.push("Email ou mot de passe incorrect");
		}

		const user = await userDatamapper.findUserByEmail(email);

		if (!user) {
			errors.push("Email ou mot de passe incorrect");
		}

		let ok = false;
		if (user) {
			ok = await Scrypt.compare(password, user.password);
		}

		if (!ok) {
			errors.push("Email ou mot de passe incorrect");
		}

		if (errors.length) {
			res.status(400).json({ errors });
			return;
		}

		if (user) {
			user.password = "";
		}

		const token = user
			? generateAuthenticationToken({ id: user.id, email: user.email })
			: "";

		res.status(200).json({
			message: "Connexion réussie",
			user,
			token,
		});
	},

	async logout(_: Request, res: Response, _next: NextFunction): Promise<void> {
		res.status(200).json({ message: "Déconnexion réussie" });
	},
};

export default loginController;

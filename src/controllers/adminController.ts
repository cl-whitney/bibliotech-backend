import type { NextFunction, Request, Response } from "express";
import passwordValidator from "password-validator";
import adminDatamapper from "../datamappers/adminDatamapper";
import userDatamapper from "../datamappers/userDatamapper";
import Scrypt from "../helpers/scrypt";
import validateEmail from "../helpers/validateEmail";
import { Role } from "../types/types";
import { User, type SessionUser } from "../types/types";

const adminController = {
	async index(_req: Request, res: Response) {
		const users = await userDatamapper.findAllUsers();

		if (!users || users.length === 0) {
			return res.status(404).json({ error: "No users found" });
		}

		return res.json(users);
	},

	async showLoginForm(
		_req: Request,
		res: Response,
		_next: NextFunction,
	): Promise<void> {
		res.locals.page = "connexion";
		res.render("connexion", { page: "connexion", errors: [] });
	},

	async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
		const { email, password } = req.body;
		const errors = [];
		console.log("password:", password);

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

		const user = await adminDatamapper.findAdminByEmail(email);

		if (!user) {
			errors.push("Email ou mot de passe incorrect");
		}

		let ok = false;
		if (user) {
			ok = await Scrypt.compare(password, user.password);
		}
		console.log(password);

		if (!ok) {
			errors.push("Email ou mot de passe incorrect");
		}

		if (errors.length) {
			res.status(400);
		}
		if (!user) {
			return res.status(403).render("connexion", {
				errors: ["Vous n'êtes pas autorisé à acceder à cet espace"],
			});
		}

		console.log("Objet user:", { user });

		if (user.role !== Role.Admin) {
			return res.status(403).render("connexion", {
				errors: ["Email ou mot de passe incorrect ou accès non autorisé"],
			});
		}
		console.log("Récupère user.role", user.role);

		console.log("yes on est connecté");

		const { password: _, ...safeUser } = user;
		req.session.user = safeUser as SessionUser;

		res.redirect("/admin/administration");
	},

	async show(req: Request, res: Response, _next: NextFunction): Promise<void> {
		const user = req.session.user;

		if (!user || user.role !== Role.Admin) {
			return res.status(403).render("connexion", {
				errors: ["Email ou mot de passe incorrect ou accès non autorisé"],
			});
		}
		res.render("back-office");
	},

	async adminLogout(
		req: Request,
		res: Response,
		_next: NextFunction,
	): Promise<void> {
		req.session.user = undefined;

		req.session.destroy((err) => {
			if (err) {
				console.error("Erreur lors de la destruction de la session :", err);
				res.status(500).json({ error: "Erreur interne du serveur" });
			}
			res.redirect("/admin/connexion");
		});
	},
};

export default adminController;

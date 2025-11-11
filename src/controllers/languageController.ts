import languageDataMapper from "../datamappers/languageDatamapper.js";
import type { Request, Response } from "express";

const languageController = {
	async index(_req: Request, res: Response) {
		const languages = await languageDataMapper.findAllLanguages();

		if (!languages || languages.length === 0) {
			return res.status(404).json({ error: "No languages found" });
		}

		return res.json(languages);
	},

	async show(req: Request, res: Response) {
		const slug = req.params.slug;
		if (!slug || typeof slug !== "string") {
			return res.status(400).json({ error: "Invalid language slug" });
		}

		const language = await languageDataMapper.findLanguageBySlug(slug);

		if (!language) {
			return res.status(404).json({ error: "Language not found" });
		}

		return res.json(language);
	},
};

export default languageController;

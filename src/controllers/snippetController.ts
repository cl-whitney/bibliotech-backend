import snippetDataMapper from "../datamappers/snippetDatamapper.js";
import type { Request, Response } from "express";
import type { Snippet } from "../types/types.js";

const snippetController = {
	async index(_req: Request, res: Response) {
		const snippets = await snippetDataMapper.findAllSnippets();

		if (!snippets || snippets.length === 0) {
			return res.status(404).json({ error: "No snippets found" });
		}

		return res.json(snippets);
	},

	async show(req: Request, res: Response) {
		const id = Number(req.params.id);
		if (!id) {
			return res.status(400).json({ error: "Invalid snippet ID" });
		}

		const snippet = await snippetDataMapper.findSnippetById(id);

		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		return res.json(snippet);
	},
	async store(req: Request, res: Response) {
		const { title, description, code, user_id, language_id, status } = req.body;

		if (
			!title ||
			!description ||
			!code ||
			!user_id ||
			!language_id ||
			!status
		) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const newSnippet = await snippetDataMapper.createSnippet({
			title,
			description,
			code,
			user_id,
			language_id,
			status,
		} as Snippet);

		return res.status(201).json(newSnippet);
	},

	async update(req: Request, res: Response) {
		const id = Number(req.params.id);
		const { title, description, code, language_id, user_id, status } = req.body;

		if (!id) {
			return res.status(400).json({ error: "Invalid snippet ID" });
		}

		if (
			!title ||
			!description ||
			!code ||
			!language_id ||
			!user_id ||
			typeof status === "undefined"
		) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const updatedSnippet = await snippetDataMapper.updateSnippet({
			id,
			title,
			description,
			code,
			language_id,
			user_id,
			status,
		});

		if (!updatedSnippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		return res.json(updatedSnippet);
	},

	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);

		if (!id) {
			return res.status(400).json({ error: "Invalid snippet ID" });
		}

		const snippet = await snippetDataMapper.findSnippetById(id);
		if (!snippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}

		await snippetDataMapper.deleteSnippet(id);

		return res.status(204).send();
	},
};

export default snippetController;

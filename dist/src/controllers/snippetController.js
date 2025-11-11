import snippetDataMapper from "../datamappers/snippetDatamapper.js";

const snippetController = {
	async index(_req, res) {
		const snippets = await snippetDataMapper.findAllSnippets();
		if (!snippets || snippets.length === 0) {
			return res.status(404).json({ error: "No snippets found" });
		}
		return res.json(snippets);
	},
	async show(req, res) {
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
	async search(req, res) {
		const { q } = req.query;
		if (!q || typeof q !== "string") {
			return res.status(400).json({ error: "Missing search query" });
		}
		try {
			const snippets = await snippetDataMapper.findSnippetsBySearch(q);
			return res.json(snippets);
		} catch (error) {
			console.error("Erreur lors de la recherche :", error);
			return res
				.status(500)
				.json({ error: "Erreur serveur lors de la recherche" });
		}
	},
	async store(req, res) {
		const {
			title,
			description,
			code,
			language_id,
			tagIds,
			status = true,
		} = req.body;
		const user_id = req.user?.id;
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
		const newSnippet = await snippetDataMapper.createSnippet(
			{
				title,
				description,
				code,
				user_id,
				language_id,
				status,
			},
			tagIds,
		);
		return res.status(201).json(newSnippet);
	},
	async update(req, res) {
		const id = Number(req.params.id);
		const {
			title,
			description,
			code,
			language_id,
			tagIds = [],
			status = true,
		} = req.body;
		const user_id = req.user?.id;
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
			tagIds,
		});
		if (!updatedSnippet) {
			return res.status(404).json({ error: "Snippet not found" });
		}
		return res.json(updatedSnippet);
	},
	async delete(req, res) {
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

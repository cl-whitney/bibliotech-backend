import tagDataMapper from "../datamappers/tagDatamapper";
import type { Request, Response } from "express";
import type { Tag } from "../types/types";

const tagController = {
	async index(_req: Request, res: Response) {
		const tags = await tagDataMapper.findAllTags();

		if (!tags || tags.length === 0) {
			return res.status(404).json({ error: "No tags found" });
		}

		return res.json(tags);
	},

	async show(req: Request, res: Response) {
		const id = Number(req.params.id);
		if (!id) {
			return res.status(400).json({ error: "Invalid tag ID" });
		}

		const tag = await tagDataMapper.findTagById(id);

		if (!tag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		return res.json(tag);
	},
	async store(req: Request, res: Response) {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const newTag = await tagDataMapper.createTag({
			name,
		} as Tag);

		return res.status(201).json(newTag);
	},

	async update(req: Request, res: Response) {
		const id = Number(req.params.id);
		const { name } = req.body;

		if (!id) {
			return res.status(400).json({ error: "Invalid tag ID" });
		}

		if (!name) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const updatedTag = await tagDataMapper.updateTag({
			id,
			name,
			updated_at: new Date().toISOString(),
		});

		if (!updatedTag) {
			return res.status(404).json({ error: "Tag not found" });
		}

		return res.json(updatedTag);
	},

	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);

		if (!id) {
			return res.status(400).json({ error: "Invalid tag ID" });
		}

		await tagDataMapper.deleteTag(id);

		return res.status(204).send();
	},
};

export default tagController;

import { client } from "../database/client.js";
import type { Tag } from "../types/types.js";

export class TagDataMapper {
	async findTagById(id: number): Promise<Tag | null> {
		const { rows } = await client.query("SELECT * FROM tag WHERE id = $1", [
			id,
		]);
		return rows[0] || null;
	}

	async findAllTags(): Promise<Tag[]> {
		const { rows } = await client.query("SELECT * FROM tag");
		return rows;
	}

	async createTag(tag: Tag): Promise<Tag> {
		const { rows } = await client.query(
			`INSERT INTO tag (name) 
             VALUES ($1) RETURNING *`,
			[tag.name],
		);
		return rows[0];
	}

	async updateTag(data: 
		{ id: number; 
			name: string; 
			updated_at?: string }
		): Promise<Tag | null> {
		const { rows } = await client.query(
			`UPDATE tag 
			 SET name = $1, updated_at = $2 
			 WHERE id = $3 RETURNING *`,
			[data.name, data.updated_at ?? new Date().toISOString(), data.id],
		);
		return rows[0] || null;
	}

	async deleteTag(id: number): Promise<void> {
		await client.query("DELETE FROM tag WHERE id = $1", [id]);
	}
}

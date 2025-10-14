import { client } from "../database/client.js";
import type { Snippet } from "../types/types.js";

export class SnippetDataMapper {
	async findSnippetById(id: number): Promise<Snippet | null> {
		const { rows } = await client.query("SELECT * FROM snippet WHERE id = $1", [
			id,
		]);
		return rows[0] || null;
	}

	async findAllSnippets(): Promise<Snippet[]> {
		const { rows } = await client.query("SELECT * FROM snippet");
		return rows;
	}

	async createSnippet(snippet: Snippet): Promise<Snippet> {
		const { rows } = await client.query(
			`INSERT INTO snippet (title, description, code, language_id, user_id, status) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[
				snippet.title,
				snippet.description,
				snippet.code,
				snippet.language_id,
				snippet.user_id,
				snippet.status ?? true,
			],
		);
		return rows[0];
	}

	async updateSnippet(data: {
		id: number;
		title: string;
		description: string;
		code: string;
		language_id: number;
		user_id: number;
		status?: boolean;
		updated_at?: string;
	}): Promise<Snippet | null> {
		const { rows } = await client.query(
			`UPDATE snippet 
			 SET title = $1, description = $2, code = $3, language_id = $4, user_id = $5, status = $6, updated_at = CURRENT_TIMESTAMP 
			 WHERE id = $7 RETURNING *`,
			[
				data.title,
				data.description,
				data.code,
				data.language_id,
				data.user_id,
				data.status ?? true,
				data.id,
			],
		);
		return rows[0] || null;
	}

	async deleteSnippet(id: number): Promise<void> {
		await client.query("DELETE FROM snippet WHERE id = $1", [id]);
	}
}

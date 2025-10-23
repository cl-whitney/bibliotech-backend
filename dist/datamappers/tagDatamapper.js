import { client } from "../database/client.js";
export default new (class TagDataMapper {
	async findTagById(id) {
		const { rows } = await client.query("SELECT * FROM tag WHERE id = $1", [
			id,
		]);
		return rows[0] || null;
	}
	async findAllTags() {
		const { rows } = await client.query("SELECT * FROM tag");
		return rows;
	}
	async createTag(tag) {
		const { rows } = await client.query(
			`INSERT INTO tag (name) 
             VALUES ($1) RETURNING *`,
			[tag.name],
		);
		return rows[0];
	}
	async updateTag(data) {
		const { rows } = await client.query(
			`UPDATE tag 
			 SET name = $1, updated_at = $2 
			 WHERE id = $3 RETURNING *`,
			[data.name, data.updated_at ?? new Date().toISOString(), data.id],
		);
		return rows[0] || null;
	}
	async deleteTag(id) {
		await client.query("DELETE FROM tag WHERE id = $1", [id]);
	}
})();

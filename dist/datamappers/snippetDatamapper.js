import { client } from "../database/client.js";
export default new (class SnippetDataMapper {
    async findSnippetById(id) {
        const { rows } = await client.query("SELECT * FROM snippet WHERE id = $1", [
            id,
        ]);
        return rows[0] || null;
    }
    async findAllSnippets() {
        const { rows } = await client.query("SELECT * FROM snippet");
        return rows;
    }
    async createSnippet(snippet) {
        const { rows } = await client.query(`INSERT INTO snippet (title, description, code, language_id, user_id, status) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
            snippet.title,
            snippet.description,
            snippet.code,
            snippet.language_id,
            snippet.user_id,
            snippet.status ?? true,
        ]);
        return rows[0];
    }
    async updateSnippet(data) {
        const { rows } = await client.query(`UPDATE snippet 
			 SET title = $1, description = $2, code = $3, language_id = $4, user_id = $5, status = $6, updated_at = CURRENT_TIMESTAMP 
			 WHERE id = $7 RETURNING *`, [
            data.title,
            data.description,
            data.code,
            data.language_id,
            data.user_id,
            data.status ?? true,
            data.id,
        ]);
        return rows[0] || null;
    }
    async deleteSnippet(id) {
        await client.query("DELETE FROM snippet WHERE id = $1", [id]);
    }
})();

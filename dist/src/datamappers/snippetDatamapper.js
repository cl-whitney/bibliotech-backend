import { client } from "../database/client.js";
export default new (class SnippetDataMapper {
    async findAllSnippets() {
        const { rows } = await client.query(`
		SELECT 
			s.*,
			json_build_object(
				'id', l.id,
				'name', l.name,
				'slug', l.slug,
				'status', l.status,
				'created_at', l.created_at,
				'updated_at', l.updated_at
			) AS language,
			(
				SELECT json_agg(json_build_object(
					'id', t.id,
					'name', t.name,
					'status', t.status,
					'created_at', t.created_at,
					'updated_at', t.updated_at
				))
				FROM tag t
				JOIN snippets_has_tags st ON st.tag_id = t.id
				WHERE st.snippet_id = s.id
			) AS tags
		FROM snippet s
		LEFT JOIN language l ON l.id = s.language_id
	`);
        return rows;
    }
    async findSnippetById(id) {
        const { rows } = await client.query(`
		SELECT 
			s.*,
			json_build_object(
				'id', l.id,
				'name', l.name,
				'slug', l.slug,
				'status', l.status,
				'created_at', l.created_at,
				'updated_at', l.updated_at
			) AS language,
			(
				SELECT json_agg(json_build_object(
					'id', t.id,
					'name', t.name,
					'status', t.status,
					'created_at', t.created_at,
					'updated_at', t.updated_at
				))
				FROM tag t
				JOIN snippets_has_tags st ON st.tag_id = t.id
				WHERE st.snippet_id = s.id
			) AS tags
		FROM snippet s
		LEFT JOIN language l ON l.id = s.language_id
		WHERE s.id = $1
	`, [id]);
        return rows[0] || null;
    }
    async findSnippetsBySearch(query) {
        const { rows } = await client.query(`
    SELECT 
        s.*,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'slug', l.slug,
            'status', l.status,
            'created_at', l.created_at,
            'updated_at', l.updated_at
        ) AS language,
        (
            SELECT json_agg(json_build_object(
                'id', t.id,
                'name', t.name,
                'status', t.status,
                'created_at', t.created_at,
                'updated_at', t.updated_at
            ))
            FROM tag t
            JOIN snippets_has_tags st ON st.tag_id = t.id
            WHERE st.snippet_id = s.id
        ) AS tags
    FROM snippet s
    LEFT JOIN language l ON l.id = s.language_id
    LEFT JOIN snippets_has_tags sht ON sht.snippet_id = s.id
    LEFT JOIN tag t ON t.id = sht.tag_id
    WHERE 
      LOWER(s.title) LIKE LOWER('%' || $1 || '%')
      OR LOWER(s.description) LIKE LOWER('%' || $1 || '%')
      OR LOWER(l.name) LIKE LOWER('%' || $1 || '%')
      OR LOWER(t.name) LIKE LOWER('%' || $1 || '%')
    GROUP BY s.id, l.id
    ORDER BY s.created_at DESC
  `, [query]);
        return rows.map(r => ({
            ...r,
            tags: r.tags ?? [],
        }));
    }
    async createSnippet(snippet, tagIds = []) {
        const { rows } = await client.query(`INSERT INTO snippet (title, description, code, language_id, user_id, status) 
		 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [
            snippet.title,
            snippet.description,
            snippet.code,
            snippet.language_id,
            snippet.user_id,
            snippet.status ?? true,
        ]);
        const newSnippet = rows[0];
        if (tagIds.length > 0) {
            const values = tagIds.map((tagId) => `(${newSnippet.id}, ${tagId})`).join(", ");
            await client.query(`INSERT INTO snippets_has_tags (snippet_id, tag_id) VALUES ${values}`);
        }
        return this.findSnippetById(newSnippet.id);
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
        const updatedSnippet = rows[0] || null;
        if (!updatedSnippet)
            return null;
        if (data.tagIds) {
            await client.query(`DELETE FROM snippets_has_tags WHERE snippet_id = $1`, [data.id]);
            if (data.tagIds.length > 0) {
                const values = data.tagIds.map((tagId) => `(${data.id}, ${tagId})`).join(", ");
                await client.query(`INSERT INTO snippets_has_tags (snippet_id, tag_id) VALUES ${values}`);
            }
        }
        return this.findSnippetById(data.id);
    }
    async deleteSnippet(id) {
        await client.query(`DELETE FROM snippets_has_tags WHERE snippet_id = $1`, [id]);
        await client.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    }
})();

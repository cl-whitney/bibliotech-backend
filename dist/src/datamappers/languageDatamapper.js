import { client } from "../database/client.js";
export default new (class languageDatamapper {
    async findLanguageBySlug(slug) {
        const { rows } = await client.query("SELECT * FROM language WHERE slug = $1", [slug]);
        return rows[0] || null;
    }
    async findAllLanguages() {
        const { rows } = await client.query("SELECT * FROM language");
        return rows;
    }
})();

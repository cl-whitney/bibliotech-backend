import { client } from "../database/client.js";
import type { Language } from "../types/types.js";

export default new (class languageDatamapper {
	async findLanguageById(id: number): Promise<Language | null> {
		const { rows } = await client.query(
			"SELECT * FROM language WHERE id = $1",
			[id],
		);
		return rows[0] || null;
	}

	async findAllLanguages(): Promise<Language[]> {
		const { rows } = await client.query("SELECT * FROM language");
		return rows;
	}
})();

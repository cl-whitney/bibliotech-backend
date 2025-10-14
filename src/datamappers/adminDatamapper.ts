import { client } from "../database/client.js";
import type { User } from "../types/types.js";

export class adminDataMapper {
	async getAdminbyEmail(email: string): Promise<User | null> {
		const { rows } = await client.query(
			"SELECT * FROM \"user\" WHERE email = $1 AND role = 'admin'",
			[email],
		);
		return rows[0] || null;
	}
}

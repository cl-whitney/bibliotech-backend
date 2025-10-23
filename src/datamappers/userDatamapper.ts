import { client } from "../database/client.js";
import type { User } from "../types/types.ts";

export default new (class userDataMapper {
	async findUserById(id: number): Promise<User | null> {
		const { rows } = await client.query(
			`SELECT * FROM "user" WHERE id = $1 AND status = true`,
			[id],
		);
		return rows[0] || null;
	}

	async findAllUsers(): Promise<User[]> {
		const { rows } = await client.query(
			'SELECT * FROM "user" WHERE status = true',
		);
		return rows;
	}

	async createUser(user: User): Promise<User> {
		const { rows } = await client.query(
			'INSERT INTO "user" (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[user.first_name, user.last_name, user.email, user.password, user.role],
		);
		return rows[0];
	}

	async updateUser(data: {
		id: number;
		first_name: string;
		last_name: string;
		updated_at?: string;
	}): Promise<User | null> {
		const { rows } = await client.query(
			'UPDATE "user" SET first_name = $1, last_name = $2, updated_at = $3 WHERE id = $4 RETURNING *',
			[
				data.first_name,
				data.last_name,
				data.updated_at ?? new Date().toISOString(),
				data.id,
			],
		);
		return rows[0] || null;
	}

	async findUserByEmail(email: string): Promise<User | null> {
		const { rows } = await client.query(
			'SELECT * FROM "user" WHERE email = $1 AND status = true',
			[email],
		);
		return rows[0] || null;
	}

	async deleteUser(id: number): Promise<void> {
		await client.query('DELETE FROM "user" WHERE id = $1', [id]);
	}
})();

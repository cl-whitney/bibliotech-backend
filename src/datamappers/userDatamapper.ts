import { client } from "../database/client";
import type { User } from "../types/types.ts";

export class UserDataMapper {
	async findUserById(id: number): Promise<User | null> {
		const { rows } = await client.query('SELECT * FROM "user" WHERE id = $1', [
			id,
		]);
		return rows[0] || null;
	}

	async findAllUsers(): Promise<User[]> {
		const { rows } = await client.query('SELECT * FROM "user"');
		return rows;
	}

	async createUser(user: User): Promise<User> {
		const { rows } = await client.query(
			'INSERT INTO "user" (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
			[user.first_name, user.last_name, user.email, user.password, user.role],
		);
		return rows[0];
	}

	async updateUser(id: number, user: Partial<User>): Promise<User | null> {
		const { rows } = await client.query(
			'UPDATE "user" SET first_name = $1, last_name = $2, email = $3, password = $4, role = $5 WHERE id = $6 RETURNING *',
			[
				user.first_name,
				user.last_name,
				user.email,
				user.password,
				user.role,
				id,
			],
		);
		return rows[0] || null;
	}

	async deleteUser(id: number): Promise<void> {
		await client.query('DELETE FROM "user" WHERE id = $1', [id]);
	}
}

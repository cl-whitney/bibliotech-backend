import { client } from "../database/client.js";
import Scrypt from "../helpers/scrypt.js";
export default new (class userDataMapper {
    async findUserById(id) {
        const { rows } = await client.query(`SELECT * FROM "user" WHERE id = $1 AND status = true`, [id]);
        return rows[0] || null;
    }
    async findAllUsers() {
        const { rows } = await client.query('SELECT * FROM "user" WHERE status = true');
        return rows;
    }
    async createUser(user) {
        const { rows } = await client.query('INSERT INTO "user" (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user.first_name, user.last_name, user.email, user.password, user.role]);
        return rows[0];
    }
    async updateUser(data) {
        let hashedPassword = null;
        if (data.password) {
            hashedPassword = await Scrypt.hash(data.password);
        }
        let query = `UPDATE "user" SET first_name = $1, last_name = $2, email = $3, updated_at = $4`;
        const params = [
            data.first_name,
            data.last_name,
            data.email,
            data.updated_at ?? new Date().toISOString(),
        ];
        if (hashedPassword) {
            query += `, password = $5 WHERE id = $6 RETURNING *`;
            params.push(hashedPassword, data.id);
        }
        else {
            query += ` WHERE id = $5 RETURNING *`;
            params.push(data.id);
        }
        const { rows } = await client.query(query, params);
        return rows[0] || null;
    }
    async findUserByEmail(email) {
        const { rows } = await client.query('SELECT * FROM "user" WHERE email = $1 AND status = true', [email]);
        return rows[0] || null;
    }
    async deleteUser(id) {
        await client.query('DELETE FROM "user" WHERE id = $1', [id]);
    }
})();

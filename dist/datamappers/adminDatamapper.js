import { client } from "../database/client.js";
export default new (class adminDataMapper {
    async findAdminByEmail(email) {
        const { rows } = await client.query("SELECT * FROM \"user\" WHERE email = $1 AND role = 'admin'", [email]);
        return rows[0] || null;
    }
})();

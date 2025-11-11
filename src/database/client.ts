import 'dotenv/config';
import pg from "pg";

const client = new pg.Client(process.env.PG_URL);

async function connectToDb() {
	await client.connect();
}

connectToDb();

export { client };

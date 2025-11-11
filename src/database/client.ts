import 'dotenv/config';
import pg from "pg";

const client = new pg.Client({
  connectionString: process.env.PG_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

async function connectToDb() {
  try {
    await client.connect();
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Failed to connect to DB:", err);
  }
}

connectToDb();

export { client };

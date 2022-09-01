import knex from "knex";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

export default knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
});

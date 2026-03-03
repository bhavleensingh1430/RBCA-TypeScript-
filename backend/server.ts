import { sql } from "bun";
import express from "express";
import { HighlightSpanKind } from "typescript";
// import dotenv from 'dotenv';

const app = express();

const PORT = 3000;
const result = await sql`SELECT * from users;`;
console.log(result);  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

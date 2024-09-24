import { dirname, resolve } from "node:path";
import { Book } from "./Book";
import { Low } from 'lowdb';
import { JSONFile } from "lowdb/node";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

type Data = {
  books: Book[],
}

const file = resolve(__dirname, 'data.json');
const adapter = new JSONFile<Data>(file);
const db = new Low(adapter, { books: [] });

export default db;

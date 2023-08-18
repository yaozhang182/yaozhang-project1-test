import { sql } from "../database/database.js";

const addItems = async (id, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${id}, ${name})`;
};

const findUncollectedItems = async (id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} AND collected = false ORDER BY name`;
};

const findCollectedItems = async (id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} and collected = true ORDER BY name`;
};

const collectById = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
};


export { addItems, findUncollectedItems, findCollectedItems, collectById };
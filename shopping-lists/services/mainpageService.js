import { sql } from "../database/database.js";

const countLists = async() => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_lists`;
    return rows[0].count;
};

const countItems = async() => {
    const rows = await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
    return rows[0].count;
};

export {countLists, countItems};
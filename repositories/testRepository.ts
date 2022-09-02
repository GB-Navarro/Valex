import { connection } from "../dbStrategy/database.js";

export async function findCompaniesNames(){
    const result = await connection.query('SELECT companies.name FROM companies');
    return result.rows[0];
}


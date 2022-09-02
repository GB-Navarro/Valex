import { Request, Response } from "express";

import { findCompaniesNames } from "../../repositories/testRepository.js";

export default async function exampleController (req: Request,res: Response){
    const companiesNames = await findCompaniesNames();
    res.status(200).send(companiesNames);
}
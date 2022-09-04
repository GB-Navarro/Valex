import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

export default async function cardController (req: Request,res: Response){
    const {id, type} = req.body;
    const apiKey = req.headers.apikey;
    const apiKeyOwnerExists = await cardServices.checkApiKeyOwnerExistence(apiKey.toString());

    if(apiKeyOwnerExists){
        const employeeExists = await cardServices.checkEmployeeExistence(id);
        if(employeeExists){
            const employeeCardTypeExists = await cardServices.checkEmployeeCardTypeExistence(type, id);
            if(employeeCardTypeExists){
                res.status(200).send("O cartão pode ser criado!");
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
    
}
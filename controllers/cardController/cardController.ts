import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

export default async function cardController (req: Request,res: Response){
    const {employeeId, cardType} = req.body;
    const apiKey = req.headers.apikey;
    const apiKeyOwnerExists = await cardServices.checkApiKeyOwnerExistence(apiKey.toString());

    if(apiKeyOwnerExists){
        const employeeExists = await cardServices.checkEmployeeExistence(employeeId);
        if(employeeExists){
            const employeeCardTypeExists = await cardServices.checkEmployeeCardTypeExistence(cardType, employeeId);
            if(employeeCardTypeExists){
                res.status(200).send("O cartão pode ser criado!");
            }else{
                console.log("erro3");
                res.sendStatus(404);
            }
        }else{
            console.log("erro2");
            res.sendStatus(404);
        }
    }else{
        console.log("erro1");
        res.sendStatus(404);
    }
    
}
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
            if(!(employeeCardTypeExists)){
                const card = await cardServices.generateCard(employeeId, cardType);
                res.status(200).send(card);
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
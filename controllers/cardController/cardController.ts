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
                const cardData: any = await cardServices.generateCard(employeeId, cardType);
                await cardServices.createCard(cardData);
                res.sendStatus(201);
            }else{
                res.sendStatus(404);
            }
        }else{
            res.sendStatus(404);
        }
    }else{
        console.log("a");
        res.sendStatus(404);
    }
    
}
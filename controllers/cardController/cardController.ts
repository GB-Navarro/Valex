import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

export default async function cardController (req: Request,res: Response){
    //A api key do checkApiKeyOwnerExistence, deve vir do header
    //A rota de criação do cartão, recebe do body o id do empregado e o tipo do cartão
    const {id, type} = req.body;
    const apiKeyOwnerExists = await cardServices.checkApiKeyOwnerExistence('zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0');

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
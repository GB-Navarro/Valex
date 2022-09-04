import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

export default async function cardController (req: Request,res: Response){
    //A api key do checkApiKeyOwnerExistence, deve vir do header
    //A rota de criação do cartão, recebe do body o id do empregado e o tipo do cartão
    const id = 2;
    const apiKeyOwnerExists = await cardServices.checkApiKeyOwnerExistence('zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0');

    if(apiKeyOwnerExists){
        const employeeExists = await cardServices.checkEmployeeExistence(id);
        if(employeeExists){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }else{
        res.sendStatus(404);
    }
    
}
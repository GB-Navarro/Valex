import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

export default async function cardController (req: Request,res: Response){
    const apiKeyOwnerExists = await cardServices.checkApiKeyOwnerExistence('zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0');

    if(apiKeyOwnerExists){
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
    
}
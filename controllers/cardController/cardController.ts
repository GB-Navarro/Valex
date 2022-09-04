import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

export default async function cardController (req: Request,res: Response){

    const {employeeId, cardType} = req.body;

    const apiKey = req.headers.apikey;

    await cardServices.checkApiKeyOwnerExistence(apiKey.toString());
    await cardServices.checkEmployeeExistence(employeeId);
    await cardServices.checkEmployeeCardTypeExistence(cardType, employeeId);

    const cardData: any = await cardServices.generateCard(employeeId, cardType);
    await cardServices.createCard(cardData);

    res.sendStatus(201);
}
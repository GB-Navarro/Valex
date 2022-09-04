import { Request, Response } from "express";

import cardServices from "../../services/cardServices.js";

async function createCard (req: Request, res: Response){

    const {employeeId, cardType} = req.body;

    const apiKey = req.headers.apikey;

    await cardServices.checkApiKeyOwnerExistence(apiKey.toString());
    await cardServices.checkEmployeeExistence(employeeId);
    await cardServices.checkEmployeeCardTypeExistence(cardType, employeeId);

    const cardData: any = await cardServices.generateCard(employeeId, cardType);
    await cardServices.createCard(cardData);

    res.sendStatus(201);
}

async function activateCard(req: Request, res: Response){
    const {cardId, cardCVC: receivedSecurityCode, cardPassword} = req.body
    const { expirationDate, password, securityCode: encryptedRealSecurityCode } = await cardServices.getCardData(cardId);
    cardServices.checkCardExpirationDate(expirationDate);
    cardServices.checkIfCardHasAlreadyBeenActivated(password);
    cardServices.checkCardSecurityCode(receivedSecurityCode, encryptedRealSecurityCode);
    res.status(200).send("Hello World");
}

const cardController = {
    createCard,
    activateCard
}

export default cardController;
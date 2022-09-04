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
    const {cardId, cardCVC: receivedSecurityCode, cardPassword: receivedPassword} = req.body
    const { expirationDate, password: cardActuallyPassword, securityCode: encryptedRealSecurityCode } = await cardServices.getCardData(cardId);
    
    cardServices.checkCardExpirationDate(expirationDate);
    cardServices.checkIfCardHasAlreadyBeenActivated(cardActuallyPassword);
    cardServices.checkCardSecurityCode(receivedSecurityCode, encryptedRealSecurityCode);
    cardServices.checkReceivedPasswordValidity(receivedPassword);
    cardServices.activateCard(cardId, receivedPassword);

    res.status(202).send("The card has been activated!");
}

const cardController = {
    createCard,
    activateCard
}

export default cardController;
import { NextFunction, Request, Response } from "express";

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
    cardServices.checkReceivedPasswordFormatValidity(receivedPassword);
    await cardServices.activateCard(cardId, receivedPassword);

    res.status(202).send("The card has been activated!");
}

async function viewCardBalance(req: Request, res: Response, next: NextFunction){
    const { cardId } = req.body;

    await cardServices.getCardData(cardId);
    const cardTransactions = await cardServices.getCardTransactions(cardId);
    const cardRecharges = await cardServices.getCardRecharges(cardId);
    const balanceData = cardServices.calculateBalance(cardTransactions, cardRecharges)

    res.status(200).send(balanceData);
}

async function blockCard(req: Request, res: Response, next: NextFunction){
    const { cardId, cardPassword:ReceivedPassword } = req.body;
    const { expirationDate, isBlocked:cardIsBlocked, password:cardPassword } = await cardServices.getCardData(cardId);
    cardServices.checkCardExpirationDate(expirationDate);
    cardServices.checkIfCardAreBlocked(cardIsBlocked);
    cardServices.checkPasswordValidity(ReceivedPassword, cardPassword);
    await cardServices.blockCard(cardId);
    res.status(200).send("The card has been blocked");
}

const cardController = {
    createCard,
    activateCard,
    viewCardBalance,
    blockCard
}

export default cardController;
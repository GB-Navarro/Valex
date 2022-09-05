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
    cardServices.checkIfCardIsInactive(cardActuallyPassword);
    cardServices.checkCardSecurityCode(receivedSecurityCode, encryptedRealSecurityCode);
    cardServices.checkReceivedPasswordFormatValidity(receivedPassword);
    await cardServices.activateCard(cardId, receivedPassword);

    res.status(202).send("The card has been activated!");
}

async function viewCardBalance(req: Request, res: Response){
    const { cardId } = req.body;

    await cardServices.getCardData(cardId);
    const cardTransactions = await cardServices.getCardTransactions(cardId);
    const cardRecharges = await cardServices.getCardRecharges(cardId);
    const balanceData = cardServices.calculateBalance(cardTransactions, cardRecharges)

    res.status(200).send(balanceData);
}

async function blockCard(req: Request, res: Response){
    const { cardId, cardPassword:ReceivedPassword } = req.body;
    const { expirationDate, isBlocked:cardIsBlocked, password:cardPassword } = await cardServices.getCardData(cardId);
    cardServices.checkCardExpirationDate(expirationDate);
    cardServices.checkIfCardAreUnblocked(cardIsBlocked);
    cardServices.checkPasswordValidity(ReceivedPassword, cardPassword);
    await cardServices.blockCard(cardId);
    res.status(200).send("The card has been blocked");
}

async function unblockCard(req: Request, res: Response){
    const { cardId, cardPassword:ReceivedPassword } = req.body;
    const { expirationDate, isBlocked:cardIsBlocked, password:cardPassword } = await cardServices.getCardData(cardId);
    cardServices.checkCardExpirationDate(expirationDate);
    cardServices.checkIfCardAreBlocked(cardIsBlocked);
    cardServices.checkPasswordValidity(ReceivedPassword, cardPassword);
    await cardServices.unblockCard(cardId);
    res.status(200).send("The card has been unblocked");
}

async function rechargeCard(req: Request, res: Response){
    const { cardId, amount } = req.body;
    const { isBlocked, expirationDate } = await cardServices.getCardData(cardId);
    cardServices.checkIfCardAreUnblocked(isBlocked);
    cardServices.checkCardExpirationDate(expirationDate);
    await cardServices.insertCardRecharge(cardId, amount);
    res.status(201).send("The recharge has been inserted");
}

const cardController = {
    createCard,
    activateCard,
    viewCardBalance,
    blockCard,
    unblockCard,
    rechargeCard
}

export default cardController;
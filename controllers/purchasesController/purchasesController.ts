import { Request, Response } from "express";
import companiesServices from "../../services/businessServices.js";
import cardServices from "./../../services/cardServices.js";
import purchasesServices from "./../../services/purchasesServices.js"

async function purchaseAtAPointOfSale(req: Request,res: Response){
    const { cardId, cardPassword: receivedPassword, companieId, amount: paymentValue } = req.body;
    const { isBlocked: isCardBlocked, password:cardPassword, type:cardType } = await cardServices.getCardData(cardId);
    cardServices.checkIfCardIsActive(cardPassword);
    cardServices.checkIfCardAreUnblocked(isCardBlocked);
    cardServices.checkPasswordValidity(receivedPassword, cardPassword);
    const { id:businessId,name:businessName,type:businessType } = await companiesServices.searchABusiness(companieId);
    purchasesServices.compareCardTypeWithBusinessType(cardType,businessType);
    const cardBalance = await cardServices.getCardBalance(cardId);
    purchasesServices.validatePurchaseBalance(cardBalance, paymentValue);
    await purchasesServices.insertPayment(cardId, companieId, paymentValue);

    res.status(200).send("Hello World!");
}

const purchasesController = {
    purchaseAtAPointOfSale
}

export default purchasesController
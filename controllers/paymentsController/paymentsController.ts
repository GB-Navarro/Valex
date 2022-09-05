import { Request, Response } from "express";
import companiesServices from "../../services/businessServices.js";
import cardServices from "../../services/cardServices.js";
import paymentsServices from "../../services/paymentsServices.js"

async function purchaseAtAPointOfSale(req: Request,res: Response){

    const { cardId, cardPassword: receivedPassword, businessId, amount: paymentValue } = req.body;
    const { isBlocked: isCardBlocked, password:cardPassword, type:cardType } = await cardServices.getCardData(cardId);
    
    cardServices.checkIfCardIsActive(cardPassword);
    cardServices.checkIfCardAreUnblocked(isCardBlocked);
    cardServices.checkPasswordValidity(receivedPassword, cardPassword);
    
    const { type:businessType } = await companiesServices.searchABusiness(businessId);
    
    paymentsServices.compareCardTypeWithBusinessType(cardType,businessType);
    
    const cardBalance = await cardServices.getCardBalance(cardId);
    
    paymentsServices.validatePurchaseBalance(cardBalance, paymentValue);
    await paymentsServices.insertPayment(cardId, businessId, paymentValue);

    res.sendStatus(200);
}

const paymentsController = {
    purchaseAtAPointOfSale
}

export default paymentsController
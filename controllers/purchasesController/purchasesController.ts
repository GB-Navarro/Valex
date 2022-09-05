import { Request, Response } from "express";
import companiesServices from "../../services/businessServices.js";
import cardServices from "./../../services/cardServices.js";
import purchasesServices from "./../../services/purchasesServices.js";

async function purchaseAtAPointOfSale(req: Request,res: Response){
    const { cardId, cardPassword: receivedPassword, companieId, amount } = req.body;
    const { isBlocked: isCardBlocked, password:cardPassword, type:cardType } = await cardServices.getCardData(cardId);
    console.log(cardType);
    cardServices.checkIfCardIsActive(cardPassword);
    cardServices.checkIfCardAreUnblocked(isCardBlocked);
    cardServices.checkPasswordValidity(receivedPassword, cardPassword);
    const { id:businessId,name:businessName,type:businessType } = await companiesServices.searchABusiness(companieId);
    console.log(businessType);
    purchasesServices.compareCardTypeWithBusinessType(cardType,businessType);
    

    res.status(200).send("Hello World!");
}

const purchasesController = {
    purchaseAtAPointOfSale
}

export default purchasesController
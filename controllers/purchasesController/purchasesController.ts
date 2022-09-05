import { Request, Response } from "express";
import companiesServices from "../../services/businessServices.js";
import cardServices from "./../../services/cardServices.js";

async function purchaseAtAPointOfSale(req: Request,res: Response){
    const { cardId, cardPassword: receivedPassword, companieId, amount } = req.body;
    const { isBlocked: isCardBlocked, password:cardPassword } = await cardServices.getCardData(cardId);
    cardServices.checkIfCardIsActive(cardPassword);
    cardServices.checkIfCardAreUnblocked(isCardBlocked);
    cardServices.checkPasswordValidity(receivedPassword, cardPassword);
    await companiesServices.searchABusiness(companieId);

    res.status(200).send("Hello World!");
}

const purchasesController = {
    purchaseAtAPointOfSale
}

export default purchasesController
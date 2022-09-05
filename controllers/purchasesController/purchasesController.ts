import { Request, Response } from "express";
import cardServices from "./../../services/cardServices.js";

async function purchaseAtAPointOfSale(req: Request,res: Response){
    const { cardId, cardPassword: receivedPassword, companieId, amount } = req.body;
    const { isBlocked: isCardBlocked, password:cardPassword } = await cardServices.getCardData(cardId);
    cardServices.checkIfCardHasAlreadyBeenActivated(cardPassword);
    cardServices.checkIfCardAreUnblocked(isCardBlocked);
    cardServices.checkPasswordValidity(receivedPassword, cardPassword);
    
    res.status(200).send("Hello World!");
}

const purchasesController = {
    purchaseAtAPointOfSale
}

export default purchasesController
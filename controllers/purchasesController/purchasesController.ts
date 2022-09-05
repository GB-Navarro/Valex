import { Request, Response } from "express";

async function pointsOfSalePurchases(req: Request,res: Response){
    res.status(200).send("Hello World!");
}

const purchasesController = {
    pointsOfSalePurchases
}

export default purchasesController
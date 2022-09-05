import { Request, Response, NextFunction } from "express";

import purchasesSchemas from "./../../schemas/purchasesSchemas.js";

async function validatePointOfSalePurchaseSchema(req: Request, res: Response, next: NextFunction){
    const data = req.body;
    const result = purchasesSchemas.purchaseAtPointOfSaleSchema.validate(data);

    let isDataValid:boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        throw { code: "error_dataDontIsValid", message: result.error.message };
    }
}

const purchasesMiddlewares = {
    validatePointOfSalePurchaseSchema
}

export default purchasesMiddlewares;

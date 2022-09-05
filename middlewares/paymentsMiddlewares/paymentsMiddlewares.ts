import { Request, Response, NextFunction } from "express";

import paymentsSchemas from "../../schemas/paymentsSchemas.js";

async function validatePointOfSalePurchaseSchema(req: Request, res: Response, next: NextFunction){
    const data = req.body;
    const result = paymentsSchemas.purchaseAtPointOfSaleSchema.validate(data);

    let isDataValid:boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        throw { code: "error_dataDontIsValid", message: result.error.message };
    }
}

const paymentsMiddlewares = {
    validatePointOfSalePurchaseSchema
}

export default paymentsMiddlewares;

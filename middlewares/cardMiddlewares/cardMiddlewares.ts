import { Request, Response, NextFunction } from "express";
import cardSchemas from "../../schemas/cardSchemas.js";
function checkApiKeyExistence(req: Request, res: Response, next: NextFunction){
    
    const apiKey = req.headers.apikey;

    if(apiKey === undefined || apiKey === ""){
        res.sendStatus(401);
    }else{
        next();
    }
}

function validateCreateCardSchema(req: Request, res: Response, next: NextFunction){

    const data = req.body;
    const result = cardSchemas.createCardSchema.validate(data);

    let isDataValid:boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        console.log(result);
        res.sendStatus(404);
    }
}

function validateActivateCardSchema(req: Request, res: Response, next: NextFunction){

    const data = req.body;
    const result = cardSchemas.activateCardSchema.validate(data);

    let isDataValid:boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        throw { code: "error_dataDontIsValid", message: result.error.message };
    }
}

function validateCardBalanceSchema(req: Request, res: Response, next: NextFunction){

    const data = req.body;
    const result = cardSchemas.cardBalanceSchema.validate(data);

    let isDataValid: boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        throw { code: "error_dataDontIsValid", message: result.error.message };
    }
}

function validateBlockCardSchema(req: Request, res: Response, next: NextFunction){

    const data = req.body;
    const result = cardSchemas.blockCardSchema.validate(data);

    let isDataValid: boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        throw { code: "error_dataDontIsValid", message: result.error.message };
    }
}

function validateRechargeCardSchema(req: Request, res: Response, next: NextFunction){

    const data = req.body;
    const result = cardSchemas.rechargeCardSchema.validate(data);

    let isDataValid: boolean;

    if(result.error === undefined){
        isDataValid = true;
        next();
    }else{
        isDataValid = false;
        throw { code: "error_dataDontIsValid", message: result.error.message };
    }
}

const cardMiddlewares = {
    checkApiKeyExistence,
    validateCreateCardSchema,
    validateActivateCardSchema,
    validateCardBalanceSchema,
    validateBlockCardSchema,
    validateRechargeCardSchema
}

export default cardMiddlewares;
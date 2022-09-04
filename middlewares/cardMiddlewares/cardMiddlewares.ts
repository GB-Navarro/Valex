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

const cardMiddlewares = {
    checkApiKeyExistence,
    validateCreateCardSchema
}

export default cardMiddlewares;
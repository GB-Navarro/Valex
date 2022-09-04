import { Request, Response, NextFunction } from "express";

function checkApiKeyExistence(req: Request, res: Response, next: NextFunction){
    
    const apiKey = req.headers.apikey;

    if(apiKey === undefined || apiKey === ""){
        res.sendStatus(401);
    }else{
        next();
    }
}

function validateCardType(req: Request, res: Response, next: NextFunction){

    const cardTypes = ["groceries","restaurant","transport","education","health"];
    const { cardType } = req.body;
    const result = cardTypes.find((element) => element === cardType);

    let isCardTypeValid:boolean;

    if(result != undefined){
        isCardTypeValid = true;
        next();
    }else{
        isCardTypeValid = false;
        res.sendStatus(404);
    }

}

const cardMiddlewares = {
    checkApiKeyExistence,
    validateCardType
}

export default cardMiddlewares;
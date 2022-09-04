import { Request, Response, NextFunction } from "express";

function checkApiKeyExistence(req: Request, res: Response, next: NextFunction){
    const apiKey = req.headers.apikey;
    if(apiKey === undefined || apiKey === ""){
        res.sendStatus(401);
    }else{
        next();
    }
}

const cardMiddlewares = {
    checkApiKeyExistence
}

export default cardMiddlewares;
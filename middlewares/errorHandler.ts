import { Request, Response, NextFunction } from "express";

export default async function errorHandler(error:any, req: Request, res: Response, next: NextFunction){
    if (error.code === "error_apiKeyHasNoOwner" || error.code === "error_employeeDontExist" || error.code === "error_cardDoesNotExist"){
        return res.status(404).send({message: error.message});
    }
    if(error.code === "error_employeeAlreadyHasThisTypeOfCard"){
        return res.status(406).send({message: error.message});
    }
    if(error.code === "error_dataDontIsValid"){
        return res.status(400).send({message: error.message});
    }
    if(error.code === "error_cardExpired"){
        return res.status(401).send({message: error.message});
    }
    return res.sendStatus(500);  
}
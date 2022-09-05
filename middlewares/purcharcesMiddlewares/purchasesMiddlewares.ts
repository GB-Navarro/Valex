import { Request, Response, NextFunction } from "express";

async function exampleMiddleware(req: Request, res: Response, next: NextFunction){
    next();
}

const purchasesMiddlewares = {
    exampleMiddleware
}

export default purchasesMiddlewares;

import { RequestHandler } from "express";

const exampleMiddleware: RequestHandler = (req,res,next) => {
    next();
}

const exampleMiddlewares = {
    exampleMiddleware
}

export default exampleMiddlewares;

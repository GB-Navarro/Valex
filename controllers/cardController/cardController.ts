import { Request, Response } from "express";

export default async function cardController (req: Request,res: Response){
    res.status(200).send("Hello World!");
}
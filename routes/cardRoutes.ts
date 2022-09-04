import { Router } from "express";

import cardController from "../controllers/cardController/cardController.js";

const cardRouter = Router();

cardRouter.post("/createCard", cardController);

export default cardRouter;
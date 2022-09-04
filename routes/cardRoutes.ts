import { Router } from "express";

import cardMiddlewares from "../middlewares/cardMiddlewares/cardMiddlewares.js";
import cardController from "../controllers/cardController/cardController.js";

const cardRouter = Router();

cardRouter.post("/createCard", cardMiddlewares.checkApiKeyExistence, cardMiddlewares.validateCreateCardSchema, cardController.createCard);
cardRouter.post("/activateCard", cardMiddlewares.validateActivateCardSchema, cardController.activateCard);
cardRouter.get("/viewCardBalance", cardMiddlewares.validateViewCardBalanceSchema ,cardController.viewCardBalance);
cardRouter.post("/blockCard", cardMiddlewares.validateBlockCardSchema, cardController.blockCard);
cardRouter.post("/unblockCard", cardMiddlewares.validateBlockCardSchema, cardController.unblockCard);

export default cardRouter;
import { Router } from "express";

import paymentsController from "../../controllers/paymentsController/paymentsController.js";
import paymentsMiddlewares from "../../middlewares/paymentsMiddlewares/paymentsMiddlewares.js";

const paymentsRouter = Router();

paymentsRouter.post("/purchases", paymentsMiddlewares.validatePointOfSalePurchaseSchema ,paymentsController.purchaseAtAPointOfSale);

export default paymentsRouter;
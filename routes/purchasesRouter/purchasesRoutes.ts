import { Router } from "express";

import purchasesController from "../../controllers/purchasesController/purchasesController.js";
import purchasesMiddlewares from "../../middlewares/purcharcesMiddlewares/purchasesMiddlewares.js";

const purchasesRouter = Router();

purchasesRouter.post("/purchases", purchasesMiddlewares.validatePointOfSalePurchaseSchema ,purchasesController.pointsOfSalePurchases);

export default purchasesRouter;
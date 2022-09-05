import { Router } from "express";

import purchasesController from "../../controllers/purchasesController/purchasesController.js";

const purchasesRouter = Router();

purchasesRouter.post("/purchases", purchasesController.pointsOfSalePurchases);

export default purchasesRouter;
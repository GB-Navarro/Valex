import { Router } from "express";

import exampleRouter from "./exampleRouter/exampleRoutes.js";
import cardRouter from "./cardRoutes.js";
import purchasesRouter from "./purchasesRouter/purchasesRoutes.js";

const router = Router();

router.use(exampleRouter);
router.use(cardRouter);
router.use(purchasesRouter);

export default router
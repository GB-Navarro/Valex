import { Router } from "express";

import cardRouter from "./cardRoutes.js";
import paymentsRouter from "./paymentsRouter/paymentsRouter.js";

const router = Router();

router.use(cardRouter);
router.use(paymentsRouter);

export default router
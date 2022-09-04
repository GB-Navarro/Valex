import { Router } from "express";

import exampleRouter from "./exampleRouter/exampleRoutes.js";
import cardRouter from "./cardRoutes.js";

const router = Router();

router.use(exampleRouter);
router.use(cardRouter);

export default router
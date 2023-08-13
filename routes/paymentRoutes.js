import express from "express";
const router = express.Router();

import { protectRoute } from "../controllers/authController.js";
import { checkoutSession } from "../controllers/paymentController.js";

router.use(protectRoute);
router.get("/checkout-session/:productId", checkoutSession);

export { router };

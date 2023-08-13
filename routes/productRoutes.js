import express from "express";

import {
    getAllProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

import { protectRoute, restrictRoute } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protectRoute, restrictRoute("super-admin"), createProduct);
router
    .route("/:id")
    .get(getProduct)
    .patch(protectRoute, restrictRoute("super-admin"), updateProduct)
    .delete(protectRoute, restrictRoute("super-admin"), deleteProduct);

export { router };

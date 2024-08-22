import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";

const router = Router();

router.get("/get", getProducts);
router.get("/create", createProduct);

export default router;
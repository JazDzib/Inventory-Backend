import { Router } from "express";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";

const router = Router();

router.use('/products', productRoutes);
router.use ('/categories', categoryRoutes );

export default router;
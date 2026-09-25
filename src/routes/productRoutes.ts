import { Router } from "express";
import { getAll, create, update, remove, getOne} from "../controllers/productController";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne)
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove)
export default router;
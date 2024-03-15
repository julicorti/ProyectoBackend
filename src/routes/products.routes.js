
import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { authorization } from "../middlewares/auth.js";
const productsRouter = Router();
productsRouter.get('/', authorization('User'), productsController.getProducts);
productsRouter.get('/:pId', authorization('User'), productsController.getProductById);
productsRouter.post('/', authorization('User'), productsController.addProduct) ; 
productsRouter.put('/:pId', authorization('Admin'),productsController.updateProduct);
productsRouter.delete('/:pId', authorization('Admin'),productsController.deleteProduct);

export default productsRouter;

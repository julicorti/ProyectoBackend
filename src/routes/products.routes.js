
import { Router } from "express";
import productsController from "../controllers/products.controller.js";
const productsRouter = Router();
productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:pId', productsController.getCarts);
productsRouter.post('/', productsController);//falta hacer
productsRouter.put('/:pId', productsController.updateProduct);
productsRouter.delete('/:pId', productsController.deleteProduct);

export default productsRouter;

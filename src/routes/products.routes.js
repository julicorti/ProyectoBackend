
import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { generateProducts } from "./utils.js";
import { authorization } from "../middlewares/auth.js";
const productsRouter = Router();
productsRouter.get('/', /* authorization('User'),  */ productsController.getProducts);
productsRouter.get('/:pId', productsController.getProductById);
productsRouter.post('/', /* authorization('User'),  */productsController.addProduct) ; 
productsRouter.put('/:pId', /* authorization('Admin'), */productsController.updateProduct);
productsRouter.delete('/:pId', /* authorization('Admin'), */productsController.deleteProduct);
productsRouter.post('/mockingproducts',/* authorization('User'), */productsController.generateProduct);

export default productsRouter;

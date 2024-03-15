import cartsController from "../controllers/carts.controller.js";
import { Router } from "express";


const router = new Router();

router.get('/', cartsController.getCarts);
router.get('/:cId', cartsController.getId);
router.post('/:cId/product/:pId', cartsController.addProductToCart);
router.post('/', cartsController.addCart);
router.delete('/:cId', cartsController.deleteCartById);
router.delete('/:cId/products/:pId', cartsController.deleteProductInCart);
router.put('/:cId', cartsController.updateCartById);
router.put('/:cId/products/:pId', cartsController.updateProductInCart);
router.get('/:cId/purchase', cartsController.finalizar);
export default router;



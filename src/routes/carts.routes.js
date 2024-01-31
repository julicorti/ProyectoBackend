import { Router } from "express";

import { CartMongoManager } from "../../dao/ManagerDB/cartManagerMongo.js";
const cartsRouter = Router();

cartsRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query
    const carts = new CartMongoManager();

    const resultado = await carts.getCarts()

    if (resultado.message==="OK")
    {
      //Si no tiene limite, devuelve todos los productos
      if (!limit) 
        return res.status(200).json(resultado)

      const productsLimit = resultado.rdo.slice(0, limit)
      return res.status(200).json(productsLimit)
    }
    res.status(400).json(resultado)
  } 
  catch (err) {
    res.status(400).json({ message: "Error al obtener los carritos" + err.menssage })
  }
})
cartsRouter.get("/:cId", async (req, res) => {
  const { cId } = req.params;
  const cartById = await CartMongoManager.getCartById(cId);
  if (!cartById) {
    res.status(404).send({ message: "cart not found" });
  }
  res.send(cartById);
});
cartsRouter.post('/:cId/product/:pId', async(req, res)=>{
  try{
    const {cId, pId} = req.params;
    const newQuantity =  req.body.quantity;
    const carts = new CartMongoManager();
    console.log({cId, pId, newQuantity});
    const result = await carts.addProductsInCart(cId, pId, newQuantity)

    if (result){
      return res.status(200).json({message: 'Product added'});
    }
    res.status(400).json({message: 'could not add product'});
  }
  catch(err){
    res.status(400).send({err});
  }

})
cartsRouter.post("/", async (req, res) => {
  const carts = new CartMongoManager();
  const cartAdded = await carts.addCart({products: []});
  if (!cartAdded) {
    return res.status(400).send({ message: "error: cart not added" });
  }
  res.send(cartAdded);
});
cartsRouter.post("/:cId/product/:pId",async (req,res)=>{

  try{
    const {cId, pId} = req.params
    const newQuantity =  req.body.quantity
    const carts = new CartMongoManager()
    console.log({cId, pId, newQuantity});
    const result = await carts.addProductsInCart(cId, pId, newQuantity)

    if (result){
      return res.status(200).json({message: 'Product added'});
    }
    res.status(400).json({message: 'could not add product'});
  }
  catch(err){
    res.status(400).send({err});
  }
})
cartsRouter.delete('/:cId',async (req,res)=>{
  try{
    const {cId} = req.params
    const carts = new CartMongoManager()

    const deleted = await carts.deleteAllProductsInCart(cId);

    if (deleted)
      return res.status(200).json({message: 'Products deleted'});

    return res.status(404).json({menssage: 'could not delete products'});
  }
  catch(err){
    res.status(400).json({menssage: err})
  }
})
cartsRouter.delete('/:cId/products/:pId', async (req, res) => {
  const { cId, pId } = req.params;
  const cartManager = new CartMongoManager();
  try {
    const result = await cartManager.deleteProductInCart(cId, pId);
    if(result){
      res.send({message: 'Product deleted'});
    }
    else{
      res.status(400).json({message: 'could not delete product'});
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'could not delete product'});
  }
});
cartsRouter.put('/:cId', async (req, res) => {
  const cartManager = new CartMongoManager();
  const { cId } = req.params;
  const cart = req.body;
  try {
    const result = await cartManager.updateCart(cId, cart);
    if(result.modifiedCount > 0){
      res.send({message: 'Cart updated'});
    }
    else{
      res.status(400).send({message: 'Could not update cart'});
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({message: 'Could not update cart'});
  }
});

cartsRouter.put('/:cId/products/:pId', async (req, res) => {
  const { cId, pId } = req.params;
  const { quantity } = req.body;
  const cartManager = new CartMongoManager();
  const result = await cartManager.updateProductInCart(cId, pId, quantity);
  if(result){
    res.send({message: 'Product updated'});
  }
  else{
    res.status(400).send({message: 'could not update product'});
  }
});
export default cartsRouter;

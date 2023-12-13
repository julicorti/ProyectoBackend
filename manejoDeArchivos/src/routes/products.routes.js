
import ProductManager from "../ProductManager.js";
import { Router } from "express";
const productsRouter = Router();
const productManager = new ProductManager("./src/products.json");

productsRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  let products = await productManager.getProducts();
  if (!limit) {
    return res.send(products);
  }
  let newProducts = [];
  for (let i = 0; i < limit; i++) {
    newProducts.push(products.products[i]);
  }
  return res.send(newProducts);
});
productsRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.getProductById(pid);
  
  res.send(products);
});

productsRouter.post("/", async(req, res)=>{

 /*  const nuevoProducto = req.body;

  if (!nuevoProducto || !nuevoProducto.stock || !nuevoProducto.description || !nuevoProducto.price || !nuevoProducto.title || !nuevoProducto.thumnail) {
    return res.status(400).json({ error: 'Por favor, proporcione todos los campos del producto.' });
  }

  const addedProduct = productManager.addProduct(nuevoProducto);

  res.send(addedProduct); */
  const nuevoProducto = req.body;

  try {
    const addedProduct = productManager.addProduct(nuevoProducto);
    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
productsRouter.put('/:pId', async(req, res) =>{
    const productId = productManager.getProductById()
    const updateProd = req.body;
    const upadteProduct = productManager.updateProduct(productId, updateProd);
    if (!upadteProduct) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
  
    res.json(upadteProduct);
})


productsRouter.delete('/:pId', async(req, res) =>{
  const {pId} = req.params;
  const productDeleted = await productManager.deleteProduct(pId);
  if(!productDeleted){
   return res.status(404).send({message: 'product not found'});
  }
  return res.send({message: 'product deleted'});
});
export default productsRouter;

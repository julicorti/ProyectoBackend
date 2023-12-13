
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
/* productsRouter.post("/products", async (req, res) => {
  let products = await productManager.getProducts();
  const nuevoProd = req.body;
  const id = nuevoProd.lebgth + 1;
  products.push({ ...nuevoProd, id });
  res.send({ status: "OK", message: "Producto Creado" });
}); */
productsRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await productManager.getProductById(pid);

  res.send(products);
});

export default productsRouter;

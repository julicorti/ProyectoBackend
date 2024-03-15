import { ProductMongoManager } from "../../dao/ManagerDB/productMongo.js";
import ProductDTO from "../../dao/dtos/product.dto.js";
import Product from "../service/products.service.js";

class Products {
  async getProducts(req, res) {
    try {
      const { limit = 10, page = 1, query = "", sort = "" } = req.query;
      const resultado = await Product.getProducts(limit, page, query, sort);
      if (resultado) {
        res.send(resultado);
      } else {
        res.status(400).json({ message: "Not found" });
      }
    } catch (err) {
      console.log({ err });
      res
        .status(400)
        .json({ message: "Error al obtener los productos" + err.menssage });
    }
  }
  async getProductById(req, res) {
    try {
      const { pId } = req.params;
      const resultado = await Product.getProductById(pId);
      if (resultado.message === "OK") {
        return res.status(200).json(resultado);
      }
      res.status(400).json(resultado);
    } catch (err) {
      res.status(400).json({ message: "El producto no existe" });
    }

    /*   res.send(products); */
  }

  async addProduct(req, res) {
    try {
      const resultado = await Product.addProduct();
      if (resultado.message === "OK") {
        return res.status(200).json(resultado);
      }
      res.status(400).json(resultado);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  async updateProduct(req, res) {
    try {
      const id = req.params.pId;
      const updateProd = req.body;
      const updateResult = await Product.updateProduct(id, updateProd);
      if (!updateResult.message === "OK") {
        return res.status(200).json(updateResult);
      }

      res.status(400).json(updateResult);
    } catch (error) {
      res.status(400).json({ menssage: "err" });
    }
  }

  async deleteProduct(req, res) {
    const { pId } = req.params;
    try {
      const products = new ProductMongoManager();
      const productDeleted = await products.deleteProduct({ _id: pId });
      if (productDeleted.message === "OK")
        return res.status(200).json(productDeleted.rdo);

      return res.status(404).json(productDeleted.rdo);
    } catch (err) {
      res.status(400).json({ menssage: err });
    }
  }
}
export default new Products();

import { ProductMongoManager } from "../../dao/ManagerDB/productMongo.js";
import ProductDTO from "../../dao/dtos/product.dto.js";
import { generateProducts } from "../routes/utils.js";
import CustomErrors from "../service/errors/CustomError.js";
import ErrorEnum from "../service/errors/error.enum.js";
import Product from "../service/products.service.js";
import { addLogger } from "../utils/logger.js";
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
      req.logger.error('Error al obtener los productos:', err);
      CustomErrors.createError({
        name: 'GetProductError',
        cause: 'Database error',
        message: 'No se pudo obtener los productos.',
        code: ErrorEnum.GET_PRODUCTS
      })
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
        req.logger.error('Error al obtener el producto por ID:', err);
        CustomErrors.createError({
            name: 'GetProductByIdError',
            cause: 'Database error',
            message: 'No se pudo obtener el producto.',
            code: ErrorEnum.PRODUCT_NOT_FOUND
        });
        res.status(500).json({ message: 'Error al obtener el producto por ID' });
    }
}

async addProduct(req, res) {
  try {
      const resultado = await Product.addProduct(req.body); // Asegúrate de pasar los datos correctos
      if (resultado.message === "OK") {
          return res.status(200).json(resultado);
      }
      res.status(400).json(resultado);
  } catch (err) {
      req.logger.error('Error al agregar producto:', err);
      const customError = CustomErrors.createError({
          name: 'CreateProductError',
          message: 'No se pudo crear el producto.',
          cause: 'Database error',
          code: 5
      });
      // Devolver una respuesta al cliente
      return res.status(500).json({ message: customError.message, code: customError.code, cause: customError.cause });
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
      req.logger.error('Error al actualizar producto:', error);
      res.status(400).json({ menssage: "err" });
    }
  }

  async deleteProduct(req, res) {
    const { pId } = req.params;
    try {
        const products = new ProductMongoManager();
        const productDeleted = await products.deleteProduct({ _id: pId });
        if (productDeleted.message === "OK") {
            return res.status(200).json(productDeleted.rdo);
        }
        res.status(404).json(productDeleted.rdo);
    } catch (err) {
        req.logger.error('Error al eliminar producto:', err);
        res.status(500).json({ message: 'Error al eliminar el producto' });
    }
}
  async generateProduct(req, res) {
    try {
        const productos = generateProducts();
        res.send("Se almacenó con éxito!");
        res.json(productos);
    } catch (error) {
        req.logger.error('Error al generar producto:', error);
        CustomErrors.createError({
            name: 'GenerateProductError',
            cause: 'Database error',
            message: 'No se pudo generar el producto.',
            code: ErrorEnum.GENERATE_PRODUCT_ERROR
        });
        res.status(500).json({ message: 'Error al generar el producto' });
    }
}

}
export default new Products();


import { Router } from "express";
const productsRouter = Router();
import { uploader } from "../utils/multer.js";
import { productModel } from "../../dao/models/products.model.js";
import { ProductMongoManager } from "../../dao/ManagerDB/productMongo.js";
productsRouter.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, query = '', sort = '' } = req.query;
    const products = new ProductMongoManager()

    const resultado = await products.getProducts(limit, page, query, sort);
    if(resultado){
      res.send(resultado);
    }
    else{
      res.status(400).json({message: 'Not found'})
    }
  } 
  catch (err) {
    console.log({err});
    res.status(400).json({ message: "Error al obtener los productos" + err.menssage })
  }
  
});
productsRouter.get("/:pId", async (req, res) => {
  try{
    const {pId}=req.params
    const products = new ProductMongoManager()

    const resultado = await products.getProductById(pId)
    if (resultado.message==="OK"){
      return res.status(200).json(resultado)
    }
    res.status(400).json(resultado)
  }
  catch(err)
  {
    res.status(400).json({message: "El producto no existe"})
  }
  
/*   res.send(products); */
});

productsRouter.post("/", uploader.single('file')  ,async (req, res)=>{

  try {
    const products = new ProductMongoManager();
    const nuevoProducto = req.body;
    /* const path = req.file.path.split('public').join('');
    console.log({...nuevoProducto, thumbnail: path})
    const addedProduct = await productModel.create({...nuevoProducto, thumbnail: path}); */
    const resultado = await products.addProduct(nuevoProducto)  
    if (resultado.message==="OK"){
      return res.status(200).json(resultado)
    }
    res.status(400).json(resultado)
  
  } catch (error) {
    res.status(400).json({message: error})
  }
})
productsRouter.put('/:pId', async(req, res) =>{
  
  try {
      const id = req.params.pId
      const updateProd = req.body;
      const products = new ProductMongoManager();
    
      const updateResult = await products.updateProduct({_id: id}, updateProd);
      if (!updateResult.message==="OK") {
        return res.status(200).json(updateResult)
      }
    
      res.status(400).json(updateResult)
      
    } catch (error) {
      res.status(400).json({menssage: 'err'})
    }
})


productsRouter.delete('/:pId', async(req, res) =>{
  const {pId} = req.params;
  try {
    const products = new ProductMongoManager();
    const productDeleted = await products.deleteProduct({_id: pId});
    if (productDeleted.message==="OK")
      return res.status(200).json(productDeleted.rdo)

    return res.status(404).json(productDeleted.rdo)
  }
  catch(err){
    res.status(400).json({menssage: err})
  }
 
});
export default productsRouter;

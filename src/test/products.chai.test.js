import mongoose from "mongoose";
import Products from "../../dao/products.dao.js";
import { expect } from "chai"; // Importamos solo la función 'expect' de Chai

// Intentamos conectar a la base de datos y manejamos cualquier error que ocurra
try {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}

describe("Testing de ProductsDao", () => {
  before(async function () {
    // Verificamos que la conexión a la base de datos se haya realizado con éxito antes de continuar
    if (mongoose.connection.readyState !== 1) {
      console.error("No se pudo conectar a la base de datos. Las pruebas no se ejecutarán.");
      this.skip(); // Se salta las pruebas si no se pudo conectar a la base de datos
    }

    this.productDao = new Products();
  });

  beforeEach(async function () {
    this.timeout(5000);
    await mongoose.connection.collections.products.drop();
  });

  after(async function () {
    await mongoose.connection.close();
  });

  it("El método 'get' debe devolver un arreglo de productos", async function () {
    const result = await this.productDao.get();
    expect(result).to.be.an("array");
  });
  it("El Dao debe agregar un producto correctamente a la base de datos", async function () {
   const mockedProduct = {
     title: "new balance",
     description: "new balance 550",
     price: "70",
     stock: "50",
     status: true,
     category: "M",
     available: true,
     thumbnail:
       "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.revistagq.com%2Fmoda%2Farticulo%2Fnew-balance-550-tendencia-zapatillas-blancas&psig=AOvVaw0vO6wX7nkY4NXxCFAoswzi&ust=1710890078217000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCPjKqq34_oQDFQAAAAAdAAAAABAI",
   };
   const result = await this.productDao.save(mockedProduct);
   expect(result).to.be.an('object');
   expect(result).to.not.be.empty;
  });
  it('Verificar el delete del DAO', async function(){
    const mockedProduct = {
        first_name: 'Fernando',
        last_name: 'Giraudo',
        email: 'fergiraudo91@gmail.com',
        password: '123456789'
    }

    const result = await this.productDao.save(mockedProduct);
    const deletedProduct = await this.productDao.delete(result._id);
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    expect(deletedProduct._id).to.match(objectIdRegex);
    const searchDeletedUser = await this.productDao.getBy({_id: result._id});
    expect(searchDeletedUser).to.not.exist;
});
it('Verificar el update del DAO', async function(){
    const mockedProduct = {
        title: "new balance",
        description: "new balance 550",
        price: "70",
        stock: "50",
        status: true,
        category: "M",
        available: true,
        thumbnail:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.revistagq.com%2Fmoda%2Farticulo%2Fnew-balance-550-tendencia-zapatillas-blancas&psig=AOvVaw0vO6wX7nkY4NXxCFAoswzi&ust=1710890078217000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCPjKqq34_oQDFQAAAAAdAAAAABAI",
    }

    const result = await this.productDao.save(mockedProduct);
    const dataToModified = {
        title: "new balance",
        description: "new balance 550",
        price: "70",
        stock: "50",
        status: true,
        category: "M",
        available: true,
        thumbnail:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.revistagq.com%2Fmoda%2Farticulo%2Fnew-balance-550-tendencia-zapatillas-blancas&psig=AOvVaw0vO6wX7nkY4NXxCFAoswzi&ust=1710890078217000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCPjKqq34_oQDFQAAAAAdAAAAABAI",
    }
    
    await this.productDao.update(result._id, dataToModified);
    const productModified = await this.productDao.getBy({_id: result._id});
    expect(productModified.title).to.be.equal(dataToModified.title);
    expect(productModified.description).to.be.equal(dataToModified.description);
    expect(productModified.price).to.be.equal(dataToModified.price);
    expect(productModified.stock).to.be.equal(dataToModified.stock);
    expect(productModified.status).to.be.equal(dataToModified.status);
    expect(productModified.category).to.be.equal(dataToModified.category);
    expect(productModified.available).to.be.equal(dataToModified.available);
    expect(productModified.thumbnail).to.be.equal(dataToModified.thumbnail);
});
});





 

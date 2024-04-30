import mongoose from "mongoose";
import Products from "../../dao/products.dao.js";
import Assert from "assert";

const assert = Assert.strict;
mongoose.connect(
  "mongodb+srv://admin:admin@julieta.8xkj6p9.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

describe("Testing de UserDao", () => {
  before(function () {
    this.productDao = new Products();
  });

  beforeEach(function () {
    this.timeout(5000);
    mongoose.connection.collections.products.drop();
  });

  it("El get debe devolver un arreglo", async function () {
    const result = await this.productDao.get();
    assert.strictEqual(Array.isArray(result), true);
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
    assert.ok(result._id);
  });

  

  
   
});

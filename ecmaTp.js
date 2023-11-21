class ProductManager {
  static numID = 0;
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    let p = new Product(
      ++this.constructor.numID,
      title,
      description,
      price,
      thumbnail,
      stock,
      code
    );
    this.products.push(p);
  }
  getProductById(id) {
    let found = "Not Found";

    this.products.map((p) => {
      if (p.id == id) {
        found = p
      }
    });
    return found;
  }
  getProducts() {
    return this.products;
  }
}

class Product {
  constructor(id, title, description, price, thumbnail, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = Math.floor(Math.random() * 100);
  }
}

const PM = new ProductManager();
// agregar productos
PM.addProduct(
  "Remera",
  "La colección Vans X Stranger Things 4 da vida al mundo de Stranger Things.",
  31,
  "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2023/6/12/8476868.jpg",
  20
);
PM.addProduct(
  "Remera",
  "La colección Vans X Stranger Things 4 da vida al mundo de Stranger Things.",
  31,
  "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2023/6/12/8476868.jpg",
  20
);
PM.addProduct(
  "Remera",
  "La colección Vans X Stranger Things 4 da vida al mundo de Stranger Things.",
  31,
  "https://mmgrim2.azureedge.net/MediaFiles/Grimoldi/2023/6/12/8476868.jpg",
  20
);

console.log(PM.getProducts());
// console.log(PM.getProductById(5))
// console.log(PM.getProductById(1))
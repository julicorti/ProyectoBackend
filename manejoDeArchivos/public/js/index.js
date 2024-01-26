const socket = io();
const contenedorProducts = document.getElementById("contenedorProducts");
const formulario = document.getElementById("formulario");

socket.on("messageLogs", (data) => {
  let messages = "";
  data.forEach((message) => {
    messages += `${message.user} dice: ${message.data}<br />`;
  });
  outPutData.innerHTML = messages;
});
socket.on("newConnection", (data) => {
  console.log(data);
});
socket.on("loadProducts", (data) => {
  data.map((p) => {
    contenedorProducts.innerHTML += `
 
    
    <div id="Product_${p.id}">
    <div class="contenedor">
    <div class="bordeDelContenido">
    <div class="contenidoDelProducto">
    <div class="cont">
    <h1 id="title">${
      p.title
    } </h1> <button id="btn-delete" onclick="deleteProduct(${p.id})">X</button>
    </div>
    
    <img class="img" src="${p.thumbnail}">
    <div>Descripcion: ${p.description}</div>
    <div>Precio: ${p.price} </div>
    <div>Stock: ${p.stock}</div>
    <div> ${p.available ? "✔️" : "❌"}</div>
    <div>Categoria: ${p.category}</div>   
    
    </div>
    </div>
    </div>
    
    </div>
 
    `;
    
  });
  
});
socket.on("deleteProduct", (id) => {
  let div = document.getElementById(`Product_${id}`);
  div.remove();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);

  let div = document.getElementById(`Product_${id}`);
  div.remove();
}
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  let data = {};

  try {
    let f = e.target[3].files[0];
    let image64 = await toBase64(f);
    data.image = { name: f.name, data: image64, type: f.type };

    data.title = e.target[0].value;
    data.description = e.target[1].value;
    data.price = e.target[2].value;
    data.stock = e.target[4].value;
    data.available = e.target[5].checked;
    data.category = e.target[6].value;

    socket.emit("createProduct", data);

    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[4].value = "";
    e.target[5].checked = true;
    e.target[6].value = "";
  } catch (error) {
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[4].value = "";
    e.target[5].checked = true;
    e.target[6].value = "";
    console.error(error);
    Toastify({
      text: "Error al crear Producto",
      style: {
        background:
          "linear-gradient(90deg, rgba(255,170,121,1) 0%, rgba(255,0,0,1) 100%)",
      },
    }).showToast();
  }
});
socket.on("createProduct", (data) => {
  console.log(data);

  contenedorProducts.innerHTML += `
 
    
  <div id="Product_${data.id}">
  <div class="contenedor">
  <div class="bordeDelContenido">
  <div class="contenidoDelProducto">
  <div class="cont">
  <h1 id="title">${
    data.title
  } </h1> <button id="btn-delete" onclick="deleteProduct(${data.id})">X</button>
    </div>
  
  <img class="img" src="${data.thumbnail}">
  <div>Descripcion: ${data.description}</div>
  <div>Precio: ${data.price} </div>
  <div>Stock: ${data.stock}</div>
  <div> ${data.available ? "✔️" : "❌"}</div>
  <div>Categoria: ${data.category}</div>   
  
  </div>
  </div>
  </div>
  </div>
 
    `;
});

socket.on("error", (data) => {
  console.error(data);
  Toastify({
    text: data,
    style: {
      background:
        "linear-gradient(90deg, rgba(255,170,121,1) 0%, rgba(255,0,0,1) 100%)",
    },
  }).showToast();
});

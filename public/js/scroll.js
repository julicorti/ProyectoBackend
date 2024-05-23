document.addEventListener('DOMContentLoaded', function() {
    const productsBtn = document.getElementById('productsBtn');
    const productsSection = document.getElementById('products');
  
    productsBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del enlace
      productsSection.scrollIntoView({
        behavior: 'smooth' // Hace que el desplazamiento sea suave
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const productsBtn = document.getElementById('productsBtn2');
    const productsSection = document.getElementById('products2');
  
    productsBtn.addEventListener('click', function(event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del enlace
      productsSection.scrollIntoView({
        behavior: 'smooth' // Hace que el desplazamiento sea suave
      });
    });
  });

  
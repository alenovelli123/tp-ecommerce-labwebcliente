import { getProducts } from './api/api.js';
import { renderCard } from './app/cards.js';

let productosGlobal = [];

console.log("App iniciada");

document.addEventListener('DOMContentLoaded', async () => {
  try {
    productosGlobal = await getProducts();
    console.log("Productos:", productosGlobal);
    renderCard(productosGlobal);
  } catch (error) {
    console.error("Error al iniciar la app:", error);
  }
});

// Mostrar modal al hacer clic en "Ver más"
document.addEventListener('click', e => {
  if (e.target.matches('button[data-id]')) {
    const id = e.target.dataset.id;
    const producto = productosGlobal.find(p => p.id == id);
    if (producto) {
      mostrarModal(producto);
    }
  }
});

function mostrarModal(producto) {
  document.getElementById('productoModalLabel').textContent = producto.title;
  document.getElementById('productoModalImg').src = producto.image;
  document.getElementById('productoModalImg').alt = producto.title;
  document.getElementById('productoModalDesc').textContent = producto.description;
  document.getElementById('productoModalPrecio').textContent = `$${producto.price}`;

  document.getElementById('btnAgregarAlCarrito').onclick = () => {
    import('./carrito/carrito.js').then(mod => {
      mod.agregarAlCarrito(producto);
    });
  };
  
  const modal = new bootstrap.Modal(document.getElementById('productoModal'));
  modal.show();
}

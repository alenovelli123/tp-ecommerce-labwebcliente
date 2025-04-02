import { getProducts } from './api/api.js';
import { renderCard } from './app/cards.js';
import { obtenerDeStorage } from './utils/storage.js';

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

  // ✅ Detectar apertura del offcanvas y renderizar carrito
  const offcanvas = document.getElementById('offcanvas');
  offcanvas.addEventListener('show.bs.offcanvas', renderizarCarrito);

  // ✅ Vaciar carrito al hacer clic en el botón
  document.getElementById('vaciarCarrito').addEventListener('click', () => {
    localStorage.removeItem('carrito');
    renderizarCarrito();
  });
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

  const modalElement = document.getElementById('productoModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  document.getElementById('btnAgregarAlCarrito').onclick = () => {
    import('./carrito/carrito.js').then(mod => {
      mod.agregarAlCarrito(producto);
      modal.hide();  // ✅ Cerrar modal después de agregar al carrito
    });
  };

  modal.show();
}

function renderizarCarrito() {
  const carrito = obtenerDeStorage('carrito');
  const lista = document.getElementById('lista-carrito');
  const total = document.getElementById('total-carrito');

  lista.innerHTML = '';
  let totalAcumulado = 0;

  carrito.forEach(prod => {
    totalAcumulado += prod.price;

    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.innerHTML = `
      ${prod.title}
      <span class="badge bg-primary rounded-pill">$${prod.price}</span>
    `;
    lista.appendChild(item);
  });

  total.textContent = totalAcumulado.toFixed(2);
}

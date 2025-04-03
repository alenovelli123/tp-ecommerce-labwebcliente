import { getProducts } from './api/api.js';
import { renderCard } from './app/cards.js';
import { obtenerDeStorage } from './utils/storage.js';

// 🌱 Referencias al DOM al inicio
const modalElement = document.getElementById('productoModal');
const modalTitle = document.getElementById('productoModalLabel');
const modalImg = document.getElementById('productoModalImg');
const modalDesc = document.getElementById('productoModalDesc');
const modalPrice = document.getElementById('productoModalPrecio');
const modalBtnAdd = document.getElementById('btnAgregarAlCarrito');

const carritoLista = document.getElementById('lista-carrito');
const carritoTotal = document.getElementById('total-carrito');
const btnVaciarCarrito = document.getElementById('vaciarCarrito');
const offcanvas = document.getElementById('offcanvas');

let productosGlobal = [];

console.log("App iniciada");

// ✅ Inicialización de la app -- Se quita DOMContentLoaded
(async () => {
  try {
    productosGlobal = await getProducts();
    console.log("Productos:", productosGlobal);
    renderCard(productosGlobal);
  } catch (error) {
    console.error("Error al iniciar la app:", error);
  }

  // Mostrar carrito al abrir offcanvas
  offcanvas.addEventListener('show.bs.offcanvas', renderizarCarrito);

  // Vaciar carrito
  btnVaciarCarrito.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    renderizarCarrito();
  });
})();

// ✅ Mostrar modal al hacer clic en "Ver más"
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
  modalTitle.textContent = producto.title;
  modalImg.src = producto.image;
  modalImg.alt = producto.title;
  modalDesc.textContent = producto.description;
  modalPrice.textContent = `$${producto.price}`;

  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

  modalBtnAdd.onclick = () => {
    import('./carrito/carrito.js').then(mod => {
      mod.agregarAlCarrito(producto);
      modal.hide(); // ✅ Cerrar modal luego de agregar al carrito
    });
  };

  modal.show();
}

function renderizarCarrito() {
  const carrito = obtenerDeStorage('carrito');
  carritoLista.innerHTML = '';
  let totalAcumulado = 0;

  carrito.forEach(prod => {
    totalAcumulado += prod.price;

    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.innerHTML = `
      ${prod.title}
      <span class="badge bg-primary rounded-pill">$${prod.price}</span>
    `;
    carritoLista.appendChild(item);
  });

  carritoTotal.textContent = totalAcumulado.toFixed(2);
}

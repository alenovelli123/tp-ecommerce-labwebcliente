// 📁 src/index.js
import { getProducts } from './api/api.js';
import { renderCard } from './app/cards.js';
import { obtenerDeStorage, guardarEnStorage } from './utils/storage.js';
import { alertaCompraExitosa } from './utils/alerta.js';

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
const btnFinalizarCompra = document.getElementById('finalizarCompra');

let productosGlobal = [];

(async () => {
  try {
    productosGlobal = await getProducts();
    renderCard(productosGlobal);
  } catch (error) {
    console.error("Error al iniciar la app:", error);
  }

  offcanvas.addEventListener('show.bs.offcanvas', renderizarCarrito);

  btnVaciarCarrito.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    renderizarCarrito();
  });

  btnFinalizarCompra.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    renderizarCarrito();
    alertaCompraExitosa();

    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
    offcanvasInstance.hide();
  });
})();

// ✅ Mostrar modal solo si se hace clic en botón con data-id y SIN data-action
document.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  // Solo mostramos el modal si tiene data-id y NO tiene data-action
  if (id && !action) {
    const producto = productosGlobal.find(p => p.id == id);
    if (producto) mostrarModal(producto);
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
      modal.hide();
    });
  };

  modal.show();
}

function renderizarCarrito() {
  const carrito = obtenerDeStorage('carrito');
  carritoLista.innerHTML = '';
  let totalAcumulado = 0;

  carrito.forEach(prod => {
    const subtotal = prod.price * prod.cantidad;
    totalAcumulado += subtotal;

    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${prod.image}" alt="${prod.title}" width="50" height="50" style="object-fit:contain">
        <div class="flex-grow-1">
          <strong>${prod.title}</strong><br>
          Cantidad: ${prod.cantidad} <br>
          Total: $${subtotal.toFixed(2)}
        </div>
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-secondary" data-id="${prod.id}" data-action="decrement" ${prod.cantidad === 1 ? 'disabled' : ''}>-</button>
          <button class="btn btn-sm btn-outline-secondary" data-id="${prod.id}" data-action="increment">+</button>
          <button class="btn btn-sm btn-outline-danger" data-id="${prod.id}" data-action="delete">🗑️</button>
        </div>
      </div>
    `;
    carritoLista.appendChild(item);
  });

  carritoTotal.textContent = totalAcumulado.toFixed(2);
}

// ✅ SOLO maneja acciones del carrito si tiene data-action
document.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn || !btn.dataset.action) return;

  const id = btn.dataset.id;
  const action = btn.dataset.action;

  if (!id || !action) return;

  const carrito = obtenerDeStorage('carrito');
  const index = carrito.findIndex(p => p.id == id);
  if (index === -1) return;

  if (action === 'increment') carrito[index].cantidad++;
  if (action === 'decrement' && carrito[index].cantidad > 1) carrito[index].cantidad--;
  if (action === 'delete') carrito.splice(index, 1);

  guardarEnStorage('carrito', carrito);
  renderizarCarrito();
});

document.getElementById('input-busqueda').addEventListener('input', e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = productosGlobal.filter(p =>
    p.title.toLowerCase().includes(texto) ||
    p.description.toLowerCase().includes(texto) ||
    p.category.toLowerCase().includes(texto)
  );
  renderCard(filtrados);
});

import { guardarEnStorage, obtenerDeStorage } from '../utils/storage.js';

export function agregarAlCarrito(producto) {
  console.log("Agregando:", producto); // ✅
  const carritoActual = obtenerDeStorage('carrito');
  carritoActual.push(producto);
  guardarEnStorage('carrito', carritoActual);
  console.log("Nuevo carrito:", carritoActual); // ✅
  alert(`${producto.title} agregado al carrito`);
}


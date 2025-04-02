
// ✅ Esto va al principio del archivo carrito.js
import { guardarEnStorage, obtenerDeStorage } from '../utils/storage.js';

// ✅ Esta es tu función exportada
export function agregarAlCarrito(producto) {
  console.log("Agregando:", producto); // ✅
  const carritoActual = obtenerDeStorage('carrito');
  carritoActual.push(producto);
  guardarEnStorage('carrito', carritoActual);
  console.log("Nuevo carrito:", carritoActual); // ✅
  alert(`${producto.title} agregado al carrito`);
}


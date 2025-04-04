import { guardarEnStorage, obtenerDeStorage } from '../utils/storage.js';
import { alertaAgregadoAlCarrito } from '../utils/alerta.js';

export function agregarAlCarrito(producto) {
  const carrito = obtenerDeStorage('carrito');
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    const nuevoProducto = { ...producto, cantidad: 1 };
    carrito.push(nuevoProducto);
  }

  guardarEnStorage('carrito', carrito);
  alertaAgregadoAlCarrito(producto);
}
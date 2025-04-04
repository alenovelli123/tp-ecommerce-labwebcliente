import { guardarEnStorage, obtenerDeStorage } from '../utils/storage.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

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

  Swal.fire({
    title: '✅ Agregado al carrito',
    text: `${producto.title}`,
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
}
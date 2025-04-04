import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

export function alertaCompraExitosa() {
  Swal.fire({
    icon: 'success',
    title: '¡Gracias por tu compra!',
    text: 'Tu pedido fue procesado correctamente.',
    confirmButtonText: 'Aceptar'
  });
}

export function alertaAgregadoAlCarrito(producto) {
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
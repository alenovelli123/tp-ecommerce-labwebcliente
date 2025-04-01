// Funciones para manejar localStorage (base)
export function guardarEnStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

export function obtenerDeStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}

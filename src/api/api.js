export async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Error al obtener productos'); // no forma parte de la documentacion
    return await res.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

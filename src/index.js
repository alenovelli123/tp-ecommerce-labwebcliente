import { getProducts } from './api/api.js';
import { renderCards } from './app/cards.js';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await getProducts();
  renderCards(products);
});

export function renderCard(products) {
  const container = document.getElementById('container-cards');
  container.innerHTML = '';

  products.forEach(product => {
    const cardHTML = `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm categoria-${product.category.toLowerCase().replace(/\s/g, '-')}">
          <img src="${product.image}" class="card-img-top p-4" height="200" style="object-fit:contain;" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <span class="badge bg-light text-dark mb-2 categoria-badge">${product.category}</span>
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text text-truncate">${product.description}</p>
            <p class="fw-bold">$${product.price}</p>
            <button class="btn btn-outline-primary mt-auto" data-id="${product.id}">Ver más</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHTML);
  });
}
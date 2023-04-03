export async function fetchProducts(page, limit) {
    const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  }
  

  
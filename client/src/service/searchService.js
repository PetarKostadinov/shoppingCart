// productsService.js

const getProducts = async (options) => {
    const { page, category, query, price, rating, order } = options;
    const response = await fetch(
      `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error fetching products');
    }
  };
  
  const getCategories = async () => {
    const response = await fetch(`/api/products/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  };
  
  export { getProducts, getCategories };
  
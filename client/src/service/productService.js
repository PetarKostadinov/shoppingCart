import { toast } from "react-toastify";
import getError from '../util';

export async function fetchProducts(page, limit) {
    const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  }
  
export const createProduct = async (userInfo, item) => {
  try {
    const response = await fetch('/api/products/create', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userInfo.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;

  } catch (err) {
    throw new toast.error(getError(err));
  }
}

export const deleteProduct = async (id) => {
  const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
  });
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const fetchProduct = async (id) => {
  const response = await fetch(`/api/products/_id/${id}`);
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const updateItem = async (id, slug, data, token) => {
  const response = await fetch(`/api/products/${id}/editItem/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return response.json();
};

export async function getCategories() {
  const response = await fetch(`/api/products/categories`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const getProduct = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};



  
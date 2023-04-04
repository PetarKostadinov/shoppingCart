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

  
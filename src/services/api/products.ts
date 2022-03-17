import endPoints from '@services/api';
import axios from 'axios';
import { createProduct } from '@customTypes/product';

export async function addProduct(body: createProduct) {
  const { data } = await axios.post(endPoints.products.addProducts, body);
  return data;
}

export async function deleteProduct(id: number) {
  const { data } = await axios.delete(endPoints.products.deleteProducts(id));
  return data;
}

export async function updateProduct(id: number, body: createProduct) {
  const { data } = await axios.put(endPoints.products.updateProducts(id), body);
  return data;
}

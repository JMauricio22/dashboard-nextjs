import Category from '../category';

export default interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  categoryId: number;
}

export interface FormInputs {
  title: string;
  price: number;
  categoryId: string;
  description: string;
  images: FileList;
}
export interface FormInputsWithoutImages extends Omit<FormInputs, 'images'> {
  id: number;
}

export interface createProduct
  extends Omit<Product, 'id' | 'category' | 'categoryId'> {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
}

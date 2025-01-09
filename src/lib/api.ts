import { Product } from '@/types'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('/api/products');
  
  if (!res.ok) {
    throw new ApiError(
      res.status,
      `Failed to fetch products: ${res.statusText}`
    );
  }
  
  return res.json();
};

export const getProduct = async (id: number): Promise<Product> => {
  const res = await fetch(`/api/products/${id}`);
  
  if (!res.ok) {
    throw new ApiError(
      res.status,
      `Failed to fetch product ${id}: ${res.statusText}`
    );
  }
  
  return res.json();
};

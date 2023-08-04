export interface Cart {
  id: number;
  userId: number;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
}

// Producto que devuelve la API
export type Producto = {
  id: number;
  name: string;
  description: string | null;
  price: number | string;
  stock: number;
  category: string | null;
  image_url: string | null;
  created_at: string;
};

// Datos que enviamos para crear un producto
export type ProductoCreate = {
  name: string;
  description?: string | null;
  price: number | string;
  stock: number;
  category?: string | null;
  image_url?: string | null;
};

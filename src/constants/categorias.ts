export const CATEGORIAS_PERMITIDAS = [
  "Abarrotes",
  "Limpieza",
  "Bebidas",
  "Snacks",
  "Lácteos",
] as const;

export type CategoriaProducto = (typeof CATEGORIAS_PERMITIDAS)[number];

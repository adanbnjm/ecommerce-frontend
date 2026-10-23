import type { Producto, ProductoAPI } from "../types/producto";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error(`Error al obtener productos: ${respuesta.status}`);
  }

  const datos: ProductoAPI[] = await respuesta.json();

  return datos.map((producto) => ({
    id: producto.id,
    nombre: producto.name,
    categoria: producto.category ?? "",
    precio: Number(producto.price),
    stock: producto.stock,
    descripcion: producto.description ?? "",
    imagenUrl: producto.image_url,
  }));
}

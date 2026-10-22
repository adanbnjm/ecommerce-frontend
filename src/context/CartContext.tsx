import { createContext, useCallback, useState, type ReactNode } from "react";

import type { Producto } from "../types/producto";

export type ItemCarrito = {
  producto: Producto;
  cantidad: number;
};

type CartContextType = {
  items: ItemCarrito[];
  totalUnidades: number;
  totalPrecio: number;
  agregar: (producto: Producto) => void;
  aumentar: (id: number) => void;
  disminuir: (id: number) => void;
  eliminar: (id: number) => void;
  vaciar: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregar = useCallback((producto: Producto) => {
    if (producto.stock <= 0) return;

    setItems((actuales) => {
      const existente = actuales.find(
        (item) => item.producto.id === producto.id,
      );

      if (existente) {
        // No permitir superar las existencias disponibles.
        if (existente.cantidad >= producto.stock) {
          return actuales;
        }

        return actuales.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }

      return [...actuales, { producto, cantidad: 1 }];
    });
  }, []);

  const aumentar = useCallback((id: number) => {
    setItems((actuales) =>
      actuales.map((item) => {
        if (item.producto.id !== id) return item;

        if (item.cantidad >= item.producto.stock) return item;

        return { ...item, cantidad: item.cantidad + 1 };
      }),
    );
  }, []);

  const disminuir = useCallback((id: number) => {
    setItems((actuales) =>
      actuales
        .map((item) =>
          item.producto.id === id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item,
        )
        .filter((item) => item.cantidad > 0),
    );
  }, []);

  const eliminar = useCallback((id: number) => {
    setItems((actuales) => actuales.filter((item) => item.producto.id !== id));
  }, []);

  const vaciar = useCallback(() => {
    setItems([]);
  }, []);

  const totalUnidades = items.reduce((total, item) => total + item.cantidad, 0);

  const totalPrecio = items.reduce(
    (total, item) => total + Number(item.producto.price) * item.cantidad,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalUnidades,
        totalPrecio,
        agregar,
        aumentar,
        disminuir,
        eliminar,
        vaciar,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

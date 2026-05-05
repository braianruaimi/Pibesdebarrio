import type { Product } from "../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartItemsCount = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const getCartSummaryText = (itemsCount: number): string => {
  if (itemsCount === 0) {
    return "Agrega productos para finalizar la compra por WhatsApp.";
  }

  return `${itemsCount} item${itemsCount === 1 ? "" : "s"} listo${itemsCount === 1 ? "" : "s"} para enviar.`;
};
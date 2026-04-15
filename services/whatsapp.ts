import type { Product } from "../data/products";
import type { CartItem } from "../utils/cart";
import { formatCurrency } from "../utils/currency";

type WhatsAppCartItem = Pick<Product, "name" | "price">;

export const getStoreWhatsAppLink = (): string => {
  const phone = "2215047962";
  const message = "Hola PibesDeBarrio, quiero hablar por WhatsApp sobre los productos de la tienda.";

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const sendProductWhatsAppMessage = (product: WhatsAppCartItem) => {
  const phone = "2215047962";
  const message = [
    "Hola, quiero comprar este producto de PibesDeBarrio:",
    `${product.name} - ${formatCurrency(product.price)}`,
  ].join("\n");

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
};

export const sendWhatsAppMessage = (
  products: CartItem[],
  total: number,
) => {
  const phone = "2215047962";
  const formattedTotal = formatCurrency(total);

  const items = products
    .map((item, index) => {
      const formattedPrice = formatCurrency(item.product.price * item.quantity);

      return `${index + 1}. ${item.product.name} x${item.quantity} - ${formattedPrice}`;
    })
    .join("\n");

  const message = [
    "Hola, quiero finalizar mi compra en PibesDeBarrio.",
    "",
    "Productos:",
    items,
    "",
    `Total: ${formattedTotal}`,
  ].join("\n");

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
};

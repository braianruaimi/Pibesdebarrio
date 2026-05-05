import type { Product } from "../data/products";
import type { CartItem } from "../utils/cart";
import { formatCurrency } from "../utils/currency";

const STORE_PHONE = "5492215047962";

type WhatsAppCartItem = Pick<Product, "name" | "price">;

const openWhatsApp = (message: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.open(`https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
};

export const getStoreWhatsAppLink = (): string => {
  const message = "Hola PibesDeBarrio, quiero hablar por WhatsApp sobre los productos de la tienda.";
  return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
};

export const sendProductWhatsAppMessage = (product: WhatsAppCartItem) => {
  const message = [
    "Hola, quiero comprar este producto de PibesDeBarrio:",
    `${product.name} - ${formatCurrency(product.price)}`,
  ].join("\n");

  openWhatsApp(message);
};

export const sendWhatsAppMessage = (products: CartItem[], total: number) => {
  const formattedTotal = formatCurrency(total);
  const items = products
    .map((item, index) => `${index + 1}. ${item.product.name} x${item.quantity} - ${formatCurrency(item.product.price * item.quantity)}`)
    .join("\n");

  const message = [
    "Hola, quiero finalizar mi compra en PibesDeBarrio.",
    "",
    "Productos:",
    items,
    "",
    `Total: ${formattedTotal}`,
  ].join("\n");

  openWhatsApp(message);
};

export type LiveFormData = {
  nombre: string;
  email: string;
  telefono: string;
};

export type BusinessFormData = {
  nombre: string;
  negocio: string;
  rubro: string;
  instagram: string;
  telefono: string;
};

export const sendLiveAttendanceWhatsAppMessage = (form: LiveFormData) => {
  const message = [
    "Quiero presenciar el programa en vivo.",
    `Nombre: ${form.nombre}`,
    `Email: ${form.email}`,
    `Telefono: ${form.telefono}`,
  ].join("\n");

  openWhatsApp(message);
};

export const sendBusinessWhatsAppMessage = (form: BusinessFormData) => {
  const message = [
    "Tengo un negocio y quiero sumarme al programa.",
    `Nombre: ${form.nombre}`,
    `Negocio: ${form.negocio}`,
    `Rubro: ${form.rubro}`,
    `Instagram: ${form.instagram}`,
    `Telefono: ${form.telefono}`,
  ].join("\n");

  openWhatsApp(message);
};
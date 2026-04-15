export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: "envios",
    question: "Envios",
    answer:
      "Hacemos envios a todo el pais. Escribinos por WhatsApp y te pasamos costo y tiempos segun tu zona.",
  },
  {
    id: "pagos",
    question: "Pagos",
    answer:
      "Aceptamos transferencia y otros medios que coordinamos directo por WhatsApp al momento de cerrar la compra.",
  },
  {
    id: "talles",
    question: "Talles",
    answer:
      "Si tenes dudas con talles o calce, escribinos por WhatsApp y te ayudamos a elegir la mejor opcion.",
  },
  {
    id: "stock",
    question: "Stock",
    answer:
      "El stock puede moverse rapido por los streams y redes. Consultanos por WhatsApp para confirmar disponibilidad al instante.",
  },
];

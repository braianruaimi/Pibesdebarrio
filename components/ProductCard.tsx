import type { Product } from "../data/products";
import { sendProductWhatsAppMessage } from "../services/whatsapp";
import { formatCurrency } from "../utils/currency";

type ProductCardProps = Pick<Product, "name" | "price" | "image"> & {
  onAddToCart: () => void;
};

export const ProductCard = ({
  name,
  price,
  image,
  onAddToCart,
}: ProductCardProps) => {
  const formattedPrice = formatCurrency(price);

  return (
    <article className="glass-card group overflow-hidden rounded-3xl p-4 hover:-translate-y-1 hover:border-[#ff3b30]/70 hover:bg-white/10">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </div>

      <div className="mt-5 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-black tracking-tight text-white">{name}</h3>
          <p className="text-2xl font-extrabold text-[#ff5a4f]">{formattedPrice}</p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => sendProductWhatsAppMessage({ name, price })}
            className="whatsapp-button w-full focus:outline-none focus:ring-2 focus:ring-[#00c56b]/60"
          >
            Comprar por WhatsApp
          </button>

          <button
            type="button"
            onClick={onAddToCart}
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:scale-[1.02] hover:border-[#ff6b63]/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#ff3b30]/40"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
};

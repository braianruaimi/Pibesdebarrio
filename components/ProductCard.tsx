import type { Product } from "../data/products";
import { sendProductWhatsAppMessage } from "../services/whatsapp";
import { formatCurrency } from "../utils/currency";

type ProductCardProps = Pick<Product, "name" | "price" | "image" | "stock" | "limitedEdition"> & {
  onAddToCart: () => void;
};

export const ProductCard = ({
  name,
  price,
  image,
  stock,
  limitedEdition,
  onAddToCart,
}: ProductCardProps) => {
  const formattedPrice = formatCurrency(price);

  return (
    <article className="glass-card group overflow-hidden rounded-3xl p-4 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_18px_45px_rgba(15,23,42,0.55)]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 relative">
        <img
          src={image}
          alt={name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
        {(limitedEdition || (typeof stock === "number" && stock <= 3)) && (
          <span className="absolute top-3 left-3 rounded-full bg-[var(--neon-gold)] px-4 py-1 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_12px_var(--neon-gold)]">
            {limitedEdition ? "EDICIÓN LIMITADA" : "QUEDAN POCOS"}
          </span>
        )}
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
            className="inline-flex w-full items-center justify-center rounded-2xl border border-[var(--neon-gold)] bg-[var(--neon-gold)] px-4 py-3 text-center text-sm font-extrabold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--neon-gold-true)] hover:border-[var(--neon-gold-true)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-gold)] shadow-[0_0_18px_var(--neon-gold)]"
          >
            LO QUIERO TENER
          </button>
        </div>
      </div>
    </article>
  );
};

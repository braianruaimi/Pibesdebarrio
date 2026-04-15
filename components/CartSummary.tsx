import { useEffect, useState } from "react";
import { getCartItemsCount, getCartSummaryText, type CartItem } from "../utils/cart";
import { formatCurrency } from "../utils/currency";

type CartSummaryProps = {
  cart: CartItem[];
  formattedTotal: string;
  onCheckout: () => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
};

export const CartSummary = ({
  cart,
  formattedTotal,
  onCheckout,
  onIncrement,
  onDecrement,
  onRemove,
}: CartSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemsCount = getCartItemsCount(cart);

  useEffect(() => {
    if (itemsCount > 0) {
      setIsOpen(true);
    }
  }, [itemsCount]);

  if (cart.length === 0) {
    return null;
  }

  return (
    <aside className="floating-cart-shell">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="floating-cart-toggle"
        aria-expanded={isOpen}
        aria-controls="floating-cart-panel"
      >
        <div>
          <p className="section-label">TU PEDIDO</p>
          <p className="mt-1 text-lg font-black text-white">
            {itemsCount} item{itemsCount === 1 ? "" : "s"} · {formattedTotal}
          </p>
        </div>
        <span className="cart-badge min-w-[3.25rem] justify-center px-2">
          {isOpen ? "-" : itemsCount}
        </span>
      </button>

      {isOpen ? (
        <div id="floating-cart-panel" className="floating-cart-panel mt-3">
          <div>
            <p className="section-label">TOTAL A PAGAR</p>
            <p className="mt-2 text-3xl font-black text-white">{formattedTotal}</p>
            <p className="mt-2 text-sm text-[#d0d0d0]">{getCartSummaryText(itemsCount)}</p>
          </div>

          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="mini-product-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="section-label text-sm tracking-[0.2em]">
                      {item.product.category}
                    </p>
                    <p className="mt-2 text-lg font-black text-white">{item.product.name}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(item.product.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black text-white transition-all duration-300 hover:border-[#ff6b63]/60 hover:bg-white/10"
                    aria-label={`Quitar ${item.product.name} del carrito`}
                  >
                    x
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-2 py-2">
                    <button
                      type="button"
                      onClick={() => onDecrement(item.product.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-black text-white transition-all duration-300 hover:border-[#ff6b63]/60 hover:bg-white/10"
                      aria-label={`Restar una unidad de ${item.product.name}`}
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-sm font-black text-white">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onIncrement(item.product.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-black text-white transition-all duration-300 hover:border-[#00c56b]/60 hover:bg-white/10"
                      aria-label={`Sumar una unidad de ${item.product.name}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f8f8f]">
                      Subtotal
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#ff8b84]">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>

                <p className="mt-2 text-xs text-[#b8b8b8]">
                  {formatCurrency(item.product.price)} por unidad
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onCheckout}
            className="neon-button mt-4 w-full border border-[var(--neon-gold)] bg-[var(--neon-gold)] px-6 py-4 text-black font-black tracking-[0.22em] hover:bg-[var(--neon-gold-true)] hover:border-[var(--neon-gold-true)] hover:shadow-[0_0_40px_var(--neon-gold)]"
          >
            CONFIRMAR PEDIDO POR WHATSAPP
          </button>
          <p className="mt-3 text-xs text-[var(--neon-gold)] text-center font-bold">
            ¡Te hablamos al toque para coordinar la entrega en Ensenada o donde vos nos digas !!
          </p>
        </div>
      ) : null}
    </aside>
  );
};

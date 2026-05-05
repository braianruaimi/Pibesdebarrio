import { SobreNosotrosModal } from "./SobreNosotrosModal";

type HomeHeaderProps = {
  cartCount: number;
};

export const HomeHeader = ({ cartCount }: HomeHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="page-container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="brand-mark text-xs">PibesDeBarrio</p>
          <h2 className="mt-1 text-2xl font-black uppercase tracking-[0.12em] text-white">PibesDeBarrio</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SobreNosotrosModal />
          <button
            type="button"
            className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] px-4 py-2 text-black shadow-[0_0_18px_var(--neon-gold)] hover:border-[var(--neon-gold-true)] hover:bg-[var(--neon-gold-true)]"
            onClick={() => window.dispatchEvent(new CustomEvent("abrirSobreNosotrosForm"))}
          >
            Quiero estar
          </button>
          <button
            type="button"
            className="neon-button border border-[#ff6b63]/40 bg-white/10 px-4 py-2 text-white"
            onClick={() => window.dispatchEvent(new CustomEvent("abrirNegocioForm"))}
          >
            Tengo un negocio
          </button>
          <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-[0_0_24px_rgba(0,0,0,0.28)]">
            <span className="section-label text-xs tracking-[0.25em] text-[#b6b6b6]">Carrito</span>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
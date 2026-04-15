type HomeHeaderProps = {
  cartCount: number;
};

import { SobreNosotrosModal } from "./SobreNosotrosModal";

export const HomeHeader = ({ cartCount }: HomeHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="page-container flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
        <div>
          <p className="brand-mark text-xs">PibesDeBarrio</p>
          <h2 className="mt-1 text-2xl font-black uppercase tracking-[0.12em] text-white">
            PibesDeBarrio
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <SobreNosotrosModal />
          <div className="flex flex-col items-center gap-1">
            <p className="text-white font-bold text-xs">¿Queres presenciar el programa en vivo?</p>
            <button
              className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black font-black px-4 py-2 rounded-2xl shadow-[0_0_18px_var(--neon-gold)] hover:bg-[var(--neon-gold-true)] hover:border-[var(--neon-gold-true)]"
              onClick={() => {
                // Abrir modal Sobre Nosotros y mostrar formulario
                const evt = new CustomEvent("abrirSobreNosotrosForm");
                window.dispatchEvent(evt);
              }}
            >
              Quiero Estar!
            </button>
          </div>
          <a
            href="https://www.instagram.com/pibesdebarrio.stream/"
            target="_blank"
            rel="noreferrer"
            className="social-icon-link"
            aria-label="Instagram de PibesDeBarrio"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.93 1.35a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" />
            </svg>
          </a>
          <div className="glass-card flex items-center gap-3 px-4 py-3 shadow-[0_0_24px_rgba(0,0,0,0.28)]">
            <span className="section-label text-xs tracking-[0.25em] text-[#b6b6b6]">
              Carrito
            </span>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

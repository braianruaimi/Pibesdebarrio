import { getStoreWhatsAppLink } from "../services/whatsapp";

const communityLink =
  "https://www.whatsapp.com/channel/0029VbCtdrWEgGfFPBjSKD1g?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGni5RPa2ck270tpYBbetuA8n8NvsXqoEomQqBaD6W262F3VM5qPnYHfzWQ01U_aem_FrAvmVho_dAbZ82co0II7Q";

export const HeroSection = () => {
  const storeWhatsAppLink = getStoreWhatsAppLink();

  return (
    <section className="page-container hero-section">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="neon-pill">Streetwear con identidad de barrio</span>
        <h1 className="hero-title">PibesDeBarrio</h1>
        <p className="hero-copy">
          Prendas urbanas con energía nocturna, actitud callejera y lanzamientos pensados para destacar desde el primer scroll.
        </p>
        <p className="hero-note">Compra directa. Sin login. Sin fricción.</p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#productos"
            className="neon-button border border-[#ff3b30]/50 px-7 tracking-[0.24em] hover:shadow-[0_0_45px_rgba(255,59,48,0.5)]"
          >
            Ver Productos
          </a>
        </div>
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl sm:grid-cols-3 sm:p-6">
        <div className="stat-card">
          <p className="section-label">Drops</p>
          <p className="mt-2 text-2xl font-black text-white">Ediciones limitadas</p>
          <a
            href="#catalogo-limitado"
            className="neon-button mt-3 w-full border border-[#ff3b30]/50 text-center hover:shadow-[0_0_45px_rgba(255,59,48,0.5)]"
          >
            Catalogo
          </a>
        </div>
        <div className="stat-card">
          <p className="section-label">Compra directa</p>
          <p className="mt-2 text-2xl font-black text-white">Hablanos</p>
          <a
            href={storeWhatsAppLink}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-button mt-3 w-full focus:outline-none focus:ring-2 focus:ring-[#00c56b]/60"
          >
            Hablar por WhatsApp
          </a>
        </div>
        <div className="stat-card">
          <p className="section-label">Nuestra comunidad</p>
          <p className="mt-2 text-2xl font-black text-white">Pensado para nuestra comunidad</p>
          <a
            href={communityLink}
            target="_blank"
            rel="noreferrer"
            className="neon-button mt-3 w-full border border-[#ff3b30]/50 text-center hover:shadow-[0_0_45px_rgba(255,59,48,0.5)]"
          >
            Ir al canal
          </a>
        </div>
      </div>
    </section>
  );
};

import { getStoreWhatsAppLink } from "../services/whatsapp";

const communityLink =
  "https://www.whatsapp.com/channel/0029VbCtdrWEgGfFPBjSKD1g?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

const instagramLink = "https://www.instagram.com/pibesdebarrio.stream/";

export const HeroSection = () => {
  const storeWhatsAppLink = getStoreWhatsAppLink();

  return (
    <section className="page-container hero-section">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <span className="neon-pill">PibesDeBarrio</span>
        <h1 className="hero-title">PibesDeBarrio</h1>
        <p className="hero-copy">
          Streetwear, comunidad y programa en vivo. Compra directa por WhatsApp, sumate al programa y trae tu negocio a la mesa del barrio.
        </p>
        <p className="hero-note">Sin cartel invasivo. La invitacion a emprendedores ahora vive integrada y sutil.</p>

        <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="#productos"
            className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] px-7 tracking-[0.24em] text-black hover:bg-[var(--neon-gold-true)] hover:shadow-[0_0_45px_var(--neon-gold)]"
          >
            Sumate a la movida
          </a>
          <a href={instagramLink} target="_blank" rel="noreferrer" className="social-icon-link" aria-label="Seguinos en Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.93 1.35a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24ZM12 6.86A5.14 5.14 0 1 1 6.86 12 5.15 5.15 0 0 1 12 6.86Zm0 1.8A3.34 3.34 0 1 0 15.34 12 3.35 3.35 0 0 0 12 8.66Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl sm:grid-cols-3 sm:p-6">
        <div className="stat-card">
          <p className="section-label">Drops</p>
          <p className="mt-2 text-2xl font-black text-white">Ediciones limitadas</p>
          <a href="#catalogo-limitado" className="neon-button mt-3 w-full border border-[#ff3b30]/50 text-center hover:shadow-[0_0_45px_rgba(255,59,48,0.5)]">
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
            className="whatsapp-button mt-3 w-full text-center focus:outline-none focus:ring-2 focus:ring-[#00c56b]/60"
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
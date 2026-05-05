import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  sendBusinessWhatsAppMessage,
  sendLiveAttendanceWhatsAppMessage,
  type BusinessFormData,
  type LiveFormData,
} from "../services/whatsapp";

type ModalView = "about" | "live" | "business";

const initialLiveForm: LiveFormData = {
  nombre: "",
  email: "",
  telefono: "",
};

const initialBusinessForm: BusinessFormData = {
  nombre: "",
  negocio: "",
  rubro: "",
  instagram: "",
  telefono: "",
};

export function SobreNosotrosModal() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ModalView>("about");
  const [liveForm, setLiveForm] = useState(initialLiveForm);
  const [businessForm, setBusinessForm] = useState(initialBusinessForm);

  useEffect(() => {
    const openAbout = () => {
      setView("about");
      setOpen(true);
    };

    const openLive = () => {
      setView("live");
      setOpen(true);
    };

    const openBusiness = () => {
      setView("business");
      setOpen(true);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("abrirSobreNosotros", openAbout);
    window.addEventListener("abrirSobreNosotrosForm", openLive);
    window.addEventListener("abrirNegocioForm", openBusiness);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("abrirSobreNosotros", openAbout);
      window.removeEventListener("abrirSobreNosotrosForm", openLive);
      window.removeEventListener("abrirNegocioForm", openBusiness);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  const handleLiveChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLiveForm((current) => ({ ...current, [name]: value }));
  };

  const handleBusinessChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBusinessForm((current) => ({ ...current, [name]: value }));
  };

  const handleLiveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendLiveAttendanceWhatsAppMessage(liveForm);
    setLiveForm(initialLiveForm);
    setOpen(false);
  };

  const handleBusinessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendBusinessWhatsAppMessage(businessForm);
    setBusinessForm(initialBusinessForm);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] px-6 py-3 text-black shadow-[0_0_18px_var(--neon-gold)] hover:border-[var(--neon-gold-true)] hover:bg-[var(--neon-gold-true)]"
        onClick={() => {
          setView("about");
          setOpen(true);
        }}
      >
        Sobre nosotros
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div className="modal-panel w-full max-w-xl">
            <button type="button" className="modal-close" onClick={() => setOpen(false)} aria-label="Cerrar modal">
              ×
            </button>

            <div className="modal-tabs">
              <button type="button" className={view === "about" ? "modal-tab is-active" : "modal-tab"} onClick={() => setView("about")}>
                Sobre nosotros
              </button>
              <button type="button" className={view === "live" ? "modal-tab is-active" : "modal-tab"} onClick={() => setView("live")}>
                Quiero estar
              </button>
              <button type="button" className={view === "business" ? "modal-tab is-active" : "modal-tab"} onClick={() => setView("business")}>
                Tengo un negocio
              </button>
            </div>

            {view === "about" ? (
              <div>
                <h2 className="section-title mb-4">Sobre nosotros</h2>
                <p className="section-copy text-base text-[var(--neon-gold)] font-bold mb-6">
                  Nacimos en el stream para bancar la parada de los pibes. Aca no hay guion, hay realidad. Todo lo que ves en la web es parte de la identidad del programa y de la comunidad.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black" onClick={() => setView("live")}>
                    Quiero estar
                  </button>
                  <button type="button" className="neon-button border border-[#ff6b63]/40 bg-white/10" onClick={() => setView("business")}>
                    Tengo un negocio
                  </button>
                </div>
              </div>
            ) : null}

            {view === "live" ? (
              <form className="mt-2 flex flex-col gap-3" onSubmit={handleLiveSubmit}>
                <h2 className="section-title">Quiero estar en el programa</h2>
                <p className="section-copy">Dejanos tus datos y te llevamos directo a WhatsApp con el mensaje armado.</p>
                <input type="text" name="nombre" placeholder="Nombre y apellido" value={liveForm.nombre} onChange={handleLiveChange} required className="modal-input" />
                <input type="email" name="email" placeholder="Email" value={liveForm.email} onChange={handleLiveChange} required className="modal-input" />
                <input type="tel" name="telefono" placeholder="Telefono" value={liveForm.telefono} onChange={handleLiveChange} required className="modal-input" />
                <button type="submit" className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black mt-2">
                  Enviar por WhatsApp
                </button>
              </form>
            ) : null}

            {view === "business" ? (
              <form className="mt-2 flex flex-col gap-3" onSubmit={handleBusinessSubmit}>
                <h2 className="section-title">Tengo un negocio</h2>
                <p className="section-copy">Si sos emprendedor y queres sumarte al programa, te armamos el mensaje y te mandamos a WhatsApp.</p>
                <input type="text" name="nombre" placeholder="Tu nombre" value={businessForm.nombre} onChange={handleBusinessChange} required className="modal-input" />
                <input type="text" name="negocio" placeholder="Nombre del negocio" value={businessForm.negocio} onChange={handleBusinessChange} required className="modal-input" />
                <input type="text" name="rubro" placeholder="Rubro" value={businessForm.rubro} onChange={handleBusinessChange} required className="modal-input" />
                <input type="text" name="instagram" placeholder="Instagram o red principal" value={businessForm.instagram} onChange={handleBusinessChange} required className="modal-input" />
                <input type="tel" name="telefono" placeholder="Telefono" value={businessForm.telefono} onChange={handleBusinessChange} required className="modal-input" />
                <button type="submit" className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black mt-2">
                  Enviar por WhatsApp
                </button>
              </form>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
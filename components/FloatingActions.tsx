import { useMemo, useState } from "react";
import { faqs } from "../data/faqs";
import { PwaControls } from "./PwaControls";
import { getStoreWhatsAppLink } from "../services/whatsapp";

export const FloatingActions = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(faqs[0].id);
  const whatsappLink = getStoreWhatsAppLink();

  const selectedFaq = useMemo(
    () => faqs.find((faq) => faq.id === selectedFaqId) ?? faqs[0],
    [selectedFaqId],
  );

  return (
    <div className="floating-actions-shell">
      <PwaControls />

      {isAssistantOpen ? (
        <div className="assistant-panel mb-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-label">Asistente Pibes</p>
              <p className="mt-2 text-sm text-[#d0d0d0]">
                Respuestas rapidas para las preguntas que mas llegan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAssistantOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black text-white transition-all duration-300 hover:border-[#ff6b63]/60 hover:bg-white/10"
              aria-label="Cerrar asistente"
            >
              x
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => setSelectedFaqId(faq.id)}
                className={`rounded-2xl border px-3 py-2 text-left text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  selectedFaq.id === faq.id
                    ? "border-[#ff6b63]/60 bg-white/10 text-white"
                    : "border-white/10 bg-black/20 text-[#bdbdbd] hover:border-[#ff6b63]/40 hover:text-white"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          <div className="mini-product-card mt-4">
            <p className="section-label text-sm tracking-[0.2em]">{selectedFaq.question}</p>
            <p className="mt-3 text-sm leading-6 text-[#e0e0e0]">{selectedFaq.answer}</p>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-button mt-4 w-full text-center focus:outline-none focus:ring-2 focus:ring-[#00c56b]/60"
          >
            Hablar por WhatsApp
          </a>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsAssistantOpen((current) => !current)}
        className="assistant-trigger"
      >
        Asistente Pibes
      </button>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Hablar por WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current">
          <path d="M20.52 3.48A11.8 11.8 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.16 1.58 5.98L0 24l6.27-1.64a11.88 11.88 0 0 0 5.8 1.49h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.46Zm-8.45 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.63-.23-.37a9.9 9.9 0 0 1-1.51-5.31c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.42c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </div>
  );
};

import { useState } from "react";


import { useEffect } from "react";

export function SobreNosotrosModal() {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setFormOpen(true);
    };
    window.addEventListener("abrirSobreNosotrosForm", handler);
    return () => window.removeEventListener("abrirSobreNosotrosForm", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Armar mensaje para WhatsApp
    const msg = `Quiero presenciar el programa en vivo!\nNombre: ${form.nombre}\nEmail: ${form.email}\nTeléfono: ${form.telefono}`;
    const wsp = `https://wa.me/5492210000000?text=${encodeURIComponent(msg)}`;
    window.open(wsp, "_blank");
    setFormOpen(false);
    setOpen(false);
    setForm({ nombre: "", email: "", telefono: "" });
  };

  return (
    <>
      <button
        className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black font-black px-6 py-3 rounded-2xl shadow-[0_0_18px_var(--neon-gold)] hover:bg-[var(--neon-gold-true)] hover:border-[var(--neon-gold-true)]"
        onClick={() => setOpen(true)}
      >
        Sobre Nosotros
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#181818] rounded-2xl p-8 max-w-md w-full text-center relative">
            <button className="absolute top-3 right-3 text-2xl text-[var(--neon-gold)]" onClick={() => setOpen(false)}>&times;</button>
            <h2 className="section-title mb-4">Sobre Nosotros</h2>
            <p className="section-copy text-base text-[var(--neon-gold)] font-bold mb-6">
              Nacimos en el stream para bancar la parada de los pibes. Acá no hay guion, hay realidad. Todo lo que ves acá es parte de nuestra identidad. Si te copás con el programa, llevate tu merch y formá parte de la familia PibesDeBarrio.
            </p>
            <div className="mt-6">
              <p className="text-white font-bold mb-2">¿Queres presenciar el programa en vivo?</p>
              <button
                className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black font-black px-6 py-3 rounded-2xl shadow-[0_0_18px_var(--neon-gold)] hover:bg-[var(--neon-gold-true)] hover:border-[var(--neon-gold-true)] mb-4"
                onClick={() => setFormOpen(true)}
              >
                Quiero Estar!
              </button>
              {formOpen && (
                <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre y Apellido"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="rounded-xl px-4 py-2 bg-black/40 border border-[var(--neon-gold)] text-white focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl px-4 py-2 bg-black/40 border border-[var(--neon-gold)] text-white focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                    className="rounded-xl px-4 py-2 bg-black/40 border border-[var(--neon-gold)] text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="neon-button border border-[var(--neon-gold)] bg-[var(--neon-gold)] text-black font-black px-6 py-3 rounded-2xl shadow-[0_0_18px_var(--neon-gold)] hover:bg-[var(--neon-gold-true)] hover:border-[var(--neon-gold-true)] mt-2"
                  >
                    Enviar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

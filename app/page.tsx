"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Heart, ChevronDown, Mail, Music, Shirt, Volume2, VolumeX, Sparkles } from 'lucide-react';

// --- COMPONENTE DEL CONTADOR (Sin cambios en lógica) ---
const Contador = () => {
  const [tiempo, setTiempo] = useState({ dias: 0, hs: 0, min: 0, seg: 0 });

  useEffect(() => {
    const meta = new Date("2026-12-19T18:00:00").getTime();
    const interval = setInterval(() => {
      const ahora = new Date().getTime();
      const diff = meta - ahora;
      if (diff > 0) {
        setTiempo({
          dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hs: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center py-8">
      {Object.entries(tiempo).map(([label, valor]) => (
        <div key={label} className="relative group">
          <div className="text-3xl md:text-5xl font-serif text-[#4E0302] mb-1">{valor}</div>
          <div className="h-[1px] w-full bg-[#C2A378]/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionBoda() {
  const [comenzar, setComenzar] = useState(false);
  const [conMusica, setConMusica] = useState(false);
  const [cancion, setCancion] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const abrirInvitacion = (activar: boolean) => {
    setComenzar(true);
    setConMusica(activar);
    if (activar) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.4;
          audioRef.current.play().catch(() => {});
        }
      }, 500);
    }
  };

  const sugerirMusica = () => {
    const mensaje = encodeURIComponent(`¡Hola! Sugiero esta canción para la boda: ${cancion}`);
    window.open(`https://wa.me/50600000000?text=${mensaje}`, '_blank');
  };

  const agendarEvento = () => {
    const titulo = "Boda Carlos & Joseline";
    const fecha = "20261219T180000";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${fecha}/${fecha}&location=Guápiles,+Limón`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#FDFCF9] text-[#2D2D2D] selection:bg-[#4E0302] selection:text-white overflow-x-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {/* Textura de papel sutil */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <AnimatePresence>
        {!comenzar && (
          <motion.div 
            key="portada"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[1000] bg-[#0B2F2A] flex items-center justify-center p-6"
          >
            <div className="text-center p-12 rounded-[100px_20px_100px_20px] bg-[#FDFCF9] relative shadow-2xl border border-[#C2A378]/20 max-w-sm w-full">
              <h2 className="font-serif text-3xl mb-4 tracking-[0.2em] text-[#0B2F2A]">C & J</h2>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-8">Bienvenidos a nuestra invitación</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => abrirInvitacion(true)} className="flex items-center justify-center gap-3 px-8 py-4 bg-[#4E0302] text-white text-[10px] tracking-[0.3em] uppercase rounded-full hover:scale-105 transition-all shadow-lg">
                  <Volume2 size={14} /> Ingresar con Música
                </button>
                <button onClick={() => abrirInvitacion(false)} className="flex items-center justify-center gap-3 px-8 py-4 bg-white border border-gray-200 text-gray-500 text-[10px] tracking-[0.3em] uppercase rounded-full hover:scale-105 transition-all">
                  <VolumeX size={14} /> Ingresar en Silencio
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {comenzar && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          {/* HERO SECTION: DISEÑO ASIMÉTRICO CON FOTO2 */}
          <section className="min-h-screen relative flex items-center justify-center p-4 md:p-12 lg:p-20">
            <div className="relative w-full max-w-6xl grid md:grid-cols-12 items-center">
              
              {/* Contenedor de Imagen con forma elegante */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
                className="md:col-span-7 relative z-0"
              >
                <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[120px_10px_120px_10px] shadow-2xl border-8 border-white">
                  <img src="/foto2.jpg" alt="Boda" className="w-full h-full object-cover scale-105" />
                </div>
                {/* Adorno flotante */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-[#C2A378] rounded-br-[40px] hidden md:block" />
              </motion.div>

              {/* Bloque de Texto Flotante (Glassmorphism) */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="mt-[-80px] md:mt-0 md:absolute md:right-0 md:col-span-6 z-10"
              >
                <div className="bg-white/80 backdrop-blur-md p-8 md:p-16 rounded-[20px_80px_20px_80px] shadow-xl border border-white/50 text-center">
                  <div className="inline-block px-4 py-1 border border-[#C2A378]/30 rounded-full mb-6 text-[10px] tracking-[0.4em] text-[#C2A378] uppercase">
                    ¡Nos Casamos!
                  </div>
                  <h1 className="text-6xl md:text-8xl font-serif text-[#0B2F2A] leading-[0.9]">
                    Carlos <br />
                    <span className="text-3xl md:text-5xl italic font-light text-[#4E0302] block my-4">&</span>
                    Joseline
                  </h1>
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <div className="h-[1px] w-8 bg-[#C2A378]" />
                    <p className="text-lg font-serif italic text-gray-500">Sábado, 19 de Diciembre</p>
                    <div className="h-[1px] w-8 bg-[#C2A378]" />
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#C2A378] opacity-50">
              <ChevronDown size={30} />
            </motion.div>
          </section>

          {/* CONTADOR */}
          <section className="py-20 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif opacity-[0.02] pointer-events-none select-none">2026</div>
            <Contador />
          </section>

          {/* FRASE */}
          <section className="py-32 relative">
            <div className="absolute inset-0 bg-[#0B2F2A] skew-y-2 origin-right scale-110 shadow-inner" />
            <div className="max-w-2xl mx-auto space-y-8 relative z-10 text-center px-8">
              <Heart size={30} className="mx-auto text-[#C2A378]" fill="#C2A378" />
              <p className="text-2xl md:text-4xl font-serif leading-relaxed italic text-white">
                "Hay momentos que duran segundos, pero ocupan toda una vida en el corazón."
              </p>
            </div>
          </section>

          {/* DETALLES: RECEPCIÓN Y UBICACIÓN */}
          <section className="max-w-6xl mx-auto px-8 py-32 grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[60px_5px_60px_5px] shadow-sm border border-[#F7F3ED] text-center space-y-6 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#F7F3ED] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-[#4E0302]" size={24} />
              </div>
              <h3 className="font-serif text-4xl text-[#0B2F2A]">La Recepción</h3>
              <div className="text-gray-500 italic text-3xl block">06:00 PM</div>
              <button onClick={agendarEvento} className="text-[9px] uppercase tracking-widest text-[#C2A378] font-bold hover:text-[#4E0302] transition-colors">
                + Agendar en Calendario
              </button>
            </div>

            <div className="bg-white p-12 rounded-[5px_60px_5px_60px] shadow-sm border border-[#F7F3ED] text-center space-y-6 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#F7F3ED] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-[#4E0302]" size={24} />
              </div>
              <h3 className="font-serif text-4xl text-[#0B2F2A]">Ubicación</h3>
              <p className="text-gray-500 italic">Pococí, Guápiles. <br /> Recinto Privado.</p>
              <a href="#" className="inline-block bg-[#0B2F2A] text-white px-10 py-3 rounded-full text-[10px] tracking-widest uppercase hover:bg-[#C2A378] transition-all transform hover:scale-105">
                Ver Mapa GPS
              </a>
            </div>
          </section>

          {/* SECCIÓN MÚSICA */}
          <section className="py-32 bg-[#0B2F2A] relative overflow-hidden text-center text-white px-8">
            <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12"><Music size={120} /></div>
            <Music className="mx-auto mb-8 text-[#C2A378]" />
            <h3 className="font-serif text-3xl mb-8 italic">¿Qué canción te gustaría bailar?</h3>
            <div className="max-w-md mx-auto flex flex-col gap-4 relative z-10">
              <input 
                type="text" 
                placeholder="Escribe aquí tu canción..."
                className="bg-white/10 border border-white/20 rounded-full px-6 py-4 outline-none italic focus:border-[#C2A378] transition-colors"
                value={cancion}
                onChange={(e) => setCancion(e.target.value)}
              />
              <button onClick={sugerirMusica} className="bg-[#C2A378] text-[#0B2F2A] px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white transition-all transform hover:scale-105 shadow-xl">
                Sugerir Canción
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="py-40 text-center px-8 relative bg-white">
            <Sparkles className="mx-auto mb-6 text-[#C2A378]/40" size={40} />
            <h3 className="font-serif text-5xl text-[#0B2F2A] mb-8">Te esperamos</h3>
            <a href="https://wa.me/50600000000" className="inline-block px-12 py-6 bg-[#4E0302] text-white text-[11px] tracking-[0.4em] uppercase font-bold rounded-[50px_5px_50px_5px] shadow-2xl hover:scale-105 transition-all">
              Confirmar RSVP
            </a>
            <p className="mt-20 text-[10px] tracking-[0.5em] uppercase text-gray-300">C & J • 19.12.2026</p>
          </footer>

        </motion.div>
      )}
    </main>
  );
}
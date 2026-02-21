"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, Heart, ChevronDown, Mail, Music, Shirt, Volume2, VolumeX, Sparkles } from 'lucide-react';

// --- COMPONENTE DEL CONTADOR ESTILIZADO ---
const Contador = () => {
  const [tiempo, setTiempo] = useState({ días: 0, horas: 0, min: 0, seg: 0 });

  useEffect(() => {
    const meta = new Date("2026-12-19T18:00:00").getTime();
    const interval = setInterval(() => {
      const ahora = new Date().getTime();
      const diff = meta - ahora;
      if (diff > 0) {
        setTiempo({
          días: Math.floor(diff / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seg: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-8 md:gap-12 justify-center items-center py-12">
      {Object.entries(tiempo).map(([label, valor]) => (
        <div key={label} className="group relative">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="block text-4xl md:text-6xl font-serif text-[#0B2F2A] transition-transform group-hover:-translate-y-1"
          >
            {valor.toString().padStart(2, '0')}
          </motion.span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#C2A378] font-semibold">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function InvitacionBoda() {
  const [comenzar, setComenzar] = useState(false);
  const [conMusica, setConMusica] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const abrirInvitacion = (activar: boolean) => {
    setComenzar(true);
    setConMusica(activar);
    if (activar) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
          audioRef.current.play().catch(() => {});
        }
      }, 800);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCF9] text-[#2D2D2D] selection:bg-[#C2A378] selection:text-white">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* OVERLAY TEXTURA PAPEL */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <AnimatePresence>
        {!comenzar && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[1000] bg-[#0B2F2A] flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <span className="text-[#C2A378] tracking-[0.5em] text-[10px] uppercase block">Nuestra Boda</span>
                <h2 className="font-serif text-5xl text-white italic">C <span className="text-[#C2A378]">&</span> J</h2>
              </motion.div>
              
              <div className="flex flex-col gap-5">
                <button onClick={() => abrirInvitacion(true)} className="group flex items-center justify-center gap-4 px-10 py-5 bg-[#C2A378] text-[#0B2F2A] text-[11px] tracking-[0.4em] uppercase font-bold rounded-full hover:bg-white transition-all shadow-2xl">
                  <Volume2 size={16} className="group-hover:animate-pulse" /> Abrir con Música
                </button>
                <button onClick={() => abrirInvitacion(false)} className="px-10 py-5 text-white/50 text-[10px] tracking-[0.4em] uppercase hover:text-white transition-colors">
                  <VolumeX size={14} className="inline mr-2" /> Sin Sonido
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {comenzar && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          {/* HERO SECTION */}
          <section className="h-screen relative flex flex-col items-center justify-center text-center px-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none"
            >
              <h1 className="text-[30vw] font-serif leading-none uppercase">Wedding</h1>
            </motion.div>

            <div className="space-y-8 z-10">
              <motion.div initial={{ letterSpacing: "0.2em", opacity: 0 }} animate={{ letterSpacing: "0.6em", opacity: 1 }} transition={{ duration: 1.5 }}>
                <span className="text-[#C2A378] text-[12px] uppercase font-semibold">Guápiles, Costa Rica</span>
              </motion.div>

              <h1 className="text-7xl md:text-9xl font-serif text-[#0B2F2A] leading-[0.8]">
                Carlos <br />
                <span className="text-3xl md:text-5xl italic font-light text-[#4E0302] block my-6">and</span>
                Joseline
              </h1>

              <div className="flex items-center justify-center gap-6 py-8">
                 <div className="h-[0.5px] w-16 bg-[#C2A378]" />
                 <p className="text-xl md:text-2xl font-serif italic text-[#4E0302]">19 de Diciembre, 2026</p>
                 <div className="h-[0.5px] w-16 bg-[#C2A378]" />
              </div>
            </div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#C2A378]"
            >
              <ChevronDown size={24} strokeWidth={1} />
            </motion.div>
          </section>

          {/* CUENTA REGRESIVA ELEGANTE */}
          <section className="py-20 bg-white border-y border-[#F7F3ED]">
            <div className="max-w-4xl mx-auto text-center">
              <Contador />
            </div>
          </section>

          {/* FRASE INSPIRACIONAL */}
          <section className="py-40 px-8 text-center bg-[#0B2F2A] relative overflow-hidden">
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10 max-w-3xl mx-auto">
                <Sparkles className="mx-auto text-[#C2A378] mb-8" size={32} strokeWidth={1} />
                <p className="text-3xl md:text-5xl font-serif leading-tight italic text-white/90">
                  "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección."
                </p>
             </motion.div>
          </section>

          {/* DETALLES: RECEPCIÓN Y UBICACIÓN */}
          <section className="max-w-7xl mx-auto px-8 py-40 grid md:grid-cols-2 gap-20">
             <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 40, opacity: 0 }} className="space-y-8 border-l border-[#C2A378]/20 pl-12">
                <Clock className="text-[#4E0302]" size={32} strokeWidth={1} />
                <h3 className="font-serif text-5xl text-[#0B2F2A]">La Recepción</h3>
                <p className="text-gray-500 text-lg font-serif italic">Seis de la tarde</p>
                <div className="h-px w-20 bg-[#C2A378]" />
                <button onClick={() => window.open('...calendario...')} className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#C2A378] hover:text-[#0B2F2A] transition-colors">
                  + Save the Date
                </button>
             </motion.div>

             <motion.div whileInView={{ y: 0, opacity: 1 }} initial={{ y: 40, opacity: 0 }} className="space-y-8 border-l border-[#C2A378]/20 pl-12">
                <MapPin className="text-[#4E0302]" size={32} strokeWidth={1} />
                <h3 className="font-serif text-5xl text-[#0B2F2A]">Ubicación</h3>
                <p className="text-gray-500 text-lg font-serif italic">Pococí, Guápiles. Recinto Privado.</p>
                <div className="h-px w-20 bg-[#C2A378]" />
                <a href="#" className="inline-block border border-[#0B2F2A] text-[#0B2F2A] px-12 py-4 rounded-full text-[10px] tracking-[0.3em] uppercase hover:bg-[#0B2F2A] hover:text-white transition-all">
                  Ver Mapa GPS
                </a>
             </motion.div>
          </section>

          {/* CÓDIGO DE VESTIMENTA Y REGALOS */}
          <section className="bg-[#F7F3ED] py-40 px-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
              <div className="text-center space-y-6">
                <Shirt className="mx-auto text-[#4E0302]" size={36} strokeWidth={1} />
                <h4 className="font-serif text-3xl text-[#0B2F2A]">Dress Code</h4>
                <p className="text-[#C2A378] tracking-[0.3em] uppercase text-[11px] font-bold">Formal / Elegante</p>
                <p className="text-gray-400 font-serif italic">Nos encantaría verte con tus mejores galas (Vestido largo y Traje completo).</p>
              </div>
              <div className="text-center space-y-6">
                <Mail className="mx-auto text-[#4E0302]" size={36} strokeWidth={1} />
                <h4 className="font-serif text-3xl text-[#0B2F2A]">Obsequios</h4>
                <p className="text-[#C2A378] tracking-[0.3em] uppercase text-[11px] font-bold">Lluvia de Sobres</p>
                <p className="text-gray-400 font-serif italic">Tu presencia es nuestro mayor regalo, pero si deseas tener un detalle, contaremos con lluvia de sobres.</p>
              </div>
            </div>
          </section>

          {/* RSVP FINAL */}
          <footer className="py-40 text-center bg-white relative">
             <div className="max-w-2xl mx-auto space-y-12 px-8">
               <div className="space-y-4">
                 <h3 className="font-serif text-6xl text-[#0B2F2A]">RSVP</h3>
                 <div className="h-[1px] w-24 bg-[#C2A378] mx-auto" />
                 <p className="text-gray-400 font-serif italic text-lg">Por favor confirma tu asistencia antes del 01 de Diciembre</p>
               </div>
               
               <a href="https://wa.me/50600000000" className="inline-block px-16 py-8 bg-[#0B2F2A] text-white text-[12px] tracking-[0.5em] uppercase font-bold rounded-full shadow-2xl hover:bg-[#C2A378] hover:text-[#0B2F2A] transition-all transform hover:scale-105">
                  Confirmar Asistencia
               </a>
               
               <div className="pt-24 opacity-30">
                 <p className="text-[11px] tracking-[0.6em] uppercase text-[#0B2F2A]">Carlos & Joseline • 2026</p>
               </div>
             </div>
          </footer>

        </motion.div>
      )}
    </main>
  );
}
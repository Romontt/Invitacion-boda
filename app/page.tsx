"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Heart, ChevronDown, Mail, Shirt, Volume2, VolumeX, Sparkles } from 'lucide-react';

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
    <div className="flex gap-6 md:gap-10 justify-center items-center py-10">
      {Object.entries(tiempo).map(([label, valor]) => (
        <div key={label} className="text-center">
          <span className="block text-3xl md:text-5xl font-serif text-[#0B2F2A]">
            {valor.toString().padStart(2, '0')}
          </span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-[#C2A378] font-bold">
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
    <main className="min-h-screen bg-[#FDFCF9] text-[#2D2D2D] selection:bg-[#C2A378] selection:text-white overflow-hidden">
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* OVERLAY TEXTURA PAPEL */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <AnimatePresence>
        {!comenzar && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[1000] bg-[#0B2F2A] flex items-center justify-center p-6"
          >
            <div className="max-w-md w-full text-center space-y-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <span className="text-[#C2A378] tracking-[0.5em] text-[10px] uppercase block">Nuestra Boda</span>
                <h2 className="font-serif text-5xl text-white italic">C <span className="text-[#C2A378]">&</span> J</h2>
              </motion.div>
              <div className="flex flex-col gap-5">
                <button onClick={() => abrirInvitacion(true)} className="flex items-center justify-center gap-4 px-10 py-5 bg-[#C2A378] text-[#0B2F2A] text-[11px] tracking-[0.4em] uppercase font-bold rounded-full hover:bg-white transition-all shadow-2xl">
                  <Volume2 size={16} /> Abrir con Música
                </button>
                <button onClick={() => abrirInvitacion(false)} className="px-10 py-5 text-white/50 text-[10px] tracking-[0.4em] uppercase hover:text-white transition-colors">
                  Sin Sonido
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {comenzar && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          
          {/* --- NUEVO HERO SECCIÓN --- */}
          <section className="min-h-screen relative flex items-center justify-center p-4 md:p-12 lg:p-24">
            <div className="grid md:grid-cols-2 gap-0 items-center max-w-7xl w-full bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden relative">
              
              {/* Lado de la Imagen */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative h-[50vh] md:h-[80vh] overflow-hidden"
              >
                <img src="/foto2.jpg" alt="Carlos y Joseline" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0B2F2A]/10 mix-blend-multiply" />
              </motion.div>

              {/* Lado del Contenido */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="relative p-8 md:p-20 flex flex-col justify-center items-center text-center bg-[#FDFCF9]"
              >
                {/* Elemento Decorativo de Fondo (Ocapo) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
                   <h2 className="text-[20rem] font-serif italic rotate-12">Save</h2>
                </div>

                <div className="relative z-10 space-y-6">
                  <Sparkles className="mx-auto text-[#C2A378] mb-4" size={20} strokeWidth={1} />
                  <span className="text-[#C2A378] tracking-[0.6em] text-[10px] uppercase font-bold block">Save the Date</span>
                  
                  <h1 className="text-6xl md:text-8xl font-serif text-[#0B2F2A] leading-tight">
                    Carlos <br />
                    <span className="text-3xl italic text-[#4E0302] my-2 block">&</span>
                    Joseline
                  </h1>

                  <div className="py-6 flex flex-col items-center gap-2">
                    <div className="h-px w-12 bg-[#C2A378]/40" />
                    <p className="text-lg md:text-xl font-serif italic text-gray-500">19 de Diciembre, 2026</p>
                    <div className="h-px w-12 bg-[#C2A378]/40" />
                  </div>

                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Guápiles • Costa Rica</p>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }}
              className="absolute bottom-8 text-[#C2A378]"
            >
              <ChevronDown size={24} strokeWidth={1} />
            </motion.div>
          </section>

          {/* CUENTA REGRESIVA */}
          <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto text-center px-6">
              <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-4 block">Faltan solo</span>
              <Contador />
            </div>
          </section>

          {/* DETALLES Y RSVP (Se mantienen con el estilo elegante) */}
          <section className="max-w-6xl mx-auto px-8 py-32 grid md:grid-cols-2 gap-16">
             <div className="space-y-6 border-l border-[#C2A378]/20 pl-8">
                <Clock className="text-[#4E0302]" size={28} strokeWidth={1} />
                <h3 className="font-serif text-4xl text-[#0B2F2A]">La Recepción</h3>
                <p className="text-gray-500 italic">06:00 PM | Pococí, Guápiles</p>
             </div>
             <div className="space-y-6 border-l border-[#C2A378]/20 pl-8">
                <MapPin className="text-[#4E0302]" size={28} strokeWidth={1} />
                <h3 className="font-serif text-4xl text-[#0B2F2A]">Ubicación</h3>
                <a href="#" className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#C2A378] underline decoration-[#C2A378]/30 underline-offset-8">
                  Abrir Mapa Google
                </a>
             </div>
          </section>

          {/* CÓDIGO DE VESTIMENTA */}
          <section className="bg-[#0B2F2A] py-32 text-center text-white px-8">
              <Shirt className="mx-auto text-[#C2A378] mb-8" size={32} strokeWidth={1} />
              <h4 className="font-serif text-3xl mb-4 italic">Dress Code</h4>
              <p className="text-[#C2A378] tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Formal Elegante</p>
              <p className="max-w-xs mx-auto text-white/60 text-sm font-serif italic">Hombres de traje completo, mujeres de vestido largo.</p>
          </section>

          {/* RSVP */}
          <footer className="py-40 text-center bg-white">
             <div className="max-w-2xl mx-auto space-y-12 px-8">
               <h3 className="font-serif text-5xl text-[#0B2F2A]">Confirmar Asistencia</h3>
               <p className="text-gray-400 font-serif italic">Será un honor contar con tu presencia.</p>
               <a href="https://wa.me/50600000000" className="inline-block px-12 py-6 bg-[#0B2F2A] text-white text-[11px] tracking-[0.5em] uppercase font-bold rounded-full shadow-xl hover:bg-[#C2A378] hover:text-[#0B2F2A] transition-all">
                  Confirmar RSVP
               </a>
             </div>
          </footer>

        </motion.div>
      )}
    </main>
  );
}
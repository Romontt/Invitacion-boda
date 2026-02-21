"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Clock, Heart, ChevronDown, Mail, Music, Shirt, Camera, Share2 } from 'lucide-react';

// --- COMPONENTE DEL CONTADOR ---
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
    <div className="relative p-10 mt-8">
      <div className="absolute inset-0 border border-[#C2A378]/40 rounded-full scale-110 animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-0 border border-[#4E0302]/20 rounded-full scale-105" />
      
      <div className="flex gap-4 md:gap-6 justify-center items-center relative z-10">
        {Object.entries(tiempo).map(([label, valor]) => (
          <div key={label} className="text-center min-w-[60px]">
            <span className="block text-2xl md:text-4xl font-serif text-[#4E0302]">{valor}</span>
            <div className="h-[1px] w-4 bg-[#C2A378] mx-auto my-1" />
            <span className="text-[8px] uppercase tracking-widest text-gray-400">{label}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
         <Heart size={16} className="mx-auto text-[#C2A378]" fill="#C2A378" />
      </div>
    </div>
  );
};

export default function InvitacionBoda() {
  const [comenzar, setComenzar] = useState(false);
  const [cancion, setCancion] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const yFlowers = useTransform(scrollYProgress, [0, 1], [0, -400]);

  // --- SOLUCIÓN AL AUDIO: Pausar al salir del navegador ---
  useEffect(() => {
    const manejarVisibilidad = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      } else {
        // Solo vuelve a sonar si el usuario ya presionó "Ingresar"
        if (comenzar) {
          audioRef.current?.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", manejarVisibilidad);
    return () => document.removeEventListener("visibilitychange", manejarVisibilidad);
  }, [comenzar]);

  const abrirInvitacion = () => {
    setComenzar(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => console.log("Audio requiere interacción"));
      }
    }, 500);
  };

  const sugerirMusica = () => {
    const mensaje = encodeURIComponent(`¡Hola! Sugiero esta canción para la boda: ${cancion}`);
    // REEMPLAZA EL 50600000000 CON TU NÚMERO REAL ABAJO
    window.open(`https://wa.me/50600000000?text=${mensaje}`, '_blank');
  };

  const agendarEvento = () => {
    const titulo = "Boda Carlos & Joseline";
    const fecha = "20261219T180000";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${fecha}/${fecha}&location=Guápiles,+Limón`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#FDFCF9] text-[#2D2D2D] overflow-x-hidden relative selection:bg-[#0B2F2A] selection:text-white font-sans">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />
      
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04] mix-blend-multiply" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }} />

      <AnimatePresence>
        {!comenzar && (
          <motion.div 
            key="portada"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[1000] bg-[#0B2F2A] flex items-center justify-center p-6"
          >
            <div className="text-center p-16 rounded-[100px_20px_100px_20px] bg-[#FDFCF9] relative shadow-2xl border border-[#C2A378]/20">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-20"><Heart size={40} /></div>
              <h2 className="font-serif text-3xl mb-8 tracking-[0.2em] text-[#0B2F2A]">C & J</h2>
              <button onClick={abrirInvitacion} className="px-10 py-4 bg-[#4E0302] text-white text-[10px] tracking-[0.4em] uppercase rounded-full hover:scale-105 transition-all shadow-lg">
                Ingresar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {comenzar && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          
          <section className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C2A378]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4E0302]/5 rounded-full blur-3xl" />

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center relative z-10"
            >
              <div className="inline-block px-4 py-1 border border-[#C2A378]/30 rounded-full mb-8 text-[10px] tracking-[0.4em] text-[#C2A378] uppercase">
                ¡Nos Casamos!
              </div>
              <h1 className="text-7xl md:text-9xl font-serif text-[#0B2F2A] leading-tight">
                Carlos <br />
                <span className="text-4xl md:text-6xl italic font-light text-[#4E0302] block my-2">&</span>
                Joseline
              </h1>
              <div className="flex items-center justify-center gap-4 my-8">
                 <div className="h-[1px] w-12 bg-[#C2A378]" />
                 <p className="text-lg md:text-xl font-serif italic text-gray-500">Sábado, 19 de Diciembre</p>
                 <div className="h-[1px] w-12 bg-[#C2A378]" />
              </div>
            </motion.div>

            <Contador />
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-12 text-[#C2A378] opacity-50"
            >
              <ChevronDown size={30} />
            </motion.div>
          </section>

          <section className="py-32 relative">
             <div className="absolute inset-0 bg-[#0B2F2A] skew-y-3 origin-right scale-110" />
             <div className="max-w-2xl mx-auto space-y-8 relative z-10 text-center px-8">
                <Heart size={30} className="mx-auto text-[#C2A378]" />
                <p className="text-2xl md:text-4xl font-serif leading-relaxed italic text-white">
                  "Hay momentos que duran segundos, pero ocupan toda una vida en el corazón."
                </p>
             </div>
          </section>

          <section className="max-w-6xl mx-auto px-8 py-40 grid md:grid-cols-2 gap-8">
             <motion.div 
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}
                className="bg-white p-12 rounded-[60px_60px_60px_5px] shadow-sm border border-[#F7F3ED] text-center space-y-6"
             >
                <div className="w-16 h-16 bg-[#F7F3ED] rounded-full flex items-center justify-center mx-auto">
                    <Clock className="text-[#4E0302]" size={24} />
                </div>
                <h3 className="font-serif text-4xl text-[#0B2F2A]">La Recepción</h3>
                <div className="text-gray-500 italic">
                   <span className="text-[#4E0302] font-bold not-italic text-3xl block">06:00 PM</span>
                   Guápiles, Limón.
                </div>
                <button onClick={agendarEvento} className="text-[9px] uppercase tracking-widest text-[#C2A378] font-bold hover:text-[#0B2F2A] transition-colors">
                  + Agendar en Calendario
                </button>
             </motion.div>

             <motion.div 
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 20 }}
                className="bg-white p-12 rounded-[60px_60px_5px_60px] shadow-sm border border-[#F7F3ED] text-center space-y-6"
             >
                <div className="w-16 h-16 bg-[#F7F3ED] rounded-full flex items-center justify-center mx-auto">
                    <MapPin className="text-[#4E0302]" size={24} />
                </div>
                <h3 className="font-serif text-4xl text-[#0B2F2A]">Ubicación</h3>
                <p className="text-gray-500 italic">Pococí, Guápiles. <br /> Recinto Privado.</p>
                <a href="https://maps.google.com" target="_blank" className="inline-block bg-[#0B2F2A] text-white px-10 py-3 rounded-full text-[10px] tracking-widest uppercase shadow-md hover:bg-[#4E0302] transition-all">
                  Ver Mapa GPS
                </a>
             </motion.div>
          </section>

          <section className="bg-[#F7F3ED]/50 py-32 px-8">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 text-center md:text-right space-y-4">
                <Shirt className="inline-block text-[#4E0302]" size={40} />
                <h4 className="font-serif text-4xl text-[#0B2F2A]">Vestimenta</h4>
                <p className="text-[#C2A378] font-bold tracking-[0.3em] uppercase text-[10px]">Formal / Elegante</p>
                <p className="text-gray-500 text-sm italic">Hombres de traje, mujeres de vestido largo.</p>
              </div>
              <div className="w-[1px] h-32 bg-[#C2A378]/30 hidden md:block" />
              <div className="flex-1 text-center md:text-left space-y-4">
                <Mail className="inline-block text-[#4E0302]" size={40} />
                <h4 className="font-serif text-4xl text-[#0B2F2A]">Obsequios</h4>
                <p className="text-[#C2A378] font-bold tracking-[0.3em] uppercase text-[10px]">Lluvia de Sobres</p>
                <p className="text-gray-500 text-sm italic leading-relaxed">
                  Vuestra presencia es nuestro mejor regalo, pero si deseáis tener un detalle, contaremos con lluvia de sobres.
                </p>
              </div>
            </div>
          </section>

          <section className="py-32 px-4 max-w-5xl mx-auto text-center">
            <h3 className="font-serif text-4xl text-[#0B2F2A] mb-16">Nuestra Historia</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="rounded-[100px_10px_10px_10px] overflow-hidden shadow-lg border-4 border-white h-64">
                <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="rounded-full overflow-hidden shadow-lg border-4 border-white h-64 w-64 mx-auto">
                <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="rounded-[10px_100px_10px_10px] overflow-hidden shadow-lg border-4 border-white h-64 col-span-2 md:col-span-1">
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </section>

          <section className="py-32 bg-[#0B2F2A] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2A378]/10 rounded-full -mr-32 -mt-32" />
            <div className="max-w-xl mx-auto text-center relative z-10 px-8">
              <Music className="mx-auto mb-8 text-[#C2A378] animate-bounce" />
              <h3 className="font-serif text-3xl text-white mb-8 italic">¿Qué canción te gustaría bailar?</h3>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Escribe el nombre de tu canción..."
                  className="bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white focus:bg-white/20 outline-none placeholder:text-white/40 italic"
                  value={cancion}
                  onChange={(e) => setCancion(e.target.value)}
                />
                <button onClick={sugerirMusica} className="bg-[#C2A378] text-[#0B2F2A] px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl">Sugerir Canción</button>
              </div>
            </div>
          </section>

          <footer className="py-40 text-center px-8 relative">
             <div className="mb-8">
               <div className="w-20 h-[1px] bg-[#C2A378] mx-auto mb-4" />
               <h3 className="font-serif text-5xl text-[#0B2F2A]">Te esperamos</h3>
               <div className="w-20 h-[1px] bg-[#C2A378] mx-auto mt-4" />
             </div>
             <p className="text-gray-400 italic mb-12 max-w-xs mx-auto">Por favor, confirma tu asistencia antes del 01 de Diciembre.</p>
             {/* REEMPLAZA EL 50600000000 CON TU NÚMERO REAL ABAJO */}
             <a href="https://wa.me/50600000000" className="inline-block px-12 py-6 bg-[#4E0302] text-white text-[11px] tracking-[0.4em] uppercase font-bold rounded-[50px_5px_50px_5px] shadow-2xl hover:bg-[#0B2F2A] transition-all">
                Confirmar RSVP
             </a>
             <div className="mt-24 space-y-2 opacity-30">
                <p className="text-[10px] tracking-widest uppercase">C & J • 2026</p>
                <Heart size={12} className="mx-auto" />
             </div>
          </footer>

        </motion.div>
      )}
    </main>
  );
}
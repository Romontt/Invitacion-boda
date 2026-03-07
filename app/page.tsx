"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Heart, Music, Shirt, 
  Volume2, VolumeX, Sparkles, Instagram, Gift, 
  Camera, Star, Share2, Users, Lock, Settings, Link as LinkIcon 
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURACIÓN DE SUPABASE ---
const supabase = createClient(
  'https://spriycerzcurnhoznzzr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcml5Y2VyemN1cm5ob3puenpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDIwODcsImV4cCI6MjA4ODQ3ODA4N30.90778vaPGPxLdjmcvQFf7_xcnhqi_ukW9fJtG5BlkDc'
);

// --- COMPONENTE DEL CONTADOR ---
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
    <div className="relative inline-block mt-8">
      <div className="absolute inset-0 -m-6 border border-[#d1b06b]/20 rounded-full animate-spin-slow pointer-events-none" />
      <div className="relative bg-white/90 backdrop-blur-md rounded-full p-10 md:p-14 shadow-2xl border border-white flex flex-col items-center">
        <h3 className="font-serif text-[#06140d] text-2xl md:text-3xl mb-4 italic">Faltan solo...</h3>
        <div className="flex gap-4 md:gap-8 justify-center items-center">
          {Object.entries(tiempo).map(([label, valor], index, array) => (
            <React.Fragment key={label}>
              <div className="text-center">
                <div className="text-3xl md:text-5xl font-serif text-[#06140d] leading-none">{valor}</div>
                <span className="text-[9px] uppercase tracking-widest text-[#d1b06b] font-bold mt-2 block">{label}</span>
              </div>
              {index < array.length - 1 && (
                <div className="h-10 w-[1px] bg-[#d1b06b]/30" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Heart className="text-[#d1b06b] mt-6 animate-pulse" fill="#d1b06b" size={20} />
      </div>
    </div>
  );
};

export default function InvitacionBoda() {
  const [comenzar, setComenzar] = useState(false);
  const [cancion, setCancion] = useState("");
  const [nombreInvitado, setNombreInvitado] = useState("Invitado Especial");
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to');
    if (guest) setNombreInvitado(guest);
  }, []);

  const abrirInvitacion = (activar: boolean) => {
    setComenzar(true);
    if (activar && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleConfirmar = async () => {
    setEnviando(true);
    // Se mapea el nombre al campo 'nombre' y se marca 'confirmado' como true
    const { error } = await supabase.from('asistencias').insert([
      { nombre: nombreInvitado, confirmado: true, mensaje: "Confirmado vía Web" }
    ]);
    if (!error) setConfirmado(true);
    setEnviando(false);
  };

  const agendarEvento = () => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Carlos+y+Joselyn&dates=20261219T180000/20261219T235900&location=Luna+Azul,+Rita+de+Pococí`;
    window.open(url, '_blank');
  };

  const itemsGrid = [
    { icon: <Clock size={24} />, title: "Tiempo Real", desc: "Cuenta regresiva activa." },
    { icon: <MapPin size={24} />, title: "GPS", desc: "Luna Azul, Rita de Pococí." },
    { icon: <Users size={24} />, title: "RSVP", desc: "Confirmación Directa." },
    { icon: <Shirt size={24} />, title: "Dress Code", desc: "Formal." },
    { icon: <Music size={24} />, title: "Playlist", desc: "Sugerencias Vía WA." },
    { icon: <Instagram size={24} />, title: "Hashtag", desc: "#BodaCJ2026." },
    { icon: <Gift size={24} />, title: "Regalos", desc: "Lluvia de Sobres." },
    { icon: <Star size={24} />, title: "Agenda", desc: "Google Calendar." },
  ];

  return (
    <main className="min-h-screen bg-[#f7f5f0] text-[#06140d] selection:bg-[#d1b06b] selection:text-white">
      <audio ref={audioRef} src="/music.mp3" loop />

      <AnimatePresence>
        {!comenzar && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[1000] bg-[#06140d] flex items-center justify-center p-6 text-center"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-sm w-full bg-[#f7f5f0] p-12 rounded-[3rem] shadow-2xl border border-[#d1b06b]/20">
              <h2 className="font-cursive text-6xl text-[#d1b06b] mb-4">C & J</h2>
              <p className="text-sm italic text-stone-500 mb-8 font-serif tracking-widest uppercase">¡Hola, {nombreInvitado}!</p>
              <div className="flex flex-col gap-4">
                <button onClick={() => abrirInvitacion(true)} className="flex items-center justify-center gap-3 px-8 py-5 bg-[#06140d] text-[#d1b06b] text-[10px] tracking-[0.3em] uppercase rounded-full font-bold shadow-xl transition-all hover:bg-[#d1b06b] hover:text-white">
                  <Volume2 size={16} /> Entrar con Música
                </button>
                <button onClick={() => abrirInvitacion(false)} className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-[#06140d] transition-colors">
                  Entrar sin música
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {comenzar && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          
          {/* HERO SECTION */}
          <section className="h-screen relative flex items-center justify-center overflow-hidden bg-[#06140d]">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f7f5f0]" />
            
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 text-center px-6">
              <span className="text-[#d1b06b] tracking-[0.8em] text-[10px] uppercase font-bold mb-6 block italic">Nuestra Boda</span>
              <h1 className="text-8xl md:text-[10rem] font-cursive text-[#d1b06b] leading-none drop-shadow-2xl">
                Carlos & Joselyn
              </h1>
              <div className="flex items-center justify-center gap-4 mt-8 text-stone-700 font-serif italic text-2xl tracking-widest">
                <span>19 . 12 . 2026</span>
              </div>
            </motion.div>
          </section>

          {/* CUENTA REGRESIVA */}
          <section className="py-20 flex flex-col justify-center items-center relative -mt-32 z-20">
             <Contador />
          </section>

          {/* GRID DE FUNCIONALIDADES (Corrección técnica de iconos) */}
          <section className="py-24 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
             {itemsGrid.map((item, i) => (
                 <motion.div whileHover={{ y: -5 }} key={i} className="flex flex-col items-center text-center space-y-3 group">
                     <div className="w-14 h-14 rounded-2xl bg-white text-[#d1b06b] flex items-center justify-center shadow-lg group-hover:bg-[#06140d] group-hover:text-white transition-all duration-500 border border-stone-100">
                        {item.icon}
                     </div>
                     <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#06140d]">{item.title}</h4>
                     <p className="text-[10px] text-stone-400 leading-tight uppercase font-medium">{item.desc}</p>
                 </motion.div>
             ))}
          </section>

          {/* UBICACIÓN Y AGENDA */}
          <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-[#d1b06b] text-center space-y-8">
              <Star className="text-[#d1b06b] mx-auto" size={40} />
              <h3 className="font-serif text-4xl text-[#06140d] italic">Agenda el Día</h3>
              <p className="text-stone-500 font-serif text-lg italic">Sábado 19 de Diciembre <br/> 06:00 PM</p>
              <button onClick={agendarEvento} className="bg-[#06140d] text-[#d1b06b] px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg">
                Agregar a Calendario
              </button>
            </div>

            <div className="bg-white p-12 rounded-[3rem] shadow-xl border-t-8 border-stone-100 text-center space-y-8">
              <MapPin className="text-stone-400 mx-auto" size={40} />
              <h3 className="font-serif text-4xl text-[#06140d] italic">La Ceremonia</h3>
              <p className="text-stone-500 font-serif text-lg italic uppercase">Luna Azul, Rita de Pococí. <br /> 4:00 PM</p>
              <a href="https://maps.app.goo.gl/..." target="_blank" className="inline-block bg-stone-100 text-stone-600 px-10 py-4 rounded-full text-[10px] tracking-widest uppercase hover:bg-[#06140d] hover:text-white transition-all font-bold">
                Ver en el mapa
              </a>
            </div>
          </section>

          {/* LLUVIA DE SOBRES */}
          <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="bg-[#06140d] p-16 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
              <h3 className="text-[#d1b06b] text-5xl font-cursive mb-10 italic">Lluvia de Sobres</h3>
              <p className="text-white/80 font-serif italic text-xl leading-relaxed max-w-2xl mx-auto">
                "Vuestra presencia es nuestro mayor regalo. Sin embargo, si deseáis tener un detalle con nosotros, dispondremos de un cofre para vuestros sobres en la recepción."
              </p>
            </div>
          </section>

          {/* RSVP INTEGRADO CON SUPABASE */}
          <footer className="py-40 text-center px-6 bg-[#06140d] text-white relative overflow-hidden">
            <Sparkles className="mx-auto mb-8 text-[#d1b06b]" size={40} />
            <h3 className="font-serif text-5xl mb-6 italic">Confirmar Asistencia</h3>
            <p className="mb-12 text-stone-400 font-serif italic text-lg">Por favor, confirma tu lugar antes del 01 de Diciembre.</p>
            
            <div className="max-w-sm mx-auto">
              {confirmado ? (
                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white/10 p-8 rounded-3xl border border-[#d1b06b]/50">
                   <p className="text-[#d1b06b] font-cursive text-3xl">¡Gracias por confirmar, {nombreInvitado}!</p>
                </motion.div>
              ) : (
                <button 
                  onClick={handleConfirmar}
                  disabled={enviando}
                  className="w-full py-6 bg-[#d1b06b] text-[#06140d] text-[11px] tracking-[0.4em] uppercase font-bold rounded-full shadow-2xl hover:bg-white transition-all disabled:opacity-50"
                >
                  {enviando ? 'PROCESANDO...' : 'CONFIRMAR MI ASISTENCIA'}
                </button>
              )}
            </div>
          </footer>

        </motion.div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-cursive { font-family: 'Great Vibes', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </main>
  );
}
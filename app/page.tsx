"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Heart, ChevronDown, Music, Shirt, 
  Volume2, VolumeX, Sparkles, Instagram, Gift, 
  Camera, Star, Share2, Users, Lock, Settings, Link 
} from 'lucide-react';

// --- COMPONENTE DEL CONTADOR ESTILIZADO ---
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
    <div className="relative inline-block">
      <div className="absolute inset-0 -m-8 border border-[#C2A378]/20 rounded-full animate-spin-slow pointer-events-none" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-12 shadow-xl border border-white flex flex-col items-center">
        <h3 className="font-serif text-[#4E0302] text-4xl mb-6">Falta</h3>
        <div className="flex gap-4 md:gap-6 justify-center items-center">
          {Object.entries(tiempo).map(([label, valor], index, array) => (
            <React.Fragment key={label}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-[#7A8C5F]">{valor}</div>
                <span className="text-[10px] uppercase tracking-tighter text-gray-500">{label}</span>
              </div>
              {index < array.length - 1 && (
                <div className="h-8 w-[1px] bg-[#C2A378]/30 mx-1" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Heart className="text-[#FFB38E] mt-6 animate-pulse" fill="#FFB38E" size={24} />
      </div>
    </div>
  );
};

export default function InvitacionBoda() {
  const [comenzar, setComenzar] = useState(false);
  const [conMusica, setConMusica] = useState(false);
  const [cancion, setCancion] = useState("");
  // Estado para funcionalidad de Invitado Personalizado
  const [nombreInvitado, setNombreInvitado] = useState("Invitado Especial");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulación de lectura de parámetros URL para nombres personalizados
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to');
    if (guest) setNombreInvitado(guest);
  }, []);

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
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 w-full h-1/3 bg-[#D9825E]/10 rounded-[0%_0%_50%_50%] -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 w-full h-1/3 bg-[#4E0302]/5 rounded-[50%_50%_0%_0%] translate-y-1/2 blur-3xl" />
      </div>

      <AnimatePresence>
        {!comenzar && (
          <motion.div 
            key="portada"
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[1000] bg-[#0B2F2A] flex items-center justify-center p-6"
          >
            <div className="text-center p-12 rounded-[100px_20px_100px_20px] bg-[#FDFCF9] relative shadow-2xl border border-[#C2A378]/20 max-w-sm w-full overflow-hidden">
               <div className="absolute -top-10 -right-10 opacity-20 rotate-12"><Sparkles size={100}/></div>
               
              <h2 className="font-serif text-3xl mb-4 tracking-[0.2em] text-[#0B2F2A]">C & J</h2>
              {/* Funcionalidad: Nombres de Invitados */}
              <p className="text-[12px] italic text-[#D9825E] mb-2 font-serif">¡Hola, {nombreInvitado}!</p>
              <p className="text-[10px] tracking-widest uppercase text-gray-400 mb-8">Estás invitado a nuestra boda</p>
              
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="relative z-10">
          
          {/* HERO SECTION */}
          <section className="min-h-screen relative flex items-center justify-center p-4 md:p-12">
            <div className="absolute inset-0 z-0 opacity-40">
                <svg viewBox="0 0 1440 320" className="absolute top-0 w-full h-auto translate-y-20"><path fill="#D9825E" d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto translate-y-20 rotate-180"><path fill="#7A1D1B" d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>

            <div className="relative w-full max-w-6xl grid md:grid-cols-12 items-center gap-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="md:col-span-7 relative"
              >
                <div className="aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-[150px_20px_150px_20px] shadow-2xl border-4 border-white relative z-10">
                  <img src="/foto2.jpg" alt="Boda" className="w-full h-full object-cover" />
                </div>
              </motion.div>

              <motion.div className="md:col-span-5 text-center md:text-left z-20 space-y-6">
                <div className="inline-block bg-[#FDFCF9]/80 backdrop-blur-sm p-8 md:p-12 rounded-[20px_80px_20px_80px] shadow-xl border border-white">
                    <span className="text-[#D9825E] tracking-[0.5em] text-[10px] uppercase font-bold mb-4 block italic">Nuestra Boda</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-[#0B2F2A] leading-tight">
                        Carlos <br />
                        <span className="text-2xl font-light text-[#4E0302]">&</span> <br />
                        Joseline
                    </h1>
                    <p className="text-gray-500 font-serif italic mt-6 text-xl">19 de Diciembre, 2026</p>
                    {/* Funcionalidad: Acceso VIP e Icono de Privacidad */}
                    <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                      <Lock size={12} /> Acceso VIP Confirmado
                    </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CUENTA REGRESIVA */}
          <section className="py-24 flex flex-col justify-center items-center bg-white/30 relative">
             <Contador />
          </section>

          {/* GRID DE FUNCIONALIDADES PREMIUM */}
          <section className="py-24 max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
                 { icon: <Clock size={20}/>, title: "Cuenta regresiva", desc: "Tiempo real del evento." },
                 { icon: <MapPin size={20}/>, title: "Ubicación GPS", desc: "Mapa interactivo." },
                 { icon: <Users size={20}/>, title: "RSVP", desc: "Confirmación de lista." },
                 { icon: <Music size={20}/>, title: "Playlist", desc: "Sugerencias de música." },
                 { icon: <Shirt size={20}/>, title: "Dress Code", desc: "Estilo de vestimenta." },
                 { icon: <Instagram size={20}/>, title: "Insta Wall", desc: "Hashtag del evento." },
                 { icon: <Gift size={20}/>, title: "Regalos", desc: "Lista de obsequios." },
                 { icon: <Camera size={20}/>, title: "Álbum", desc: "Historia fotográfica." },
                 { icon: <Share2 size={20}/>, title: "Envío Ilimitado", desc: "Digital y ecológico." },
                 { icon: <Link size={20}/>, title: "Link Personal", desc: "URL a tu gusto." },
                 { icon: <Settings size={20}/>, title: "Propietario", desc: "Gestión total." },
                 { icon: <Star size={20}/>, title: "Agenda", desc: "Agendar con un clic." },
             ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center space-y-2 group">
                     <div className="w-12 h-12 rounded-full bg-[#7A8C5F]/10 text-[#7A8C5F] flex items-center justify-center group-hover:bg-[#7A8C5F] group-hover:text-white transition-all">
                        {item.icon}
                     </div>
                     <h4 className="font-bold text-[11px] uppercase tracking-tighter text-[#0B2F2A]">{item.title}</h4>
                     <p className="text-[10px] text-gray-400 leading-tight">{item.desc}</p>
                 </div>
             ))}
          </section>

          {/* UBICACIÓN Y AGENDA */}
          <section className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-3xl shadow-lg border-b-4 border-[#D9825E] text-center space-y-6">
              <Star className="text-[#D9825E] mx-auto" size={32} />
              <h3 className="font-serif text-3xl text-[#0B2F2A]">Agenda el Día</h3>
              <p className="text-gray-500 italic">Sábado 19 de Diciembre <br/> 06:00 PM</p>
              <button onClick={agendarEvento} className="bg-[#D9825E] text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                Guardar en mi Agenda
              </button>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-lg border-b-4 border-[#7A8C5F] text-center space-y-6">
              <MapPin className="text-[#7A8C5F] mx-auto" size={32} />
              <h3 className="font-serif text-3xl text-[#0B2F2A]">¿Cómo llegar?</h3>
              <p className="text-gray-500 italic">Guápiles, Limón. <br /> Recinto Privado.</p>
              <a href="#" className="inline-block bg-[#0B2F2A] text-white px-8 py-3 rounded-full text-[10px] tracking-widest uppercase hover:bg-[#D9825E] transition-all">
                Abrir Mapa Interactivo
              </a>
            </div>
          </section>

          {/* SECCIÓN MÚSICA (Sugerencia de canciones) */}
          <section className="py-24 bg-[#FDFCF9] text-center px-6">
             <Music className="mx-auto mb-6 text-[#7A8C5F]" size={40} />
             <h3 className="font-serif text-3xl text-[#0B2F2A] mb-4">Música Sugerida</h3>
             <p className="text-gray-400 text-sm mb-8">Ayúdanos a crear la playlist perfecta</p>
             <div className="max-w-md mx-auto flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Nombre de la canción..." 
                  className="px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-[#D9825E] transition-all"
                  value={cancion}
                  onChange={(e) => setCancion(e.target.value)}
                />
                <button onClick={sugerirMusica} className="bg-[#0B2F2A] text-white py-4 rounded-full text-[10px] uppercase font-bold tracking-[0.2em]">
                   Enviar Sugerencia
                </button>
             </div>
          </section>

          {/* FOOTER Y CONFIRMACIÓN RSVP */}
          <footer className="py-32 text-center px-8 bg-[#0B2F2A] text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#FDFCF9]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
             </div>
             
            <Sparkles className="mx-auto mb-6 text-[#C2A378]" size={32} />
            <h3 className="font-serif text-4xl mb-8">Confirmación de Asistencia</h3>
            <p className="mb-8 text-white/60 text-sm">Por favor, confirma tu presencia antes del 01 de Diciembre.</p>
            <a href="https://wa.me/50600000000" className="inline-block px-12 py-5 bg-[#D9825E] text-white text-xs tracking-widest uppercase font-bold rounded-full shadow-2xl hover:bg-white hover:text-[#0B2F2A] transition-all">
              Confirmar RSVP
            </a>
            <p className="mt-16 text-[10px] tracking-[0.6em] uppercase text-white/30">Carlos & Joseline • 19.12.2026</p>
          </footer>

        </motion.div>
      )}
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
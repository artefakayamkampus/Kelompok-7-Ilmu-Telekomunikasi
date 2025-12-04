import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import { Shield, Users, Globe, Lock, X, ExternalLink, ChevronRight, BookOpen } from 'lucide-react';

// --- Data Definitions ---

interface InfoDetail {
  id: string;
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  argument: string;
  sources: { title: string; url?: string; year: string }[];
}

const INFO_DATA: InfoDetail[] = [
  {
    id: 'mental',
    icon: <Shield size={32} />,
    title: "Dampak Mental",
    shortDesc: "Korban cyberbullying mengalami kecemasan, depresi, dan trauma yang nyata meskipun terjadi di dunia maya.",
    argument: "Cyberbullying bukan sekadar 'kata-kata di layar'. Dampak psikologisnya seringkali lebih parah daripada bullying fisik karena jejak digital yang permanen dan audiens yang tak terbatas. Korban sering mengalami penurunan harga diri, gangguan tidur, kecemasan sosial akut, hingga depresi klinis. Dalam kasus ekstrem, isolasi sosial akibat perundungan daring menjadi faktor risiko utama tindakan bunuh diri di kalangan remaja.",
    sources: [
      { title: "UNICEF: Cyberbullying: What is it and how to stop it", year: "2023", url: "https://www.unicef.org" },
      { title: "Journal of Medical Internet Research: The Association Between Cyberbullying and Suicidality", year: "2022" },
      { title: "Kementerian Kesehatan RI: Dampak Bullying terhadap Kesehatan Mental Remaja", year: "2024" }
    ]
  },
  {
    id: 'jejak',
    icon: <Users size={32} />,
    title: "Jejak Digital",
    shortDesc: "Apa yang kamu posting hari ini bisa bertahan selamanya dan merusak reputasimu di masa depan.",
    argument: "Jejak digital bersifat abadi. Komentar jahat, roasting yang berlebihan, atau penyebaran aib orang lain yang dilakukan hari ini dapat dilacak kembali bertahun-tahun kemudian. Perusahaan modern dan penyedia beasiswa kini rutin melakukan 'Background Check' media sosial. Kandidat dengan riwayat perilaku toksik daring sering kali digugurkan karena dianggap berisiko merusak citra institusi.",
    sources: [
      { title: "CareerBuilder Survey: Employers Disregard Candidates Based on Social Media", year: "2023" },
      { title: "Harvard Business Review: Manage Your Digital Footprint", year: "2022" },
      { title: "Kominfo: Literasi Digital & Keamanan Siber", year: "2024" }
    ]
  },
  {
    id: 'hukum',
    icon: <Lock size={32} />,
    title: "Hukum UU ITE",
    shortDesc: "Pelaku cyberbullying dapat dijerat hukum di Indonesia. Bijaklah dalam menggunakan jari jemarimu.",
    argument: "Indonesia memiliki payung hukum tegas terkait perilaku di dunia maya. Tindakan 'roasting' yang menyerang kehormatan, fisik, atau mengandung ancaman dapat dijerat pidana. Pasal 27 ayat (3) UU ITE (pencemaran nama baik) dan Pasal 29 (pengancaman) mengatur sanksi penjara hingga denda miliaran rupiah. Dalih 'hanya bercanda' tidak berlaku di mata hukum jika unsur penghinaan terpenuhi.",
    sources: [
      { title: "Undang-Undang No. 19 Tahun 2016 tentang Perubahan atas UU No. 11 Tahun 2008 (UU ITE)", year: "2016" },
      { title: "SKB 3 Menteri tentang Pedoman Implementasi UU ITE", year: "2021" },
      { title: "Hukumonline: Jerat Hukum bagi Pelaku Cyberbullying", year: "2024" }
    ]
  },
  {
    id: 'etika',
    icon: <Globe size={32} />,
    title: "Etika Internet",
    shortDesc: "Perlakukan orang lain di internet sebagaimana kamu ingin diperlakukan di dunia nyata.",
    argument: "Anonimitas internet seringkali menciptakan 'Online Disinhibition Effect', di mana orang merasa bebas melakukan hal buruk yang tidak berani mereka lakukan di dunia nyata. Etika internet (Netiquette) menekankan prinsip 'Think Before You Post'. Ingatlah bahwa di balik setiap avatar dan username, ada manusia nyata dengan perasaan nyata. Kebebasan berpendapat dibatasi oleh hak orang lain untuk merasa aman.",
    sources: [
      { title: "Virginia Shea: The Core Rules of Netiquette", year: "1994 (Classic Ref)" },
      { title: "UNESCO: Digital Citizenship Education", year: "2023" },
      { title: "Siberkreasi: Modul Cakap Bermedia Digital", year: "2024" }
    ]
  }
];

// --- Components ---

const FeatureCard: React.FC<{ info: InfoDetail; onClick: (info: InfoDetail) => void }> = ({ info, onClick }) => (
  <div 
    onClick={() => onClick(info)}
    className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-cyan-500 hover:bg-slate-900/80 transition-all cursor-pointer group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="relative z-10">
      <div className="mb-4 text-purple-500 group-hover:text-cyan-400 transition-colors transform group-hover:scale-110 duration-300 origin-left">
        {info.icon}
      </div>
      <h3 className="text-white font-cyber font-bold text-lg mb-2 flex items-center justify-between">
        {info.title}
        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-cyan-400" />
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{info.shortDesc}</p>
      <div className="mt-4 text-xs font-mono text-cyan-600 group-hover:text-cyan-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        [ Read Data ]
      </div>
    </div>
  </div>
);

const InfoModal: React.FC<{ info: InfoDetail; onClose: () => void }> = ({ info, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-950 w-full max-w-2xl rounded-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(8,145,178,0.2)] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-800 rounded-lg text-cyan-400">
              {info.icon}
            </div>
            <div>
              <h2 className="text-2xl font-cyber font-bold text-white tracking-wide">{info.title}</h2>
              <span className="text-xs font-mono text-purple-400">ACCESSING SECURE DATA...</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-6 bg-cyan-400 rounded-full"></span>
              ARGUMEN UTAMA
            </h3>
            <p className="text-slate-300 leading-relaxed text-lg font-light">
              {info.argument}
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-800">
            <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <BookOpen size={16} />
              Referensi & Sumber Data
            </h3>
            <ul className="space-y-3">
              {info.sources.map((source, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-400 group">
                  <span className="font-mono text-slate-600 mt-0.5">0{index + 1}.</span>
                  <div className="flex-1">
                    <span className="text-slate-300 font-medium group-hover:text-cyan-300 transition-colors">
                      {source.title}
                    </span>
                    <span className="text-slate-600 ml-2 text-xs">({source.year})</span>
                  </div>
                  {source.url && (
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-500" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/30 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-mono text-sm transition-colors"
          >
            [ CLOSE TERMINAL ]
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedInfo, setSelectedInfo] = useState<InfoDetail | null>(null);

  return (
    <div className="relative min-h-screen selection:bg-cyan-500 selection:text-black">
      {/* CSS Noise Overlay */}
      <div className="bg-noise"></div>

      <main className="relative z-10">
        <Hero />

        {/* Analyzer Section */}
        <section id="analyzer" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-cyber font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">AI</span> SHIELD
              </h2>
              <p className="text-slate-400">Gunakan kecerdasan buatan untuk mendeteksi potensi bullying.</p>
            </div>
            <Analyzer />
          </div>
        </section>

        {/* Info Grid */}
        <section className="py-20 px-4 bg-black/40 border-t border-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-cyber font-bold text-white mb-2">PANDUAN DIGITAL</h2>
              <p className="text-slate-500 text-sm">Klik kartu di bawah untuk melihat data lengkap</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {INFO_DATA.map((info) => (
                <FeatureCard 
                  key={info.id} 
                  info={info} 
                  onClick={setSelectedInfo} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-slate-800 text-center px-4">
          <p className="text-slate-500 text-sm">
            © 2025 Alpha Techies x UIN Salatiga. All rights reserved. <br/>
            <span className="opacity-50">Kampanye Anti-Cyberbullying.</span>
          </p>
        </footer>
      </main>

      {/* Modal Portal */}
      {selectedInfo && (
        <InfoModal 
          info={selectedInfo} 
          onClose={() => setSelectedInfo(null)} 
        />
      )}
    </div>
  );
}

export default App;

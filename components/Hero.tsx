import React from 'react';
import GlitchTitle from './GlitchTitle';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 overflow-hidden pt-20 pb-12">
      
      {/* Background Elements simulating the screen/tech vibe */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="z-10 text-center max-w-4xl mx-auto">
        <div className="mb-2 flex justify-center gap-6 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder for Logos */}
           <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-xs">ALPHA</div>
             <span className="text-xs tracking-widest uppercase text-yellow-400">Alpha Techies</span>
           </div>
           <div className="w-px h-10 bg-slate-700"></div>
           <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-green-700 text-xs">UIN</div>
             <span className="text-xs tracking-widest uppercase text-white">Salatiga</span>
           </div>
        </div>

        <div className="mt-8 mb-4 relative">
             <GlitchTitle text="CYBER" size="xl" className="leading-[0.8]" />
             <br />
             <GlitchTitle text="BULLYING" size="xl" className="leading-[0.8]" />
        </div>

        <div className="mt-8 relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-7 py-4 bg-slate-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
             <p className="text-cyan-400 font-cyber tracking-wider text-lg md:text-xl font-bold">
               POSTING JANGAN NGE-ROASTING!
             </p>
          </div>
        </div>

        <p className="mt-8 text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed border-l-2 border-purple-500 pl-6 text-left md:text-center md:border-l-0 md:border-t-2 md:pt-6 font-light">
          "Cyber bullying adalah penindasan. Bersembunyi di balik layar cantik tidak membuatnya kurang mengandung kebencian."
        </p>

      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
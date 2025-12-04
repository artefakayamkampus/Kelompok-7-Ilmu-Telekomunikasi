import React, { useState } from 'react';
import { analyzeText } from '../services/geminiService';
import { AnalysisResult, AnalyzeStatus } from '../types';
import { AlertTriangle, CheckCircle, Loader2, MessageSquare, Send, PartyPopper, Skull } from 'lucide-react';

const Analyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AnalyzeStatus>(AnalyzeStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setStatus(AnalyzeStatus.LOADING);
    setResult(null);
    try {
      const data = await analyzeText(input);
      setResult(data);
      setStatus(AnalyzeStatus.SUCCESS);
    } catch (error) {
      setStatus(AnalyzeStatus.ERROR);
    }
  };

  const getResultUI = (classification: string) => {
    switch (classification) {
      case 'Penindasan':
        return {
          bg: 'bg-red-950/40',
          border: 'border-red-500',
          text: 'text-red-400',
          icon: <Skull className="w-8 h-8 text-red-500 animate-pulse" />,
          title: 'TERDETEKSI PENINDASAN'
        };
      case 'Candaan':
        return {
          bg: 'bg-purple-950/40',
          border: 'border-purple-500',
          text: 'text-purple-400',
          icon: <PartyPopper className="w-8 h-8 text-purple-400" />,
          title: 'KATEGORI CANDAAN'
        };
      case 'Aman':
      default:
        return {
          bg: 'bg-green-950/40',
          border: 'border-green-500',
          text: 'text-green-400',
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          title: 'KATEGORI AMAN'
        };
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
      <div className="bg-slate-900 rounded-xl p-6 md:p-8 relative overflow-hidden">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="text-cyan-400 w-6 h-6" />
            <h3 className="text-xl font-cyber font-bold text-white uppercase tracking-wide">
              Roasting Check
            </h3>
          </div>
          
          <p className="text-slate-400 mb-4 text-sm md:text-base">
            Ketik komentarmu di bawah. AI akan menilai apakah itu cuma <span className="text-purple-400 font-bold">Candaan</span> atau sudah masuk <span className="text-red-400 font-bold">Penindasan</span>.
          </p>

          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Contoh: 'Bajumu aneh banget sih' atau 'Woi botak sini lu'..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all min-h-[120px] resize-none font-mono"
            />
            <button
              onClick={handleAnalyze}
              disabled={status === AnalyzeStatus.LOADING || !input.trim()}
              className="absolute bottom-3 right-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            >
              {status === AnalyzeStatus.LOADING ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  ANALYZING...
                </>
              ) : (
                <>
                  CHECK <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {result && (
            <div className={`mt-6 p-5 rounded-lg border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${getResultUI(result.classification).bg} ${getResultUI(result.classification).border}`}>
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-slate-900 rounded-full border border-slate-700">
                  {getResultUI(result.classification).icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-cyber font-bold text-lg md:text-xl tracking-wide ${getResultUI(result.classification).text}`}>
                      {getResultUI(result.classification).title}
                    </h4>
                    <span className="text-xs font-mono bg-slate-950 px-2 py-1 rounded text-slate-400 border border-slate-800">
                      SCORE: {result.score}/100
                    </span>
                  </div>
                  
                  {/* Progress bar for score */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mb-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${
                        result.classification === 'Penindasan' ? 'bg-red-500' : 
                        result.classification === 'Candaan' ? 'bg-purple-500' : 'bg-green-500'
                      }`} 
                      style={{ width: `${result.score}%` }}
                    />
                  </div>

                  <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
                    "{result.feedback}"
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {status === AnalyzeStatus.ERROR && (
             <div className="mt-4 p-3 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm text-center">
               Terjadi kesalahan saat menganalisis. Pastikan koneksi internet lancar dan coba lagi.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
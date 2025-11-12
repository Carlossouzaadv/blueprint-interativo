'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Blueprint from '@/components/Blueprint';
import RAGChatbot from '@/components/RAGChatbot';

export default function Home() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  return (
    <main className="bg-slate-900">
      {/* Language switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setLanguage('pt')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            language === 'pt'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          PT
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            language === 'en'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          EN
        </button>
      </div>

      {/* Hero Section */}
      <Hero language={language} />

      {/* Blueprint Projects Section */}
      <Blueprint language={language} />

      {/* RAG Chatbot Section */}
      <RAGChatbot language={language} />

      {/* Placeholder for future sections */}
      <section className="min-h-screen bg-slate-900 flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            {language === 'pt' ? 'Próximas Seções em Desenvolvimento' : 'Next Sections Coming Soon'}
          </h2>
          <p className="text-xl text-slate-300">
            {language === 'pt'
              ? 'Galeria de Resultados • Entre em contato'
              : 'Results Gallery • Get in Touch'}
          </p>
        </div>
      </section>
    </main>
  );
}

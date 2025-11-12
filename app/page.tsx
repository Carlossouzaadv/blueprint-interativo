'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';

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

      {/* Placeholder for future sections */}
      <section
        id="projects"
        className="min-h-screen bg-slate-800 flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            {language === 'pt' ? 'Projetos em Desenvolvimento' : 'Projects Coming Soon'}
          </h2>
          <p className="text-xl text-slate-300">
            {language === 'pt'
              ? 'Os blueprints dos projetos serão exibidos aqui'
              : 'Project blueprints will be displayed here'}
          </p>
        </div>
      </section>
    </main>
  );
}

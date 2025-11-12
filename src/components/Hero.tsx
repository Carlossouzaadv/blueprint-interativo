'use client';

import Link from 'next/link';
import { professionalProfile, getContactLinks } from '@/lib/profile';
import { Github, Linkedin, Mail, Phone, ChevronDown } from 'lucide-react';

interface HeroProps {
  language?: 'pt' | 'en';
}

export default function Hero({ language = 'pt' }: HeroProps) {
  const isPortuguese = language === 'pt';
  const contact = getContactLinks();

  // CTA labels
  const ctaLabel = isPortuguese ? 'Explorar Arquitetura' : 'Explore Architecture';

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Location and title */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base font-semibold text-blue-400 uppercase tracking-wider">
                {professionalProfile.location[isPortuguese ? 'pt' : 'en']}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {professionalProfile.name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 leading-snug">
                {professionalProfile.title[isPortuguese ? 'pt' : 'en']}
              </h2>
            </div>

            {/* Professional summary */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {professionalProfile.summary[isPortuguese ? 'pt' : 'en']}
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
              {professionalProfile.keyStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-slate-800 bg-opacity-50 backdrop-blur rounded-lg p-4 sm:p-6 border border-slate-700 hover:border-blue-500 transition-colors"
                >
                  <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wide mb-2">
                    {stat.label[isPortuguese ? 'pt' : 'en']}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-400">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                {ctaLabel}
                <ChevronDown size={20} className="sm:hidden" />
              </Link>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200 text-sm sm:text-base"
              >
                <Linkedin size={20} />
                <span className="hidden sm:inline">LinkedIn</span>
                <span className="sm:hidden">CV</span>
              </a>
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-700 pt-8">
              <a
                href={contact.email}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">carlossouza.pr@gmail.com</span>
                <span className="sm:hidden">Email</span>
              </a>

              <a
                href={contact.phone}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                <Phone size={18} />
                <span className="hidden sm:inline">+55 21 98964-8889</span>
                <span className="sm:hidden">Phone</span>
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm sm:text-base"
              >
                <Github size={18} />
                <span className="hidden sm:inline">GitHub</span>
                <span className="sm:hidden">Code</span>
              </a>
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md h-96">
              {/* Animated background card */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl opacity-10 blur-2xl"></div>

              {/* Main card */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 bg-slate-700 rounded w-full"></div>
                    <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                    <div className="h-3 bg-slate-700 rounded w-4/5"></div>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-slate-700 rounded"></div>
                    <div className="flex-1 h-10 bg-slate-700 rounded"></div>
                  </div>
                </div>

                {/* Animated corner elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-400 animate-bounce">
          <p className="text-xs uppercase tracking-widest">
            {isPortuguese ? 'Deslize para explorar' : 'Scroll to explore'}
          </p>
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}

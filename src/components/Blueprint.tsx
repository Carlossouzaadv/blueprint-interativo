'use client';

import { useState } from 'react';
import { getAllProjects } from '@/lib/data';
import { ChevronDown, ChevronUp, Zap, Target, Lightbulb, Code2 } from 'lucide-react';

interface BlueprintProps {
  language?: 'pt' | 'en';
}

type ExpandedProject = {
  [key: string]: boolean;
};

export default function Blueprint({ language = 'pt' }: BlueprintProps) {
  const isPortuguese = language === 'pt';
  const projects = getAllProjects();
  const [expanded, setExpanded] = useState<ExpandedProject>({});

  // Labels
  const challengeLabel = isPortuguese ? 'Desafio' : 'Challenge';
  const blueprintLabel = isPortuguese ? 'Solução' : 'Blueprint';
  const decisionsLabel = isPortuguese ? 'Decisões' : 'Decisions';
  const technologiesLabel = isPortuguese ? 'Tecnologias' : 'Technologies';
  const statusLabel = (status: string) => {
    const statusMap = {
      production: isPortuguese ? 'Produção' : 'Production',
      staging: isPortuguese ? 'Staging' : 'Staging',
      poc: isPortuguese ? 'PoC' : 'PoC',
      maintenance: isPortuguese ? 'Manutenção' : 'Maintenance',
    };
    return statusMap[status as keyof typeof statusMap];
  };

  const toggleExpanded = (projectId: string) => {
    setExpanded(prev => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    const colors = {
      production: 'bg-green-900 text-green-200 border-green-700',
      staging: 'bg-yellow-900 text-yellow-200 border-yellow-700',
      poc: 'bg-blue-900 text-blue-200 border-blue-700',
      maintenance: 'bg-slate-700 text-slate-300 border-slate-600',
    };
    return colors[status as keyof typeof colors] || colors.maintenance;
  };

  return (
    <section id="projects" className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {isPortuguese ? 'Arquitetura dos Projetos' : 'Project Architecture'}
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl">
            {isPortuguese
              ? 'Explore os blueprints técnicos de cada projeto, desde o desafio até as decisões arquiteturais'
              : 'Explore the technical blueprints of each project, from challenge to architectural decisions'}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 flex flex-col"
            >
              {/* Card header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 sm:p-8 border-b border-slate-700">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {project.title[isPortuguese ? 'pt' : 'en']}
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base">
                      {project.description[isPortuguese ? 'pt' : 'en']}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {statusLabel(project.status)}
                  </span>
                </div>

                {/* Year */}
                {project.year && (
                  <p className="text-xs sm:text-sm text-slate-400">
                    {isPortuguese ? 'Ano' : 'Year'}: {project.year}
                  </p>
                )}

                {/* Live Site Link */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    {isPortuguese ? '🌐 Visitar Site' : '🌐 Visit Live Site'}
                  </a>
                )}
              </div>

              {/* Card content - collapsible sections */}
              <div className="flex-1 p-6 sm:p-8 space-y-4">
                {/* Challenge section */}
                <div className="border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
                  <button
                    onClick={() => toggleExpanded(`${project.id}-challenge`)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <Target size={20} className="text-orange-400 flex-shrink-0" />
                      <span className="font-semibold text-white">{challengeLabel}</span>
                    </div>
                    {expanded[`${project.id}-challenge`] ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </button>
                  {expanded[`${project.id}-challenge`] && (
                    <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 border-t border-slate-700">
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        {project.challenge[isPortuguese ? 'pt' : 'en']}
                      </p>
                    </div>
                  )}
                </div>

                {/* Blueprint section */}
                <div className="border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
                  <button
                    onClick={() => toggleExpanded(`${project.id}-blueprint`)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <Lightbulb size={20} className="text-yellow-400 flex-shrink-0" />
                      <span className="font-semibold text-white">{blueprintLabel}</span>
                    </div>
                    {expanded[`${project.id}-blueprint`] ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </button>
                  {expanded[`${project.id}-blueprint`] && (
                    <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 border-t border-slate-700">
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        {project.blueprint[isPortuguese ? 'pt' : 'en']}
                      </p>
                    </div>
                  )}
                </div>

                {/* Decisions section */}
                <div className="border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
                  <button
                    onClick={() => toggleExpanded(`${project.id}-decisions`)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <Zap size={20} className="text-purple-400 flex-shrink-0" />
                      <span className="font-semibold text-white">{decisionsLabel}</span>
                    </div>
                    {expanded[`${project.id}-decisions`] ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </button>
                  {expanded[`${project.id}-decisions`] && (
                    <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 border-t border-slate-700">
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        {project.decisions[isPortuguese ? 'pt' : 'en']}
                      </p>
                    </div>
                  )}
                </div>

                {/* Technologies section */}
                <div className="border border-slate-700 rounded-lg overflow-hidden hover:border-slate-600 transition-colors">
                  <button
                    onClick={() => toggleExpanded(`${project.id}-tech`)}
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <Code2 size={20} className="text-blue-400 flex-shrink-0" />
                      <span className="font-semibold text-white">{technologiesLabel}</span>
                    </div>
                    {expanded[`${project.id}-tech`] ? (
                      <ChevronUp size={20} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={20} className="text-slate-400" />
                    )}
                  </button>
                  {expanded[`${project.id}-tech`] && (
                    <div className="px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 border-t border-slate-700">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-medium bg-blue-900 text-blue-200 border border-blue-700"
                            title={tech.role}
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Metrics section */}
                {project.metrics && (
                  <div className="mt-4 p-4 sm:p-6 bg-slate-800 border border-slate-700 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">
                      {isPortuguese ? 'Resultados' : 'Results'}
                    </h4>
                    <p className="text-slate-300 text-sm sm:text-base">
                      {project.metrics[isPortuguese ? 'pt' : 'en']}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state - shouldn't happen but good to have */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">
              {isPortuguese ? 'Nenhum projeto disponível' : 'No projects available'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

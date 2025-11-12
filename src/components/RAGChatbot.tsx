'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface RAGChatbotProps {
  language?: 'pt' | 'en';
}

export default function RAGChatbot({ language = 'pt' }: RAGChatbotProps) {
  const isPortuguese = language === 'pt';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: isPortuguese
        ? 'Olá! Sou o assistente de IA do Carlos. Posso responder perguntas sobre seus projetos, arquitetura de soluções e experiência profissional. Como posso ajudar?'
        : "Hello! I'm Carlos' AI assistant. I can answer questions about his projects, solution architecture, and professional experience. How can I help?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Labels and placeholders
  const chatTitle = isPortuguese ? 'Assistente IA' : 'AI Assistant';
  const inputPlaceholder = isPortuguese
    ? 'Pergunte algo sobre os projetos...'
    : 'Ask about the projects...';
  const sendButtonLabel = isPortuguese ? 'Enviar' : 'Send';
  const clearLabel = isPortuguese ? 'Limpar' : 'Clear';

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call delay (will be replaced by actual API in TASK-006)
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isPortuguese
          ? 'Essa é uma ótima pergunta! Estou processando sua mensagem. Em breve, esta será uma resposta real alimentada pela API Gemini com informações dos projetos.'
          : "That's a great question! I'm processing your message. Soon, this will be a real response powered by the Gemini API with project information.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: isPortuguese
          ? 'Olá! Sou o assistente de IA do Carlos. Posso responder perguntas sobre seus projetos, arquitetura de soluções e experiência profissional. Como posso ajudar?'
          : "Hello! I'm Carlos' AI assistant. I can answer questions about his projects, solution architecture, and professional experience. How can I help?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <section className="py-12 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle size={32} className="text-blue-400" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{chatTitle}</h2>
          </div>
          <p className="text-lg text-slate-300 max-w-3xl">
            {isPortuguese
              ? 'Faça perguntas sobre minha arquitetura de soluções, projetos e experiência técnica. O assistente é alimentado por IA e treinado com dados do meu perfil.'
              : 'Ask questions about my solution architecture, projects, and technical experience. The assistant is AI-powered and trained on my profile data.'}
          </p>
        </div>

        {/* Chat container */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex flex-col h-[600px] sm:h-[700px] shadow-2xl">
          {/* Messages display area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-800">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString(isPortuguese ? 'pt-BR' : 'en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-lg rounded-bl-none border border-slate-600 flex gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-slate-700 bg-slate-800 p-4 sm:p-6 space-y-3">
            {/* Clear button */}
            <button
              onClick={handleClearChat}
              className="w-full py-2 text-sm font-medium text-slate-400 hover:text-slate-300 border border-slate-600 rounded-lg hover:border-slate-500 transition-colors"
            >
              {clearLabel}
            </button>

            {/* Chat input form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                disabled={isLoading}
                className="flex-1 px-4 py-3 sm:py-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Send size={18} />
                <span className="hidden sm:inline">{sendButtonLabel}</span>
              </button>
            </form>

            {/* Helper text */}
            <p className="text-xs text-slate-400">
              {isPortuguese
                ? '💡 Dica: Pergunte sobre projetos específicos, tecnologias ou decisões arquiteturais'
                : '💡 Tip: Ask about specific projects, technologies, or architectural decisions'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

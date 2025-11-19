import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { projects } from '@/lib/data';
import { professionalProfile } from '@/lib/profile';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    // Check for API Key
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API Key not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages, language = 'pt' } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // Construct RAG Context
    const context = `
      You are an AI assistant for Carlos Souza's portfolio website.
      Your goal is to answer questions about Carlos's professional experience, projects, and technical expertise.
      
      CURRENT LANGUAGE: ${language === 'pt' ? 'Portuguese (Português do Brasil)' : 'English'}
      Please answer in this language.

      PROFESSIONAL PROFILE:
      Name: ${professionalProfile.name}
      Title: ${language === 'pt' ? professionalProfile.title.pt : professionalProfile.title.en}
      Summary: ${language === 'pt' ? professionalProfile.summary.pt : professionalProfile.summary.en}
      Location: ${language === 'pt' ? professionalProfile.location.pt : professionalProfile.location.en}
      Contact: ${JSON.stringify(professionalProfile.contact)}

      PROJECTS (Case Studies):
      ${projects.map(p => `
        ID: ${p.id}
        Name: ${language === 'pt' ? p.title.pt : p.title.en}
        Description: ${language === 'pt' ? p.description.pt : p.description.en}
        Status: ${p.status}
        Challenge: ${language === 'pt' ? p.challenge.pt : p.challenge.en}
        Solution/Blueprint: ${language === 'pt' ? p.blueprint.pt : p.blueprint.en}
        Decisions: ${language === 'pt' ? p.decisions.pt : p.decisions.en}
        Metrics/Results: ${language === 'pt' ? p.metrics.pt : p.metrics.en}
        Technologies: ${p.technologies.map(t => t.name).join(', ')}
      `).join('\n---\n')}

      INSTRUCTIONS:
      1. Answer based ONLY on the provided context.
      2. If the user asks about something not in the context, politely say you don't have that information but can talk about the projects listed.
      3. Be professional, concise, and helpful.
      4. Act as if you are an extension of Carlos's professional persona.
      5. Do not make up facts.
    `;

    // Initialize model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate content
    const result = await model.generateContent([
      context,
      `User Question: ${userQuery}`
    ]);

    const response = result.response;
    const text = response.text();

    return NextResponse.json({ role: 'assistant', content: text });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

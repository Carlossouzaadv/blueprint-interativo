/**
 * @jest-environment node
 */
import { POST } from '../../../app/api/chat/route';
import { NextRequest } from 'next/server';

// Mock GoogleGenerativeAI
jest.mock('@google/generative-ai', () => {
    return {
        GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                generateContent: jest.fn().mockResolvedValue({
                    response: {
                        text: () => 'This is a mock response from Gemini',
                    },
                }),
            }),
        })),
    };
});

describe('Chat API Route', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv, NEXT_PUBLIC_GEMINI_API_KEY: 'mock-key' };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('should return 200 and assistant response for valid request', async () => {
        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hello' }],
                language: 'en',
            }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toEqual({
            role: 'assistant',
            content: 'This is a mock response from Gemini',
        });
    });

    it('should return 500 if API key is missing', async () => {
        process.env.NEXT_PUBLIC_GEMINI_API_KEY = '';

        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'Hello' }],
            }),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data).toEqual({ error: 'Gemini API Key not configured' });
    });

    it('should return 400 for invalid body', async () => {
        const req = new NextRequest('http://localhost:3000/api/chat', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        const response = await POST(req);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data).toEqual({ error: 'Invalid request body' });
    });
});

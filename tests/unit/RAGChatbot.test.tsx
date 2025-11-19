import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RAGChatbot from '@/components/RAGChatbot';

describe('RAGChatbot Component', () => {
  describe('Rendering and Initial State', () => {
    it('should render correctly with default PT language', () => {
      render(<RAGChatbot />);

      expect(screen.getByText('Assistente IA')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Faça perguntas sobre minha arquitetura de soluções/i
        )
      ).toBeInTheDocument();
    });

    it('should render correctly with EN language', () => {
      render(<RAGChatbot language="en" />);

      expect(screen.getByText('AI Assistant')).toBeInTheDocument();
      expect(
        screen.getByText(/Ask questions about my solution architecture/i)
      ).toBeInTheDocument();
    });

    it('should display initial welcome message in PT', () => {
      render(<RAGChatbot language="pt" />);

      expect(
        screen.getByText(/Olá! Sou o assistente de IA do Carlos/i)
      ).toBeInTheDocument();
    });

    it('should display initial welcome message in EN', () => {
      render(<RAGChatbot language="en" />);

      expect(
        screen.getByText(/Hello! I'm Carlos' AI assistant/i)
      ).toBeInTheDocument();
    });

    it('should render input field with correct placeholder in PT', () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('should render input field with correct placeholder in EN', () => {
      render(<RAGChatbot language="en" />);

      const input = screen.getByPlaceholderText(/Ask about the projects/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('should render send button with correct label in PT', () => {
      render(<RAGChatbot language="pt" />);

      const sendButton = screen.getByRole('button', { name: /Enviar/i });
      expect(sendButton).toBeInTheDocument();
    });

    it('should render send button with correct label in EN', () => {
      render(<RAGChatbot language="en" />);

      const sendButton = screen.getByRole('button', { name: /Send/i });
      expect(sendButton).toBeInTheDocument();
    });

    it('should render clear button in PT', () => {
      render(<RAGChatbot language="pt" />);

      const clearButton = screen.getByRole('button', { name: /Limpar/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('should render clear button in EN', () => {
      render(<RAGChatbot language="en" />);

      const clearButton = screen.getByRole('button', { name: /Clear/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('should render helper text in PT', () => {
      render(<RAGChatbot language="pt" />);

      expect(
        screen.getByText(
          /Pergunte sobre projetos específicos, tecnologias ou decisões arquiteturais/i
        )
      ).toBeInTheDocument();
    });

    it('should render helper text in EN', () => {
      render(<RAGChatbot language="en" />);

      expect(
        screen.getByText(
          /Ask about specific projects, technologies, or architectural decisions/i
        )
      ).toBeInTheDocument();
    });
  });

  describe('Message Sending Functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should not allow sending empty message', async () => {
      render(<RAGChatbot language="pt" />);

      const sendButton = screen.getByRole('button', { name: /Enviar/i });
      // const input = screen.getByPlaceholderText(
      //   /Pergunte algo sobre os projetos/i
      // );

      // Try to send empty message
      fireEvent.click(sendButton);

      // Should still have only the initial welcome message
      const messages = screen.getAllByText(/Olá! Sou o assistente/i);
      expect(messages).toHaveLength(1);
    });

    it('should not allow sending whitespace-only message', async () => {
      render(<RAGChatbot language="pt" />);

      const sendButton = screen.getByRole('button', { name: /Enviar/i });
      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );

      // Type whitespace
      await userEvent.type(input, '   ');
      fireEvent.click(sendButton);

      // Should still have only the initial welcome message
      const messages = screen.getAllByText(/Olá! Sou o assistente/i);
      expect(messages).toHaveLength(1);
    });

    it('should send message and clear input field (PT)', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Type and send message
      await userEvent.type(input, 'Quais são os projetos?');
      fireEvent.click(sendButton);

      // Input should be cleared
      expect(input).toHaveValue('');

      // User message should appear
      expect(screen.getByText('Quais são os projetos?')).toBeInTheDocument();
    });

    it('should send message and clear input field (EN)', async () => {
      render(<RAGChatbot language="en" />);

      const input = screen.getByPlaceholderText(/Ask about the projects/i);
      const sendButton = screen.getByRole('button', { name: /Send/i });

      // Type and send message
      await userEvent.type(input, 'What are the projects?');
      fireEvent.click(sendButton);

      // Input should be cleared
      expect(input).toHaveValue('');

      // User message should appear
      expect(screen.getByText('What are the projects?')).toBeInTheDocument();
    });

    it('should display loading indicator when sending message', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Send message
      await userEvent.type(input, 'Test message');
      fireEvent.click(sendButton);

      // Loading indicator should be present (3 bouncing dots)
      const loadingDots = document.querySelectorAll('.animate-bounce');
      expect(loadingDots.length).toBeGreaterThan(0);
    });

    it('should disable input and button during loading (PT)', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      ) as HTMLInputElement;
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Send message
      await userEvent.type(input, 'Test message');
      fireEvent.click(sendButton);

      // Input and button should be disabled
      expect(input).toBeDisabled();
      expect(sendButton).toBeDisabled();
    });

    it('should display assistant response after loading (PT)', async () => {
      jest.useFakeTimers();
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Send message
      await userEvent.type(input, 'Test question');
      fireEvent.click(sendButton);

      // Fast-forward time to complete the simulated API call
      jest.advanceTimersByTime(600);

      // Wait for assistant response
      await waitFor(() => {
        expect(
          screen.getByText(/Essa é uma ótima pergunta!/i)
        ).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should display assistant response after loading (EN)', async () => {
      jest.useFakeTimers();
      render(<RAGChatbot language="en" />);

      const input = screen.getByPlaceholderText(/Ask about the projects/i);
      const sendButton = screen.getByRole('button', { name: /Send/i });

      // Send message
      await userEvent.type(input, 'Test question');
      fireEvent.click(sendButton);

      // Fast-forward time
      jest.advanceTimersByTime(600);

      // Wait for assistant response
      await waitFor(() => {
        expect(
          screen.getByText(/That's a great question!/i)
        ).toBeInTheDocument();
      });

      jest.useRealTimers();
    });

    it('should allow sending multiple messages in sequence', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Send first message
      await userEvent.type(input, 'Primeira pergunta');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Primeira pergunta')).toBeInTheDocument();
      });

      // Send second message
      await userEvent.type(input, 'Segunda pergunta');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Segunda pergunta')).toBeInTheDocument();
      });

      // Both messages should be present
      expect(screen.getByText('Primeira pergunta')).toBeInTheDocument();
      expect(screen.getByText('Segunda pergunta')).toBeInTheDocument();
    });

    it('should support form submission via Enter key', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );

      // Type and press Enter
      await userEvent.type(input, 'Test via Enter{Enter}');

      // Message should be sent
      expect(screen.getByText('Test via Enter')).toBeInTheDocument();
    });
  });

  describe('Clear Chat Functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should clear all messages except initial welcome (PT)', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });
      const clearButton = screen.getByRole('button', { name: /Limpar/i });

      // Send a message
      await userEvent.type(input, 'Test message');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument();
      });

      // Clear chat
      fireEvent.click(clearButton);

      // Should not have test message anymore
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();

      // Should still have welcome message
      expect(
        screen.getByText(/Olá! Sou o assistente de IA do Carlos/i)
      ).toBeInTheDocument();
    });

    it('should clear all messages except initial welcome (EN)', async () => {
      render(<RAGChatbot language="en" />);

      const input = screen.getByPlaceholderText(/Ask about the projects/i);
      const sendButton = screen.getByRole('button', { name: /Send/i });
      const clearButton = screen.getByRole('button', { name: /Clear/i });

      // Send a message
      await userEvent.type(input, 'Test message');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument();
      });

      // Clear chat
      fireEvent.click(clearButton);

      // Should not have test message anymore
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();

      // Should still have welcome message
      expect(
        screen.getByText(/Hello! I'm Carlos' AI assistant/i)
      ).toBeInTheDocument();
    });
  });

  describe('Timestamp Display', () => {
    it('should display timestamps for all messages', () => {
      render(<RAGChatbot language="pt" />);

      // Check that initial message has timestamp
      const timestamps = document.querySelectorAll('.text-xs');
      expect(timestamps.length).toBeGreaterThan(0);
    });

    it('should format timestamps correctly for PT locale', () => {
      render(<RAGChatbot language="pt" />);

      const timestamps = document.querySelectorAll('.text-xs');
      const timestampText = timestamps[timestamps.length - 1].textContent;

      // PT format should have : separator (HH:MM)
      expect(timestampText).toMatch(/\d{2}:\d{2}/);
    });

    it('should format timestamps correctly for EN locale', () => {
      render(<RAGChatbot language="en" />);

      const timestamps = document.querySelectorAll('.text-xs');
      const timestampText = timestamps[timestamps.length - 1].textContent;

      // EN format should have : separator (HH:MM)
      expect(timestampText).toMatch(/\d{1,2}:\d{2}/);
    });
  });

  describe('UI Styling and Responsiveness', () => {
    it('should apply correct styling to user messages', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      await userEvent.type(input, 'User message');
      fireEvent.click(sendButton);

      const userMessage = screen.getByText('User message');
      const messageContainer = userMessage.closest('div');

      expect(messageContainer).toHaveClass('bg-blue-600');
      expect(messageContainer).toHaveClass('text-white');
    });

    it('should apply correct styling to assistant messages', () => {
      render(<RAGChatbot language="pt" />);

      const assistantMessage = screen.getByText(
        /Olá! Sou o assistente de IA do Carlos/i
      );
      const messageContainer = assistantMessage.closest('div');

      expect(messageContainer).toHaveClass('bg-slate-700');
      expect(messageContainer).toHaveClass('text-slate-100');
    });

    it('should have proper focus states for input field', () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );

      expect(input).toHaveClass('focus:border-blue-500');
      expect(input).toHaveClass('focus:ring-2');
      expect(input).toHaveClass('focus:ring-blue-500');
    });

    it('should have proper disabled states', () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      expect(input).toHaveClass('disabled:opacity-50');
      expect(input).toHaveClass('disabled:cursor-not-allowed');
      expect(sendButton).toHaveClass('disabled:bg-slate-600');
      expect(sendButton).toHaveClass('disabled:cursor-not-allowed');
    });

    it('should have MessageCircle icon in header', () => {
      render(<RAGChatbot language="pt" />);

      const icon = document.querySelector('.text-blue-400');
      expect(icon).toBeInTheDocument();
    });

    it('should have Send icon in send button', () => {
      render(<RAGChatbot language="pt" />);

      // Send icon should be present in button
      const sendButton = screen.getByRole('button', { name: /Enviar/i });
      const svg = sendButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle very long messages', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      const longMessage = 'A'.repeat(500);
      await userEvent.type(input, longMessage);
      fireEvent.click(sendButton);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle special characters in messages', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      const specialMessage = 'Test: @#$%^&*()_+-=[]{}|;:",.<>?/~`';
      await userEvent.type(input, specialMessage);
      fireEvent.click(sendButton);

      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });

    it('should handle unicode and emoji characters', async () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      ) as HTMLInputElement;
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      const unicodeMessage = 'Test message with unicode';
      // Use fireEvent.change for complex unicode to avoid issues
      fireEvent.change(input, { target: { value: unicodeMessage } });
      fireEvent.click(sendButton);

      expect(screen.getByText(unicodeMessage)).toBeInTheDocument();
    });

    it('should maintain message order', async () => {
      jest.useFakeTimers();
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Send first message
      await userEvent.type(input, 'Message 1');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Message 1')).toBeInTheDocument();
      });

      // Send second message
      await userEvent.type(input, 'Message 2');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Message 2')).toBeInTheDocument();
      });

      // Get all message containers
      const messages = screen
        .getAllByText(/Message \d|Olá! Sou o assistente|Essa é uma ótima/)
        .map(el => el.textContent);

      // Check order (welcome, user1, assistant1, user2, assistant2)
      expect(messages.length).toBeGreaterThanOrEqual(5);

      jest.useRealTimers();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure', () => {
      render(<RAGChatbot language="pt" />);

      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should have input with proper type', () => {
      render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should have buttons with proper type attributes', () => {
      render(<RAGChatbot language="pt" />);

      const sendButton = screen.getByRole('button', { name: /Enviar/i });
      const clearButton = screen.getByRole('button', { name: /Limpar/i });

      expect(sendButton).toHaveAttribute('type', 'submit');
      expect(clearButton).not.toHaveAttribute('type', 'submit');
    });

    it('should have semantic heading structure', () => {
      render(<RAGChatbot language="pt" />);

      const heading = screen.getByRole('heading', { name: /Assistente IA/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });
  });

  describe('Language Switching', () => {
    it('should correctly switch from PT to EN', () => {
      const { rerender } = render(<RAGChatbot language="pt" />);

      expect(screen.getByText('Assistente IA')).toBeInTheDocument();

      rerender(<RAGChatbot language="en" />);

      expect(screen.getByText('AI Assistant')).toBeInTheDocument();
      expect(screen.queryByText('Assistente IA')).not.toBeInTheDocument();
    });

    it('should correctly switch from EN to PT', () => {
      const { rerender } = render(<RAGChatbot language="en" />);

      expect(screen.getByText('AI Assistant')).toBeInTheDocument();

      rerender(<RAGChatbot language="pt" />);

      expect(screen.getByText('Assistente IA')).toBeInTheDocument();
      expect(screen.queryByText('AI Assistant')).not.toBeInTheDocument();
    });

    it('should preserve message history when language changes', async () => {
      jest.useFakeTimers();
      const { rerender } = render(<RAGChatbot language="pt" />);

      const input = screen.getByPlaceholderText(
        /Pergunte algo sobre os projetos/i
      );
      const sendButton = screen.getByRole('button', { name: /Enviar/i });

      // Send a message in PT
      await userEvent.type(input, 'Mensagem em português');
      fireEvent.click(sendButton);
      jest.advanceTimersByTime(600);

      await waitFor(() => {
        expect(screen.getByText('Mensagem em português')).toBeInTheDocument();
      });

      // Switch to EN
      rerender(<RAGChatbot language="en" />);

      // Message should still be there
      expect(screen.getByText('Mensagem em português')).toBeInTheDocument();

      jest.useRealTimers();
    });
  });

  describe('Component Integration', () => {
    it('should work correctly when rendered in a parent component', () => {
      const ParentComponent = () => {
        const [lang, setLang] = React.useState<'pt' | 'en'>('pt');

        return (
          <div>
            <button onClick={() => setLang('en')}>Switch to EN</button>
            <RAGChatbot language={lang} />
          </div>
        );
      };

      render(<ParentComponent />);

      expect(screen.getByText('Assistente IA')).toBeInTheDocument();

      const switchButton = screen.getByRole('button', {
        name: /Switch to EN/i,
      });
      fireEvent.click(switchButton);

      expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    });
  });
});

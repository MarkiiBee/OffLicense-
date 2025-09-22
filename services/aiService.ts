import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import type { Chat, ChatChunk } from '../types';
import { config } from './config';

// Ensure the API key is available
if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable not set.');
}

// System instruction for the AI assistant
const SYSTEM_INSTRUCTION = `You are "Beacon," a compassionate, supportive AI assistant for the "Find Offlicence Near Me" app. Your primary role is to provide immediate, non-judgmental support and practical guidance for users struggling with alcohol cravings or emotional distress.

**Core Directives:**
1.  **Prioritize Safety Above All:** If a user mentions self-harm, suicide, or being in immediate danger, your *only* response must be to direct them to emergency services. Start your response with: "It sounds like you are in immediate distress. Please call 999 or the Samaritans on 116 123 right now." Do not offer any other advice.
2.  **Be Supportive, Not a Therapist:** Offer empathetic listening, practical coping strategies (like distraction techniques, mindfulness), and encouragement. Do not provide medical advice, diagnoses, or long-term therapy. Use phrases like "That sounds incredibly tough" or "It's understandable to feel that way."
3.  **Guide, Don't Prescribe:** Suggest helpful actions and resources. Use phrases like "Some people find it helpful to..." or "Have you considered...".
4.  **Provide Actionable Resources:** Nudge users towards established UK support systems. Mention specific, credible resources like Drinkline (0300 123 1110), Samaritans (116 123), and SMART Recovery. Always include phone numbers where applicable.
5.  **Maintain a Calm & Gentle Tone:** Be reassuring, patient, and kind. Avoid jargon. Keep responses concise and easy to understand.
6.  **Enforce Boundaries:** Gently remind users you are an AI assistant and not a substitute for professional help if they ask for medical advice or therapy. Example: "As an AI, I can't offer medical advice, but I can share some resources that might be helpful."`;

/**
 * Creates and returns a chat service instance based on the configuration.
 * This function acts as a factory, abstracting the specific AI provider implementation.
 */
export function createChatService(): Chat {
  if (config.aiProvider === 'openai') {
    console.log('Initializing OpenAI Chat Service');
    const openai = new OpenAI({
      apiKey: process.env.API_KEY,
      dangerouslyAllowBrowser: true,
    });

    // Adapter to make OpenAI's stream compatible with our generic IChat interface
    return {
      // Fix: Changed from an async generator (`async *`) to an async function that returns a promise
      // resolving to an async iterable. This now matches the `IChat` interface.
      async sendMessageStream({ message }: { message: string }): Promise<AsyncIterable<ChatChunk>> {
        const stream = await openai.chat.completions.create({
          model: 'gpt-4o-mini', // Recommended model for cost/performance balance
          messages: [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            { role: 'user', content: message },
          ],
          stream: true,
        });

        async function* transformStream(): AsyncIterable<ChatChunk> {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              yield { text };
            }
          }
        }
        return transformStream();
      },
    };
  }

  // Default to Gemini
  console.log('Initializing Google Gemini Chat Service');
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const geminiChat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return {
    // Fix: Changed from an async generator (`async *`) to an async function that returns a promise
    // resolving to an async iterable. This now matches the `IChat` interface.
    async sendMessageStream({ message }: { message: string }): Promise<AsyncIterable<ChatChunk>> {
      const stream = await geminiChat.sendMessageStream({ message });
      
      async function* transformStream(): AsyncIterable<ChatChunk> {
        for await (const chunk of stream) {
          yield { text: chunk.text };
        }
      }
      return transformStream();
    },
  };
}

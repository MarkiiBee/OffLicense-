// --- AI Provider Configuration ---
// This setting determines which AI service powers the 'Beacon' support assistant.
//
// To use Google Gemini:
// Set aiProvider to 'gemini'. Ensure your API_KEY is a Google AI Studio key.
//
// To use OpenAI:
// 1. Set aiProvider to 'openai'.
// 2. Ensure your API_KEY is an OpenAI API key.
// 3. You may want to update the `model` in `services/aiService.ts` to 'gpt-4o' or another preferred model.

type AIProvider = 'gemini' | 'openai';

interface AppConfig {
  aiProvider: AIProvider;
}

export const config: AppConfig = {
  aiProvider: 'gemini',
};

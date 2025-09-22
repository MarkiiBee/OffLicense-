
import type { Chat as GeminiChat } from '@google/genai';

export interface SupportResource {
  name: string;
  description: string;
  phone: string;
  website: string;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  content: string[];
}

export enum View {
  SEARCH = 'search',
  SUPPORT = 'support',
  CONTACT = 'contact',
  ABOUT = 'about',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  RESOURCES = 'resources',
  ARTICLE = 'article',
  QUIZ = 'quiz',
  MINDFUL_DRINKING = 'mindful-drinking',
}

// Helper to convert enum to a URL-friendly string
export const viewToString = (view: View): string => {
    return view.toString();
};

// Helper to convert a string from a URL back to an enum member
const stringToViewMap: { [key: string]: View } = Object.fromEntries(
    Object.entries(View).map(([key, value]) => [value, key as unknown as View])
) as { [key: string]: View };

export const viewFromString = (str: string | null | undefined): View | null => {
    if (!str) return null;
    return stringToViewMap[str] || null;
}


// A generic chat response chunk that our UI component will use
export interface ChatChunk {
    text: string;
}

// A generic interface that any chat service (Gemini, OpenAI) must implement
export interface IChat {
    sendMessageStream(params: { message: string }): Promise<AsyncIterable<ChatChunk>>;
}

// The rest of the app will use this generic type, allowing for easy switching
// between AI providers like Gemini and OpenAI.
export type Chat = IChat;


export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

// Types for the new Quiz feature
export interface QuizQuestion {
    text: string;
    options: {
        text: string;
        score: number;
    }[];
}

export interface QuizResult {
    scoreMin: number;
    scoreMax: number;
    title: string;
    feedback: string;
}

export interface Quiz {
    slug: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    results: QuizResult[];
}

// Type for the new Drink Tracker feature
export interface DrinkLog {
    [date: string]: number; // e.g., "2024-07-28": 3
}

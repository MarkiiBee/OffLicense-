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
  SEARCH,
  SUPPORT,
  CONTACT,
  ABOUT,
  PRIVACY,
  RESOURCES,
  ARTICLE,
  QUIZ,
  MINDFUL_DRINKING,
  TERMS,
}

export type Chat = GeminiChat;

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
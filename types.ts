export type Role = 'user' | 'model' | 'system';

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  image?: string;
  timestamp: Date;
  groundingMetadata?: GroundingMetadata;
}

export type TutorMode = 'guide' | 'explain' | 'exam' | 'teacher';

// ---- Curriculum / learning content ----

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Formula {
  name: string;
  expr: string; // LaTeX (without delimiters)
  note?: string;
}

export interface WorkedExample {
  problem: string; // markdown + LaTeX
  solution: string; // markdown + LaTeX
}

export interface PracticeProblem {
  id: string;
  difficulty: Difficulty;
  question: string; // markdown + LaTeX
  answer: string; // markdown + LaTeX (short final answer)
  solution?: string; // markdown + LaTeX (full working)
}

export interface Topic {
  id: string;
  title: string;
  summary: string;
  /** Full lesson written as markdown (supports $LaTeX$). */
  content: string;
  formulas: Formula[];
  examples: WorkedExample[];
  practice: PracticeProblem[];
}

export interface Course {
  id: string;
  board: 'IGCSE' | 'IB';
  title: string;
  level?: string; // e.g. "Extended", "SL", "HL"
  tagline: string;
  description: string;
  /** Tailwind gradient classes for the course card accent. */
  accent: string;
  topics: Topic[];
}

export type View =
  | { name: 'home' }
  | { name: 'courses' }
  | { name: 'course'; courseId: string }
  | { name: 'topic'; courseId: string; topicId: string }
  | { name: 'formulas' }
  | { name: 'tutor' };

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

export interface LiveConnectionState {
  isConnected: boolean;
  isSpeaking: boolean;
  error: string | null;
  volume: number;
}
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
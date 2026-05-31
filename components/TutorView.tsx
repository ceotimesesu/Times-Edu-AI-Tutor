import React, { useState } from 'react';
import { MessageSquare, Mic, KeyRound, Sparkles } from 'lucide-react';
import ChatSession from './ChatSession';
import LiveSession from './LiveSession';
import { TutorMode } from '../types';
import { TUTOR_MODES } from '../constants';

interface TutorViewProps {
  apiKey: string;
  onKeySubmit: (key: string) => void;
}

const TutorView: React.FC<TutorViewProps> = ({ apiKey, onKeySubmit }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'live'>('chat');
  const [tutorMode, setTutorMode] = useState<TutorMode>('guide');

  if (!apiKey) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="bg-white dark:bg-ink-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-brand-beige dark:border-ink-700">
          <div className="flex items-center gap-3 mb-5 text-brand-navy">
            <div className="w-12 h-12 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
              <KeyRound size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold dark:text-white">Connect the AI Tutor</h2>
              <p className="text-xs text-brand-gold font-semibold">Powered by Google Gemini</p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-5 text-sm leading-relaxed">
            Browsing lessons, formulas and practice needs no key. To chat with the live AI tutor, paste a
            Gemini API key — it stays in your browser and is never sent to our servers.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem('key') as HTMLInputElement;
              if (input.value.trim()) onKeySubmit(input.value.trim());
            }}
          >
            <input
              name="key"
              type="password"
              placeholder="Gemini API key"
              className="w-full p-3.5 bg-brand-beige dark:bg-ink-700 border border-slate-200 dark:border-ink-600 rounded-xl mb-3 focus:ring-2 focus:ring-brand-gold outline-none text-brand-navy dark:text-white"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-brand-navy text-white py-3.5 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles size={18} className="text-brand-gold" /> Start tutoring
            </button>
          </form>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 text-xs text-center text-slate-400 hover:text-brand-gold transition-colors"
          >
            Don&apos;t have a key? Get one free from Google AI Studio →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 md:p-6 gap-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-1 bg-white dark:bg-ink-800 border border-brand-beige dark:border-ink-700 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab('chat')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'chat' ? 'bg-brand-navy text-white' : 'text-slate-500 dark:text-slate-300 hover:bg-brand-beige dark:hover:bg-ink-700'
            }`}
          >
            <MessageSquare size={16} /> Text Chat
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'live' ? 'bg-brand-navy text-white' : 'text-slate-500 dark:text-slate-300 hover:bg-brand-beige dark:hover:bg-ink-700'
            }`}
          >
            <Mic size={16} /> Live Voice
            <span className="text-[9px] bg-brand-gold text-white px-1.5 py-0.5 rounded-full font-bold">BETA</span>
          </button>
        </div>

        <select
          value={tutorMode}
          onChange={(e) => setTutorMode(e.target.value as TutorMode)}
          className="bg-white dark:bg-ink-800 border border-brand-beige dark:border-ink-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-navy dark:text-white outline-none focus:ring-2 focus:ring-brand-gold/30 cursor-pointer"
        >
          {TUTOR_MODES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label} — {m.description}
            </option>
          ))}
        </select>
      </div>

      {/* Session */}
      <div className="flex-1 min-h-0">
        {activeTab === 'chat' ? (
          <ChatSession mode={tutorMode} apiKey={apiKey} />
        ) : (
          <LiveSession mode={tutorMode} apiKey={apiKey} onClose={() => setActiveTab('chat')} />
        )}
      </div>
    </div>
  );
};

export default TutorView;

import React, { useState, useEffect } from 'react';
import { Bot, Settings, BookOpen, GraduationCap, Mic, MessageSquare, Menu, X, KeyRound } from 'lucide-react';
import ChatSession from './components/ChatSession';
import LiveSession from './components/LiveSession';
import { TutorMode } from './types';
import { TUTOR_MODES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'live'>('chat');
  const [tutorMode, setTutorMode] = useState<TutorMode>('guide');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // API Key management
  const [apiKey, setApiKey] = useState<string>(process.env.API_KEY || '');
  const [showKeyModal, setShowKeyModal] = useState(!process.env.API_KEY);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleKeySubmit = (key: string) => {
    setApiKey(key);
    setShowKeyModal(false);
  };

  return (
    <div className="flex h-screen bg-brand-beige text-brand-navy font-sans overflow-hidden">
      
      {/* API Key Modal (Fallback) */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-brand-beige">
            <div className="flex items-center gap-3 mb-6 text-brand-navy">
                <KeyRound size={28} className="text-brand-gold" />
                <h2 className="text-2xl font-bold">Enter Access Key</h2>
            </div>
            <p className="text-slate-600 mb-6">
              To start your session with Times Edu AI Tutor, please provide your Gemini API key.
            </p>
            <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem('key') as HTMLInputElement;
                handleKeySubmit(input.value);
            }}>
                <input 
                    name="key"
                    type="password" 
                    placeholder="API Key" 
                    className="w-full p-4 bg-brand-beige border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-brand-gold outline-none text-brand-navy"
                    autoFocus
                />
                <button type="submit" className="w-full bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-colors border border-transparent hover:border-brand-gold">
                    Start Learning
                </button>
            </form>
            <div className="mt-4 text-xs text-slate-400 text-center">
                Your key is used locally and never stored on our servers.
            </div>
          </div>
        </div>
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-brand-beige flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center text-brand-gold shadow-lg shadow-brand-navy/20">
                <Bot size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg text-brand-navy leading-tight">Times Edu</h1>
                <p className="text-xs text-brand-gold font-bold tracking-wide">AI TUTOR</p>
              </div>
            </div>
            <button onClick={toggleSidebar} className="md:hidden text-slate-400">
                <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <div className="p-4 space-y-2 flex-1 overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Session Type</div>
            
            <button
              onClick={() => { setActiveTab('chat'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === 'chat' ? 'bg-brand-beige text-brand-navy font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageSquare size={20} className={activeTab === 'chat' ? 'text-brand-gold' : ''} />
              <span>Text Chat</span>
            </button>
            
            <button
              onClick={() => { setActiveTab('live'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === 'live' ? 'bg-brand-beige text-brand-navy font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Mic size={20} className={activeTab === 'live' ? 'text-brand-gold' : ''} />
              <span>Live Voice Tutor</span>
              <span className="ml-auto text-[10px] bg-brand-gold text-white px-2 py-0.5 rounded-full font-bold">BETA</span>
            </button>

            <div className="my-6 border-t border-brand-beige"></div>

            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Learning Style</div>
            <div className="space-y-2">
                {TUTOR_MODES.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setTutorMode(mode.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                            tutorMode === mode.id 
                            ? 'border-brand-gold bg-brand-beige ring-1 ring-brand-gold/30' 
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                    >
                        <div className={`font-semibold text-sm mb-0.5 ${tutorMode === mode.id ? 'text-brand-navy' : 'text-slate-700'}`}>
                            {mode.label}
                        </div>
                        <div className="text-xs text-slate-500 leading-snug">
                            {mode.description}
                        </div>
                    </button>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-brand-beige">
            <div className="bg-brand-beige p-4 rounded-xl border border-brand-gold/20">
                <div className="flex items-center gap-2 text-brand-navy font-semibold text-sm mb-1">
                    <GraduationCap size={16} className="text-brand-gold" />
                    <span>Pro Tip</span>
                </div>
                <p className="text-xs text-slate-600">
                    Upload photos of math problems or essays for instant feedback!
                </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-brand-beige p-4 flex items-center justify-between z-30">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center text-brand-gold">
                    <Bot size={18} />
                </div>
                <span className="font-bold text-brand-navy">Times Edu</span>
            </div>
            <button onClick={toggleSidebar} className="text-brand-navy">
                <Menu size={24} />
            </button>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-hidden h-full">
            <div className="max-w-4xl mx-auto h-full w-full">
                {apiKey ? (
                    activeTab === 'chat' ? (
                        <ChatSession mode={tutorMode} apiKey={apiKey} />
                    ) : (
                        <LiveSession 
                            mode={tutorMode} 
                            apiKey={apiKey} 
                            onClose={() => setActiveTab('chat')} 
                        />
                    )
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        Please enter API Key to start.
                    </div>
                )}
            </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-brand-navy/20 z-30 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
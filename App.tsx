import React, { useState } from 'react';
import { Bot, BookOpen, Home, Sigma, MessageSquare, Menu, X } from 'lucide-react';
import HomePage from './components/HomePage';
import CoursesIndex from './components/CoursesIndex';
import CoursePage from './components/CoursePage';
import TopicPage from './components/TopicPage';
import FormulaSheet from './components/FormulaSheet';
import TutorView from './components/TutorView';
import { View } from './types';
import { APP_TAGLINE } from './constants';
import { findCourse, findTopic } from './data/curriculum';

const NAV: { label: string; icon: React.ElementType; view: View; match: View['name'][] }[] = [
  { label: 'Home', icon: Home, view: { name: 'home' }, match: ['home'] },
  { label: 'Courses', icon: BookOpen, view: { name: 'courses' }, match: ['courses', 'course', 'topic'] },
  { label: 'Formulas', icon: Sigma, view: { name: 'formulas' }, match: ['formulas'] },
  { label: 'AI Tutor', icon: MessageSquare, view: { name: 'tutor' }, match: ['tutor'] },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>({ name: 'home' });
  const [apiKey, setApiKey] = useState<string>(process.env.API_KEY || '');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = (next: View) => {
    setView(next);
    setMobileNavOpen(false);
    // Scroll the content region back to the top on navigation.
    requestAnimationFrame(() => {
      document.getElementById('app-scroll')?.scrollTo({ top: 0 });
    });
  };

  const renderView = () => {
    switch (view.name) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'courses':
        return <CoursesIndex onNavigate={navigate} />;
      case 'course': {
        const course = findCourse(view.courseId);
        if (!course) return <NotFound onHome={() => navigate({ name: 'courses' })} />;
        return <CoursePage course={course} onNavigate={navigate} />;
      }
      case 'topic': {
        const course = findCourse(view.courseId);
        const topic = findTopic(view.courseId, view.topicId);
        if (!course || !topic) return <NotFound onHome={() => navigate({ name: 'courses' })} />;
        return <TopicPage course={course} topic={topic} onNavigate={navigate} />;
      }
      case 'formulas':
        return <FormulaSheet onNavigate={navigate} />;
      case 'tutor':
        return <TutorView apiKey={apiKey} onKeySubmit={setApiKey} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-brand-beige text-brand-navy font-sans overflow-hidden">
      {/* Top navigation */}
      <header className="bg-white border-b border-brand-beige z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate({ name: 'home' })} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center text-brand-gold shadow-lg shadow-brand-navy/20">
              <Bot size={22} />
            </div>
            <div className="text-left">
              <h1 className="font-bold text-base text-brand-navy leading-tight">Times Edu</h1>
              <p className="text-[10px] text-brand-gold font-bold tracking-wide uppercase">{APP_TAGLINE}</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.match.includes(view.name);
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.view)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    active ? 'bg-brand-beige text-brand-navy' : 'text-slate-500 hover:bg-brand-beige/60'
                  }`}
                >
                  <item.icon size={16} className={active ? 'text-brand-gold' : ''} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button onClick={() => setMobileNavOpen((o) => !o)} className="md:hidden text-brand-navy p-2">
            {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <nav className="md:hidden border-t border-brand-beige bg-white px-4 py-2 space-y-1">
            {NAV.map((item) => {
              const active = item.match.includes(view.name);
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active ? 'bg-brand-beige text-brand-navy' : 'text-slate-600 hover:bg-brand-beige/60'
                  }`}
                >
                  <item.icon size={18} className={active ? 'text-brand-gold' : ''} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Content */}
      <main id="app-scroll" className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

const NotFound: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-6">
    <p className="text-slate-500 mb-4">Sorry, we couldn&apos;t find that page.</p>
    <button onClick={onHome} className="bg-brand-navy text-white px-5 py-2.5 rounded-xl font-semibold">
      Back to courses
    </button>
  </div>
);

export default App;

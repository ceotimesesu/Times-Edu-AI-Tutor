import React, { useState, useEffect } from 'react';
import {
  Bot,
  BookOpen,
  Home,
  Sigma,
  MessageSquare,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  FileText,
  Flame,
} from 'lucide-react';
import HomePage from './components/HomePage';
import CoursesIndex from './components/CoursesIndex';
import CoursePage from './components/CoursePage';
import TopicPage from './components/TopicPage';
import FormulaSheet from './components/FormulaSheet';
import TutorView from './components/TutorView';
import Dashboard from './components/Dashboard';
import QuizView from './components/QuizView';
import { ExamsPage, ExamPaperView } from './components/Exams';
import SearchModal from './components/SearchModal';
import { View } from './types';
import { APP_TAGLINE } from './constants';
import { findCourse, findTopic } from './data/curriculum';
import { useAppState } from './hooks/appState';

const NAV: { label: string; icon: React.ElementType; view: View; match: View['name'][] }[] = [
  { label: 'Home', icon: Home, view: { name: 'home' }, match: ['home'] },
  { label: 'Courses', icon: BookOpen, view: { name: 'courses' }, match: ['courses', 'course', 'topic'] },
  { label: 'Quiz', icon: Flame, view: { name: 'quiz' }, match: ['quiz'] },
  { label: 'Exams', icon: FileText, view: { name: 'exams' }, match: ['exams', 'exam'] },
  { label: 'Formulas', icon: Sigma, view: { name: 'formulas' }, match: ['formulas'] },
  { label: 'AI Tutor', icon: MessageSquare, view: { name: 'tutor' }, match: ['tutor'] },
];

const App: React.FC = () => {
  const [view, setView] = useState<View>({ name: 'home' });
  const [apiKey, setApiKey] = useState<string>(process.env.API_KEY || '');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { dark, toggleDark } = useAppState();

  const navigate = (next: View) => {
    setView(next);
    setMobileNavOpen(false);
    requestAnimationFrame(() => document.getElementById('app-scroll')?.scrollTo({ top: 0 }));
  };

  // Global keyboard shortcuts: Cmd/Ctrl+K or "/" opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === '/' && !searchOpen) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

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
      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;
      case 'quiz':
        return <QuizView courseId={view.courseId} onNavigate={navigate} />;
      case 'exams':
        return <ExamsPage onNavigate={navigate} />;
      case 'exam':
        return <ExamPaperView examId={view.examId} onNavigate={navigate} />;
      case 'tutor':
        return <TutorView apiKey={apiKey} onKeySubmit={setApiKey} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const iconBtn =
    'w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-brand-beige dark:hover:bg-ink-700 hover:text-brand-navy dark:hover:text-white transition-colors';

  return (
    <div className="flex flex-col h-screen bg-brand-beige dark:bg-ink-900 text-brand-navy dark:text-slate-200 font-sans overflow-hidden">
      <header className="bg-white dark:bg-ink-800 border-b border-brand-beige dark:border-ink-700 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
          <button onClick={() => navigate({ name: 'home' })} className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-brand-navy rounded-xl flex items-center justify-center text-brand-gold shadow-lg shadow-brand-navy/20">
              <Bot size={22} />
            </div>
            <div className="text-left hidden sm:block">
              <h1 className="font-bold text-base text-brand-navy dark:text-white leading-tight">Times Edu</h1>
              <p className="text-[10px] text-brand-gold font-bold tracking-wide uppercase">{APP_TAGLINE}</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.match.includes(view.name);
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.view)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-white'
                      : 'text-slate-500 dark:text-slate-300 hover:bg-brand-beige/60 dark:hover:bg-ink-700/60'
                  }`}
                >
                  <item.icon size={16} className={active ? 'text-brand-gold' : ''} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(true)} className={iconBtn} title="Search (⌘K)" aria-label="Search">
              <Search size={18} />
            </button>
            <button
              onClick={() => navigate({ name: 'dashboard' })}
              className={`${iconBtn} ${view.name === 'dashboard' ? 'bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-white' : ''}`}
              title="My progress"
              aria-label="My progress"
            >
              <LayoutDashboard size={18} />
            </button>
            <button onClick={toggleDark} className={iconBtn} title="Toggle theme" aria-label="Toggle theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMobileNavOpen((o) => !o)} className={`${iconBtn} lg:hidden`} aria-label="Menu">
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileNavOpen && (
          <nav className="lg:hidden border-t border-brand-beige dark:border-ink-700 bg-white dark:bg-ink-800 px-4 py-2 space-y-1 animate-fade-in">
            {NAV.map((item) => {
              const active = item.match.includes(view.name);
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-brand-beige/60 dark:hover:bg-ink-700/60'
                  }`}
                >
                  <item.icon size={18} className={active ? 'text-brand-gold' : ''} />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => navigate({ name: 'dashboard' })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-brand-beige/60 dark:hover:bg-ink-700/60 transition-colors"
            >
              <LayoutDashboard size={18} /> My progress
            </button>
          </nav>
        )}
      </header>

      <main id="app-scroll" className="flex-1 overflow-y-auto">
        {renderView()}
      </main>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} onNavigate={navigate} />}
    </div>
  );
};

const NotFound: React.FC<{ onHome: () => void }> = ({ onHome }) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-6">
    <p className="text-slate-500 dark:text-slate-400 mb-4">Sorry, we couldn&apos;t find that page.</p>
    <button onClick={onHome} className="bg-brand-navy text-white px-5 py-2.5 rounded-xl font-semibold">
      Back to courses
    </button>
  </div>
);

export default App;

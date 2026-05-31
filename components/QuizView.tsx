import React, { useMemo, useState, useEffect } from 'react';
import { Check, X, Eye, Clock, Trophy, RotateCcw, ArrowRight, Flame, ChevronLeft } from 'lucide-react';
import { View, PracticeProblem } from '../types';
import { COURSES, findCourse } from '../data/curriculum';
import { useAppState } from '../hooks/appState';
import Markdown from './Markdown';

interface QuizViewProps {
  courseId?: string;
  onNavigate: (view: View) => void;
}

interface QuizItem extends PracticeProblem {
  topicTitle: string;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const QuizView: React.FC<QuizViewProps> = ({ courseId, onNavigate }) => {
  const { recordPractice, addQuiz } = useAppState();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(courseId ?? null);
  const [length, setLength] = useState(8);
  const [items, setItems] = useState<QuizItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Timer runs only while a quiz is in progress.
  useEffect(() => {
    if (!items || done) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [items, done]);

  const course = selectedCourse ? findCourse(selectedCourse) : undefined;

  const availablePool = useMemo(() => {
    if (!course) return [] as QuizItem[];
    return course.topics.flatMap((t) =>
      t.practice.map((p) => ({ ...p, topicTitle: t.title })),
    );
  }, [course]);

  const start = () => {
    if (!course) return;
    const picked = shuffle(availablePool).slice(0, Math.min(length, availablePool.length));
    setItems(picked);
    setIndex(0);
    setRevealed(false);
    setCorrect(0);
    setDone(false);
    setSeconds(0);
  };

  const mark = (gotItRight: boolean) => {
    const item = items![index];
    recordPractice(item.id, gotItRight);
    const newCorrect = correct + (gotItRight ? 1 : 0);
    setCorrect(newCorrect);
    if (index + 1 >= items!.length) {
      setDone(true);
      addQuiz({
        courseId: course!.id,
        scope: course!.title,
        total: items!.length,
        correct: newCorrect,
      });
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  };

  // ---- Setup screen ----
  if (!items) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand-navy text-brand-gold flex items-center justify-center mx-auto mb-4">
              <Flame size={30} />
            </div>
            <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-2">Quiz mode</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Test yourself with random practice questions. Reveal each answer, mark how you did, and see your score.
            </p>
          </div>

          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">Course</label>
          <div className="space-y-2 mb-6">
            {COURSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCourse(c.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedCourse === c.id
                    ? 'border-brand-gold bg-brand-beige dark:bg-ink-700 ring-1 ring-brand-gold/30'
                    : 'border-brand-beige dark:border-ink-700 bg-white dark:bg-ink-800 hover:border-brand-gold/40'
                }`}
              >
                <div className="font-semibold text-brand-navy dark:text-white">{c.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {c.topics.reduce((n, t) => n + t.practice.length, 0)} questions available
                </div>
              </button>
            ))}
          </div>

          <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
            Number of questions: <span className="text-brand-gold">{length}</span>
          </label>
          <input
            type="range"
            min={4}
            max={15}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-brand-gold mb-8"
          />

          <button
            disabled={!selectedCourse}
            onClick={start}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Start quiz <ArrowRight size={18} className="text-brand-gold" />
          </button>
        </div>
      </div>
    );
  }

  // ---- Results screen ----
  if (done) {
    const pct = Math.round((correct / items.length) * 100);
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-12 text-center">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
              pct >= 70 ? 'bg-green-100 text-green-600' : pct >= 40 ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
            }`}
          >
            <Trophy size={38} />
          </div>
          <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-1">
            {correct} / {items.length}
          </h1>
          <p className="text-5xl font-extrabold text-brand-gold my-3">{pct}%</p>
          <p className="text-slate-500 dark:text-slate-400 mb-1">{course!.title}</p>
          <p className="text-sm text-slate-400 mb-8 inline-flex items-center gap-1.5">
            <Clock size={14} /> {formatTime(seconds)}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={start}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-3.5 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors"
            >
              <RotateCcw size={18} className="text-brand-gold" /> Try again
            </button>
            <button
              onClick={() => onNavigate({ name: 'dashboard' })}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-white py-3.5 rounded-xl font-semibold hover:bg-brand-gold/20 transition-colors"
            >
              View progress
            </button>
          </div>
          <button
            onClick={() => {
              setItems(null);
              setSelectedCourse(null);
            }}
            className="mt-4 text-sm text-slate-400 hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            Choose a different quiz
          </button>
        </div>
      </div>
    );
  }

  // ---- Question screen ----
  const item = items[index];
  const progress = ((index + (revealed ? 0.5 : 0)) / items.length) * 100;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setItems(null)}
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={16} /> Quit
          </button>
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} /> {formatTime(seconds)}
            </span>
            <span>
              {index + 1} / {items.length}
            </span>
          </div>
        </div>

        {/* progress bar */}
        <div className="h-2 rounded-full bg-brand-beige dark:bg-ink-700 mb-8 overflow-hidden">
          <div className="h-full bg-brand-gold transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div key={item.id} className="bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 p-6 mb-5 animate-fade-in-up">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-3">{item.topicTitle}</div>
          <Markdown>{item.question}</Markdown>

          {revealed && (
            <div className="mt-5 space-y-3 animate-fade-in">
              <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40">
                <div className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-300 mb-1">
                  Answer
                </div>
                <Markdown className="prose-p:my-0">{item.answer}</Markdown>
              </div>
              {item.solution && (
                <div className="p-3 rounded-xl bg-brand-beige/40 dark:bg-ink-700/60 border border-brand-beige dark:border-ink-700">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">Working</div>
                  <Markdown>{item.solution}</Markdown>
                </div>
              )}
            </div>
          )}
        </div>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors"
          >
            <Eye size={18} className="text-brand-gold" /> Reveal answer
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => mark(false)}
              className="inline-flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 py-4 rounded-xl font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
            >
              <X size={18} /> Got it wrong
            </button>
            <button
              onClick={() => mark(true)}
              className="inline-flex items-center justify-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 border border-green-200 dark:border-green-900/40 py-4 rounded-xl font-semibold hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
            >
              <Check size={18} /> Got it right
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sigma,
  Lightbulb,
  PencilRuler,
  ChevronDown,
  Eye,
  EyeOff,
  MessageSquare,
  Bookmark,
  CheckCircle2,
  Circle,
  Check,
  X,
} from 'lucide-react';
import { Course, Topic, View, WorkedExample, PracticeProblem, Difficulty } from '../types';
import Markdown from './Markdown';
import { useAppState } from '../hooks/appState';

interface TopicPageProps {
  course: Course;
  topic: Topic;
  onNavigate: (view: View) => void;
}

const InlineMath: React.FC<{ expr: string }> = ({ expr }) => (
  <Markdown className="prose-p:my-0">{`$${expr}$`}</Markdown>
);

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Hard: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

const ExampleCard: React.FC<{ example: WorkedExample; index: number }> = ({ example, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-2xl border border-brand-beige dark:border-ink-700 bg-white dark:bg-ink-800 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
          <Lightbulb size={14} /> Worked Example {index + 1}
        </div>
        <Markdown>{example.problem}</Markdown>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 bg-brand-beige/50 dark:bg-ink-700/60 border-t border-brand-beige dark:border-ink-700 text-sm font-semibold text-brand-navy dark:text-white hover:bg-brand-beige dark:hover:bg-ink-700 transition-colors"
      >
        <span>{open ? 'Hide solution' : 'Show solution'}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-5 border-t border-brand-beige dark:border-ink-700 bg-brand-beige/20 dark:bg-ink-700/30">
          <Markdown>{example.solution}</Markdown>
        </div>
      )}
    </div>
  );
};

const PracticeCard: React.FC<{ problem: PracticeProblem; index: number }> = ({ problem, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const { recordPractice, practiceResult } = useAppState();
  const result = practiceResult(problem.id);

  return (
    <div className="rounded-2xl border border-brand-beige dark:border-ink-700 bg-white dark:bg-ink-800 p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-bold text-brand-navy dark:text-white inline-flex items-center gap-2">
          Q{index + 1}
          {result === 'correct' && <Check size={16} className="text-green-500" />}
          {result === 'wrong' && <X size={16} className="text-rose-500" />}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${difficultyStyles[problem.difficulty]}`}>
          {problem.difficulty}
        </span>
      </div>
      <Markdown>{problem.question}</Markdown>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setShowAnswer((s) => !s)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-brand-navy text-brand-gold hover:bg-brand-navy/90 transition-colors"
        >
          {showAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
          {showAnswer ? 'Hide answer' : 'Show answer'}
        </button>
        {problem.solution && (
          <button
            onClick={() => setShowSolution((s) => !s)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-white hover:bg-brand-gold/20 transition-colors"
          >
            {showSolution ? 'Hide working' : 'Show working'}
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="mt-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/40 animate-fade-in">
          <div className="text-[10px] font-bold uppercase tracking-wider text-green-700 dark:text-green-300 mb-1">Answer</div>
          <Markdown className="prose-p:my-0">{problem.answer}</Markdown>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-green-100 dark:border-green-900/40">
            <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">How did you do?</span>
            <button
              onClick={() => recordPractice(problem.id, true)}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                result === 'correct'
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-ink-700 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900/40 hover:bg-green-100'
              }`}
            >
              <Check size={13} /> Correct
            </button>
            <button
              onClick={() => recordPractice(problem.id, false)}
              className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                result === 'wrong'
                  ? 'bg-rose-600 text-white'
                  : 'bg-white dark:bg-ink-700 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100'
              }`}
            >
              <X size={13} /> Wrong
            </button>
          </div>
        </div>
      )}
      {showSolution && problem.solution && (
        <div className="mt-3 p-3 rounded-xl bg-brand-beige/40 dark:bg-ink-700/60 border border-brand-beige dark:border-ink-700 animate-fade-in">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">Working</div>
          <Markdown>{problem.solution}</Markdown>
        </div>
      )}
    </div>
  );
};

const TopicPage: React.FC<TopicPageProps> = ({ course, topic, onNavigate }) => {
  const { isComplete, toggleComplete, isBookmarked, toggleBookmark } = useAppState();
  const complete = isComplete(course.id, topic.id);
  const bookmarked = isBookmarked(course.id, topic.id);

  const idx = course.topics.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? course.topics[idx - 1] : undefined;
  const next = idx < course.topics.length - 1 ? course.topics[idx + 1] : undefined;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={() => onNavigate({ name: 'course', courseId: course.id })}
          className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-brand-navy dark:hover:text-white text-sm font-medium mb-5 transition-colors"
        >
          <ArrowLeft size={16} /> {course.title}
        </button>

        <header className="mb-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-slate-200">
                {course.board} · {course.level}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-navy dark:text-white mt-3 mb-2">{topic.title}</h1>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{topic.summary}</p>
            </div>
            <button
              onClick={() => toggleBookmark(course.id, topic.id)}
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                bookmarked
                  ? 'bg-brand-gold/15 text-brand-gold'
                  : 'bg-brand-beige dark:bg-ink-700 text-slate-400 hover:text-brand-gold'
              }`}
              title={bookmarked ? 'Remove bookmark' : 'Bookmark this topic'}
              aria-label="Bookmark"
            >
              <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <button
            onClick={() => toggleComplete(course.id, topic.id)}
            className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              complete
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                : 'bg-brand-beige dark:bg-ink-700 text-brand-navy dark:text-slate-200 hover:bg-brand-gold/20'
            }`}
          >
            {complete ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {complete ? 'Completed' : 'Mark as complete'}
          </button>
        </header>

        <section className="bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 p-6 md:p-8 shadow-sm mb-8">
          <Markdown>{topic.content}</Markdown>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 text-brand-navy dark:text-white mb-4">
            <Sigma size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold">Key formulas</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {topic.formulas.map((f) => (
              <div key={f.name} className="rounded-xl border border-brand-beige dark:border-ink-700 bg-white dark:bg-ink-800 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1.5">{f.name}</div>
                <div className="overflow-x-auto">
                  <InlineMath expr={f.expr} />
                </div>
                {f.note && <p className="text-xs text-slate-400 mt-1">{f.note}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 text-brand-navy dark:text-white mb-4">
            <Lightbulb size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold">Worked examples</h2>
          </div>
          <div className="space-y-4">
            {topic.examples.map((ex, i) => (
              <ExampleCard key={i} example={ex} index={i} />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-center gap-2 text-brand-navy dark:text-white mb-4">
            <PencilRuler size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold">Practice questions</h2>
          </div>
          <div className="space-y-4">
            {topic.practice.map((p, i) => (
              <PracticeCard key={p.id} problem={p} index={i} />
            ))}
          </div>
        </section>

        <button
          onClick={() => onNavigate({ name: 'tutor' })}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors mb-8"
        >
          <MessageSquare size={18} className="text-brand-gold" />
          Stuck? Ask the AI tutor about {topic.title}
        </button>

        <div className="flex items-center justify-between gap-3 border-t border-brand-beige dark:border-ink-700 pt-6">
          {prev ? (
            <button
              onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: prev.id })}
              className="group flex-1 text-left p-4 rounded-xl border border-brand-beige dark:border-ink-700 hover:border-brand-gold/40 hover:bg-white dark:hover:bg-ink-800 transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-1">
                <ArrowLeft size={12} /> Previous
              </div>
              <div className="font-semibold text-brand-navy dark:text-white text-sm group-hover:text-brand-gold transition-colors">
                {prev.title}
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <button
              onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: next.id })}
              className="group flex-1 text-right p-4 rounded-xl border border-brand-beige dark:border-ink-700 hover:border-brand-gold/40 hover:bg-white dark:hover:bg-ink-800 transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-1 justify-end">
                Next <ArrowRight size={12} />
              </div>
              <div className="font-semibold text-brand-navy dark:text-white text-sm group-hover:text-brand-gold transition-colors">
                {next.title}
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicPage;

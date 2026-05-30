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
} from 'lucide-react';
import { Course, Topic, View, WorkedExample, PracticeProblem, Difficulty } from '../types';
import Markdown from './Markdown';

interface TopicPageProps {
  course: Course;
  topic: Topic;
  onNavigate: (view: View) => void;
}

const InlineMath: React.FC<{ expr: string }> = ({ expr }) => (
  // Render a bare LaTeX expression via the markdown pipeline.
  <Markdown className="prose-p:my-0">{`$${expr}$`}</Markdown>
);

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-rose-100 text-rose-700',
};

const ExampleCard: React.FC<{ example: WorkedExample; index: number }> = ({ example, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="rounded-2xl border border-brand-beige bg-white overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold">
          <Lightbulb size={14} /> Worked Example {index + 1}
        </div>
        <Markdown>{example.problem}</Markdown>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 bg-brand-beige/50 border-t border-brand-beige text-sm font-semibold text-brand-navy hover:bg-brand-beige transition-colors"
      >
        <span>{open ? 'Hide solution' : 'Show solution'}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-5 border-t border-brand-beige bg-brand-beige/20">
          <Markdown>{example.solution}</Markdown>
        </div>
      )}
    </div>
  );
};

const PracticeCard: React.FC<{ problem: PracticeProblem; index: number }> = ({ problem, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  return (
    <div className="rounded-2xl border border-brand-beige bg-white p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-bold text-brand-navy">Q{index + 1}</span>
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
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-brand-beige text-brand-navy hover:bg-brand-gold/20 transition-colors"
          >
            {showSolution ? 'Hide working' : 'Show working'}
          </button>
        )}
      </div>

      {showAnswer && (
        <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-green-700 mb-1">Answer</div>
          <Markdown className="prose-p:my-0">{problem.answer}</Markdown>
        </div>
      )}
      {showSolution && problem.solution && (
        <div className="mt-3 p-3 rounded-xl bg-brand-beige/40 border border-brand-beige">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-gold mb-1">Working</div>
          <Markdown>{problem.solution}</Markdown>
        </div>
      )}
    </div>
  );
};

const TopicPage: React.FC<TopicPageProps> = ({ course, topic, onNavigate }) => {
  const idx = course.topics.findIndex((t) => t.id === topic.id);
  const prev = idx > 0 ? course.topics[idx - 1] : undefined;
  const next = idx < course.topics.length - 1 ? course.topics[idx + 1] : undefined;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => onNavigate({ name: 'course', courseId: course.id })}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-navy text-sm font-medium mb-5 transition-colors"
        >
          <ArrowLeft size={16} /> {course.title}
        </button>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-beige text-brand-navy">
              {course.board} · {course.level}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">{topic.title}</h1>
          <p className="text-slate-500 leading-relaxed">{topic.summary}</p>
        </header>

        {/* Lesson */}
        <section className="bg-white rounded-2xl border border-brand-beige p-6 md:p-8 shadow-sm mb-8">
          <Markdown>{topic.content}</Markdown>
        </section>

        {/* Formula sheet */}
        <section className="mb-8">
          <div className="flex items-center gap-2 text-brand-navy mb-4">
            <Sigma size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold">Key formulas</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {topic.formulas.map((f) => (
              <div key={f.name} className="rounded-xl border border-brand-beige bg-white p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold mb-1.5">{f.name}</div>
                <div className="overflow-x-auto">
                  <InlineMath expr={f.expr} />
                </div>
                {f.note && <p className="text-xs text-slate-400 mt-1">{f.note}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Worked examples */}
        <section className="mb-8">
          <div className="flex items-center gap-2 text-brand-navy mb-4">
            <Lightbulb size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold">Worked examples</h2>
          </div>
          <div className="space-y-4">
            {topic.examples.map((ex, i) => (
              <ExampleCard key={i} example={ex} index={i} />
            ))}
          </div>
        </section>

        {/* Practice */}
        <section className="mb-8">
          <div className="flex items-center gap-2 text-brand-navy mb-4">
            <PencilRuler size={20} className="text-brand-gold" />
            <h2 className="text-xl font-bold">Practice questions</h2>
          </div>
          <div className="space-y-4">
            {topic.practice.map((p, i) => (
              <PracticeCard key={p.id} problem={p} index={i} />
            ))}
          </div>
        </section>

        {/* Tutor CTA */}
        <button
          onClick={() => onNavigate({ name: 'tutor' })}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors mb-8"
        >
          <MessageSquare size={18} className="text-brand-gold" />
          Stuck? Ask the AI tutor about {topic.title}
        </button>

        {/* Prev / next nav */}
        <div className="flex items-center justify-between gap-3 border-t border-brand-beige pt-6">
          {prev ? (
            <button
              onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: prev.id })}
              className="group flex-1 text-left p-4 rounded-xl border border-brand-beige hover:border-brand-gold/40 hover:bg-white transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-1">
                <ArrowLeft size={12} /> Previous
              </div>
              <div className="font-semibold text-brand-navy text-sm group-hover:text-brand-gold transition-colors">
                {prev.title}
              </div>
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <button
              onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: next.id })}
              className="group flex-1 text-right p-4 rounded-xl border border-brand-beige hover:border-brand-gold/40 hover:bg-white transition-all"
            >
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex items-center gap-1 justify-end">
                Next <ArrowRight size={12} />
              </div>
              <div className="font-semibold text-brand-navy text-sm group-hover:text-brand-gold transition-colors">
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

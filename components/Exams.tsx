import React, { useState } from 'react';
import { FileText, Clock, Calculator, ArrowLeft, ChevronDown, Award, ListChecks } from 'lucide-react';
import { View } from '../types';
import { COURSES } from '../data/curriculum';
import { EXAMS, ExamPaper, examTotalMarks, findExam } from '../data/exams';
import Markdown from './Markdown';

// ---------------------------------------------------------------------------
// Exam list
// ---------------------------------------------------------------------------

export const ExamsPage: React.FC<{ onNavigate: (v: View) => void }> = ({ onNavigate }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
            <FileText size={22} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-white">Mock exam papers</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Full practice papers with marks and detailed mark schemes.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {COURSES.map((course) => {
            const papers = EXAMS.filter((e) => e.courseId === course.id);
            if (papers.length === 0) return null;
            return (
              <div key={course.id}>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">{course.title}</h2>
                <div className="space-y-3">
                  {papers.map((paper) => (
                    <button
                      key={paper.id}
                      onClick={() => onNavigate({ name: 'exam', examId: paper.id })}
                      className="w-full text-left group bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 hover:border-brand-gold/40 shadow-sm hover:shadow-md transition-all p-5"
                    >
                      <h3 className="font-bold text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors mb-2">
                        {paper.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={13} className="text-brand-gold" /> {paper.durationMin} min
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Award size={13} className="text-brand-gold" /> {examTotalMarks(paper)} marks
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <ListChecks size={13} className="text-brand-gold" /> {paper.questions.length} questions
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calculator size={13} className="text-brand-gold" /> Calculator {paper.calculator}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Single paper
// ---------------------------------------------------------------------------

const ExamQuestionCard: React.FC<{
  index: number;
  question: ExamPaper['questions'][number];
  showAll: boolean;
}> = ({ index, question, showAll }) => {
  const [open, setOpen] = useState(false);
  const show = open || showAll;
  return (
    <div className="bg-white dark:bg-ink-800 rounded-2xl border border-brand-beige dark:border-ink-700 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="font-bold text-brand-navy dark:text-white">Question {index + 1}</span>
          <span className="text-xs font-bold text-brand-gold whitespace-nowrap">
            [{question.marks} {question.marks === 1 ? 'mark' : 'marks'}]
          </span>
        </div>
        <Markdown>{question.question}</Markdown>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 bg-brand-beige/50 dark:bg-ink-700/60 border-t border-brand-beige dark:border-ink-700 text-sm font-semibold text-brand-navy dark:text-white hover:bg-brand-beige dark:hover:bg-ink-700 transition-colors"
      >
        <span>{show ? 'Hide mark scheme' : 'Show mark scheme'}</span>
        <ChevronDown size={18} className={`transition-transform ${show ? 'rotate-180' : ''}`} />
      </button>
      {show && (
        <div className="p-5 border-t border-brand-beige dark:border-ink-700 bg-brand-beige/20 dark:bg-ink-700/30">
          <Markdown>{question.markscheme}</Markdown>
        </div>
      )}
    </div>
  );
};

export const ExamPaperView: React.FC<{ examId: string; onNavigate: (v: View) => void }> = ({
  examId,
  onNavigate,
}) => {
  const paper = findExam(examId);
  const [showAll, setShowAll] = useState(false);

  if (!paper) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <p className="text-slate-500 mb-4">That paper could not be found.</p>
        <button
          onClick={() => onNavigate({ name: 'exams' })}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-xl font-semibold"
        >
          Back to papers
        </button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button
          onClick={() => onNavigate({ name: 'exams' })}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-brand-navy dark:hover:text-white text-sm font-medium mb-5 transition-colors"
        >
          <ArrowLeft size={16} /> All papers
        </button>

        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-brand-navy dark:text-white mb-3">{paper.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} className="text-brand-gold" /> {paper.durationMin} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award size={15} className="text-brand-gold" /> {examTotalMarks(paper)} marks
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calculator size={15} className="text-brand-gold" /> Calculator {paper.calculator}
            </span>
          </div>
        </header>

        <div className="flex items-center justify-between bg-brand-beige/50 dark:bg-ink-800 border border-brand-beige dark:border-ink-700 rounded-xl px-4 py-3 mb-5 text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            Attempt each question, then reveal the mark scheme.
          </span>
          <button
            onClick={() => setShowAll((s) => !s)}
            className="font-semibold text-brand-navy dark:text-white hover:text-brand-gold transition-colors whitespace-nowrap"
          >
            {showAll ? 'Hide all' : 'Reveal all'}
          </button>
        </div>

        <div className="space-y-4">
          {paper.questions.map((q, i) => (
            <ExamQuestionCard key={q.id} index={i} question={q} showAll={showAll} />
          ))}
        </div>

        <button
          onClick={() => onNavigate({ name: 'tutor' })}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors"
        >
          Want feedback on your answers? Ask the AI tutor
        </button>
      </div>
    </div>
  );
};

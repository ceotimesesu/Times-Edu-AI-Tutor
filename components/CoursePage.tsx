import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Sigma } from 'lucide-react';
import { Course, View } from '../types';

interface CoursePageProps {
  course: Course;
  onNavigate: (view: View) => void;
}

const CoursePage: React.FC<CoursePageProps> = ({ course, onNavigate }) => {
  return (
    <div className="h-full overflow-y-auto">
      {/* Banner */}
      <div className={`bg-gradient-to-r ${course.accent} text-white`}>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <button
            onClick={() => onNavigate({ name: 'courses' })}
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium mb-5 transition-colors"
          >
            <ArrowLeft size={16} /> All courses
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20">
              {course.board}
            </span>
            <span className="text-xs font-semibold text-white/80">{course.level}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{course.title}</h1>
          <p className="text-white/90 max-w-2xl leading-relaxed">{course.description}</p>
        </div>
      </div>

      {/* Topic list */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 text-brand-navy mb-5">
          <BookOpen size={20} className="text-brand-gold" />
          <h2 className="text-xl font-bold">Topics</h2>
          <span className="text-sm text-slate-400 font-medium">({course.topics.length})</span>
        </div>

        <div className="space-y-3">
          {course.topics.map((topic, idx) => (
            <button
              key={topic.id}
              onClick={() => onNavigate({ name: 'topic', courseId: course.id, topicId: topic.id })}
              className="w-full text-left group bg-white rounded-2xl border border-brand-beige hover:border-brand-gold/40 shadow-sm hover:shadow-md transition-all p-5 flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-beige text-brand-navy font-bold flex items-center justify-center shrink-0 group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-slate-500 leading-snug mt-0.5">{topic.summary}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">
                    <Sigma size={12} className="text-brand-gold" /> {topic.formulas.length} formulas
                  </span>
                  <span>{topic.examples.length} examples</span>
                  <span>{topic.practice.length} practice</span>
                </div>
              </div>
              <ChevronRight
                size={20}
                className="text-slate-300 group-hover:text-brand-gold group-hover:translate-x-1 transition-all shrink-0"
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate({ name: 'tutor' })}
          className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white py-4 rounded-xl font-semibold hover:bg-brand-navy/90 transition-colors"
        >
          Need help? Ask the AI tutor <ArrowRight size={18} className="text-brand-gold" />
        </button>
      </div>
    </div>
  );
};

export default CoursePage;

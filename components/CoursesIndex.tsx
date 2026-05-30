import React from 'react';
import { ArrowRight, Sigma } from 'lucide-react';
import { View } from '../types';
import { COURSES } from '../data/curriculum';

interface CoursesIndexProps {
  onNavigate: (view: View) => void;
}

const CoursesIndex: React.FC<CoursesIndexProps> = ({ onNavigate }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">Courses</h1>
        <p className="text-slate-500 mb-8 max-w-2xl">
          Pick the course you&apos;re studying. Each one is split into clear lessons with key formulas, worked
          examples and exam-style practice questions.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <button
              key={course.id}
              onClick={() => onNavigate({ name: 'course', courseId: course.id })}
              className="text-left group bg-white rounded-2xl border border-brand-beige shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${course.accent}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-beige text-brand-navy">
                    {course.board}
                  </span>
                  <Sigma className="text-brand-gold" size={22} />
                </div>
                <h3 className="font-bold text-lg text-brand-navy leading-tight mb-1">{course.title}</h3>
                <p className="text-xs text-brand-gold font-semibold mb-3">{course.level}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{course.description}</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                  {course.topics.length} topics
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesIndex;

import React from 'react';
import { BookOpen, Target, FileText, Code, CheckCircle, Clock } from 'lucide-react';

const StudyGuideTile: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold">How to Study</h2>
          <p className="text-indigo-100 text-sm">Your complete exam preparation guide</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            Study Method
          </h3>
          <p className="text-sm text-indigo-100">
            <strong>1. Review the notes</strong> to understand concepts<br/>
            <strong>2. Practice questions</strong> to test your knowledge<br/>
            <strong>3. Repeat</strong> until you're confident
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <FileText className="w-5 h-5 mb-2 text-yellow-300" />
            <p className="text-xs font-medium">Short Answer Questions</p>
            <p className="text-xs text-indigo-200">Practice explaining concepts clearly</p>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-lg p-3">
            <Code className="w-5 h-5 mb-2 text-green-300" />
            <p className="text-xs font-medium">Coding Practice</p>
            <p className="text-xs text-indigo-200">Write Python & pseudocode</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <div className="flex items-center mb-2">
            <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
            <span className="text-sm font-medium">Key Skills to Master:</span>
          </div>
          <div className="text-xs text-indigo-100 space-y-1">
            <div>• NESA keywords and definitions</div>
            <div>• Desk checking and algorithm tracing</div>
            <div>• Python functions and classes</div>
            <div>• Mechatronics system components</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-indigo-200">Follow the roadmap below</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-indigo-200">Ready to start?</div>
          <div className="text-sm font-semibold">↓ Check your progress ↓</div>
        </div>
      </div>
    </div>
  );
};

export default StudyGuideTile;
import React, { useState, useEffect } from 'react';
import { X, Bug } from 'lucide-react';

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BugReportModal: React.FC<BugReportModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'initial' | 'rickroll'>('initial');

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleYesClick = () => {
    // Rick roll them!
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    onClose();
    setStep('initial'); // Reset for next time
  };

  const handleNoClick = () => {
    // Also Rick roll them! 😈
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    onClose();
    setStep('initial'); // Reset for next time
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal positioning container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bug className="w-8 h-8 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-white">
                  Bug Report System
                </h3>
                <p className="text-red-100 text-sm">
                  Totally legitimate reporting tool
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <div className="text-2xl">🤔</div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Really? A bug report?
              </h4>
              <p className="text-gray-600 mb-2">
                Did you honestly think I'd implement a full bug tracking system for a study wiki?
              </p>
              <p className="text-sm text-gray-500">
                I mean... it's just flashcards and exam questions! 📚✨
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={handleYesClick}
                className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
              >
                <span className="mr-2">😤</span>
                Yes, I totally did!
              </button>
              <button
                onClick={handleNoClick}
                className="flex-1 inline-flex justify-center items-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
              >
                <span className="mr-2">😅</span>
                Okay, you got me
              </button>
            </div>
            
            {/* Fun footer */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-center text-gray-400">
                🎉 Congratulations! You found the easter egg! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugReportModal;
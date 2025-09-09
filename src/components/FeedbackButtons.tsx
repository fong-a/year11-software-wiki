import React, { useState } from 'react';
import { Bug } from 'lucide-react';
import { BugReportModal } from './BugReportModal';

export const FeedbackButtons: React.FC = () => {
  const [showBugModal, setShowBugModal] = useState(false);

  const handleBugClick = () => {
    setShowBugModal(true);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleBugClick}
        className="flex items-center space-x-1 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-medium transition-colors"
        title="Report a bug"
      >
        <Bug className="w-3 h-3" />
        <span className="hidden sm:inline">Bug</span>
      </button>
      
      {/* Rick Roll Bug Modal */}
      <BugReportModal
        isOpen={showBugModal}
        onClose={() => setShowBugModal(false)}
      />
    </div>
  );
};
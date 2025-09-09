import React from 'react';

interface TimelineItem {
  step: string;
  description: string;
  details: string[];
}

interface VerticalTimelineProps {
  items: TimelineItem[];
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-600"></div>
      
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timeline Node */}
            <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full border-4 border-white shadow-lg">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
            
            {/* Content */}
            <div className="ml-6 flex-1 min-w-0">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.step}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Expandable Details */}
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors list-none flex items-center">
                    <span>View Key Activities</span>
                    <svg 
                      className="ml-2 w-4 h-4 transition-transform group-open:rotate-180" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-800 text-sm">Key Activities:</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {item.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-gray-700 flex items-start">
                          <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTimeline;
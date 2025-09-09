import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ term, definition, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = triggerRect.top - tooltipRect.height - 12;
      let left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      
      // Adjust if tooltip goes off screen
      if (top < 16) {
        top = triggerRect.bottom + 12;
      }
      if (left < 16) {
        left = 16;
      }
      if (left + tooltipRect.width > window.innerWidth - 16) {
        left = window.innerWidth - tooltipRect.width - 16;
      }
      
      setPosition({ top, left });
    }
  }, [isVisible]);

  const handleClick = () => {
    // Convert term to URL fragment (first letter of each word for multi-word terms)
    const termKey = term.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    const glossaryUrl = `/topics/programming-fundamentals/glossary#${termKey}`;
    window.location.href = glossaryUrl;
  };

  return (
    <>
      <span
        ref={triggerRef}
        className="underline decoration-dotted decoration-blue-400 cursor-pointer text-blue-600 hover:text-blue-800 hover:decoration-solid mx-0.5"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        onClick={handleClick}
        tabIndex={0}
        title={`Click to view ${term} in glossary`}
      >
        {children}
      </span>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 max-w-xs p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          <div className="font-semibold mb-1">{term}</div>
          <div className="text-gray-200 mb-2">{definition}</div>
          <div className="text-xs text-blue-300 italic">Click to view in glossary →</div>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
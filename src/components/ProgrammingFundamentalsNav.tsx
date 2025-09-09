import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavSection {
  id: string;
  title: string;
  links: Array<{
    href: string;
    label: string;
    isActive?: boolean;
  }>;
  defaultOpen?: boolean;
}

interface ProgrammingFundamentalsNavProps {
  currentPage?: string;
  currentSection?: string;
}

export const ProgrammingFundamentalsNav: React.FC<ProgrammingFundamentalsNavProps> = ({
  currentPage = '',
  currentSection = ''
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([
    'development-methodologies',
    'algorithms', 
    'code-structure',
    'data-management',
    'development-tools',
    'reference'
  ]));

  const navSections: NavSection[] = [
    {
      id: 'development-methodologies',
      title: 'Development Methodologies',
      defaultOpen: true,
      links: [
        { href: '/topics/programming-fundamentals/methodologies', label: 'Agile vs Waterfall vs WAGILE' },
        { href: '/topics/programming-fundamentals/development-steps', label: 'Software Development Steps' },
        { href: '/topics/programming-fundamentals/development-methodologies-exam', label: 'Exam Questions' }
      ]
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      defaultOpen: true,
      links: [
        { href: '/topics/programming-fundamentals/algorithm-design', label: 'Algorithm Design' },
        { href: '/topics/programming-fundamentals/desk-checking', label: 'Desk Checking' },
        { href: '/topics/programming-fundamentals/error-types', label: 'Error Types' },
        { href: '/topics/programming-fundamentals/debugging-tools', label: 'Debugging Tools' },
        { href: '/topics/programming-fundamentals/pseudocode-questions', label: 'Pseudocode Questions' },
        { href: '/topics/programming-fundamentals/algorithms-exam', label: 'Exam Questions' }
      ]
    },
    {
      id: 'code-structure',
      title: 'Python Programming',
      defaultOpen: true,
      links: [
        { href: '/topics/programming-fundamentals/procedures-functions', label: 'Procedures & Functions' },
        { href: '/topics/programming-fundamentals/developing-code-solutions', label: 'Developing Code Solutions' },
        { href: '/topics/programming-fundamentals/python-data-types', label: 'Python Data Types' },
        { href: '/topics/programming-fundamentals/python-methods', label: 'Python Methods Reference' },
        { href: '/topics/programming-fundamentals/python-practice-problems', label: 'Python Practice Problems' },
        { href: '/topics/programming-fundamentals/python-programming-exam', label: 'Exam Questions' }
      ]
    },
    {
      id: 'data-management',
      title: 'Data',
      defaultOpen: true,
      links: [
        { href: '/topics/programming-fundamentals/data-representation', label: 'Data Representation' },
        { href: '/topics/programming-fundamentals/data-dictionaries', label: 'Data Dictionaries' },
        { href: '/topics/programming-fundamentals/data-structures', label: 'Data Structures' },
        { href: '/topics/programming-fundamentals/data-exam', label: 'Exam Questions' }
      ]
    },
    {
      id: 'development-tools',
      title: 'Development Tools',
      defaultOpen: true,
      links: [
        { href: '/topics/programming-fundamentals/collaboration-tools', label: 'Collaboration Tools' }
      ]
    },
    {
      id: 'reference',
      title: 'Reference',
      defaultOpen: true,
      links: [
        { href: '/topics/programming-fundamentals/glossary', label: 'Glossary' },
        { href: '/nesa-keywords', label: 'NESA Keywords' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const isLinkActive = (href: string): boolean => {
    return currentPage === href || currentSection === href;
  };

  return (
    <nav className="space-y-2">
      <h3 className="font-semibold text-gray-900 mb-2">Contents</h3>
      
      {navSections.map((section) => (
        <div key={section.id} className="mb-4">
          <button 
            className="flex items-center justify-between w-full text-sm font-medium text-gray-800 hover:text-gray-900 py-1 text-left"
            onClick={() => toggleSection(section.id)}
          >
            <span>{section.title}</span>
            {openSections.has(section.id) ? (
              <ChevronDown className="w-3 h-3 text-gray-500 transition-transform" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-500 transition-transform" />
            )}
          </button>
          
          {openSections.has(section.id) && (
            <div className="ml-6 mt-1 space-y-1">
              {section.links.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`block text-sm py-1 pl-2 border-l-2 transition-colors ${
                    isLinkActive(link.href)
                      ? 'text-blue-800 border-blue-500 bg-blue-50 font-medium'
                      : 'text-blue-600 hover:text-blue-800 border-transparent hover:border-blue-300'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="border-t my-4"></div>
      
      <div className="text-xs text-gray-500">
        <p className="mb-2">Study Resources:</p>
        <p className="text-gray-400">Additional resources coming soon</p>
      </div>
    </nav>
  );
};

export default ProgrammingFundamentalsNav;
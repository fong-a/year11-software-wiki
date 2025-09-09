import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Base path for GitHub Pages deployment
const BASE_PATH = '/year11-software-wiki';

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

interface OOPNavProps {
  currentPage?: string;
  currentSection?: string;
}

export const OOPNav: React.FC<OOPNavProps> = ({
  currentPage = '',
  currentSection = ''
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set([
    'fundamentals',
    'core-concepts',
    'advanced-topics',
    'practice'
  ]));

  const navSections: NavSection[] = [
    {
      id: 'fundamentals',
      title: 'OOP Fundamentals',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/object-oriented-programming/fundamentals`, label: 'Classes & Objects' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/encapsulation`, label: 'Encapsulation' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/benefits`, label: 'Benefits of OOP' }
      ]
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/object-oriented-programming/inheritance`, label: 'Inheritance' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/polymorphism`, label: 'Polymorphism' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/abstraction`, label: 'Abstraction' }
      ]
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Topics',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/object-oriented-programming/object-relationships`, label: 'Object Relationships' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/design-patterns`, label: 'Design Patterns' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/uml-modelling`, label: 'UML & Modelling' },
        { href: `${BASE_PATH}/topics/programming-fundamentals/glossary`, label: 'Glossary' },
        { href: `${BASE_PATH}/nesa-keywords`, label: 'NESA Keywords' }
      ]
    },
    {
      id: 'practice',
      title: 'Practice & Assessment',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/object-oriented-programming/examples-gallery`, label: 'Examples Gallery' },
        { href: `${BASE_PATH}/topics/object-oriented-programming/exam-questions`, label: 'Exam Questions' }
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
      <div className="mb-4">
        <a href={`${BASE_PATH}/topics/object-oriented-programming`} className="block">
          <h3 className="font-bold text-purple-800 mb-2 text-lg">Object-Oriented Programming</h3>
        </a>
        <p className="text-xs text-gray-500">Classes, objects, inheritance, and design</p>
      </div>
      
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
                      ? 'text-purple-800 border-purple-500 bg-purple-50 font-medium'
                      : 'text-purple-600 hover:text-purple-800 border-transparent hover:border-purple-300'
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
      </div>
    </nav>
  );
};

export default OOPNav;
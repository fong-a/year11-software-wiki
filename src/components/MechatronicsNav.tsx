import React, { useState, useEffect } from 'react';
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

interface MechatronicsNavProps {
  currentPage?: string;
  currentSection?: string;
}

export const MechatronicsNav: React.FC<MechatronicsNavProps> = ({
  currentPage = '',
  currentSection = ''
}) => {
  // On mobile, start with sections closed to save space
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // On desktop, open all sections by default
      // On mobile, keep them closed initially
      if (!mobile) {
        setOpenSections(new Set([
          'fundamentals',
          'systems', 
          'components',
          'circuits',
          'assessment',
          'reference'
        ]));
      } else {
        // On mobile, open the section containing the current page
        const currentSection = getCurrentSection(currentPage);
        if (currentSection) {
          setOpenSections(new Set([currentSection]));
        } else {
          // Default to opening assessment section so exam questions are visible
          setOpenSections(new Set(['assessment']));
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [currentPage]);

  const getCurrentSection = (page: string) => {
    if (page.includes('/definition') || page.includes('/applications') || page.includes('/safety')) return 'fundamentals';
    if (page.includes('/control-systems') || page.includes('/degrees-freedom')) return 'systems';
    if (page.includes('/sensors') || page.includes('/actuators') || page.includes('/processors')) return 'components';
    if (page.includes('/basic-circuits')) return 'circuits';
    if (page.includes('/exam-questions')) return 'assessment';
    return null;
  };

  const navSections: NavSection[] = [
    {
      id: 'fundamentals',
      title: 'Mechatronics Fundamentals',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/mechatronics/definition`, label: 'What is Mechatronics?' },
        { href: `${BASE_PATH}/topics/mechatronics/applications`, label: 'Industry Applications' },
        { href: `${BASE_PATH}/topics/mechatronics/safety`, label: 'Safety Benefits' }
      ]
    },
    {
      id: 'systems',
      title: 'Control Systems',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/mechatronics/control-systems`, label: 'Open vs Closed Loop' },
        { href: `${BASE_PATH}/topics/mechatronics/degrees-freedom`, label: 'Degrees of Freedom' }
      ]
    },
    {
      id: 'components',
      title: 'Hardware Components',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/mechatronics/sensors`, label: 'Sensors (Input)' },
        { href: `${BASE_PATH}/topics/mechatronics/actuators`, label: 'Actuators (Output)' },
        { href: `${BASE_PATH}/topics/mechatronics/processors`, label: 'Processors & Controllers' }
      ]
    },
    {
      id: 'circuits',
      title: 'Basic Circuits',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/mechatronics/basic-circuits`, label: 'Circuit Components' }
      ]
    },
    {
      id: 'assessment',
      title: 'Assessment',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/mechatronics/exam-questions`, label: 'Exam Questions' }
      ]
    },
    {
      id: 'reference',
      title: 'Reference',
      defaultOpen: true,
      links: [
        { href: `${BASE_PATH}/topics/programming-fundamentals/glossary`, label: 'Glossary' },
        { href: `${BASE_PATH}/nesa-keywords`, label: 'NESA Keywords' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        // On mobile, close other sections when opening a new one (accordion behavior)
        if (isMobile) {
          newSet.clear();
        }
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const isActive = (href: string) => {
    return currentPage === href;
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
                    isActive(link.href)
                      ? 'text-orange-800 border-orange-500 bg-orange-50 font-medium'
                      : 'text-orange-600 hover:text-orange-800 border-transparent hover:border-orange-300'
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
        <p className="text-gray-400">Interactive examples and assessments</p>
      </div>
    </nav>
  );
};

export default MechatronicsNav;
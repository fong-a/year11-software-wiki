import { useState, useEffect } from 'react';

// Base path for GitHub Pages deployment
const BASE_PATH = '/year11-software-wiki';

interface SearchResult {
  title: string;
  url: string;
  excerpt: string;
  category: string;
}

interface SearchComponentProps {
  className?: string;
}

interface SearchItem extends SearchResult {
  keywords: string[];
  synonyms?: string[];
}

const searchData: SearchItem[] = [
  // Programming Fundamentals - Main Topics
  {
    title: "Programming Fundamentals Glossary",
    url: `${BASE_PATH}/topics/programming-fundamentals/glossary`,
    excerpt: "Comprehensive dictionary of programming terms, definitions, and examples for software engineering",
    category: "Fundamentals",
    keywords: ["glossary", "dictionary", "definitions", "terms", "concepts", "vocabulary", "reference"],
    synonyms: ["definitions", "terminology", "dictionary", "reference"]
  },
  {
    title: "Development Methodologies Exam",
    url: `${BASE_PATH}/topics/programming-fundamentals/development-methodologies-exam`,
    excerpt: "NESA-style exam questions covering Agile, Waterfall, version control, and code reviews",
    category: "Exams",
    keywords: ["exam", "questions", "test", "assessment", "agile", "waterfall", "version control", "code reviews"],
    synonyms: ["test", "assessment", "quiz", "evaluation"]
  },
  {
    title: "Python Programming Exam", 
    url: `${BASE_PATH}/topics/programming-fundamentals/python-programming-exam`,
    excerpt: "Practice exam questions for Python programming, functions, loops, and data structures",
    category: "Exams",
    keywords: ["python", "exam", "programming", "functions", "loops", "arrays", "dictionaries", "coding"],
    synonyms: ["coding", "programming", "development", "scripting"]
  },
  {
    title: "Algorithms Exam",
    url: `${BASE_PATH}/topics/programming-fundamentals/algorithms-exam`, 
    excerpt: "Algorithm design, desk checking, trace tables, and pseudocode practice questions",
    category: "Exams",
    keywords: ["algorithms", "exam", "desk checking", "trace tables", "pseudocode", "flowcharts"],
    synonyms: ["logic", "problem solving", "step-by-step"]
  },
  {
    title: "Data Exam",
    url: `${BASE_PATH}/topics/programming-fundamentals/data-exam`,
    excerpt: "Data representation, binary conversion, hexadecimal, and data dictionary questions",
    category: "Exams", 
    keywords: ["data", "binary", "hexadecimal", "conversion", "ascii", "unicode", "representation"],
    synonyms: ["numbers", "encoding", "formats", "storage"]
  },
  {
    title: "Development Tools Exam",
    url: `${BASE_PATH}/topics/programming-fundamentals/development-tools-exam`,
    excerpt: "Version control systems, IDEs, debuggers, and collaborative development tools",
    category: "Exams",
    keywords: ["tools", "ide", "version control", "git", "debugger", "development environment"],
    synonyms: ["software", "utilities", "applications", "programs"]
  },
  {
    title: "Pseudocode Practice Questions",
    url: `${BASE_PATH}/topics/programming-fundamentals/pseudocode-questions`,
    excerpt: "Practice writing pseudocode with NESA conventions, functions, arrays, and algorithms",
    category: "Practice",
    keywords: ["pseudocode", "practice", "algorithm", "functions", "arrays", "nesa", "conventions"],
    synonyms: ["fake code", "planning", "design", "logic"]
  },
  {
    title: "Python Practice Problems",
    url: `${BASE_PATH}/topics/programming-fundamentals/python-practice-problems`,
    excerpt: "Hands-on Python exercises covering conditionals, loops, functions, and object-oriented programming",
    category: "Practice",
    keywords: ["python", "practice", "exercises", "coding", "conditionals", "loops", "functions", "oop"],
    synonyms: ["exercises", "challenges", "problems", "tasks"]
  },

  // Development Methodologies
  {
    title: "Agile vs Waterfall vs WAGILE",
    url: `${BASE_PATH}/topics/programming-fundamentals/methodologies`,
    excerpt: "Compare Agile iterative development, Waterfall sequential approach, and WAGILE hybrid methodology",
    category: "Methodologies",
    keywords: ["agile", "waterfall", "wagile", "methodology", "iterative", "sequential", "sprints", "phases"],
    synonyms: ["approach", "process", "framework", "strategy"]
  },
  {
    title: "Software Development Steps",
    url: `${BASE_PATH}/topics/programming-fundamentals/development-steps`,
    excerpt: "Interactive story-driven journey through requirements, design, development, testing, and deployment",
    category: "Methodologies",
    keywords: ["development", "steps", "requirements", "design", "testing", "deployment", "sdlc"],
    synonyms: ["process", "lifecycle", "phases", "stages"]
  },

  // Testing and Debugging
  {
    title: "Desk Checking",
    url: `${BASE_PATH}/topics/programming-fundamentals/desk-checking`,
    excerpt: "Manual code execution technique for tracing algorithm logic step by step with trace tables",
    category: "Testing",
    keywords: ["desk checking", "trace tables", "manual testing", "algorithm tracing", "debugging"],
    synonyms: ["manual execution", "step through", "trace", "verify"]
  },
  {
    title: "Error Types",
    url: `${BASE_PATH}/topics/programming-fundamentals/error-types`,
    excerpt: "Syntax, runtime, and logic errors with prevention techniques and interactive examples",
    category: "Testing",
    keywords: ["errors", "bugs", "syntax error", "runtime error", "logic error", "debugging"],
    synonyms: ["mistakes", "issues", "problems", "faults"]
  },
  {
    title: "Debugging Tools",
    url: `${BASE_PATH}/topics/programming-fundamentals/debugging-tools`,
    excerpt: "Systematic debugging approaches, breakpoints, variable watching, and tool categories",
    category: "Testing",
    keywords: ["debugging", "breakpoints", "debugger", "troubleshooting", "bug fixes"],
    synonyms: ["troubleshooting", "fixing", "finding errors", "diagnosis"]
  },

  // Code Structure
  {
    title: "Procedures and Functions",
    url: `${BASE_PATH}/topics/programming-fundamentals/procedures-functions`,
    excerpt: "Modular programming with parameter passing, return values, and code reusability",
    category: "Code Structure",
    keywords: ["functions", "procedures", "parameters", "return values", "modular programming"],
    synonyms: ["methods", "subroutines", "modules", "blocks"]
  },
  {
    title: "Developing Code Solutions",
    url: `${BASE_PATH}/topics/programming-fundamentals/developing-code-solutions`,
    excerpt: "Five-phase development process: understand, plan, implement, test, deploy",
    category: "Code Structure",
    keywords: ["development process", "coding", "implementation", "planning", "testing"],
    synonyms: ["programming", "building", "creating", "constructing"]
  },

  // Data Topics
  {
    title: "Data Representation",
    url: `${BASE_PATH}/topics/programming-fundamentals/data-representation`, 
    excerpt: "Binary, hexadecimal, decimal number systems and character encoding (ASCII, Unicode)",
    category: "Data",
    keywords: ["binary", "hexadecimal", "decimal", "ascii", "unicode", "number systems", "encoding"],
    synonyms: ["numbers", "base systems", "character codes", "formats"]
  },
  {
    title: "Data Dictionaries",
    url: `${BASE_PATH}/topics/programming-fundamentals/data-dictionaries`,
    excerpt: "Database field documentation, data types, constraints, and specification standards",
    category: "Data", 
    keywords: ["data dictionary", "database", "fields", "data types", "constraints", "documentation"],
    synonyms: ["schema", "specification", "structure", "definition"]
  },
  {
    title: "Data Structures",
    url: `${BASE_PATH}/topics/programming-fundamentals/data-structures`,
    excerpt: "Arrays, stacks (LIFO), queues (FIFO), trees, and their operations with visualizations",
    category: "Data",
    keywords: ["data structures", "arrays", "stacks", "queues", "trees", "lifo", "fifo"],
    synonyms: ["collections", "containers", "storage", "organization"]
  },

  // Development Tools
  {
    title: "Collaboration Tools",
    url: `${BASE_PATH}/topics/programming-fundamentals/collaboration-tools`,
    excerpt: "Git version control, GitHub, pull requests, branching, and team development workflows",
    category: "Development",
    keywords: ["git", "github", "version control", "pull requests", "branching", "collaboration"],
    synonyms: ["source control", "teamwork", "repositories", "commits"]
  },

  // Object-Oriented Programming
  {
    title: "OOP Fundamentals",
    url: `${BASE_PATH}/topics/object-oriented-programming/fundamentals`,
    excerpt: "Classes, objects, methods, attributes, and basic object-oriented programming concepts",
    category: "OOP",
    keywords: ["oop", "classes", "objects", "methods", "attributes", "encapsulation", "blueprint"],
    synonyms: ["object oriented", "class based", "instance", "properties"]
  },
  {
    title: "Inheritance",
    url: `${BASE_PATH}/topics/object-oriented-programming/inheritance`,
    excerpt: "Parent-child relationships, method overriding, super classes, and code reuse through inheritance", 
    category: "OOP",
    keywords: ["inheritance", "parent class", "child class", "super class", "override", "extend"],
    synonyms: ["extension", "derived", "base class", "subclass"]
  },
  {
    title: "Polymorphism",
    url: `${BASE_PATH}/topics/object-oriented-programming/polymorphism`,
    excerpt: "Method overriding, dynamic binding, and objects behaving differently based on their type",
    category: "OOP", 
    keywords: ["polymorphism", "method overriding", "dynamic binding", "multiple forms"],
    synonyms: ["many forms", "overriding", "different behavior"]
  },
  {
    title: "Abstraction",
    url: `${BASE_PATH}/topics/object-oriented-programming/abstraction`,
    excerpt: "Hiding implementation details, abstract classes, interfaces, and simplifying complex systems",
    category: "OOP",
    keywords: ["abstraction", "abstract classes", "interfaces", "hiding details", "simplification"],
    synonyms: ["simplify", "hide complexity", "interface", "contract"]
  },
  {
    title: "Benefits of OOP",
    url: `${BASE_PATH}/topics/object-oriented-programming/benefits`,
    excerpt: "Advantages of object-oriented programming: modularity, reusability, maintainability, and scalability",
    category: "OOP",
    keywords: ["oop benefits", "modularity", "reusability", "maintainability", "advantages"],
    synonyms: ["pros", "advantages", "positives", "strengths"]
  },
  {
    title: "Procedural vs OOP Comparison", 
    url: `${BASE_PATH}/topics/object-oriented-programming/procedural-vs-oop`,
    excerpt: "Interactive comparison of procedural and object-oriented programming with Python examples and toggles",
    category: "OOP",
    keywords: ["procedural", "oop comparison", "programming paradigms", "functions vs classes"],
    synonyms: ["structured vs object", "comparison", "differences", "approaches"]
  },
  {
    title: "OOP Exam Questions",
    url: `${BASE_PATH}/topics/object-oriented-programming/exam-questions`,
    excerpt: "Practice exam questions covering OOP principles, inheritance, polymorphism, and design patterns",
    category: "Exams",
    keywords: ["oop exam", "object oriented questions", "inheritance questions", "polymorphism exam"],
    synonyms: ["oop test", "object oriented assessment"]
  }
];

export default function SearchComponent({ className = "" }: SearchComponentProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Enhanced search function with scoring
  const searchItems = (query: string): SearchResult[] => {
    if (query.trim() === '') return [];
    
    const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
    
    const scoredResults = searchData.map(item => {
      let score = 0;
      
      // Score based on title matches (highest priority)
      queryWords.forEach(word => {
        if (item.title.toLowerCase().includes(word)) {
          score += item.title.toLowerCase() === word ? 100 : 50; // Exact match vs partial
        }
      });
      
      // Score based on keyword matches (high priority)
      queryWords.forEach(word => {
        item.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(word)) {
            score += keyword.toLowerCase() === word ? 40 : 20;
          }
        });
      });
      
      // Score based on synonym matches (medium priority)
      if (item.synonyms) {
        queryWords.forEach(word => {
          item.synonyms!.forEach(synonym => {
            if (synonym.toLowerCase().includes(word)) {
              score += synonym.toLowerCase() === word ? 30 : 15;
            }
          });
        });
      }
      
      // Score based on category matches (medium priority)
      queryWords.forEach(word => {
        if (item.category.toLowerCase().includes(word)) {
          score += item.category.toLowerCase() === word ? 25 : 10;
        }
      });
      
      // Score based on excerpt matches (lower priority)
      queryWords.forEach(word => {
        if (item.excerpt.toLowerCase().includes(word)) {
          score += 5;
        }
      });
      
      // Fuzzy matching for typos (very low priority)
      queryWords.forEach(word => {
        [...item.keywords, ...(item.synonyms || [])].forEach(keyword => {
          if (calculateSimilarity(word, keyword.toLowerCase()) > 0.8) {
            score += 3;
          }
        });
      });
      
      return { ...item, score };
    });
    
    // Filter items with score > 0 and sort by score (descending)
    return scoredResults
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8) // Limit to top 8 results
      .map(({ score, ...item }) => item); // Remove score from final results
  };

  // Simple string similarity function for fuzzy matching
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  // Levenshtein distance calculation for fuzzy matching
  const getEditDistance = (str1: string, str2: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  useEffect(() => {
    const results = searchItems(query);
    setResults(results);
    setIsOpen(results.length > 0);
    setSelectedIndex(-1);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          window.location.href = results[selectedIndex].url;
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultClick = (url: string) => {
    window.location.href = url;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fundamentals':
        return 'bg-emerald-100 text-emerald-800';
      case 'Methodologies':
        return 'bg-indigo-100 text-indigo-800';
      case 'Testing':
        return 'bg-red-100 text-red-800';
      case 'Data':
        return 'bg-blue-100 text-blue-800';
      case 'Development':
        return 'bg-green-100 text-green-800';
      case 'Code Structure':
        return 'bg-purple-100 text-purple-800';
      case 'OOP':
        return 'bg-orange-100 text-orange-800';
      case 'Exams':
        return 'bg-rose-100 text-rose-800';
      case 'Practice':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search programming topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={result.url}
              className={`p-2 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                index === selectedIndex ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleResultClick(result.url)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">
                    {result.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">
                    {result.excerpt}
                  </p>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${getCategoryColor(result.category)}`}>
                  {result.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query.trim() !== '' && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          <p className="text-gray-500 text-center">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
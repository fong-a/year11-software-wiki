import React from 'react';
import { BookOpen, Code, Cpu, Settings, Target, ArrowRight, ExternalLink, FileText } from 'lucide-react';

// Base path for GitHub Pages deployment
const BASE_PATH = '/year11-software-wiki';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  unit: string;
  unitColor: string;
  skills: Array<{
    skill: string;
    theoryUrl: string;
  }>;
  practiceUrl: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const roadmapSteps: RoadmapStep[] = [
  // Programming Fundamentals Unit
  {
    id: 'development-theory',
    title: 'Development Theory',
    description: 'Software development methodologies and collaboration tools',
    unit: 'Unit 1: Programming Fundamentals',
    unitColor: 'text-blue-600',
    skills: [
      { skill: 'Agile vs Waterfall methodologies', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/methodologies` },
      { skill: 'Software development lifecycle', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/development-steps` },
      { skill: 'Version control with Git', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/collaboration-tools` },
      { skill: 'Development tools and IDEs', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/development-tools` }
    ],
    practiceUrl: `${BASE_PATH}/topics/programming-fundamentals/development-methodologies-exam`,
    icon: BookOpen,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'algorithm-design',
    title: 'Algorithm Design',
    description: 'Structured problem-solving with pseudocode and flowcharts',
    unit: 'Unit 1: Programming Fundamentals',
    unitColor: 'text-blue-600',
    skills: [
      { skill: 'Write step-by-step algorithms', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/algorithm-design` },
      { skill: 'Use pseudocode effectively', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/pseudocode-questions` },
      { skill: 'Design loops and conditionals', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/algorithm-design` },
      { skill: 'Handle input/output operations', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/algorithm-design` }
    ],
    practiceUrl: `${BASE_PATH}/topics/programming-fundamentals/algorithms-exam`,
    icon: Target,
    color: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    description: 'Master Python syntax, data types, and control structures',
    unit: 'Unit 1: Programming Fundamentals',
    unitColor: 'text-blue-600',
    skills: [
      { skill: 'Python data types and variables', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/python-data-types` },
      { skill: 'Conditionals and loops', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/python-practice-problems` },
      { skill: 'Functions and parameters', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/procedures-functions` },
      { skill: 'Error handling and debugging', theoryUrl: `${BASE_PATH}/topics/programming-fundamentals/error-types` }
    ],
    practiceUrl: `${BASE_PATH}/topics/programming-fundamentals/python-programming-exam`,
    icon: Code,
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200'
  },
  
  // Object-Oriented Programming Unit
  {
    id: 'oop-fundamentals',
    title: 'OOP Fundamentals',
    description: 'Classes, objects, attributes, and methods',
    unit: 'Unit 2: Object-Oriented Programming',
    unitColor: 'text-purple-600',
    skills: [
      { skill: 'Define classes with __init__', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/fundamentals` },
      { skill: 'Create instance attributes', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/fundamentals` },
      { skill: 'Write and call methods', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/fundamentals` },
      { skill: 'Instantiate and use objects', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/fundamentals` }
    ],
    practiceUrl: `${BASE_PATH}/topics/object-oriented-programming/exam-questions`,
    icon: Settings,
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  },
  {
    id: 'oop-principles',
    title: 'OOP Principles',
    description: 'Encapsulation, inheritance, polymorphism, and abstraction',
    unit: 'Unit 2: Object-Oriented Programming',
    unitColor: 'text-purple-600',
    skills: [
      { skill: 'Encapsulation and data hiding', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/encapsulation` },
      { skill: 'Inheritance and class hierarchies', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/inheritance` },
      { skill: 'Polymorphism in practice', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/polymorphism` },
      { skill: 'Abstraction concepts', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/abstraction` }
    ],
    practiceUrl: `${BASE_PATH}/topics/object-oriented-programming/exam-questions`,
    icon: Cpu,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'oop-design',
    title: 'OOP Design & Benefits',
    description: 'Advantages of OOP and real-world applications',
    unit: 'Unit 2: Object-Oriented Programming',
    unitColor: 'text-purple-600',
    skills: [
      { skill: 'Code reusability and modularity', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/benefits` },
      { skill: 'Maintainability advantages', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/benefits` },
      { skill: 'UML and class diagrams', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/uml-modelling` },
      { skill: 'OOP vs procedural programming', theoryUrl: `${BASE_PATH}/topics/object-oriented-programming/benefits` }
    ],
    practiceUrl: `${BASE_PATH}/topics/object-oriented-programming/exam-questions`,
    icon: Target,
    color: 'teal',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-800',
    borderColor: 'border-teal-200'
  },

  // Mechatronics Systems Unit  
  {
    id: 'mechatronics-components',
    title: 'System Components',
    description: 'Sensors, actuators, and processors in mechatronic systems',
    unit: 'Unit 3: Mechatronics Systems',
    unitColor: 'text-orange-600',
    skills: [
      { skill: 'Identify input sensors', theoryUrl: `${BASE_PATH}/topics/mechatronics/sensors` },
      { skill: 'Understand output actuators', theoryUrl: `${BASE_PATH}/topics/mechatronics/actuators` },
      { skill: 'Processors and controllers', theoryUrl: `${BASE_PATH}/topics/mechatronics/processors` },
      { skill: 'System integration principles', theoryUrl: `${BASE_PATH}/topics/mechatronics/definition` }
    ],
    practiceUrl: `${BASE_PATH}/topics/mechatronics/exam-questions`,
    icon: Settings,
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200'
  },
  {
    id: 'control-systems',
    title: 'Control Systems',
    description: 'Open/closed loop systems and degrees of freedom',
    unit: 'Unit 3: Mechatronics Systems',
    unitColor: 'text-orange-600',
    skills: [
      { skill: 'Open vs closed loop control', theoryUrl: `${BASE_PATH}/topics/mechatronics/control-systems` },
      { skill: 'Feedback mechanisms', theoryUrl: `${BASE_PATH}/topics/mechatronics/control-systems` },
      { skill: 'Degrees of freedom analysis', theoryUrl: `${BASE_PATH}/topics/mechatronics/degrees-freedom` },
      { skill: 'Real-world applications', theoryUrl: `${BASE_PATH}/topics/mechatronics/applications` }
    ],
    practiceUrl: `${BASE_PATH}/topics/mechatronics/exam-questions`,
    icon: Target,
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-200'
  },
  {
    id: 'basic-circuits',
    title: 'Basic Circuits',
    description: 'Electrical components, wiring diagrams, and circuit analysis',
    unit: 'Unit 3: Mechatronics Systems',
    unitColor: 'text-orange-600',
    skills: [
      { skill: 'Circuit component symbols', theoryUrl: `${BASE_PATH}/topics/mechatronics/basic-circuits` },
      { skill: 'Read wiring diagrams', theoryUrl: `${BASE_PATH}/topics/mechatronics/basic-circuits` },
      { skill: 'Series vs parallel circuits', theoryUrl: `${BASE_PATH}/topics/mechatronics/basic-circuits` },
      { skill: 'Safety and troubleshooting', theoryUrl: `${BASE_PATH}/topics/mechatronics/safety` }
    ],
    practiceUrl: `${BASE_PATH}/topics/mechatronics/exam-questions`,
    icon: Cpu,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200'
  }
];

const StudyRoadmap: React.FC = () => {
  const getTimelineColor = (stepColor: string) => {
    const colorMap: { [key: string]: string } = {
      'indigo': 'bg-indigo-500',
      'blue': 'bg-blue-500', 
      'green': 'bg-green-500',
      'purple': 'bg-purple-500',
      'teal': 'bg-teal-500',
      'orange': 'bg-orange-500',
      'red': 'bg-red-500',
      'yellow': 'bg-yellow-500'
    };
    return colorMap[stepColor] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Year 11 Software Engineering Study Roadmap</h2>
        <p className="text-gray-600 mb-6">
          Master all three core units: Programming Fundamentals, Object-Oriented Programming, and Mechatronics Systems
        </p>
      </div>

      {/* Horizontal Scrollable Roadmap */}
      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-4 min-w-max px-2">
          {roadmapSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex-shrink-0">
                <div className={`w-72 ${step.bgColor} ${step.borderColor} border-2 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200`}>
                  {/* Unit badge */}
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${step.unitColor} bg-gray-100`}>
                    {step.unit}
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${step.bgColor} ${step.borderColor} border`}>
                      <step.icon className={`w-4 h-4 ${step.textColor}`} />
                    </div>
                    <h4 className={`text-lg font-semibold ${step.textColor}`}>{step.title}</h4>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                  
                  {/* Skills */}
                  <div className="mb-4">
                    <h5 className="text-xs font-semibold text-gray-700 mb-2">Key Topics:</h5>
                    <div className="space-y-1">
                      {step.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="text-xs">
                          <a href={skill.theoryUrl} className={`${step.textColor} hover:underline transition-colors`}>
                            • {skill.skill}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Practice link */}
                  <a
                    href={step.practiceUrl}
                    className="inline-flex items-center text-xs font-medium text-green-600 hover:text-green-800 transition-colors"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Practice Questions
                  </a>
                </div>
              </div>
              {index < roadmapSteps.length - 1 && (
                <div className="flex-shrink-0 flex items-center pt-8">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Unit Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Programming Fundamentals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-sm text-gray-600">Object-Oriented Programming</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm text-gray-600">Mechatronics Systems</span>
        </div>
      </div>

      {/* Quick Access Links */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href={`${BASE_PATH}/topics/programming-fundamentals/glossary`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">Glossary</div>
              <div className="text-sm text-gray-600">Key terms and definitions</div>
            </div>
          </a>
          <a href={`${BASE_PATH}/nesa-keywords`} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Target className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">NESA Keywords</div>
              <div className="text-sm text-gray-600">Exam command words</div>
            </div>
          </a>
          <a href={BASE_PATH} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Code className="w-5 h-5 text-purple-600" />
            <div>
              <div className="font-medium text-gray-900">All Topics</div>
              <div className="text-sm text-gray-600">Browse all content</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudyRoadmap;
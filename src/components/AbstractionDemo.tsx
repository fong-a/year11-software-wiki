import React, { useState } from 'react';
import { Eye, EyeOff, Layers, ChevronDown, ChevronRight, Car, Wrench } from 'lucide-react';

interface DetailLevel {
  id: string;
  name: string;
  description: string;
  details: string[];
  essential: boolean;
}

interface AbstractionDemoProps {
  title?: string;
}

export const AbstractionDemo: React.FC<AbstractionDemoProps> = ({
  title = "Abstraction Interactive Demo"
}) => {
  const [abstractionLevel, setAbstractionLevel] = useState(3);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['essential']));
  const [selectedExample, setSelectedExample] = useState<'car' | 'student'>('car');

  const carDetails: DetailLevel[] = [
    {
      id: 'essential',
      name: 'Essential Interface (User View)',
      description: 'What a driver needs to know',
      essential: true,
      details: [
        'start() - Turn on the car',
        'stop() - Turn off the car',
        'accelerate() - Make car go faster',
        'brake() - Make car slow down',
        'steer(direction) - Change direction'
      ]
    },
    {
      id: 'mechanical',
      name: 'Mechanical Systems',
      description: 'How the car works mechanically',
      essential: false,
      details: [
        'Engine combustion cycles',
        'Transmission gear ratios',
        'Brake pad friction coefficients',
        'Steering rack and pinion system',
        'Fuel injection timing'
      ]
    },
    {
      id: 'electronic',
      name: 'Electronic Systems',
      description: 'Digital control systems',
      essential: false,
      details: [
        'Engine control unit (ECU)',
        'Anti-lock braking system (ABS)',
        'Electronic stability control',
        'Fuel management sensors',
        'Diagnostic error codes'
      ]
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing Details',
      description: 'How the car is built',
      essential: false,
      details: [
        'Metal stamping processes',
        'Paint application layers',
        'Assembly line sequences',
        'Quality control checkpoints',
        'Parts supplier specifications'
      ]
    }
  ];

  const studentDetails: DetailLevel[] = [
    {
      id: 'essential',
      name: 'Essential Interface (Public Methods)',
      description: 'What other classes need to know',
      essential: true,
      details: [
        'getName() - Get student name',
        'getGrade() - Get current grade',
        'enrollCourse(course) - Enroll in course',
        'submitAssignment(work) - Submit work',
        'getTranscript() - Get academic record'
      ]
    },
    {
      id: 'internal',
      name: 'Internal State Management',
      description: 'Private data and calculations',
      essential: false,
      details: [
        'Calculate GPA from raw scores',
        'Track attendance records',
        'Manage course prerequisites',
        'Store assignment submissions',
        'Update progress tracking'
      ]
    },
    {
      id: 'persistence',
      name: 'Data Persistence',
      description: 'How data is stored',
      essential: false,
      details: [
        'Database connection handling',
        'SQL query optimization',
        'Data validation rules',
        'Backup and recovery',
        'Transaction management'
      ]
    },
    {
      id: 'system',
      name: 'System Integration',
      description: 'Integration with other systems',
      essential: false,
      details: [
        'Authentication protocols',
        'Network communication',
        'Error handling and logging',
        'Performance monitoring',
        'Security encryption'
      ]
    }
  ];

  const currentDetails = selectedExample === 'car' ? carDetails : studentDetails;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getVisibilityByLevel = (level: number): DetailLevel[] => {
    switch (level) {
      case 1:
        return currentDetails.filter(detail => detail.essential);
      case 2:
        return currentDetails.slice(0, 2);
      case 3:
        return currentDetails.slice(0, 3);
      case 4:
        return currentDetails;
      default:
        return currentDetails.filter(detail => detail.essential);
    }
  };

  const visibleDetails = getVisibilityByLevel(abstractionLevel);

  const getAbstractionDescription = (level: number): string => {
    const descriptions = {
      1: 'Highest abstraction - Only essential interface visible',
      2: 'High abstraction - Core functionality visible',
      3: 'Medium abstraction - Some implementation details visible',
      4: 'Lowest abstraction - All implementation details visible'
    };
    return descriptions[level as keyof typeof descriptions];
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Layers className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Level {abstractionLevel}/4
          </span>
        </div>
      </div>

      {/* Concept Introduction */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-800 mb-2">Understanding Abstraction</h4>
        <p className="text-blue-700 text-sm">
          Abstraction means hiding complex implementation details while showing only the essential features. 
          Like driving a car - you don't need to know how the engine works, just how to use the steering wheel and pedals.
        </p>
      </div>

      {/* Example Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Choose Example:</h4>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedExample('car')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              selectedExample === 'car'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Car className="w-4 h-4 mr-2" />
            Car System
          </button>
          <button
            onClick={() => setSelectedExample('student')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              selectedExample === 'student'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Wrench className="w-4 h-4 mr-2" />
            Student Class
          </button>
        </div>
      </div>

      {/* Abstraction Level Controller */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Abstraction Level</h4>
          <span className="text-sm text-gray-600">
            {getAbstractionDescription(abstractionLevel)}
          </span>
        </div>
        
        <div className="space-y-3">
          <input
            type="range"
            min="1"
            max="4"
            value={abstractionLevel}
            onChange={(e) => setAbstractionLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>Highest<br/>Abstraction</span>
            <span>High</span>
            <span>Medium</span>
            <span>Lowest<br/>Abstraction</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(level => (
            <button
              key={level}
              onClick={() => setAbstractionLevel(level)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                abstractionLevel === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Level {level}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Sections */}
      <div className="space-y-4 mb-6">
        <h4 className="font-semibold">
          {selectedExample === 'car' ? 'Car System Details' : 'Student Class Details'}
        </h4>
        
        {visibleDetails.map((detail, index) => (
          <div 
            key={detail.id}
            className={`border-2 rounded-lg transition-all duration-500 ${
              detail.essential 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 bg-gray-50'
            } ${abstractionLevel < index + 1 ? 'opacity-50' : 'opacity-100'}`}
          >
            <button
              onClick={() => toggleSection(detail.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-opacity-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${
                  detail.essential ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div>
                  <h5 className="font-semibold">{detail.name}</h5>
                  <p className="text-sm text-gray-600">{detail.description}</p>
                </div>
              </div>
              {expandedSections.has(detail.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has(detail.id) && (
              <div className="px-4 pb-4">
                <div className="bg-white p-3 rounded border">
                  <ul className="space-y-2">
                    {detail.details.map((item, itemIndex) => (
                      <li 
                        key={itemIndex}
                        className="flex items-start text-sm"
                      >
                        <span className={`mr-2 mt-1 ${
                          detail.essential ? 'text-green-600' : 'text-gray-500'
                        }`}>•</span>
                        <span className="font-mono text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Hidden Sections Indicator */}
        {currentDetails.length > visibleDetails.length && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-100 opacity-50">
            <EyeOff className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">
              {currentDetails.length - visibleDetails.length} implementation details hidden by abstraction
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Increase abstraction level to reveal more details
            </p>
          </div>
        )}
      </div>

      {/* Benefits Section */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-800 mb-3">Benefits of Abstraction</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-green-700 mb-2">For Users:</h5>
            <ul className="space-y-1 text-green-600">
              <li className="flex items-start">
                <Eye className="w-4 h-4 mr-1 mt-0.5" />
                <span>Simpler interface to learn and use</span>
              </li>
              <li className="flex items-start">
                <Eye className="w-4 h-4 mr-1 mt-0.5" />
                <span>Focus on what matters for their task</span>
              </li>
              <li className="flex items-start">
                <Eye className="w-4 h-4 mr-1 mt-0.5" />
                <span>Less cognitive overhead</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-green-700 mb-2">For Developers:</h5>
            <ul className="space-y-1 text-green-600">
              <li className="flex items-start">
                <Wrench className="w-4 h-4 mr-1 mt-0.5" />
                <span>Can change implementation without affecting users</span>
              </li>
              <li className="flex items-start">
                <Wrench className="w-4 h-4 mr-1 mt-0.5" />
                <span>Easier to maintain and debug</span>
              </li>
              <li className="flex items-start">
                <Wrench className="w-4 h-4 mr-1 mt-0.5" />
                <span>Promotes code reusability</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-3">Abstraction in Code</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-amber-700 mb-2">✅ Good Abstraction</h5>
            <pre className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
              <code>{selectedExample === 'car' ? 
`// Simple, clear interface
car.start()
car.accelerate()
car.brake()
car.stop()

// User doesn't need to know:
// - Engine timing
// - Fuel injection details
// - Brake hydraulics` :
`// Clean public interface
student.enrollCourse("Math")
grade = student.getGrade()
student.submitAssignment(work)

// User doesn't need to know:
// - Database queries
// - GPA calculations
// - Internal validation`}</code>
            </pre>
          </div>
          <div>
            <h5 className="font-semibold text-amber-700 mb-2">❌ Poor Abstraction</h5>
            <pre className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm overflow-x-auto">
              <code>{selectedExample === 'car' ? 
`// Too much detail exposed
car.igniteSparkPlug(1)
car.injectFuel(0.5ml)
car.rotateEngine(720°)
car.adjustThrottle(15%)

// User has to manage
// complex implementation` :
`// Internal details exposed
student.connectDatabase()
student.validateCourseId("MATH101")
student.checkPrerequisites()
student.updateGPACalculation()

// User must handle
// implementation complexity`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractionDemo;
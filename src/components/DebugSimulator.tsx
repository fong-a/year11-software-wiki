import React, { useState } from 'react';
import { Bug, Play, Pause, StepForward, RotateCcw, Eye, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface DebugStep {
  line: number;
  code: string;
  variables: Record<string, any>;
  explanation: string;
  breakpoint?: boolean;
  error?: string;
}

interface BuggyCodeExample {
  id: string;
  title: string;
  description: string;
  bugType: 'logic' | 'runtime' | 'infinite-loop';
  code: string[];
  debugSteps: DebugStep[];
  fixedCode: string[];
  learningPoints: string[];
}

interface DebugSimulatorProps {
  title?: string;
}

export const DebugSimulator: React.FC<DebugSimulatorProps> = ({
  title = "Interactive Debug Simulator"
}) => {
  const [selectedExample, setSelectedExample] = useState<string>('off_by_one');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFixed, setShowFixed] = useState<boolean>(false);
  const [watchedVariables, setWatchedVariables] = useState<Set<string>>(new Set(['i', 'sum']));

  const buggyExamples: BuggyCodeExample[] = [
    {
      id: 'off_by_one',
      title: 'Off-by-One Error',
      description: 'Classic boundary error in loop conditions',
      bugType: 'logic',
      code: [
        'BEGIN',
        '  SET sum = 0',
        '  SET target = 10',
        '  FOR i = 0 TO target DO    // Bug: should be TO target-1',
        '    SET sum = sum + i',
        '    PRINT "Adding " + i + ", sum = " + sum',
        '  NEXT',
        '  PRINT "Final sum: " + sum',
        'END'
      ],
      debugSteps: [
        {
          line: 1,
          code: 'SET sum = 0',
          variables: { sum: 0, target: 10, i: undefined },
          explanation: 'Initialize sum to 0'
        },
        {
          line: 2,
          code: 'SET target = 10',
          variables: { sum: 0, target: 10, i: undefined },
          explanation: 'Set target value to 10'
        },
        {
          line: 3,
          code: 'FOR i = 0 TO target DO',
          variables: { sum: 0, target: 10, i: 0 },
          explanation: 'Start loop. Bug: loops 11 times instead of 10',
          breakpoint: true
        },
        {
          line: 4,
          code: 'SET sum = sum + i (0)',
          variables: { sum: 0, target: 10, i: 0 },
          explanation: 'Add i (0) to sum'
        },
        {
          line: 3,
          code: 'i = 1, condition: 1 <= 10',
          variables: { sum: 0, target: 10, i: 1 },
          explanation: 'Continue loop iteration 2'
        },
        {
          line: 4,
          code: 'SET sum = sum + i (1)',
          variables: { sum: 1, target: 10, i: 1 },
          explanation: 'Add i (1) to sum'
        },
        {
          line: 3,
          code: 'i = 10, condition: 10 <= 10',
          variables: { sum: 45, target: 10, i: 10 },
          explanation: 'Final iteration - this is the bug!',
          error: 'Should stop before i=10'
        },
        {
          line: 4,
          code: 'SET sum = sum + i (10)',
          variables: { sum: 55, target: 10, i: 10 },
          explanation: 'Bug: Adding extra iteration',
          error: 'Expected sum: 45, Actual: 55'
        }
      ],
      fixedCode: [
        'BEGIN',
        '  SET sum = 0',
        '  SET target = 10',
        '  FOR i = 0 TO target-1 DO    // Fixed: TO target-1',
        '    SET sum = sum + i',
        '    PRINT "Adding " + i + ", sum = " + sum',
        '  NEXT',
        '  PRINT "Final sum: " + sum',
        'END'
      ],
      learningPoints: [
        'Always check loop boundaries carefully',
        'For 0-indexed loops, use "< target" not "<= target"',
        'Test with small values to spot boundary errors',
        'Expected sum of 0-9 is 45, not 55'
      ]
    },
    {
      id: 'null_pointer',
      title: 'Null Reference Error',
      description: 'Attempting to use uninitialized variables',
      bugType: 'runtime',
      code: [
        'BEGIN',
        '  SET student',
        '  PRINT student.name    // Bug: student not initialized',
        '  SET student.age = 20',
        'END'
      ],
      debugSteps: [
        {
          line: 1,
          code: 'SET student',
          variables: { student: null },
          explanation: 'Declare student variable but don\'t initialize it'
        },
        {
          line: 2,
          code: 'PRINT student.name',
          variables: { student: null },
          explanation: 'Try to access property of null variable',
          error: 'Runtime Error: Cannot read property of null'
        }
      ],
      fixedCode: [
        'BEGIN',
        '  SET student = { name: "", age: 0 }    // Fixed: Initialize object',
        '  SET student.name = "John"',
        '  PRINT student.name',
        '  SET student.age = 20',
        'END'
      ],
      learningPoints: [
        'Always initialize variables before use',
        'Check for null/undefined before accessing properties',
        'Use proper object initialization syntax',
        'Add defensive checks in your code'
      ]
    },
    {
      id: 'infinite_loop',
      title: 'Infinite Loop',
      description: 'Loop condition that never becomes false',
      bugType: 'infinite-loop',
      code: [
        'BEGIN',
        '  SET count = 10',
        '  WHILE count > 0 DO',
        '    PRINT "Count: " + count',
        '    SET count = count + 1    // Bug: should be count - 1',
        '  ENDWHILE',
        '  PRINT "Done!"',
        'END'
      ],
      debugSteps: [
        {
          line: 1,
          code: 'SET count = 10',
          variables: { count: 10 },
          explanation: 'Initialize count to 10'
        },
        {
          line: 2,
          code: 'WHILE count > 0 (10 > 0 = TRUE)',
          variables: { count: 10 },
          explanation: 'Check condition: 10 > 0 is true'
        },
        {
          line: 4,
          code: 'SET count = count + 1',
          variables: { count: 11 },
          explanation: 'Bug: Incrementing instead of decrementing',
          error: 'This makes count larger, never reaching the exit condition'
        },
        {
          line: 2,
          code: 'WHILE count > 0 (11 > 0 = TRUE)',
          variables: { count: 11 },
          explanation: 'Condition still true - loop continues forever',
          error: 'Infinite loop detected!'
        }
      ],
      fixedCode: [
        'BEGIN',
        '  SET count = 10',
        '  WHILE count > 0 DO',
        '    PRINT "Count: " + count',
        '    SET count = count - 1    // Fixed: Decrement count',
        '  ENDWHILE',
        '  PRINT "Done!"',
        'END'
      ],
      learningPoints: [
        'Ensure loop variables move toward the exit condition',
        'Double-check increment/decrement operations',
        'Test loops with small iterations first',
        'Add safety counters for complex loops'
      ]
    }
  ];

  const currentExample = buggyExamples.find(ex => ex.id === selectedExample);
  const currentDebugStep = currentExample?.debugSteps[currentStep];

  const nextStep = () => {
    if (currentExample && currentStep < currentExample.debugSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const playSimulation = () => {
    if (!isPlaying && currentExample) {
      setIsPlaying(true);
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= currentExample.debugSteps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      setIsPlaying(false);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowFixed(false);
  };

  const toggleWatchVariable = (variable: string) => {
    setWatchedVariables(prev => {
      const newSet = new Set(prev);
      if (newSet.has(variable)) {
        newSet.delete(variable);
      } else {
        newSet.add(variable);
      }
      return newSet;
    });
  };

  const getBugTypeColor = (type: string) => {
    switch (type) {
      case 'logic': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'runtime': return 'bg-red-100 text-red-800 border-red-300';
      case 'infinite-loop': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Bug className="w-5 h-5 mr-2 text-red-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFixed(!showFixed)}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              showFixed 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showFixed ? <CheckCircle className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
            {showFixed ? 'Hide Fix' : 'Show Fix'}
          </button>
          <button
            onClick={reset}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-6 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
        <h4 className="font-semibold text-red-800 mb-2">Interactive Debugging</h4>
        <p className="text-red-700 text-sm">
          Step through buggy code to understand common programming errors. Watch variables change and see where things go wrong, then compare with the fixed version.
        </p>
      </div>

      {/* Example Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Choose Bug Example:</h4>
        <div className="grid md:grid-cols-3 gap-3">
          {buggyExamples.map((example) => (
            <button
              key={example.id}
              onClick={() => {
                setSelectedExample(example.id);
                reset();
              }}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedExample === example.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">{example.title}</h5>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${
                  selectedExample === example.id 
                    ? 'bg-white/20 text-white border-white/30'
                    : getBugTypeColor(example.bugType)
                }`}>
                  {example.bugType.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <p className={`text-xs ${
                selectedExample === example.id ? 'text-blue-100' : 'text-gray-600'
              }`}>
                {example.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Panel */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">
              {showFixed ? 'Fixed Code' : 'Buggy Code'}
            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={playSimulation}
                disabled={isPlaying}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                {isPlaying ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                {isPlaying ? 'Playing' : 'Play'}
              </button>
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                <StepForward className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={nextStep}
                disabled={!currentExample || currentStep >= currentExample.debugSteps.length - 1}
                className="p-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                <StepForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            {(showFixed ? currentExample?.fixedCode : currentExample?.code)?.map((line, index) => (
              <div
                key={index}
                className={`flex items-center py-1 px-2 rounded transition-colors ${
                  !showFixed && currentDebugStep && currentDebugStep.line - 1 === index
                    ? 'bg-blue-600 text-white'
                    : 'text-green-400'
                } ${
                  !showFixed && currentDebugStep?.error && currentDebugStep.line - 1 === index
                    ? 'bg-red-600 text-white'
                    : ''
                }`}
              >
                <span className="text-gray-500 mr-4 w-6 text-right">{index + 1}</span>
                <span className="flex-1">{line}</span>
                {!showFixed && currentDebugStep?.line - 1 === index && (
                  <div className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>

          {/* Debug Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {currentExample?.debugSteps.length || 0}
            </div>
            <div className="text-sm text-gray-600">
              {isPlaying && <span className="text-green-600">● Running</span>}
              {!isPlaying && currentStep < (currentExample?.debugSteps.length || 0) - 1 && (
                <span className="text-yellow-600">⏸ Paused</span>
              )}
              {!isPlaying && currentStep === (currentExample?.debugSteps.length || 0) - 1 && (
                <span className="text-red-600">■ Stopped</span>
              )}
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        <div>
          <h4 className="font-semibold mb-3">Debug Information</h4>
          
          {/* Current Step Info */}
          {currentDebugStep && !showFixed && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-blue-800">Current Step:</span>
                {currentDebugStep.error && (
                  <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                )}
              </div>
              <div className="text-sm text-blue-700 font-mono mb-2">
                {currentDebugStep.code}
              </div>
              <p className="text-sm text-blue-600">
                {currentDebugStep.explanation}
              </p>
              {currentDebugStep.error && (
                <div className="mt-2 p-2 bg-red-100 rounded border border-red-200">
                  <div className="flex items-center">
                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm font-medium text-red-800">Error:</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{currentDebugStep.error}</p>
                </div>
              )}
            </div>
          )}

          {/* Variables Watch */}
          <div className="mb-4">
            <h5 className="font-medium mb-2 flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Variable Watch
            </h5>
            <div className="bg-gray-50 rounded-lg p-3 border">
              {currentDebugStep && !showFixed ? (
                <div className="space-y-2">
                  {Object.entries(currentDebugStep.variables).map(([key, value]) => (
                    <div
                      key={key}
                      className={`flex items-center justify-between p-2 rounded transition-colors ${
                        watchedVariables.has(key) ? 'bg-blue-100' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleWatchVariable(key)}
                          className="mr-2 text-blue-600 hover:text-blue-800"
                        >
                          {watchedVariables.has(key) ? <Eye className="w-3 h-3" /> : <Eye className="w-3 h-3 opacity-50" />}
                        </button>
                        <span className="font-mono text-sm font-medium">{key}:</span>
                      </div>
                      <span className="font-mono text-sm">
                        {value === undefined ? 'undefined' : 
                         value === null ? 'null' :
                         typeof value === 'string' ? `"${value}"` : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm text-center py-4">
                  {showFixed ? 'Fixed code - no debugging needed' : 'No variables to watch'}
                </div>
              )}
            </div>
          </div>

          {/* Learning Points */}
          {currentExample && (
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h5 className="font-medium mb-2 text-green-800 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Learning Points
              </h5>
              <ul className="space-y-1">
                {currentExample.learningPoints.map((point, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugSimulator;
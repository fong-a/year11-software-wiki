import React, { useState } from 'react';
import { Code, FileText, Play, ChevronDown, ChevronRight } from 'lucide-react';

interface AlgorithmExample {
  id: string;
  title: string;
  category: string;
  difficulty: 'Simple' | 'Intermediate' | 'Advanced';
  description: string;
  pseudocode: string[];
  python: string[];
  expectedOutput: string[];
  explanation: string;
  keyLearning: string[];
}

interface AlgorithmExplorerProps {
  title?: string;
}

export const AlgorithmExplorer: React.FC<AlgorithmExplorerProps> = ({
  title = "Algorithm Explorer"
}) => {
  const [selectedExample, setSelectedExample] = useState<string>('sum_numbers');
  const [codeMode, setCodeMode] = useState<'pseudocode' | 'python'>('pseudocode');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Basic Algorithms']));

  const algorithms: AlgorithmExample[] = [
    {
      id: 'sum_numbers',
      title: 'Sum of Numbers',
      category: 'Basic Algorithms',
      difficulty: 'Simple',
      description: 'Calculate the sum of numbers from 1 to N',
      pseudocode: [
        'BEGIN',
        '  SET total = 0',
        '  SET num = 1',
        '  SET limit = 5',
        '  WHILE num <= limit DO',
        '    SET total = total + num',
        '    SET num = num + 1',
        '  ENDWHILE',
        '  PRINT "Sum is: " + total',
        'END'
      ],
      python: [
        'def sum_numbers(limit):',
        '    total = 0',
        '    num = 1',
        '    while num <= limit:',
        '        total = total + num',
        '        num = num + 1',
        '    return total',
        '',
        '# Example usage',
        'result = sum_numbers(5)',
        'print(f"Sum is: {result}")'
      ],
      expectedOutput: [
        'Sum is: 15',
        '',
        '# Step by step:',
        '# 1 + 2 + 3 + 4 + 5 = 15'
      ],
      explanation: 'This algorithm uses a while loop to add consecutive numbers. It starts with total=0 and adds each number from 1 to the limit.',
      keyLearning: [
        'Loop initialization with proper starting values',
        'Loop condition to control when to stop',
        'Accumulator pattern (total = total + num)',
        'Increment counter in each iteration'
      ]
    },
    {
      id: 'find_maximum',
      title: 'Find Maximum Value',
      category: 'Basic Algorithms',
      difficulty: 'Simple',
      description: 'Find the largest number in a list of values',
      pseudocode: [
        'BEGIN',
        '  SET numbers = [12, 7, 23, 9, 15]',
        '  SET max_value = numbers[0]',
        '  SET index = 1',
        '  WHILE index < length(numbers) DO',
        '    IF numbers[index] > max_value THEN',
        '      SET max_value = numbers[index]',
        '    ENDIF',
        '    SET index = index + 1',
        '  ENDWHILE',
        '  PRINT "Maximum value is: " + max_value',
        'END'
      ],
      python: [
        'def find_maximum(numbers):',
        '    max_value = numbers[0]',
        '    index = 1',
        '    while index < len(numbers):',
        '        if numbers[index] > max_value:',
        '            max_value = numbers[index]',
        '        index = index + 1',
        '    return max_value',
        '',
        '# Example usage',
        'numbers = [12, 7, 23, 9, 15]',
        'result = find_maximum(numbers)',
        'print(f"Maximum value is: {result}")'
      ],
      expectedOutput: [
        'Maximum value is: 23',
        '',
        '# Process:',
        '# Start with 12 as max',
        '# Compare: 7 < 12 (no change)',
        '# Compare: 23 > 12 (update max to 23)',
        '# Compare: 9 < 23 (no change)',
        '# Compare: 15 < 23 (no change)',
        '# Final result: 23'
      ],
      explanation: 'This algorithm finds the maximum by comparing each element with the current maximum and updating when a larger value is found.',
      keyLearning: [
        'Initialize with first element as starting comparison',
        'Use conditional statements for comparison',
        'Track the maximum value as you iterate',
        'Handle array/list indexing properly'
      ]
    },
    {
      id: 'factorial',
      title: 'Factorial Calculation',
      category: 'Mathematical Algorithms',
      difficulty: 'Intermediate',
      description: 'Calculate factorial (n!) using iteration',
      pseudocode: [
        'BEGIN',
        '  SET number = 5',
        '  SET factorial = 1',
        '  SET counter = 1',
        '  WHILE counter <= number DO',
        '    SET factorial = factorial * counter',
        '    SET counter = counter + 1',
        '  ENDWHILE',
        '  PRINT number + "! = " + factorial',
        'END'
      ],
      python: [
        'def calculate_factorial(number):',
        '    factorial = 1',
        '    counter = 1',
        '    while counter <= number:',
        '        factorial = factorial * counter',
        '        counter = counter + 1',
        '    return factorial',
        '',
        '# Example usage',
        'number = 5',
        'result = calculate_factorial(number)',
        'print(f"{number}! = {result}")'
      ],
      expectedOutput: [
        '5! = 120',
        '',
        '# Step by step:',
        '# 1 × 1 = 1',
        '# 1 × 2 = 2',
        '# 2 × 3 = 6',
        '# 6 × 4 = 24',
        '# 24 × 5 = 120'
      ],
      explanation: 'Factorial calculates the product of all positive integers up to n. This iterative approach multiplies each number in sequence.',
      keyLearning: [
        'Multiplicative accumulator pattern',
        'Initialize factorial to 1 (not 0)',
        'Loop from 1 to n inclusive',
        'Understand mathematical sequence calculations'
      ]
    },
    {
      id: 'bubble_sort',
      title: 'Bubble Sort',
      category: 'Sorting Algorithms',
      difficulty: 'Advanced',
      description: 'Sort an array by repeatedly comparing adjacent elements',
      pseudocode: [
        'BEGIN',
        '  SET numbers = [64, 34, 25, 12, 22]',
        '  SET n = length(numbers)',
        '  FOR i = 0 TO n-2 DO',
        '    FOR j = 0 TO n-2-i DO',
        '      IF numbers[j] > numbers[j+1] THEN',
        '        SET temp = numbers[j]',
        '        SET numbers[j] = numbers[j+1]',
        '        SET numbers[j+1] = temp',
        '      ENDIF',
        '    NEXT j',
        '  NEXT i',
        '  PRINT "Sorted array: " + numbers',
        'END'
      ],
      python: [
        'def bubble_sort(numbers):',
        '    n = len(numbers)',
        '    # Make a copy to avoid modifying original',
        '    arr = numbers.copy()',
        '    ',
        '    for i in range(n - 1):',
        '        for j in range(n - 1 - i):',
        '            if arr[j] > arr[j + 1]:',
        '                # Swap elements',
        '                temp = arr[j]',
        '                arr[j] = arr[j + 1]',
        '                arr[j + 1] = temp',
        '    return arr',
        '',
        '# Example usage',
        'numbers = [64, 34, 25, 12, 22]',
        'sorted_array = bubble_sort(numbers)',
        'print(f"Original: {numbers}")',
        'print(f"Sorted: {sorted_array}")'
      ],
      expectedOutput: [
        'Original: [64, 34, 25, 12, 22]',
        'Sorted: [12, 22, 25, 34, 64]',
        '',
        '# Bubble sort "bubbles" larger elements to the end',
        '# Each pass moves the largest unsorted element to its position'
      ],
      explanation: 'Bubble sort compares adjacent elements and swaps them if they are in the wrong order. This process repeats until the array is sorted.',
      keyLearning: [
        'Nested loops for comparison-based sorting',
        'Swapping technique using temporary variable',
        'Optimization: reduce inner loop size each iteration',
        'Understanding O(n²) time complexity'
      ]
    }
  ];

  const categories = Array.from(new Set(algorithms.map(alg => alg.category)));
  const currentAlgorithm = algorithms.find(alg => alg.id === selectedExample);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Simple': return 'bg-green-100 text-green-800 border-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <div className="flex bg-gray-200 rounded-md">
            <button
              onClick={() => setCodeMode('pseudocode')}
              className={`px-3 py-1 text-sm font-medium rounded-l-md transition-colors ${
                codeMode === 'pseudocode' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3 h-3 mr-1 inline" />
              Pseudocode
            </button>
            <button
              onClick={() => setCodeMode('python')}
              className={`px-3 py-1 text-sm font-medium rounded-r-md transition-colors ${
                codeMode === 'python' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-3 h-3 mr-1 inline" />
              Python
            </button>
          </div>
        </div>
      </div>

      {/* Algorithm Selector - Now Above Code */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Choose Algorithm to Explore</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {algorithms.map(algorithm => (
            <button
              key={algorithm.id}
              onClick={() => setSelectedExample(algorithm.id)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedExample === algorithm.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">{algorithm.title}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${
                  selectedExample === algorithm.id 
                    ? 'bg-white/20 text-white border-white/30'
                    : getDifficultyColor(algorithm.difficulty)
                }`}>
                  {algorithm.difficulty}
                </span>
              </div>
              <p className={`text-xs mb-1 ${
                selectedExample === algorithm.id ? 'text-blue-100' : 'text-gray-600'
              }`}>
                {algorithm.description}
              </p>
              <p className={`text-xs font-medium ${
                selectedExample === algorithm.id ? 'text-blue-200' : 'text-gray-500'
              }`}>
                {algorithm.category}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Code Display - Now Takes 2 Columns */}
        <div className="lg:col-span-2">
          {currentAlgorithm && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{currentAlgorithm.title}</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentAlgorithm.difficulty)}`}>
                  {currentAlgorithm.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{currentAlgorithm.description}</p>
              
              {/* Improved Code Block with Better Indentation */}
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 font-mono text-base mb-6">
                <div className="flex items-center mb-3 pb-2 border-b border-gray-300">
                  {codeMode === 'pseudocode' ? 
                    <FileText className="w-5 h-5 mr-2 text-blue-600" /> :
                    <Code className="w-5 h-5 mr-2 text-green-600" />
                  }
                  <span className="text-gray-700 font-semibold">
                    {codeMode === 'pseudocode' ? 'Pseudocode' : 'Python Implementation'}
                  </span>
                </div>
                <pre className="text-gray-900 leading-relaxed overflow-x-auto">
                  <code>{(codeMode === 'pseudocode' ? currentAlgorithm.pseudocode : currentAlgorithm.python).join('\n')}</code>
                </pre>
              </div>

              {/* Expected Output */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold mb-3 flex items-center text-green-800">
                  <Play className="w-4 h-4 mr-2" />
                  Expected Output
                </h5>
                <div className="bg-white rounded border p-3 font-mono text-sm">
                  {currentAlgorithm.expectedOutput.map((line, index) => (
                    <div key={index} className={`${
                      line.startsWith('#') ? 'text-green-600 italic' : 'text-gray-800'
                    }`}>
                      {line || <br />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Learning Content - Now Single Column */}
        <div className="lg:col-span-1">
          {currentAlgorithm && (
            <div className="space-y-6">
              {/* Explanation */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h5 className="font-semibold mb-3 text-blue-800">How it Works</h5>
                <p className="text-sm text-blue-700 leading-relaxed">{currentAlgorithm.explanation}</p>
              </div>

              {/* Key Learning Points */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h5 className="font-semibold mb-3 text-purple-800">Key Learning Points</h5>
                <ul className="space-y-2">
                  {currentAlgorithm.keyLearning.map((point, index) => (
                    <li key={index} className="text-sm text-purple-700 flex items-start">
                      <span className="text-purple-600 mr-2 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmExplorer;
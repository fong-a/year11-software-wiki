import React, { useState } from 'react';
import { Play, Square, RotateCcw, Code, Terminal, AlertCircle, CheckCircle } from 'lucide-react';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  pseudocode: string;
  python: string;
  expectedOutput: string[];
  category: 'function' | 'procedure' | 'algorithm';
}

interface CodePlaygroundProps {
  title?: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  title = "Interactive Code Playground"
}) => {
  const [selectedExample, setSelectedExample] = useState<string>('fibonacci');
  const [userCode, setUserCode] = useState<string>('');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // Remove custom tab functionality - only show examples
  const [selectedLanguage, setSelectedLanguage] = useState<'pseudocode' | 'python'>('pseudocode');

  const codeExamples: CodeExample[] = [
    {
      id: 'fibonacci',
      title: 'Fibonacci Function',
      description: 'Calculate Fibonacci sequence using recursion',
      category: 'function',
      pseudocode: `FUNCTION fibonacci(n)
  IF n <= 1 THEN
    RETURN n
  ELSE
    RETURN fibonacci(n-1) + fibonacci(n-2)
  ENDIF
ENDFUNCTION

BEGIN
  FOR i = 0 TO 10 DO
    PRINT "F(" + i + ") = " + fibonacci(i)
  NEXT
END`,
      python: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Main program
for i in range(11):
    print(f"F({i}) = {fibonacci(i)}")`,
      expectedOutput: [
        'F(0) = 0',
        'F(1) = 1', 
        'F(2) = 1',
        'F(3) = 2',
        'F(4) = 3',
        'F(5) = 5',
        'F(6) = 8',
        'F(7) = 13',
        'F(8) = 21',
        'F(9) = 34',
        'F(10) = 55'
      ]
    },
    {
      id: 'bubble_sort',
      title: 'Bubble Sort Algorithm',
      description: 'Sort an array using bubble sort algorithm',
      category: 'algorithm',
      pseudocode: `BEGIN
  SET numbers = [64, 34, 25, 12, 22, 11, 90]
  SET n = LENGTH(numbers)
  
  FOR i = 0 TO n-2 DO
    FOR j = 0 TO n-2-i DO
      IF numbers[j] > numbers[j+1] THEN
        SET temp = numbers[j]
        SET numbers[j] = numbers[j+1]
        SET numbers[j+1] = temp
        PRINT "Swapped: " + numbers[j+1] + " and " + numbers[j]
      ENDIF
    NEXT
  NEXT
  
  PRINT "Sorted array: " + numbers
END`,
      python: `numbers = [64, 34, 25, 12, 22, 11, 90]
n = len(numbers)

for i in range(n-1):
    for j in range(n-1-i):
        if numbers[j] > numbers[j+1]:
            temp = numbers[j]
            numbers[j] = numbers[j+1]
            numbers[j+1] = temp
            print(f"Swapped: {numbers[j+1]} and {numbers[j]}")

print(f"Sorted array: {numbers}")`,
      expectedOutput: [
        'Swapped: 64 and 34',
        'Swapped: 64 and 25',
        'Swapped: 64 and 12',
        'Swapped: 64 and 22',
        'Swapped: 64 and 11',
        'Swapped: 64 and 90',
        'Swapped: 34 and 25',
        'Final: [11, 12, 22, 25, 34, 64, 90]'
      ]
    },
    {
      id: 'grade_calculator',
      title: 'Grade Calculator Procedure',
      description: 'Calculate and display student grades',
      category: 'procedure',
      pseudocode: `PROCEDURE calculateGrade(score)
  IF score >= 90 THEN
    PRINT "Grade: A (Excellent)"
  ELSE IF score >= 80 THEN
    PRINT "Grade: B (Good)"
  ELSE IF score >= 70 THEN
    PRINT "Grade: C (Satisfactory)"
  ELSE IF score >= 60 THEN
    PRINT "Grade: D (Pass)"
  ELSE
    PRINT "Grade: F (Fail)"
  ENDIF
ENDPROCEDURE

BEGIN
  SET scores = [95, 87, 72, 58, 91]
  
  FOR EACH score IN scores DO
    PRINT "Score: " + score
    CALL calculateGrade(score)
    PRINT "---"
  NEXT
END`,
      python: `def calculate_grade(score):
    if score >= 90:
        print("Grade: A (Excellent)")
    elif score >= 80:
        print("Grade: B (Good)")
    elif score >= 70:
        print("Grade: C (Satisfactory)")
    elif score >= 60:
        print("Grade: D (Pass)")
    else:
        print("Grade: F (Fail)")

# Main program
scores = [95, 87, 72, 58, 91]

for score in scores:
    print(f"Score: {score}")
    calculate_grade(score)
    print("---")`,
      expectedOutput: [
        'Score: 95',
        'Grade: A (Excellent)',
        '---',
        'Score: 87', 
        'Grade: B (Good)',
        '---',
        'Score: 72',
        'Grade: C (Satisfactory)',
        '---',
        'Score: 58',
        'Grade: F (Fail)',
        '---',
        'Score: 91',
        'Grade: A (Excellent)',
        '---'
      ]
    },
    {
      id: 'running_total',
      title: 'Running Total Calculator',
      description: 'Calculate running totals from a list of numbers',
      category: 'algorithm',
      pseudocode: `BEGIN
  SET numbers = [5, 10, 3, 8, 2]
  SET runningTotal = 0
  
  PRINT "Number    Running Total"
  PRINT "-------------------"
  
  FOR EACH num IN numbers DO
    SET runningTotal = runningTotal + num
    PRINT num + "           " + runningTotal
  NEXT
  
  PRINT "-------------------"
  PRINT "Final total: " + runningTotal
END`,
      python: `numbers = [5, 10, 3, 8, 2]
running_total = 0

print("Number    Running Total")
print("-------------------")

for num in numbers:
    running_total = running_total + num
    print(f"{num}           {running_total}")

print("-------------------")
print(f"Final total: {running_total}")`,
      expectedOutput: [
        'Number    Running Total',
        '-------------------',
        '5           5',
        '10          15',
        '3           18',
        '8           26',
        '2           28',
        '-------------------',
        'Final total: 28'
      ]
    },
    {
      id: 'grid_traversal',
      title: '2D Array (Grid) Processing',
      description: 'Loop through a 2D array to find and sum all elements',
      category: 'algorithm',
      pseudocode: `BEGIN
  SET grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  SET total = 0
  SET rows = 3
  SET cols = 3
  
  PRINT "Processing 2D grid:"
  
  FOR row = 0 TO rows-1 DO
    FOR col = 0 TO cols-1 DO
      SET value = grid[row][col]
      SET total = total + value
      PRINT "Position [" + row + "," + col + "] = " + value
    NEXT
  NEXT
  
  PRINT "Grid total: " + total
  PRINT "Average: " + (total / (rows * cols))
END`,
      python: `grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
total = 0
rows = 3
cols = 3

print("Processing 2D grid:")

for row in range(rows):
    for col in range(cols):
        value = grid[row][col]
        total = total + value
        print(f"Position [{row},{col}] = {value}")

print(f"Grid total: {total}")
print(f"Average: {total / (rows * cols)}")`,
      expectedOutput: [
        'Processing 2D grid:',
        'Position [0,0] = 1',
        'Position [0,1] = 2', 
        'Position [0,2] = 3',
        'Position [1,0] = 4',
        'Position [1,1] = 5',
        'Position [1,2] = 6',
        'Position [2,0] = 7',
        'Position [2,1] = 8',
        'Position [2,2] = 9',
        'Grid total: 45',
        'Average: 5'
      ]
    },
    {
      id: 'number_pattern',
      title: 'Number Pattern Generator',
      description: 'Generate a triangular number pattern',
      category: 'algorithm',
      pseudocode: `BEGIN
  SET rows = 4
  
  PRINT "Number pattern:"
  
  FOR i = 1 TO rows DO
    SET line = ""
    FOR j = 1 TO i DO
      SET line = line + j + " "
    NEXT
    PRINT "Row " + i + ": " + line
  NEXT
END`,
      python: `rows = 4

print("Number pattern:")

for i in range(1, rows + 1):
    line = ""
    for j in range(1, i + 1):
        line = line + str(j) + " "
    print(f"Row {i}: {line}")`,
      expectedOutput: [
        'Number pattern:',
        'Row 1: 1 ',
        'Row 2: 1 2 ',
        'Row 3: 1 2 3 ',
        'Row 4: 1 2 3 4 '
      ]
    },
    {
      id: 'search_algorithm',
      title: 'Linear Search with Counter',
      description: 'Search for a value in an array, tracking comparisons',
      category: 'algorithm',
      pseudocode: `BEGIN
  SET numbers = [15, 23, 8, 42, 16, 91, 7]
  SET target = 42
  SET comparisons = 0
  SET found = FALSE
  SET position = -1
  
  PRINT "Searching for " + target + " in array:"
  PRINT "Array: [15, 23, 8, 42, 16, 91, 7]"
  
  FOR i = 0 TO LENGTH(numbers)-1 DO
    SET comparisons = comparisons + 1
    PRINT "Comparison " + comparisons + ": " + numbers[i] + " vs " + target
    
    IF numbers[i] = target THEN
      SET found = TRUE
      SET position = i
      PRINT "Found at position " + i + "!"
      BREAK
    ENDIF
  NEXT
  
  IF NOT found THEN
    PRINT "Not found after " + comparisons + " comparisons"
  ELSE
    PRINT "Success! Found in " + comparisons + " comparisons"
  ENDIF
END`,
      python: `numbers = [15, 23, 8, 42, 16, 91, 7]
target = 42
comparisons = 0
found = False
position = -1

print(f"Searching for {target} in array:")
print(f"Array: {numbers}")

for i in range(len(numbers)):
    comparisons = comparisons + 1
    print(f"Comparison {comparisons}: {numbers[i]} vs {target}")
    
    if numbers[i] == target:
        found = True
        position = i
        print(f"Found at position {i}!")
        break

if not found:
    print(f"Not found after {comparisons} comparisons")
else:
    print(f"Success! Found in {comparisons} comparisons")`,
      expectedOutput: [
        'Searching for 42 in array:',
        'Array: [15, 23, 8, 42, 16, 91, 7]',
        'Comparison 1: 15 vs 42',
        'Comparison 2: 23 vs 42',
        'Comparison 3: 8 vs 42',
        'Comparison 4: 42 vs 42',
        'Found at position 3!',
        'Success! Found in 4 comparisons'
      ]
    }
  ];

  const currentExample = codeExamples.find(ex => ex.id === selectedExample);
  
  const getCurrentCode = () => {
    if (currentExample) {
      return selectedLanguage === 'pseudocode' ? currentExample.pseudocode : currentExample.python;
    }
    
    return '';
  };

  const simulateExecution = (code: string) => {
    setIsRunning(true);
    setOutput(['Starting execution...']);
    
    // Simulate code execution with delays
    const lines = code.split('\n').filter(line => line.trim());
    let outputLines: string[] = [];
    
    if (currentExample) {
      // Use predefined output for examples
      outputLines = currentExample.expectedOutput;
    }

    // Animate output line by line
    outputLines.forEach((line, index) => {
      setTimeout(() => {
        setOutput(prev => [...prev.slice(0, 1), ...outputLines.slice(0, index + 1)]);
        
        if (index === outputLines.length - 1) {
          setTimeout(() => {
            setIsRunning(false);
            setOutput(prev => [...prev, 'Program finished.']);
          }, 500);
        }
      }, (index + 1) * 800);
    });
  };

  const stopExecution = () => {
    setIsRunning(false);
    setOutput(prev => [...prev, 'Execution stopped by user.']);
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const resetToExample = () => {
    clearOutput();
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
          <button
            onClick={clearOutput}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
          >
            <Terminal className="w-3 h-3 mr-1" />
            Clear
          </button>
          <button
            onClick={resetToExample}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-800 mb-2">Interactive Code Learning</h4>
        <p className="text-blue-700 text-sm">
          Explore programming concepts through interactive examples. Choose from predefined examples and run them to see how algorithms execute step-by-step in both pseudocode and Python.
        </p>
      </div>

      {/* Example Selectors */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
          {/* Example Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 font-medium whitespace-nowrap">Example:</label>
            <select
              value={selectedExample}
              onChange={(e) => {
                setSelectedExample(e.target.value);
                clearOutput();
              }}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm min-w-[200px] bg-white"
            >
              {codeExamples.map(example => (
                <option key={example.id} value={example.id}>
                  {example.title}
                </option>
              ))}
            </select>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-700 font-medium whitespace-nowrap">Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'pseudocode' | 'python')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm min-w-[160px] bg-white"
            >
              <option value="pseudocode">NESA Pseudocode</option>
              <option value="python">Python</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="flex flex-col">
          <div className="mb-4">
            <h4 className="font-semibold">Code View</h4>
          </div>


          <div className="relative bg-gray-900 rounded-lg border border-gray-300 overflow-hidden">
            <div className="flex">
              {/* Line numbers */}
              <div className="bg-gray-800 text-gray-400 font-mono text-sm py-4 px-3 border-r border-gray-600 min-w-[50px] select-none">
                {getCurrentCode()
                  .split('\n')
                  .map((_, index) => (
                    <div key={index} className="h-5 text-right leading-5 text-xs">
                      {index + 1}
                    </div>
                  ))}
              </div>
              
              {/* Code display */}
              <div className="flex-1 h-80 py-4 px-3 bg-gray-900 text-green-400 font-mono text-sm border-none resize-none leading-5 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{getCurrentCode()}</pre>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center space-x-3">
            {!isRunning ? (
              <button
                onClick={() => simulateExecution(getCurrentCode())}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </button>
            ) : (
              <button
                onClick={stopExecution}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </button>
            )}
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <span>{isRunning ? 'Running...' : 'Ready'}</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3">
            <Terminal className="w-4 h-4 mr-2 text-gray-600" />
            <h4 className="font-semibold">Program Output</h4>
          </div>
          
          <div className="h-80 p-4 bg-gray-900 text-white font-mono text-sm rounded-lg border border-gray-300 overflow-y-auto">
            {output.length === 0 ? (
              <div className="text-gray-500 text-center mt-16">
                <Terminal className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Click "Run Code" to see output here</p>
              </div>
            ) : (
              <div className="space-y-1">
                {output.map((line, index) => (
                  <div
                    key={index}
                    className={`transition-opacity duration-500 leading-5 ${
                      index === output.length - 1 && isRunning ? 'animate-pulse' : ''
                    }`}
                  >
                    <span className="text-green-400 mr-1">{'>'}</span>
                    <span className="text-gray-100">{line}</span>
                  </div>
                ))}
                {isRunning && (
                  <div className="flex items-center mt-3 pt-2 border-t border-gray-700">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-400 text-xs">Processing...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Example Description */}
      {currentExample && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              currentExample.category === 'function' ? 'bg-blue-100 text-blue-800' :
              currentExample.category === 'procedure' ? 'bg-purple-100 text-purple-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {currentExample.category.toUpperCase()}
            </span>
            <span className="ml-2 text-sm font-medium">{currentExample.title}</span>
          </div>
          <p className="text-sm text-green-700">{currentExample.description}</p>
        </div>
      )}

      {/* Code Categories */}
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <h5 className="font-semibold text-blue-800">Functions</h5>
          </div>
          <p className="text-blue-700 text-sm">
            Return values and perform calculations. The Fibonacci example shows recursive functions.
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <h5 className="font-semibold text-purple-800">Procedures</h5>
          </div>
          <p className="text-purple-700 text-sm">
            Perform actions without returning values. Grade calculator demonstrates procedure calls.
          </p>
        </div>
        
        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <h5 className="font-semibold text-orange-800">Algorithms</h5>
          </div>
          <p className="text-orange-700 text-sm">
            Complete problem-solving procedures. Bubble sort shows step-by-step algorithm execution.
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Programming Tips</p>
            <div className="text-amber-800 text-sm space-y-1">
              <p>• <strong>Functions</strong> return values - use them for calculations and data processing</p>
              <p>• <strong>Procedures</strong> perform actions - use them for displaying output or modifying data</p>
              <p>• Break complex problems into smaller functions and procedures</p>
              <p>• Test your code with different inputs to ensure it works correctly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
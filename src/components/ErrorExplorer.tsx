import React, { useState } from 'react';
import { Bug, AlertTriangle, X, Code, Play, RotateCcw, FileText, Zap, Brain } from 'lucide-react';

interface ErrorExample {
  title: string;
  description: string;
  originalCode: string;
  fixedCode?: string;
  errorMessage?: string;
  explanation: string;
}

interface ErrorExplorerProps {
  title?: string;
}

export const ErrorExplorer: React.FC<ErrorExplorerProps> = ({ 
  title = "Interactive Error Explorer" 
}) => {
  const [activeTab, setActiveTab] = useState<'syntax' | 'runtime' | 'logic'>('syntax');
  const [selectedExample, setSelectedExample] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const errorExamples = {
    syntax: [
      {
        title: "Indentation Error",
        description: "Python's interpreter gives clear feedback about syntax problems",
        originalCode: `def calculate_sum():
print("Starting calculation")
total = 0
for i in range(5):
total += i
return total`,
        fixedCode: `def calculate_sum():
    print("Starting calculation")
    total = 0
    for i in range(5):
        total += i
    return total`,
        errorMessage: `  File "example.py", line 2
    print("Starting calculation")
    ^
IndentationError: expected an indented block`,
        explanation: "Python's interpreter pinpoints exactly where the indentation problem occurs, showing the line number and using ^ to mark the problematic code. This makes syntax errors the easiest to fix."
      },
      {
        title: "Mismatched Brackets",
        description: "Opening and closing brackets must match exactly",
        originalCode: `numbers = [1, 2, 3, 4, 5)
for i in range(5):
    print(numbers[i])`,
        fixedCode: `numbers = [1, 2, 3, 4, 5]
for i in range(5):
    print(numbers[i])`,
        errorMessage: "SyntaxError: invalid syntax - mismatched brackets",
        explanation: "Array literals must use matching square brackets. Mixing bracket types causes syntax errors."
      },
      {
        title: "Missing Colon",
        description: "Control structures require colons in Python",
        originalCode: `age = 16
if age >= 18
    print("Can vote")
else
    print("Cannot vote")`,
        fixedCode: `age = 16
if age >= 18:
    print("Can vote")
else:
    print("Cannot vote")`,
        errorMessage: `  File "example.py", line 2
    if age >= 18
                ^
SyntaxError: invalid syntax`,
        explanation: "Python requires colons after if, else, for, while, and function definitions. The interpreter points to exactly where the colon is missing."
      },
      {
        title: "Spelling Mistake",
        description: "Misspelled keywords and functions cause NameError",
        originalCode: `name = "Alice"
lenght = len(name)  # 'lenght' instead of 'length'
pirnt(f"Length: {lenght}")  # 'pirnt' instead of 'print'`,
        fixedCode: `name = "Alice"
length = len(name)
print(f"Length: {length}")`,
        errorMessage: `  File "example.py", line 3
    pirnt(f"Length: {lenght}")
    ^^^^^
NameError: name 'pirnt' is not defined`,
        explanation: "Python treats misspelled words as new variable names. Since 'pirnt' was never defined, it throws a NameError. Check spelling carefully!"
      },
      {
        title: "Unclosed String",
        description: "Strings must have matching quotes",
        originalCode: `message = "Hello World
print(message)
name = "Alice"`,
        fixedCode: `message = "Hello World"
print(message)
name = "Alice"`,
        errorMessage: `  File "example.py", line 1
    message = "Hello World
                          ^
SyntaxError: unterminated string literal`,
        explanation: "Every opening quote must have a matching closing quote. Python can't find where the string ends, causing a syntax error."
      }
    ],
    runtime: [
      {
        title: "Division by Zero",
        description: "Mathematical operations that are undefined",
        originalCode: `dividend = 10
divisor = 0
result = dividend / divisor
print("Result:", result)`,
        fixedCode: `dividend = 10
divisor = 0
if divisor != 0:
    result = dividend / divisor
    print("Result:", result)
else:
    print("Error: Cannot divide by zero")`,
        errorMessage: "ZeroDivisionError: division by zero",
        explanation: "Division by zero is mathematically undefined and causes runtime errors. Always validate inputs before mathematical operations."
      },
      {
        title: "Index Out of Range",
        description: "Accessing list elements that don't exist",
        originalCode: `numbers = [10, 20, 30]
for i in range(6):
    print(numbers[i])`,
        fixedCode: `numbers = [10, 20, 30]
for i in range(len(numbers)):
    print(numbers[i])`,
        errorMessage: "IndexError: list index out of range",
        explanation: "Lists are zero-indexed and have finite length. Accessing index 3 in a 3-element list (indices 0-2) causes a runtime error."
      },
      {
        title: "File Not Found",
        description: "Trying to open files that don't exist",
        originalCode: `# Trying to read a file that doesn't exist
with open("missing_file.txt", "r") as file:
    content = file.read()
    print(content)`,
        fixedCode: `# Check if file exists first
import os
if os.path.exists("missing_file.txt"):
    with open("missing_file.txt", "r") as file:
        content = file.read()
        print(content)
else:
    print("File not found!")`,
        errorMessage: "FileNotFoundError: No such file or directory: 'missing_file.txt'",
        explanation: "Python can't open files that don't exist. Always check if a file exists before trying to open it, or use try/except blocks."
      },
      {
        title: "Type Error",
        description: "Using wrong data types in operations",
        originalCode: `age = "25"  # String instead of number
next_year = age + 1
print(f"Next year you'll be {next_year}")`,
        fixedCode: `age = 25  # Or convert: age = int("25")
next_year = age + 1
print(f"Next year you'll be {next_year}")`,
        errorMessage: "TypeError: can only concatenate str (not \"int\") to str",
        explanation: "You can't add numbers to strings directly. Convert the string to an integer first, or make sure your variables have the correct data type."
      },
      {
        title: "Key Error",
        description: "Accessing dictionary keys that don't exist",
        originalCode: `student = {"name": "Alice", "age": 16}
print(student["grade"])  # Key doesn't exist`,
        fixedCode: `student = {"name": "Alice", "age": 16}
# Safe way to access keys
grade = student.get("grade", "Not assigned")
print(f"Grade: {grade}")`,
        errorMessage: "KeyError: 'grade'",
        explanation: "Dictionaries throw KeyError when you try to access keys that don't exist. Use .get() method or check if key exists first."
      }
    ],
    logic: [
      {
        title: "Infinite Loop",
        description: "Loop condition never becomes false",
        originalCode: `count = 0
while count < 10:
    print(count)
    # Missing increment!
print("Done")`,
        fixedCode: `count = 0
while count < 10:
    print(count)
    count = count + 1
print("Done")`,
        errorMessage: "Program hangs - infinite loop detected",
        explanation: "The counter variable is never incremented, so the condition 'count < 10' remains forever true, creating an infinite loop."
      },
      {
        title: "Wrong Condition",
        description: "Using incorrect comparison operators",
        originalCode: `# Check if student passed (needs >= 50)
score = 50
if score > 50:
    print("Passed")
else:
    print("Failed")`,
        fixedCode: `# Check if student passed (needs >= 50)
score = 50
if score >= 50:
    print("Passed")
else:
    print("Failed")`,
        errorMessage: "No error, but wrong result: student with 50 marked as 'Failed'",
        explanation: "Using > instead of >= means a score of exactly 50 is marked as failed when it should pass. Always check your comparison operators carefully."
      },
      {
        title: "Wrong Calculation",
        description: "Mathematical errors in formulas",
        originalCode: `# Calculate average of 3 test scores
test1 = 80
test2 = 90
test3 = 70
average = (test1 + test2 + test3) / 2  # Wrong divisor!
print(f"Average: {average}")`,
        fixedCode: `# Calculate average of 3 test scores
test1 = 80
test2 = 90
test3 = 70
average = (test1 + test2 + test3) / 3  # Correct divisor
print(f"Average: {average}")`,
        errorMessage: "No error, but wrong result: 120.0 instead of 80.0",
        explanation: "Dividing by 2 instead of 3 gives an incorrect average. The program runs fine but produces wrong results - the hardest type of error to catch!"
      },
      {
        title: "Variable Mix-up",
        description: "Using wrong variables in calculations",
        originalCode: `# Calculate rectangle area
length = 10
width = 5
height = 3  # This is for a different shape
area = length * height  # Should use width!
print(f"Area: {area}")`,
        fixedCode: `# Calculate rectangle area
length = 10
width = 5
area = length * width
print(f"Area: {area}")`,
        errorMessage: "No error, but wrong result: 30 instead of 50",
        explanation: "Using the wrong variable (height instead of width) produces incorrect results. The code runs without errors but gives wrong answers."
      },
      {
        title: "Off-by-One Error",
        description: "Loop boundaries are incorrect",
        originalCode: `# Print numbers 1 to 10
for i in range(10):  # This gives 0-9, not 1-10!
    print(i + 1)`,
        fixedCode: `# Print numbers 1 to 10
for i in range(1, 11):  # This gives 1-10
    print(i)`,
        errorMessage: "No error, but prints 1-10 with extra calculation",
        explanation: "Using range(10) gives 0-9, so we need i+1 to print 1-10. Better to use range(1,11) to get the correct numbers directly."
      }
    ]
  };

  const currentExamples = errorExamples[activeTab];
  const currentExample = currentExamples[selectedExample];

  const simulateError = () => {
    if (activeTab === 'runtime') {
      setToastMessage(`Runtime Error: ${currentExample.errorMessage}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'syntax': return <FileText className="w-4 h-4" />;
      case 'runtime': return <Zap className="w-4 h-4" />;
      case 'logic': return <Brain className="w-4 h-4" />;
      default: return <Bug className="w-4 h-4" />;
    }
  };

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'syntax': return 'text-red-600 bg-red-50 border-red-200';
      case 'runtime': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'logic': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
        <button
          onClick={() => setSelectedExample(0)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="Reset to first example"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {(['syntax', 'runtime', 'logic'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedExample(0);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all text-sm font-medium ${
              activeTab === tab
                ? getTabColor(tab)
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {getTabIcon(tab)}
            <span className="capitalize">{tab} Errors</span>
          </button>
        ))}
      </div>

      {/* Example Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Examples:</h4>
        <div className="flex flex-wrap gap-2">
          {currentExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setSelectedExample(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedExample === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

      {/* Current Example */}
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-800 mb-2">{currentExample.title}</h4>
          <p className="text-gray-700 text-sm">{currentExample.description}</p>
        </div>

        {/* Code Comparison */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Original Code (with error) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-red-700">❌ Code with Error</h5>
              {activeTab === 'runtime' && (
                <button
                  onClick={simulateError}
                  className="flex items-center px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded text-sm font-medium transition-colors"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Run & See Error
                </button>
              )}
            </div>
            <pre className="bg-gray-900 text-red-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <code>{currentExample.originalCode}</code>
            </pre>
            {currentExample.errorMessage && (
              <div className="bg-red-50 border border-red-200 p-3 rounded">
                <p className="text-red-800 text-sm font-mono">{currentExample.errorMessage}</p>
              </div>
            )}
          </div>

          {/* Fixed Code */}
          {currentExample.fixedCode && (
            <div className="space-y-3">
              <h5 className="font-semibold text-green-700">✅ Corrected Code</h5>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <code>{currentExample.fixedCode}</code>
              </pre>
              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="text-green-800 text-sm">✓ Code runs successfully without errors</p>
              </div>
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h5 className="font-semibold text-blue-800 mb-2">Explanation</h5>
          <p className="text-blue-700 text-sm leading-relaxed">{currentExample.explanation}</p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-bounce">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setShowToast(false)}
            className="text-white hover:text-red-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorExplorer;
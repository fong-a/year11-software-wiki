import React, { useState } from 'react';
import { Code, RefreshCw, ArrowRight, Layers, Users, X } from 'lucide-react';

interface CodeExample {
  title: string;
  description: string;
  before: {
    code: string;
    metrics: {
      lines: number;
      functions: number;
      repetition: number;
    };
    problems: string[];
  };
  after: {
    code: string;
    metrics: {
      lines: number;
      functions: number;
      repetition: number;
    };
    improvements: string[];
  };
}

interface CodeComparisonProps {
  title?: string;
}

export const CodeComparison: React.FC<CodeComparisonProps> = ({
  title = "Modular Programming Comparison"
}) => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [revealPosition, setRevealPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const examples: CodeExample[] = [
    {
      title: "Student Grade Calculator",
      description: "Compare procedural spaghetti code with modular function-based approach",
      before: {
        code: `BEGIN
  PRINT "Enter student 1 name:"
  READ student1_name
  PRINT "Enter student 1 Math score:"
  READ math1
  PRINT "Enter student 1 English score:"
  READ english1
  PRINT "Enter student 1 Science score:"
  READ science1
  SET average1 = (math1 + english1 + science1) / 3
  IF average1 >= 90 THEN
    SET grade1 = "A"
  ELSE IF average1 >= 80 THEN
    SET grade1 = "B"
  ELSE IF average1 >= 70 THEN
    SET grade1 = "C"
  ELSE IF average1 >= 60 THEN
    SET grade1 = "D"
  ELSE
    SET grade1 = "F"
  ENDIF
  PRINT student1_name, ": Average =", average1, "Grade =", grade1
  
  PRINT "Enter student 2 name:"
  READ student2_name
  PRINT "Enter student 2 Math score:"
  READ math2
  PRINT "Enter student 2 English score:"
  READ english2
  PRINT "Enter student 2 Science score:"
  READ science2
  SET average2 = (math2 + english2 + science2) / 3
  IF average2 >= 90 THEN
    SET grade2 = "A"
  ELSE IF average2 >= 80 THEN
    SET grade2 = "B"
  ELSE IF average2 >= 70 THEN
    SET grade2 = "C"
  ELSE IF average2 >= 60 THEN
    SET grade2 = "D"
  ELSE
    SET grade2 = "F"
  ENDIF
  PRINT student2_name, ": Average =", average2, "Grade =", grade2
  
  PRINT "Enter student 3 name:"
  READ student3_name
  PRINT "Enter student 3 Math score:"
  READ math3
  PRINT "Enter student 3 English score:"
  READ english3
  PRINT "Enter student 3 Science score:"
  READ science3
  SET average3 = (math3 + english3 + science3) / 3
  IF average3 >= 90 THEN
    SET grade3 = "A"
  ELSE IF average3 >= 80 THEN
    SET grade3 = "B"
  ELSE IF average3 >= 70 THEN
    SET grade3 = "C"
  ELSE IF average3 >= 60 THEN
    SET grade3 = "D"
  ELSE
    SET grade3 = "F"
  ENDIF
  PRINT student3_name, ": Average =", average3, "Grade =", grade3
END`,
        metrics: { lines: 48, functions: 0, repetition: 85 },
        problems: [
          "Massive repetition of identical logic",
          "Hard to maintain - changes needed in multiple places",
          "Difficult to add new students",
          "No code reusability",
          "Poor readability"
        ]
      },
      after: {
        code: `FUNCTION calculateAverage(math, english, science)
  RETURN (math + english + science) / 3
ENDFUNCTION

FUNCTION getLetterGrade(average)
  IF average >= 90 THEN
    RETURN "A"
  ELSE IF average >= 80 THEN
    RETURN "B"  
  ELSE IF average >= 70 THEN
    RETURN "C"
  ELSE IF average >= 60 THEN
    RETURN "D"
  ELSE
    RETURN "F"
  ENDIF
ENDFUNCTION

FUNCTION processStudent()
  PRINT "Enter student name:"
  READ name
  PRINT "Enter Math score:"
  READ math
  PRINT "Enter English score:"
  READ english
  PRINT "Enter Science score:"
  READ science
  
  SET average = calculateAverage(math, english, science)
  SET grade = getLetterGrade(average)
  
  PRINT name, ": Average =", average, "Grade =", grade
ENDFUNCTION

BEGIN
  FOR i = 1 TO 3 DO
    processStudent()
  NEXT i
END`,
        metrics: { lines: 32, functions: 3, repetition: 15 },
        improvements: [
          "33% fewer lines of code",
          "Reusable functions for different contexts", 
          "Easy to modify grading scale in one place",
          "Simple to add more students",
          "Much better readability and maintenance"
        ]
      }
    },
    {
      title: "Menu Display System",
      description: "Restaurant menu system showing benefits of modular design",
      before: {
        code: `BEGIN
  PRINT "=== BREAKFAST MENU ==="
  PRINT "1. Eggs Benedict - $12.50"
  PRINT "2. Pancakes - $8.00"
  PRINT "3. Bacon & Eggs - $10.00"
  PRINT "===================="
  
  PRINT "=== LUNCH MENU ==="
  PRINT "1. Caesar Salad - $9.50"
  PRINT "2. Club Sandwich - $11.00"
  PRINT "3. Burger & Fries - $13.50"
  PRINT "=================="
  
  PRINT "=== DINNER MENU ==="
  PRINT "1. Grilled Salmon - $18.00"
  PRINT "2. Beef Steak - $22.00"
  PRINT "3. Pasta Primavera - $14.50"
  PRINT "==================="
  
  PRINT "Enter your choice (B for Breakfast, L for Lunch, D for Dinner):"
  READ choice
  
  IF choice = "B" THEN
    PRINT "Enter breakfast item number:"
    READ item
    IF item = 1 THEN
      PRINT "You ordered: Eggs Benedict - $12.50"
    ELSE IF item = 2 THEN
      PRINT "You ordered: Pancakes - $8.00"
    ELSE IF item = 3 THEN
      PRINT "You ordered: Bacon & Eggs - $10.00"
    ENDIF
  ELSE IF choice = "L" THEN
    PRINT "Enter lunch item number:"
    READ item
    IF item = 1 THEN
      PRINT "You ordered: Caesar Salad - $9.50"
    ELSE IF item = 2 THEN
      PRINT "You ordered: Club Sandwich - $11.00"
    ELSE IF item = 3 THEN
      PRINT "You ordered: Burger & Fries - $13.50"
    ENDIF
  ELSE IF choice = "D" THEN
    PRINT "Enter dinner item number:"
    READ item
    IF item = 1 THEN
      PRINT "You ordered: Grilled Salmon - $18.00"
    ELSE IF item = 2 THEN
      PRINT "You ordered: Beef Steak - $22.00"
    ELSE IF item = 3 THEN
      PRINT "You ordered: Pasta Primavera - $14.50"
    ENDIF
  ENDIF
END`,
        metrics: { lines: 42, functions: 0, repetition: 75 },
        problems: [
          "Repeated menu display patterns",
          "Duplicate ordering logic",
          "Hard to add new menu items",
          "No separation of concerns",
          "Difficult to change pricing"
        ]
      },
      after: {
        code: `FUNCTION displayHeader(title)
  PRINT "=== " + title + " ==="
ENDFUNCTION

FUNCTION displayFooter()
  PRINT "==================="
ENDFUNCTION

FUNCTION displayMenuItem(number, name, price)
  PRINT number + ". " + name + " - $" + price
ENDFUNCTION

FUNCTION displayMenu(menuType, items)
  displayHeader(menuType + " MENU")
  FOR i = 0 TO LENGTH(items) - 1 DO
    displayMenuItem(i + 1, items[i].name, items[i].price)
  NEXT i
  displayFooter()
ENDFUNCTION

FUNCTION processOrder(items, itemNumber)
  IF itemNumber >= 1 AND itemNumber <= LENGTH(items) THEN
    SET selected = items[itemNumber - 1]
    PRINT "You ordered: " + selected.name + " - $" + selected.price
  ELSE
    PRINT "Invalid selection"
  ENDIF
ENDFUNCTION

BEGIN
  SET breakfast = [
    {name: "Eggs Benedict", price: "12.50"},
    {name: "Pancakes", price: "8.00"},
    {name: "Bacon & Eggs", price: "10.00"}
  ]
  SET lunch = [
    {name: "Caesar Salad", price: "9.50"},
    {name: "Club Sandwich", price: "11.00"},
    {name: "Burger & Fries", price: "13.50"}
  ]
  SET dinner = [
    {name: "Grilled Salmon", price: "18.00"},
    {name: "Beef Steak", price: "22.00"},
    {name: "Pasta Primavera", price: "14.50"}
  ]
  
  displayMenu("BREAKFAST", breakfast)
  displayMenu("LUNCH", lunch)  
  displayMenu("DINNER", dinner)
  
  PRINT "Enter your choice (B/L/D):"
  READ choice
  PRINT "Enter item number:"
  read itemNum
  
  IF choice = "B" THEN
    processOrder(breakfast, itemNum)
  ELSE IF choice = "L" THEN
    processOrder(lunch, itemNum)
  ELSE IF choice = "D" THEN
    processOrder(dinner, itemNum)
  ENDIF
END`,
        metrics: { lines: 35, functions: 5, repetition: 25 },
        improvements: [
          "Reusable display functions",
          "Data-driven menu system",
          "Easy to add new items or menus",
          "Consistent formatting across all menus",
          "Single place to update display logic"
        ]
      }
    }
  ];

  const currentExample = examples[selectedExample];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setRevealPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <button
          onClick={() => setRevealPosition(50)}
          className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
          title="Reset comparison view"
        >
          <RefreshCw className="w-3 h-3 mr-1" />
          Reset
        </button>
      </div>

      {/* Example Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Choose Example:</h4>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setSelectedExample(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

      {/* Description */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-blue-900">{currentExample.description}</p>
      </div>

      {/* Metrics Comparison */}
      <div className="mb-6 grid md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
          <div className="text-2xl font-bold text-red-600">{currentExample.before.metrics.lines}</div>
          <div className="text-sm text-red-700">Lines of Code</div>
          <div className="text-xs text-red-600">Before</div>
        </div>
        <div className="flex items-center justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <div className="text-2xl font-bold text-green-600">{currentExample.after.metrics.lines}</div>
          <div className="text-sm text-green-700">Lines of Code</div>
          <div className="text-xs text-green-600">After</div>
        </div>
      </div>

      {/* Interactive Code Comparison */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Interactive Comparison</h4>
        <p className="text-sm text-gray-600 mb-3">Drag the divider to reveal the modular solution →</p>
        
        <div 
          className="relative bg-gray-900 rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Before Code (Spaghetti) */}
          <div className="absolute inset-0">
            <div className="p-4 text-red-400">
              <div className="text-sm font-semibold mb-2 flex items-center">
                <X className="w-4 h-4 mr-1" />
                Procedural "Spaghetti" Code
              </div>
              <pre className="text-xs font-mono overflow-auto max-h-96">
                <code>{currentExample.before.code}</code>
              </pre>
            </div>
          </div>

          {/* After Code (Modular) - Revealed by dragging */}
          <div 
            className="absolute inset-0 bg-gray-900"
            style={{ clipPath: `inset(0 ${100 - revealPosition}% 0 0)` }}
          >
            <div className="p-4 text-green-400">
              <div className="text-sm font-semibold mb-2 flex items-center">
                <Layers className="w-4 h-4 mr-1" />
                Modular Function-Based Code
              </div>
              <pre className="text-xs font-mono overflow-auto max-h-96">
                <code>{currentExample.after.code}</code>
              </pre>
            </div>
          </div>

          {/* Draggable Divider */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-col-resize z-10 hover:w-2 transition-all"
            style={{ left: `${revealPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Problems vs Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center">
            <X className="w-4 h-4 mr-1" />
            Problems with Procedural Code
          </h4>
          <ul className="space-y-2 text-sm">
            {currentExample.before.problems.map((problem, index) => (
              <li key={index} className="flex items-start text-red-700">
                <span className="text-red-500 mr-2">•</span>
                {problem}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <Layers className="w-4 h-4 mr-1" />
            Benefits of Modular Code
          </h4>
          <ul className="space-y-2 text-sm">
            {currentExample.after.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start text-green-700">
                <span className="text-green-500 mr-2">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeComparison;
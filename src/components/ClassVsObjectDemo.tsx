import React, { useState } from 'react';
import { Home, User, Car, Book, Shuffle, Check, X } from 'lucide-react';

interface DragItem {
  id: string;
  text: string;
  type: 'class' | 'object' | null;
  correctType: 'class' | 'object';
}

interface ClassVsObjectDemoProps {
  title?: string;
}

export const ClassVsObjectDemo: React.FC<ClassVsObjectDemoProps> = ({
  title = "Classes vs Objects Interactive Demo"
}) => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [dragItems, setDragItems] = useState<DragItem[]>([
    { id: '1', text: 'Student', type: null, correctType: 'class' },
    { id: '2', text: 'johnSmith', type: null, correctType: 'object' },
    { id: '3', text: 'Car', type: null, correctType: 'class' },
    { id: '4', text: 'myCar', type: null, correctType: 'object' },
    { id: '5', text: 'House', type: null, correctType: 'class' },
    { id: '6', text: 'myHouse', type: null, correctType: 'object' },
    { id: '7', text: 'Book', type: null, correctType: 'class' },
    { id: '8', text: 'harryPotter', type: null, correctType: 'object' },
  ]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showResults, setShowResults] = useState(false);

  const cardContent = {
    class: {
      front: "Class",
      back: {
        title: "Class (Blueprint)",
        icon: <Home className="w-8 h-8 text-blue-600" />,
        definition: "A template or blueprint that defines the structure and behavior of objects",
        characteristics: [
          "Defines attributes (properties)",
          "Defines methods (functions)",
          "Cannot be used directly",
          "Must be instantiated to create objects"
        ],
        example: `CLASS Student
  ATTRIBUTES:
    name: String
    age: Integer
    studentId: String
  
  METHODS:
    enrollInCourse()
    calculateGPA()
    displayInfo()
ENDCLASS`
      }
    },
    object: {
      front: "Object",  
      back: {
        title: "Object (Instance)",
        icon: <User className="w-8 h-8 text-green-600" />,
        definition: "A specific instance of a class with actual values for its attributes",
        characteristics: [
          "Has specific values for attributes",
          "Can call methods defined in its class", 
          "Exists in memory during program execution",
          "Multiple objects can be created from one class"
        ],
        example: `johnSmith = new Student()
johnSmith.name = "John Smith"
johnSmith.age = 17
johnSmith.studentId = "ST001"

johnSmith.enrollInCourse("Physics")
johnSmith.displayInfo()`
      }
    }
  };

  const toggleCard = (cardType: 'class' | 'object') => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardType)) {
        newSet.delete(cardType);
      } else {
        newSet.add(cardType);
      }
      return newSet;
    });
  };

  const handleDrop = (itemId: string, dropType: 'class' | 'object') => {
    setDragItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, type: dropType } : item
    ));
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropZone = (e: React.DragEvent, dropType: 'class' | 'object') => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    handleDrop(itemId, dropType);
  };

  const checkAnswers = () => {
    const totalAnswered = dragItems.filter(item => item.type !== null).length;
    const correctAnswers = dragItems.filter(item => item.type === item.correctType).length;
    
    setScore({ correct: correctAnswers, total: totalAnswered });
    setShowResults(true);
  };

  const resetActivity = () => {
    setDragItems(prev => prev.map(item => ({ ...item, type: null })));
    setShowResults(false);
    setScore({ correct: 0, total: 0 });
  };

  const shuffleItems = () => {
    setDragItems(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const getItemStatus = (item: DragItem) => {
    if (!showResults || item.type === null) return 'neutral';
    return item.type === item.correctType ? 'correct' : 'incorrect';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={shuffleItems}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
          >
            <Shuffle className="w-3 h-3 mr-1" />
            Shuffle
          </button>
          <button
            onClick={resetActivity}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="mb-8 grid md:grid-cols-2 gap-6">
        {Object.entries(cardContent).map(([type, content]) => (
          <div key={type} className="relative">
            <div 
              className={`w-full h-80 cursor-pointer transition-transform duration-500 preserve-3d ${
                flippedCards.has(type) ? 'rotate-y-180' : ''
              }`}
              onClick={() => toggleCard(type as 'class' | 'object')}
            >
              {/* Front of card */}
              <div className={`absolute inset-0 w-full h-full backface-hidden rounded-lg border-2 ${
                type === 'class' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'
              } p-6 flex items-center justify-center`}>
                <div className="text-center">
                  {type === 'class' ? <Home className="w-16 h-16 text-blue-600 mx-auto mb-4" /> : <User className="w-16 h-16 text-green-600 mx-auto mb-4" />}
                  <h4 className="text-2xl font-bold text-gray-800">{content.front}</h4>
                  <p className="text-sm text-gray-600 mt-2">Click to flip</p>
                </div>
              </div>

              {/* Back of card */}
              <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg border-2 ${
                type === 'class' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'
              } p-4 overflow-y-auto`}>
                <div className="flex items-center mb-3">
                  {content.back.icon}
                  <h4 className="text-lg font-bold ml-2">{content.back.title}</h4>
                </div>
                <p className="text-sm text-gray-700 mb-3">{content.back.definition}</p>
                
                <h5 className="font-semibold text-sm mb-2">Characteristics:</h5>
                <ul className="text-xs space-y-1 mb-3">
                  {content.back.characteristics.map((char, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-1">•</span>
                      {char}
                    </li>
                  ))}
                </ul>

                <h5 className="font-semibold text-sm mb-2">Example:</h5>
                <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded font-mono overflow-x-auto">
                  <code>{content.back.example}</code>
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drag and Drop Activity */}
      <div className="mb-6">
        <h4 className="font-semibold mb-4">Drag & Drop Classification</h4>
        <p className="text-sm text-gray-600 mb-4">
          Drag each item to the correct category. Remember: Classes are blueprints, Objects are specific instances.
        </p>

        {/* Drop Zones */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div 
            className="p-6 border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg min-h-32"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropZone(e, 'class')}
          >
            <div className="flex items-center mb-3">
              <Home className="w-5 h-5 text-blue-600 mr-2" />
              <h5 className="font-semibold text-blue-800">Classes (Blueprints)</h5>
            </div>
            <div className="space-y-2">
              {dragItems.filter(item => item.type === 'class').map(item => (
                <div 
                  key={item.id}
                  className={`p-2 rounded text-sm font-medium ${
                    getItemStatus(item) === 'correct' ? 'bg-green-200 text-green-800' :
                    getItemStatus(item) === 'incorrect' ? 'bg-red-200 text-red-800' :
                    'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {item.text}
                  {showResults && (
                    <span className="ml-2">
                      {getItemStatus(item) === 'correct' ? <Check className="inline w-4 h-4" /> : 
                       getItemStatus(item) === 'incorrect' ? <X className="inline w-4 h-4" /> : null}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div 
            className="p-6 border-2 border-dashed border-green-300 bg-green-50 rounded-lg min-h-32"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDropZone(e, 'object')}
          >
            <div className="flex items-center mb-3">
              <User className="w-5 h-5 text-green-600 mr-2" />
              <h5 className="font-semibold text-green-800">Objects (Instances)</h5>
            </div>
            <div className="space-y-2">
              {dragItems.filter(item => item.type === 'object').map(item => (
                <div 
                  key={item.id}
                  className={`p-2 rounded text-sm font-medium ${
                    getItemStatus(item) === 'correct' ? 'bg-green-200 text-green-800' :
                    getItemStatus(item) === 'incorrect' ? 'bg-red-200 text-red-800' :
                    'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {item.text}
                  {showResults && (
                    <span className="ml-2">
                      {getItemStatus(item) === 'correct' ? <Check className="inline w-4 h-4" /> : 
                       getItemStatus(item) === 'incorrect' ? <X className="inline w-4 h-4" /> : null}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Draggable Items */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-semibold mb-3">Items to Classify:</h5>
          <div className="flex flex-wrap gap-2">
            {dragItems.filter(item => item.type === null).map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="px-3 py-2 bg-white border border-gray-300 rounded cursor-move hover:bg-gray-50 transition-colors text-sm font-medium select-none"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {dragItems.filter(item => item.type !== null).length} / {dragItems.length} classified
        </div>
        
        <div className="flex items-center space-x-3">
          {showResults && (
            <div className="text-sm font-medium">
              Score: {score.correct} / {score.total} correct
              {score.correct === score.total && score.total > 0 && (
                <span className="text-green-600 ml-2">🎉 Perfect!</span>
              )}
            </div>
          )}
          
          <button
            onClick={checkAnswers}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={dragItems.filter(item => item.type !== null).length === 0}
          >
            Check Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassVsObjectDemo;
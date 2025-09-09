import React, { useState } from 'react';
import { GitBranch, Plus, ArrowDown, Play, RotateCcw, Code } from 'lucide-react';

interface ClassNode {
  id: string;
  name: string;
  attributes: string[];
  methods: string[];
  children: ClassNode[];
  expanded: boolean;
  position: { x: number; y: number };
}

interface InheritanceTreeProps {
  title?: string;
}

export const InheritanceTree: React.FC<InheritanceTreeProps> = ({
  title = "Inheritance & Polymorphism Demo"
}) => {
  const [tree, setTree] = useState<ClassNode>({
    id: 'vehicle',
    name: 'Vehicle',
    attributes: ['make: String', 'model: String', 'year: Integer'],
    methods: ['start()', 'stop()', 'getInfo()'],
    expanded: true,
    position: { x: 0, y: 0 },
    children: [
      {
        id: 'car',
        name: 'Car',
        attributes: ['doors: Integer', 'fuelType: String'],
        methods: ['openTrunk()', 'lockDoors()'],
        expanded: true,
        position: { x: -200, y: 150 },
        children: [
          {
            id: 'sedan',
            name: 'Sedan',
            attributes: ['trunkSize: Double'],
            methods: ['adjustSeats()'],
            expanded: false,
            position: { x: -300, y: 300 },
            children: []
          },
          {
            id: 'suv',
            name: 'SUV',
            attributes: ['towingCapacity: Integer'],
            methods: ['engage4WD()'],
            expanded: false,
            position: { x: -100, y: 300 },
            children: []
          }
        ]
      },
      {
        id: 'motorcycle',
        name: 'Motorcycle',
        attributes: ['engineCC: Integer', 'hasSidecar: Boolean'],
        methods: ['kickStart()', 'lean()'],
        expanded: true,
        position: { x: 200, y: 150 },
        children: []
      }
    ]
  });

  const [selectedMethod, setSelectedMethod] = useState<string>('start');
  const [animatingMethod, setAnimatingMethod] = useState<string | null>(null);
  const [cascadePath, setCascadePath] = useState<string[]>([]);

  const toggleNode = (nodeId: string) => {
    const updateNode = (node: ClassNode): ClassNode => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      return {
        ...node,
        children: node.children.map(child => updateNode(child))
      };
    };
    
    setTree(updateNode(tree));
  };

  const addMethodToParent = (method: string) => {
    const updateNode = (node: ClassNode): ClassNode => {
      if (node.id === 'vehicle') {
        return {
          ...node,
          methods: node.methods.includes(method) ? node.methods : [...node.methods, method]
        };
      }
      return {
        ...node,
        children: node.children.map(child => updateNode(child))
      };
    };
    
    setTree(updateNode(tree));
    animateMethodCascade(method);
  };

  const animateMethodCascade = (method: string) => {
    setAnimatingMethod(method);
    const path = ['vehicle'];
    
    const collectPath = (node: ClassNode, currentPath: string[]) => {
      if (node.expanded) {
        node.children.forEach(child => {
          path.push(child.id);
          collectPath(child, [...currentPath, child.id]);
        });
      }
    };
    
    collectPath(tree, ['vehicle']);
    setCascadePath(path);

    // Animate cascade effect
    path.forEach((nodeId, index) => {
      setTimeout(() => {
        setCascadePath(prev => prev.slice(0, index + 1));
      }, index * 300);
    });

    setTimeout(() => {
      setAnimatingMethod(null);
      setCascadePath([]);
    }, path.length * 300 + 1000);
  };

  const findNode = (nodeId: string, node: ClassNode = tree): ClassNode | null => {
    if (node.id === nodeId) return node;
    for (const child of node.children) {
      const found = findNode(nodeId, child);
      if (found) return found;
    }
    return null;
  };

  const getAllInheritedMethods = (nodeId: string): string[] => {
    const methods: string[] = [];
    let current = findNode(nodeId);
    
    // Trace up to parent (simplified - assumes single inheritance)
    const getAllParentMethods = (node: ClassNode | null): string[] => {
      if (!node) return [];
      if (node.id === 'vehicle') {
        return node.methods;
      }
      return [];
    };

    if (current) {
      methods.push(...current.methods);
      if (current.id !== 'vehicle') {
        methods.push(...tree.methods); // Vehicle methods
      }
    }
    
    return [...new Set(methods)];
  };

  const renderNode = (node: ClassNode, level: number = 0): React.ReactNode => {
    const isAnimating = animatingMethod && cascadePath.includes(node.id);
    const inheritedMethods = getAllInheritedMethods(node.id);
    
    return (
      <div key={node.id} className="flex flex-col items-center relative">
        {/* Connection Line to Parent */}
        {level > 0 && (
          <div className="absolute -top-6 w-px h-6 bg-gray-300"></div>
        )}
        
        {/* Class Box */}
        <div className={`bg-white border-2 rounded-lg p-4 min-w-48 shadow-sm transition-all duration-300 ${
          isAnimating ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
        }`}>
          {/* Class Name */}
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-lg">{node.name}</h5>
            {node.children.length > 0 && (
              <button
                onClick={() => toggleNode(node.id)}
                className="text-blue-600 hover:text-blue-800 p-1"
              >
                {node.expanded ? <ArrowDown className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Attributes */}
          <div className="mb-3">
            <h6 className="text-xs font-semibold text-gray-600 mb-1">Attributes:</h6>
            <div className="space-y-1">
              {node.attributes.map((attr, index) => (
                <div key={index} className="text-xs font-mono text-gray-700">
                  - {attr}
                </div>
              ))}
            </div>
          </div>

          {/* Methods */}
          <div>
            <h6 className="text-xs font-semibold text-gray-600 mb-1">Methods:</h6>
            <div className="space-y-1">
              {/* Own Methods */}
              {node.methods.map((method, index) => (
                <div 
                  key={index} 
                  className={`text-xs font-mono transition-colors ${
                    animatingMethod === method ? 'text-blue-600 font-bold' : 'text-gray-800'
                  }`}
                >
                  + {method}
                </div>
              ))}
              
              {/* Inherited Methods (if not root) */}
              {node.id !== 'vehicle' && (
                <div className="border-t pt-1 mt-2">
                  <div className="text-xs text-gray-500 italic mb-1">Inherited:</div>
                  {tree.methods.map((method, index) => (
                    <div 
                      key={`inherited-${index}`}
                      className={`text-xs font-mono text-gray-500 transition-colors ${
                        animatingMethod === method ? 'text-blue-500 font-bold' : ''
                      }`}
                    >
                      + {method}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Animation Indicator */}
          {isAnimating && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse">
              <div className="w-full h-full bg-blue-400 rounded-full animate-ping"></div>
            </div>
          )}
        </div>

        {/* Children */}
        {node.expanded && node.children.length > 0 && (
          <div className="relative mt-8">
            {/* Horizontal Line */}
            {node.children.length > 1 && (
              <div className="absolute -top-4 left-0 right-0 h-px bg-gray-300 top-4"></div>
            )}
            
            <div className="flex space-x-16">
              {node.children.map(child => renderNode(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </button>
      </div>

      {/* Concept Explanation */}
      <div className="mb-6 grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
          <h4 className="font-semibold text-green-800 mb-2">Inheritance</h4>
          <p className="text-green-700 text-sm">
            Child classes inherit attributes and methods from parent classes. A Car inherits all Vehicle properties and can add its own.
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-800 mb-2">Polymorphism</h4>
          <p className="text-purple-700 text-sm">
            Child classes can override parent methods to provide specialized behavior while maintaining the same interface.
          </p>
        </div>
      </div>

      {/* Method Cascade Demo */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-3">Method Inheritance Demo</h4>
        <p className="text-blue-700 text-sm mb-4">
          Add a method to the parent class and watch it cascade down to all child classes:
        </p>
        
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Method name (e.g., honk)"
          />
          <button
            onClick={() => addMethodToParent(selectedMethod)}
            disabled={!selectedMethod.trim() || animatingMethod !== null}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            <Play className="w-4 h-4 mr-1" />
            Add & Cascade
          </button>
        </div>
      </div>

      {/* Class Hierarchy Visualization */}
      <div className="mb-6">
        <h4 className="font-semibold mb-4">Vehicle Class Hierarchy</h4>
        <div className="bg-gray-50 p-6 rounded-lg overflow-x-auto">
          <div className="flex justify-center min-w-max">
            {renderNode(tree)}
          </div>
        </div>
      </div>

      {/* Code Examples */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-800 mb-3 flex items-center">
            <Code className="w-4 h-4 mr-1" />
            Inheritance Example
          </h5>
          <pre className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
            <code>{`CLASS Vehicle
  ATTRIBUTES:
    make: String
    model: String
  METHODS:
    start()
    stop()
ENDCLASS

CLASS Car EXTENDS Vehicle
  ATTRIBUTES:
    doors: Integer  // New attribute
  METHODS:
    openTrunk()     // New method
    start()         // Override parent
ENDCLASS

// Car inherits make, model, stop()
// Car adds doors, openTrunk()
// Car overrides start() method`}</code>
          </pre>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h5 className="font-semibold text-purple-800 mb-3 flex items-center">
            <Code className="w-4 h-4 mr-1" />
            Polymorphism Example
          </h5>
          <pre className="bg-gray-900 text-purple-400 p-3 rounded font-mono text-sm overflow-x-auto">
            <code>{`// Same method name, different behavior
vehicles = [new Car(), new Motorcycle()]

FOR EACH vehicle IN vehicles DO
  vehicle.start()  // Polymorphism!
NEXT

// Car.start() might: 
//   Turn key, engage starter
// Motorcycle.start() might:
//   Kick start, warm up engine

// Same interface, different implementation`}</code>
          </pre>
        </div>
      </div>

      {/* Benefits */}
      <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2">Benefits of Inheritance & Polymorphism</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-amber-700">
          <div>
            <strong>Code Reuse:</strong> Child classes inherit parent functionality without rewriting it.
          </div>
          <div>
            <strong>Consistency:</strong> All child classes share the same interface from the parent.
          </div>
          <div>
            <strong>Flexibility:</strong> Child classes can specialize behavior while maintaining compatibility.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InheritanceTree;
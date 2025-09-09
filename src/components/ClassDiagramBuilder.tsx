import React, { useState } from 'react';
import { Plus, Minus, Save, Download, Eye, EyeOff, Link, RotateCcw, Trash2 } from 'lucide-react';

interface ClassAttribute {
  id: string;
  name: string;
  type: string;
  visibility: 'public' | 'private' | 'protected';
}

interface ClassMethod {
  id: string;
  name: string;
  returnType: string;
  parameters: { name: string; type: string }[];
  visibility: 'public' | 'private' | 'protected';
}

interface ClassDefinition {
  id: string;
  name: string;
  attributes: ClassAttribute[];
  methods: ClassMethod[];
  position: { x: number; y: number };
  color: string;
}

interface Relationship {
  id: string;
  from: string;
  to: string;
  type: 'inheritance' | 'composition' | 'association';
  label?: string;
}

interface ClassDiagramBuilderProps {
  title?: string;
}

export const ClassDiagramBuilder: React.FC<ClassDiagramBuilderProps> = ({
  title = "UML Class Diagram Builder"
}) => {
  const [classes, setClasses] = useState<ClassDefinition[]>([
    {
      id: 'vehicle',
      name: 'Vehicle',
      attributes: [
        { id: '1', name: 'make', type: 'String', visibility: 'private' },
        { id: '2', name: 'model', type: 'String', visibility: 'private' },
        { id: '3', name: 'year', type: 'Integer', visibility: 'private' }
      ],
      methods: [
        { id: '1', name: 'start', returnType: 'void', parameters: [], visibility: 'public' },
        { id: '2', name: 'stop', returnType: 'void', parameters: [], visibility: 'public' },
        { id: '3', name: 'getInfo', returnType: 'String', parameters: [], visibility: 'public' }
      ],
      position: { x: 200, y: 50 },
      color: 'bg-blue-100 border-blue-300'
    }
  ]);

  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [draggedClass, setDraggedClass] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState<string>('');
  const [isAddingClass, setIsAddingClass] = useState<boolean>(false);

  // Predefined color schemes
  const colorOptions = [
    'bg-blue-100 border-blue-300',
    'bg-green-100 border-green-300',
    'bg-purple-100 border-purple-300',
    'bg-orange-100 border-orange-300',
    'bg-red-100 border-red-300',
    'bg-yellow-100 border-yellow-300'
  ];

  const addClass = () => {
    if (!newClassName.trim()) return;

    const newClass: ClassDefinition = {
      id: Date.now().toString(),
      name: newClassName.trim(),
      attributes: [],
      methods: [],
      position: { x: 100 + (classes.length * 50), y: 100 + (classes.length * 50) },
      color: colorOptions[classes.length % colorOptions.length]
    };

    setClasses([...classes, newClass]);
    setNewClassName('');
    setIsAddingClass(false);
    setSelectedClass(newClass.id);
  };

  const deleteClass = (classId: string) => {
    setClasses(classes.filter(c => c.id !== classId));
    setRelationships(relationships.filter(r => r.from !== classId && r.to !== classId));
    if (selectedClass === classId) {
      setSelectedClass(null);
    }
  };

  const addAttribute = (classId: string) => {
    setClasses(classes.map(cls => 
      cls.id === classId 
        ? {
            ...cls,
            attributes: [
              ...cls.attributes,
              {
                id: Date.now().toString(),
                name: 'newAttribute',
                type: 'String',
                visibility: 'private'
              }
            ]
          }
        : cls
    ));
  };

  const addMethod = (classId: string) => {
    setClasses(classes.map(cls => 
      cls.id === classId 
        ? {
            ...cls,
            methods: [
              ...cls.methods,
              {
                id: Date.now().toString(),
                name: 'newMethod',
                returnType: 'void',
                parameters: [],
                visibility: 'public'
              }
            ]
          }
        : cls
    ));
  };

  const updateAttribute = (classId: string, attrId: string, field: keyof ClassAttribute, value: any) => {
    setClasses(classes.map(cls =>
      cls.id === classId
        ? {
            ...cls,
            attributes: cls.attributes.map(attr =>
              attr.id === attrId ? { ...attr, [field]: value } : attr
            )
          }
        : cls
    ));
  };

  const updateMethod = (classId: string, methodId: string, field: keyof ClassMethod, value: any) => {
    setClasses(classes.map(cls =>
      cls.id === classId
        ? {
            ...cls,
            methods: cls.methods.map(method =>
              method.id === methodId ? { ...method, [field]: value } : method
            )
          }
        : cls
    ));
  };

  const updateClassPosition = (classId: string, position: { x: number; y: number }) => {
    setClasses(classes.map(cls =>
      cls.id === classId ? { ...cls, position } : cls
    ));
  };

  const addRelationship = (from: string, to: string, type: Relationship['type']) => {
    const newRelationship: Relationship = {
      id: Date.now().toString(),
      from,
      to,
      type,
      label: type === 'association' ? 'uses' : undefined
    };
    setRelationships([...relationships, newRelationship]);
  };

  const generateCode = () => {
    return classes.map(cls => {
      const attributes = cls.attributes.map(attr => 
        `  ${attr.visibility === 'private' ? '-' : attr.visibility === 'protected' ? '#' : '+'} ${attr.name}: ${attr.type}`
      ).join('\n');

      const methods = cls.methods.map(method => {
        const params = method.parameters.map(p => `${p.name}: ${p.type}`).join(', ');
        return `  ${method.visibility === 'private' ? '-' : method.visibility === 'protected' ? '#' : '+'} ${method.name}(${params}): ${method.returnType}`;
      }).join('\n');

      return `CLASS ${cls.name}\n${attributes}\n${methods}\nEND CLASS`;
    }).join('\n\n');
  };

  const getVisibilitySymbol = (visibility: string) => {
    switch (visibility) {
      case 'public': return '+';
      case 'private': return '-';
      case 'protected': return '#';
      default: return '+';
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case 'public': return 'text-green-600';
      case 'private': return 'text-red-600';
      case 'protected': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const handleMouseDown = (classId: string, e: React.MouseEvent) => {
    setDraggedClass(classId);
    const startX = e.clientX;
    const startY = e.clientY;
    const classEl = classes.find(c => c.id === classId);
    if (!classEl) return;

    const startPos = classEl.position;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = startPos.x + (e.clientX - startX);
      const newY = startPos.y + (e.clientY - startY);
      updateClassPosition(classId, { x: Math.max(0, newX), y: Math.max(0, newY) });
    };

    const handleMouseUp = () => {
      setDraggedClass(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const selectedClassData = selectedClass ? classes.find(c => c.id === selectedClass) : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              showCode 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showCode ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
          <button
            onClick={() => setIsAddingClass(true)}
            className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Class
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-800 mb-2">UML Class Diagram Builder</h4>
        <p className="text-blue-700 text-sm">
          Create UML class diagrams by adding classes, attributes, and methods. Drag classes to reposition them. 
          Click on a class to edit its properties. Use visibility symbols: + (public), - (private), # (protected).
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Diagram Canvas */}
        <div className="lg:col-span-3">
          <h4 className="font-semibold mb-4">Class Diagram Canvas</h4>
          
          <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg min-h-96 overflow-hidden">
            {/* Classes */}
            {classes.map((cls) => (
              <div
                key={cls.id}
                className={`absolute border-2 rounded-lg p-3 shadow-sm cursor-move transition-all duration-200 ${
                  cls.color
                } ${
                  selectedClass === cls.id ? 'ring-2 ring-blue-500 scale-105' : ''
                } ${
                  draggedClass === cls.id ? 'z-10' : ''
                }`}
                style={{
                  left: `${cls.position.x}px`,
                  top: `${cls.position.y}px`,
                  minWidth: '200px'
                }}
                onMouseDown={(e) => handleMouseDown(cls.id, e)}
                onClick={() => setSelectedClass(cls.id)}
              >
                {/* Class Name */}
                <div className="text-center font-bold text-lg mb-2 border-b border-gray-300 pb-2">
                  {cls.name}
                </div>

                {/* Attributes */}
                <div className="mb-2">
                  <div className="font-medium text-sm text-gray-700 mb-1">Attributes:</div>
                  {cls.attributes.length === 0 ? (
                    <div className="text-gray-500 text-sm italic">No attributes</div>
                  ) : (
                    <div className="space-y-1">
                      {cls.attributes.map((attr) => (
                        <div key={attr.id} className="text-sm font-mono">
                          <span className={`font-bold mr-1 ${getVisibilityColor(attr.visibility)}`}>
                            {getVisibilitySymbol(attr.visibility)}
                          </span>
                          {attr.name}: {attr.type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Methods */}
                <div>
                  <div className="font-medium text-sm text-gray-700 mb-1 border-t border-gray-300 pt-2">Methods:</div>
                  {cls.methods.length === 0 ? (
                    <div className="text-gray-500 text-sm italic">No methods</div>
                  ) : (
                    <div className="space-y-1">
                      {cls.methods.map((method) => (
                        <div key={method.id} className="text-sm font-mono">
                          <span className={`font-bold mr-1 ${getVisibilityColor(method.visibility)}`}>
                            {getVisibilitySymbol(method.visibility)}
                          </span>
                          {method.name}(): {method.returnType}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick action buttons */}
                {selectedClass === cls.id && (
                  <div className="absolute -top-2 -right-2 flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClass(cls.id);
                      }}
                      className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Empty state */}
            {classes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Plus className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Click "Add Class" to start building your diagram</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Property Panel */}
        <div>
          <h4 className="font-semibold mb-4">Properties Panel</h4>
          
          {/* Add Class Form */}
          {isAddingClass && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <h5 className="font-medium text-green-800 mb-2">Add New Class</h5>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Class name"
                  className="w-full px-2 py-1 border border-green-300 rounded text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addClass()}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={addClass}
                    className="flex-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingClass(false);
                      setNewClassName('');
                    }}
                    className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Selected Class Editor */}
          {selectedClassData ? (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Editing: {selectedClassData.name}</h5>
                
                {/* Class Name Editor */}
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Name:</label>
                  <input
                    type="text"
                    value={selectedClassData.name}
                    onChange={(e) => setClasses(classes.map(c => 
                      c.id === selectedClass ? { ...c, name: e.target.value } : c
                    ))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>

                {/* Attributes Section */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="font-medium text-gray-700">Attributes:</h6>
                    <button
                      onClick={() => addAttribute(selectedClass)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedClassData.attributes.map((attr) => (
                      <div key={attr.id} className="flex items-center space-x-2 text-sm">
                        <select
                          value={attr.visibility}
                          onChange={(e) => updateAttribute(selectedClass, attr.id, 'visibility', e.target.value)}
                          className="px-1 py-0.5 border border-gray-300 rounded text-xs"
                        >
                          <option value="public">+</option>
                          <option value="private">-</option>
                          <option value="protected">#</option>
                        </select>
                        <input
                          type="text"
                          value={attr.name}
                          onChange={(e) => updateAttribute(selectedClass, attr.id, 'name', e.target.value)}
                          className="flex-1 px-1 py-0.5 border border-gray-300 rounded text-xs"
                          placeholder="name"
                        />
                        <input
                          type="text"
                          value={attr.type}
                          onChange={(e) => updateAttribute(selectedClass, attr.id, 'type', e.target.value)}
                          className="w-16 px-1 py-0.5 border border-gray-300 rounded text-xs"
                          placeholder="type"
                        />
                        <button
                          onClick={() => setClasses(classes.map(c =>
                            c.id === selectedClass
                              ? { ...c, attributes: c.attributes.filter(a => a.id !== attr.id) }
                              : c
                          ))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Methods Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="font-medium text-gray-700">Methods:</h6>
                    <button
                      onClick={() => addMethod(selectedClass)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedClassData.methods.map((method) => (
                      <div key={method.id} className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <select
                            value={method.visibility}
                            onChange={(e) => updateMethod(selectedClass, method.id, 'visibility', e.target.value)}
                            className="px-1 py-0.5 border border-gray-300 rounded text-xs"
                          >
                            <option value="public">+</option>
                            <option value="private">-</option>
                            <option value="protected">#</option>
                          </select>
                          <input
                            type="text"
                            value={method.name}
                            onChange={(e) => updateMethod(selectedClass, method.id, 'name', e.target.value)}
                            className="flex-1 px-1 py-0.5 border border-gray-300 rounded text-xs"
                            placeholder="method name"
                          />
                          <input
                            type="text"
                            value={method.returnType}
                            onChange={(e) => updateMethod(selectedClass, method.id, 'returnType', e.target.value)}
                            className="w-16 px-1 py-0.5 border border-gray-300 rounded text-xs"
                            placeholder="return type"
                          />
                          <button
                            onClick={() => setClasses(classes.map(c =>
                              c.id === selectedClass
                                ? { ...c, methods: c.methods.filter(m => m.id !== method.id) }
                                : c
                            ))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-8">
              <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Select a class to edit its properties</p>
            </div>
          )}

          {/* UML Guide */}
          <div className="mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <h5 className="font-medium text-amber-800 mb-2">UML Guide</h5>
            <div className="text-sm text-amber-700 space-y-1">
              <div><strong>+ public:</strong> Accessible from anywhere</div>
              <div><strong>- private:</strong> Only accessible within class</div>
              <div><strong># protected:</strong> Accessible in class and subclasses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      {showCode && (
        <div className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-semibold">Generated Pseudocode</h4>
            <button
              onClick={() => navigator.clipboard?.writeText(generateCode())}
              className="px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
          <pre className="whitespace-pre-wrap">{generateCode()}</pre>
        </div>
      )}
    </div>
  );
};

export default ClassDiagramBuilder;
import React, { useState } from 'react';
import { Lock, Unlock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

interface Attribute {
  name: string;
  type: string;
  value: string;
  visibility: 'public' | 'private';
  description: string;
}

interface EncapsulationDemoProps {
  title?: string;
}

export const EncapsulationDemo: React.FC<EncapsulationDemoProps> = ({
  title = "Encapsulation Interactive Demo"
}) => {
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      name: "name",
      type: "String",
      value: "John Doe",
      visibility: "public",
      description: "Student's full name - safe to access directly"
    },
    {
      name: "studentId",
      type: "String", 
      value: "ST12345",
      visibility: "public",
      description: "Unique identifier - safe to read publicly"
    },
    {
      name: "password",
      type: "String",
      value: "mySecret123",
      visibility: "private",
      description: "Login password - must be kept private for security"
    },
    {
      name: "bankBalance",
      type: "Double",
      value: "1250.75",
      visibility: "private", 
      description: "Financial information - should only be accessed through controlled methods"
    },
    {
      name: "age",
      type: "Integer",
      value: "17",
      visibility: "public",
      description: "Age - generally safe to access publicly"
    },
    {
      name: "socialSecurityNumber",
      type: "String",
      value: "XXX-XX-1234",
      visibility: "private",
      description: "Sensitive personal data - must be protected"
    }
  ]);
  
  const [showAllValues, setShowAllValues] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);

  const toggleVisibility = (attributeName: string) => {
    setAttributes(prev => prev.map(attr => 
      attr.name === attributeName 
        ? { ...attr, visibility: attr.visibility === 'public' ? 'private' : 'public' }
        : attr
    ));
  };

  const getVisibilityIcon = (visibility: string, isLocked: boolean = false) => {
    if (visibility === 'private') {
      return isLocked ? <Lock className="w-4 h-4" /> : <Lock className="w-4 h-4" />;
    } else {
      return <Unlock className="w-4 h-4" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    return visibility === 'private' 
      ? 'border-red-200 bg-red-50' 
      : 'border-green-200 bg-green-50';
  };

  const getTextColor = (visibility: string) => {
    return visibility === 'private' ? 'text-red-800' : 'text-green-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <button
          onClick={() => setShowAllValues(!showAllValues)}
          className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
        >
          {showAllValues ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
          {showAllValues ? 'Hide Values' : 'Show All Values'}
        </button>
      </div>

      {/* Concept Explanation */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-800 mb-2">Understanding Encapsulation</h4>
        <p className="text-blue-700 text-sm mb-3">
          Encapsulation is the practice of hiding internal data and providing controlled access through methods. 
          Click the lock icons to see how changing visibility affects data access.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-green-100 p-3 rounded">
            <strong className="text-green-800">Public attributes:</strong> Can be accessed directly from outside the class
          </div>
          <div className="bg-red-100 p-3 rounded">
            <strong className="text-red-800">Private attributes:</strong> Hidden from outside access, require getter/setter methods
          </div>
        </div>
      </div>

      {/* Interactive Class Diagram */}
      <div className="mb-6">
        <h4 className="font-semibold mb-4">Interactive Student Class</h4>
        
        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
          {/* Class Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
            <h5 className="text-xl font-bold">Student</h5>
            <p className="text-sm text-gray-600">Click lock icons to toggle visibility</p>
          </div>

          {/* Attributes Section */}
          <div className="mb-6">
            <h6 className="font-semibold mb-3 text-gray-700">Attributes:</h6>
            <div className="space-y-3">
              {attributes.map((attr) => (
                <div key={attr.name} className={`p-3 rounded-lg border-2 transition-all ${getVisibilityColor(attr.visibility)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleVisibility(attr.name)}
                        className={`p-1 rounded transition-colors ${
                          attr.visibility === 'private' 
                            ? 'hover:bg-red-200 text-red-600' 
                            : 'hover:bg-green-200 text-green-600'
                        }`}
                        title={`Click to make ${attr.visibility === 'private' ? 'public' : 'private'}`}
                      >
                        {getVisibilityIcon(attr.visibility)}
                      </button>
                      
                      <div className="flex-1">
                        <div className="font-mono text-sm">
                          <span className={`font-semibold ${getTextColor(attr.visibility)}`}>
                            {attr.visibility === 'private' ? '-' : '+'}
                          </span>
                          <span className="ml-2">{attr.name}: {attr.type}</span>
                          {(showAllValues || attr.visibility === 'public') && (
                            <span className="ml-2 text-gray-600">= "{attr.value}"</span>
                          )}
                          {(attr.visibility === 'private' && !showAllValues) && (
                            <span className="ml-2 text-red-600">= [HIDDEN]</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedAttribute(selectedAttribute === attr.name ? null : attr.name)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="More info"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Attribute Description */}
                  {selectedAttribute === attr.name && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <p className="text-sm text-gray-700">{attr.description}</p>
                      <div className="mt-2 text-xs text-gray-600">
                        <strong>Current visibility:</strong> {attr.visibility}
                        {attr.visibility === 'private' && (
                          <span className="ml-2 text-red-600">
                            (Requires getter/setter methods to access)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Methods Section */}
          <div className="border-t-2 border-gray-300 pt-4">
            <h6 className="font-semibold mb-3 text-gray-700">Methods:</h6>
            <div className="space-y-2 font-mono text-sm">
              <div className="text-green-700">+ getName(): String</div>
              <div className="text-green-700">+ getAge(): Integer</div>
              <div className="text-green-700">+ getStudentId(): String</div>
              <div className="text-red-700">- setPassword(newPassword: String): void</div>
              <div className="text-red-700">- getBankBalance(): Double</div>
              <div className="text-red-700">- updateBalance(amount: Double): void</div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Code Example</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {/* What Works */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-800 mb-2 flex items-center">
              <Unlock className="w-4 h-4 mr-1" />
              Valid Access (Public)
            </h5>
            <pre className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
              <code>{`student = new Student()
student.name = "Alice"     ✓
student.age = 18          ✓  
student.studentId = "ST001" ✓

PRINT student.name        ✓
// Direct access allowed`}</code>
            </pre>
          </div>

          {/* What Doesn't Work */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h5 className="font-semibold text-red-800 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-1" />
              Invalid Access (Private)
            </h5>
            <pre className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm overflow-x-auto">
              <code>{`// These will cause errors:
student.password = "new"   ✗
student.bankBalance = 1000 ✗
PRINT student.password    ✗

// Use methods instead:
student.setPassword("new") ✓
balance = student.getBalance() ✓`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2">Benefits of Encapsulation</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2 text-amber-700">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <strong>Data Security:</strong> Sensitive information is protected
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <strong>Controlled Access:</strong> Methods can validate data before changes
            </li>
          </ul>
          <ul className="space-y-2 text-amber-700">
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <strong>Maintainability:</strong> Internal implementation can change without affecting external code
            </li>
            <li className="flex items-start">
              <span className="text-amber-600 mr-2">•</span>
              <strong>Debugging:</strong> Easier to track where data is modified
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EncapsulationDemo;
import React, { useState } from 'react';
import { Plus, X, Check, AlertTriangle, FileText, Download } from 'lucide-react';

interface TestCase {
  id: string;
  type: 'normal' | 'boundary' | 'invalid';
  input: string;
  expectedOutput: string;
  description: string;
  rationale: string;
}

interface TestCaseBuilderProps {
  title?: string;
}

export const TestCaseBuilder: React.FC<TestCaseBuilderProps> = ({
  title = "Test Case Builder"
}) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTestCase, setNewTestCase] = useState<Omit<TestCase, 'id'>>({
    type: 'normal',
    input: '',
    expectedOutput: '',
    description: '',
    rationale: ''
  });

  const testTypeInfo = {
    normal: {
      color: 'bg-green-50 border-green-200 text-green-800',
      badge: 'bg-green-100 text-green-800',
      icon: <Check className="w-4 h-4" />,
      description: 'Expected inputs that should work correctly'
    },
    boundary: {
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800', 
      badge: 'bg-yellow-100 text-yellow-800',
      icon: <AlertTriangle className="w-4 h-4" />,
      description: 'Edge cases at limits of valid input ranges'
    },
    invalid: {
      color: 'bg-red-50 border-red-200 text-red-800',
      badge: 'bg-red-100 text-red-800', 
      icon: <X className="w-4 h-4" />,
      description: 'Invalid inputs that should be rejected'
    }
  };

  const addTestCase = () => {
    if (!newTestCase.input.trim() || !newTestCase.expectedOutput.trim()) return;
    
    const testCase: TestCase = {
      ...newTestCase,
      id: Date.now().toString()
    };
    
    setTestCases([...testCases, testCase]);
    setNewTestCase({
      type: 'normal',
      input: '',
      expectedOutput: '',
      description: '',
      rationale: ''
    });
    setShowForm(false);
  };

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const getCoverageAnalysis = () => {
    const normal = testCases.filter(tc => tc.type === 'normal').length;
    const boundary = testCases.filter(tc => tc.type === 'boundary').length;
    const invalid = testCases.filter(tc => tc.type === 'invalid').length;
    
    const total = testCases.length;
    const hasAllTypes = normal > 0 && boundary > 0 && invalid > 0;
    
    return { normal, boundary, invalid, total, hasAllTypes };
  };

  const exportTestCases = () => {
    const coverage = getCoverageAnalysis();
    const exportData = {
      testSuite: title,
      generatedDate: new Date().toISOString().split('T')[0],
      coverage,
      testCases: testCases.map(tc => ({
        type: tc.type,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        description: tc.description,
        rationale: tc.rationale
      }))
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'test-cases.json';
    link.click();
  };

  const coverage = getCoverageAnalysis();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          {testCases.length > 0 && (
            <button
              onClick={exportTestCases}
              className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Test Case
          </button>
        </div>
      </div>

      {/* Test Type Guide */}
      <div className="mb-6 grid md:grid-cols-3 gap-4">
        {Object.entries(testTypeInfo).map(([type, info]) => (
          <div key={type} className={`p-3 rounded-lg border ${info.color}`}>
            <div className="flex items-center mb-2">
              {info.icon}
              <span className="ml-2 font-semibold capitalize">{type} Tests</span>
            </div>
            <p className="text-sm">{info.description}</p>
          </div>
        ))}
      </div>

      {/* Add Test Case Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold mb-3">Add New Test Case</h4>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newTestCase.type}
                  onChange={(e) => setNewTestCase({...newTestCase, type: e.target.value as TestCase['type']})}
                >
                  <option value="normal">Normal Test</option>
                  <option value="boundary">Boundary Test</option>
                  <option value="invalid">Invalid Test</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of test case"
                  value={newTestCase.description}
                  onChange={(e) => setNewTestCase({...newTestCase, description: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Input Value</label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Test input value"
                  value={newTestCase.input}
                  onChange={(e) => setNewTestCase({...newTestCase, input: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Expected result"
                  value={newTestCase.expectedOutput}
                  onChange={(e) => setNewTestCase({...newTestCase, expectedOutput: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rationale</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Why is this test case important?"
                rows={2}
                value={newTestCase.rationale}
                onChange={(e) => setNewTestCase({...newTestCase, rationale: e.target.value})}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addTestCase}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                disabled={!newTestCase.input.trim() || !newTestCase.expectedOutput.trim()}
              >
                Add Test Case
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Coverage Analysis */}
      {testCases.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Test Coverage Analysis</h4>
          <div className="grid md:grid-cols-4 gap-4 mb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{coverage.total}</div>
              <div className="text-sm text-blue-600">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{coverage.normal}</div>
              <div className="text-sm text-green-600">Normal</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{coverage.boundary}</div>
              <div className="text-sm text-yellow-600">Boundary</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{coverage.invalid}</div>
              <div className="text-sm text-red-600">Invalid</div>
            </div>
          </div>
          
          <div className={`p-2 rounded text-sm ${coverage.hasAllTypes ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {coverage.hasAllTypes ? (
              <>✓ Complete coverage: All test types represented</>
            ) : (
              <>⚠ Incomplete coverage: Add more test types for better validation</>
            )}
          </div>
        </div>
      )}

      {/* Test Cases List */}
      {testCases.length > 0 ? (
        <div className="space-y-3">
          <h4 className="font-semibold">Test Cases ({testCases.length})</h4>
          {testCases.map((testCase) => {
            const typeInfo = testTypeInfo[testCase.type];
            return (
              <div key={testCase.id} className={`p-4 rounded-lg border ${typeInfo.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeInfo.badge}`}>
                      {testCase.type.toUpperCase()}
                    </span>
                    <span className="font-medium">{testCase.description}</span>
                  </div>
                  <button
                    onClick={() => removeTestCase(testCase.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Input:</strong> <code className="bg-gray-100 px-1 rounded">{testCase.input}</code>
                  </div>
                  <div>
                    <strong>Expected:</strong> <code className="bg-gray-100 px-1 rounded">{testCase.expectedOutput}</code>
                  </div>
                </div>
                
                {testCase.rationale && (
                  <div className="mt-2 text-sm">
                    <strong>Rationale:</strong> {testCase.rationale}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No test cases created yet.</p>
          <p className="text-sm">Click "Add Test Case" to start building your test suite.</p>
        </div>
      )}
    </div>
  );
};

export default TestCaseBuilder;
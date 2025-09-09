import React, { useState } from 'react';
import { Plus, X, Database, Download, Check, AlertTriangle } from 'lucide-react';

interface DataField {
  id: string;
  name: string;
  type: string;
  length: string;
  description: string;
  validationRules: string[];
  required: boolean;
}

interface DictionaryBuilderProps {
  title?: string;
}

export const DictionaryBuilder: React.FC<DictionaryBuilderProps> = ({
  title = "Data Dictionary Builder"
}) => {
  const [fields, setFields] = useState<DataField[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [newField, setNewField] = useState<Omit<DataField, 'id'>>({
    name: '',
    type: 'String',
    length: '',
    description: '',
    validationRules: [],
    required: false
  });

  const dataTypes = [
    'String', 'Integer', 'Double', 'Boolean', 'Date', 'Time', 'DateTime'
  ];

  const commonValidations = [
    'Not null', 'Unique', 'Email format', 'Phone format', 'Positive numbers only',
    'Length range', 'Date range', 'Alphanumeric only', 'No spaces'
  ];

  const addField = () => {
    if (!newField.name.trim()) return;
    
    const field: DataField = {
      ...newField,
      id: Date.now().toString(),
      validationRules: [...newField.validationRules]
    };
    
    setFields([...fields, field]);
    setNewField({
      name: '',
      type: 'String',
      length: '',
      description: '',
      validationRules: [],
      required: false
    });
    setShowForm(false);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleCard = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const addValidationRule = (rule: string) => {
    if (!newField.validationRules.includes(rule)) {
      setNewField({
        ...newField,
        validationRules: [...newField.validationRules, rule]
      });
    }
  };

  const removeValidationRule = (rule: string) => {
    setNewField({
      ...newField,
      validationRules: newField.validationRules.filter(r => r !== rule)
    });
  };

  const exportDictionary = () => {
    const exportData = {
      datasetName: "Generated Data Dictionary",
      createdDate: new Date().toISOString().split('T')[0],
      fields: fields.map(field => ({
        fieldName: field.name,
        dataType: field.type,
        length: field.length,
        description: field.description,
        required: field.required,
        validationRules: field.validationRules
      }))
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-dictionary.json';
    link.click();
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'String': 'bg-blue-100 text-blue-800',
      'Integer': 'bg-green-100 text-green-800',
      'Double': 'bg-purple-100 text-purple-800',
      'Boolean': 'bg-yellow-100 text-yellow-800',
      'Date': 'bg-pink-100 text-pink-800',
      'Time': 'bg-indigo-100 text-indigo-800',
      'DateTime': 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Database className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          {fields.length > 0 && (
            <button
              onClick={exportDictionary}
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
            Add Field
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-800 mb-2">What is a Data Dictionary?</h4>
        <p className="text-blue-700 text-sm">
          A data dictionary is a systematic catalog that describes the structure, relationships, and constraints 
          of data elements in a database or system. It ensures consistency and provides documentation for developers and stakeholders.
        </p>
      </div>

      {/* Add Field Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold mb-4">Add New Field</h4>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) => setNewField({...newField, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., customerEmail"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField({...newField, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {dataTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length/Size</label>
                <input
                  type="text"
                  value={newField.length}
                  onChange={(e) => setNewField({...newField, length: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 255, 10,2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newField.description}
                onChange={(e) => setNewField({...newField, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the purpose and usage of this field"
                rows={2}
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required}
                  onChange={(e) => setNewField({...newField, required: e.target.checked})}
                  className="mr-2"
                />
                <label htmlFor="required" className="text-sm font-medium text-gray-700">Required Field</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Validation Rules</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {commonValidations.map(validation => (
                  <button
                    key={validation}
                    onClick={() => addValidationRule(validation)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      newField.validationRules.includes(validation)
                        ? 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {validation}
                  </button>
                ))}
              </div>
              
              {newField.validationRules.length > 0 && (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-700">Selected rules:</div>
                  <div className="flex flex-wrap gap-1">
                    {newField.validationRules.map(rule => (
                      <span
                        key={rule}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {rule}
                        <button
                          onClick={() => removeValidationRule(rule)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addField}
                disabled={!newField.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fields Display */}
      {fields.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Data Dictionary ({fields.length} fields)</h4>
            <div className="text-sm text-gray-600">
              Click cards to see validation rules
            </div>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Field Name</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Type</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Length</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Required</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Description</th>
                  <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field) => (
                  <tr key={field.id}>
                    <td className="border border-gray-300 px-3 py-2 font-mono text-sm">{field.name}</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(field.type)}`}>
                        {field.type}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">{field.length || '—'}</td>
                    <td className="border border-gray-300 px-3 py-2">
                      {field.required ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">{field.description}</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <button
                        onClick={() => removeField(field.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View */}
          <div>
            <h5 className="font-semibold mb-3">Flip Cards View (Validation Rules)</h5>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="relative h-40 cursor-pointer"
                  onClick={() => toggleCard(field.id)}
                >
                  <div className={`absolute inset-0 w-full h-full transition-transform duration-500 preserve-3d ${
                    flippedCards.has(field.id) ? 'rotate-y-180' : ''
                  }`}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(field.type)}`}>
                          {field.type}
                        </span>
                        {field.required && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                      <h6 className="font-semibold font-mono text-sm mb-2">{field.name}</h6>
                      <p className="text-xs text-gray-600 line-clamp-3">{field.description}</p>
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        Click to flip
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 overflow-y-auto">
                      <h6 className="font-semibold mb-3 text-blue-800">Validation Rules</h6>
                      {field.validationRules.length > 0 ? (
                        <ul className="space-y-1">
                          {field.validationRules.map((rule, index) => (
                            <li key={index} className="text-xs text-blue-700 flex items-start">
                              <span className="text-blue-500 mr-1">•</span>
                              {rule}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-blue-600 italic">No validation rules specified</p>
                      )}
                      <div className="absolute bottom-2 right-2 text-xs text-blue-400">
                        Click to flip
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <Database className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h4 className="text-lg font-semibold mb-2">No Fields Added Yet</h4>
          <p className="text-sm mb-4">Start building your data dictionary by adding field definitions.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Field
          </button>
        </div>
      )}
    </div>
  );
};

export default DictionaryBuilder;
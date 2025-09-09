import React, { useState } from 'react';
import { Play, Plus, Minus, RotateCcw, Layers, ArrowRight, ArrowDown } from 'lucide-react';

interface StackItem {
  id: string;
  value: string;
  timestamp: number;
}

interface QueueItem {
  id: string;
  value: string;
  timestamp: number;
}

interface ListItem {
  id: string;
  value: string;
  timestamp: number;
}

type DataStructureType = 'stack' | 'queue' | 'list';

interface DataStructureVisualizerProps {
  title?: string;
}

export const DataStructureVisualizer: React.FC<DataStructureVisualizerProps> = ({
  title = "Data Structure Visualizer"
}) => {
  const [activeStructure, setActiveStructure] = useState<DataStructureType>('stack');
  const [stack, setStack] = useState<StackItem[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [list, setList] = useState<ListItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [animating, setAnimating] = useState<string | null>(null);

  // Stack Operations
  const pushToStack = () => {
    if (!inputValue.trim()) return;
    
    const newItem: StackItem = {
      id: Date.now().toString(),
      value: inputValue.trim(),
      timestamp: Date.now()
    };
    
    setAnimating(newItem.id);
    setTimeout(() => {
      setStack(prev => [...prev, newItem]);
      setAnimating(null);
      setInputValue('');
    }, 300);
  };

  const popFromStack = () => {
    if (stack.length === 0) return;
    
    const topItem = stack[stack.length - 1];
    setAnimating(topItem.id);
    
    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setAnimating(null);
    }, 300);
  };

  // Queue Operations
  const enqueue = () => {
    if (!inputValue.trim()) return;
    
    const newItem: QueueItem = {
      id: Date.now().toString(),
      value: inputValue.trim(),
      timestamp: Date.now()
    };
    
    setAnimating(newItem.id);
    setTimeout(() => {
      setQueue(prev => [...prev, newItem]);
      setAnimating(null);
      setInputValue('');
    }, 300);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    
    const frontItem = queue[0];
    setAnimating(frontItem.id);
    
    setTimeout(() => {
      setQueue(prev => prev.slice(1));
      setAnimating(null);
    }, 300);
  };

  // List Operations
  const addToList = () => {
    if (!inputValue.trim()) return;
    
    const newItem: ListItem = {
      id: Date.now().toString(),
      value: inputValue.trim(),
      timestamp: Date.now()
    };
    
    setAnimating(newItem.id);
    setTimeout(() => {
      setList(prev => [...prev, newItem]);
      setAnimating(null);
      setInputValue('');
    }, 300);
  };

  const removeFromList = (index: number) => {
    if (index < 0 || index >= list.length) return;
    
    const itemToRemove = list[index];
    setAnimating(itemToRemove.id);
    
    setTimeout(() => {
      setList(prev => prev.filter((_, i) => i !== index));
      setAnimating(null);
    }, 300);
  };

  const clearAll = () => {
    setStack([]);
    setQueue([]);
    setList([]);
    setInputValue('');
    setAnimating(null);
  };


  const structures = [
    { id: 'list', name: 'List (Array)', icon: <Layers className="w-4 h-4" />, color: 'bg-orange-100 text-orange-800' },
    { id: 'stack', name: 'Stack (LIFO)', icon: <Layers className="w-4 h-4" />, color: 'bg-green-100 text-green-800' },
    { id: 'queue', name: 'Queue (FIFO)', icon: <ArrowRight className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Layers className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <button
          onClick={clearAll}
          className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Clear All
        </button>
      </div>

      {/* Structure Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Choose Data Structure:</h4>
        <div className="flex flex-wrap gap-2">
          {structures.map((structure) => (
            <button
              key={structure.id}
              onClick={() => setActiveStructure(structure.id as DataStructureType)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeStructure === structure.id
                  ? 'bg-blue-600 text-white'
                  : `${structure.color} hover:opacity-80`
              }`}
            >
              {structure.icon}
              <span className="ml-2">{structure.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter value to ${activeStructure === 'list' ? 'add' : activeStructure === 'stack' ? 'push' : 'enqueue'}`}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                if (activeStructure === 'list') addToList();
                else if (activeStructure === 'stack') pushToStack();
                else if (activeStructure === 'queue') enqueue();
              }
            }}
          />
          
          {activeStructure === 'stack' && (
            <>
              <button
                onClick={pushToStack}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-gray-300"
              >
                Push
              </button>
              <button
                onClick={popFromStack}
                disabled={stack.length === 0}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:bg-gray-300"
              >
                Pop
              </button>
            </>
          )}
          
          {activeStructure === 'queue' && (
            <>
              <button
                onClick={enqueue}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              >
                Enqueue
              </button>
              <button
                onClick={dequeue}
                disabled={queue.length === 0}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:bg-gray-300"
              >
                Dequeue
              </button>
            </>
          )}
          
          {activeStructure === 'list' && (
            <button
              onClick={addToList}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors disabled:bg-gray-300"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {/* Visualization Area */}
      <div className="min-h-64 p-6 bg-gray-50 rounded-lg border">
        {activeStructure === 'list' && (
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4 text-orange-800">List (Array) with Index Access</h4>
            {list.length === 0 ? (
              <div className="text-gray-500 text-center">
                <p>List is empty</p>
                <p className="text-sm">Add items to see the list visualization</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-1">
                  {list.map((item, index) => (
                    <div key={item.id} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">Index {index}</div>
                      <div
                        className={`w-16 h-12 bg-orange-200 border-2 border-orange-400 rounded flex items-center justify-center font-medium text-sm transition-all duration-300 relative ${
                          animating === item.id ? 'scale-110 bg-orange-300' : ''
                        }`}
                      >
                        {item.value}
                        <button
                          onClick={() => removeFromList(index)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 text-center">
                  Length: {list.length} | Access any item by index: list[0], list[1], etc.
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeStructure === 'stack' && (
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4 text-green-800">Stack (Last In, First Out)</h4>
            {stack.length === 0 ? (
              <div className="text-gray-500 text-center">
                <p>Stack is empty</p>
                <p className="text-sm">Add items to see the stack visualization</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-gray-600 mb-2">↑ Top (Pop from here)</div>
                {stack.slice().reverse().map((item, index) => (
                  <div
                    key={item.id}
                    className={`w-32 h-10 bg-green-200 border-2 border-green-400 rounded flex items-center justify-center font-medium transition-all duration-300 ${
                      animating === item.id ? 'scale-110 bg-green-300' : ''
                    } ${index === 0 ? 'ring-2 ring-green-500' : ''}`}
                  >
                    {item.value}
                  </div>
                ))}
                <div className="text-sm text-gray-600 mt-2">↓ Bottom (Push here)</div>
              </div>
            )}
          </div>
        )}

        {activeStructure === 'queue' && (
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4 text-blue-800">Queue (First In, First Out)</h4>
            {queue.length === 0 ? (
              <div className="text-gray-500 text-center">
                <p>Queue is empty</p>
                <p className="text-sm">Add items to see the queue visualization</p>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-600 mr-4">Dequeue →</div>
                {queue.map((item, index) => (
                  <div
                    key={item.id}
                    className={`w-16 h-10 bg-blue-200 border-2 border-blue-400 rounded flex items-center justify-center font-medium text-sm transition-all duration-300 ${
                      animating === item.id ? 'scale-110 bg-blue-300' : ''
                    } ${index === 0 ? 'ring-2 ring-red-500' : index === queue.length - 1 ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    {item.value}
                  </div>
                ))}
                <div className="text-sm text-gray-600 ml-4">← Enqueue</div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Information Panel */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2">
          {activeStructure === 'list' && 'List Properties'}
          {activeStructure === 'stack' && 'Stack Properties'}
          {activeStructure === 'queue' && 'Queue Properties'}
        </h4>
        <div className="text-sm text-amber-700">
          {activeStructure === 'list' && (
            <ul className="space-y-1">
              <li>• <strong>Index Access:</strong> Access any element directly by its position (index)</li>
              <li>• <strong>Operations:</strong> Add (append), Remove (by index), Access (by index)</li>
              <li>• <strong>Use cases:</strong> Storing collections, shopping lists, student rosters</li>
              <li>• <strong>Current size:</strong> {list.length} items</li>
            </ul>
          )}
          {activeStructure === 'stack' && (
            <ul className="space-y-1">
              <li>• <strong>LIFO:</strong> Last In, First Out - newest item is removed first</li>
              <li>• <strong>Operations:</strong> Push (add to top), Pop (remove from top)</li>
              <li>• <strong>Use cases:</strong> Function calls, undo operations, expression evaluation</li>
              <li>• <strong>Current size:</strong> {stack.length} items</li>
            </ul>
          )}
          {activeStructure === 'queue' && (
            <ul className="space-y-1">
              <li>• <strong>FIFO:</strong> First In, First Out - oldest item is removed first</li>
              <li>• <strong>Operations:</strong> Enqueue (add to rear), Dequeue (remove from front)</li>
              <li>• <strong>Use cases:</strong> Print queues, task scheduling, breadth-first search</li>
              <li>• <strong>Current size:</strong> {queue.length} items</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataStructureVisualizer;
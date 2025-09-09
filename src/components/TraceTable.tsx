import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Pause, RotateCcw, FastForward, Maximize, Minimize } from 'lucide-react';

interface ExecutionStep {
  lineIndex: number;
  statement: string;
  variables: Record<string, string | number>;
  explanation?: string;
}

interface TraceTableProps {
  algorithm: string[];
  executionSteps: ExecutionStep[];
  title?: string;
}

export const TraceTable: React.FC<TraceTableProps> = ({ 
  algorithm, 
  executionSteps,
  title = "Algorithm Execution Trace" 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // milliseconds between steps
  const [viewMode, setViewMode] = useState<'algorithm' | 'table'>('algorithm');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const variableNames = executionSteps?.length > 0 ? Object.keys(executionSteps[0]?.variables || {}) : [];
  const currentExecution = executionSteps?.[currentStep] || executionSteps?.[0] || { lineIndex: 0, statement: '', variables: {} };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && executionSteps?.length && currentStep < (executionSteps?.length - 1)) {
      interval = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (executionSteps?.length && currentStep >= (executionSteps?.length - 1)) {
      setIsPlaying(false);
    }
    return () => clearTimeout(interval);
  }, [currentStep, isPlaying, speed, executionSteps?.length]);

  const handlePlayPause = () => {
    if (executionSteps?.length && currentStep >= (executionSteps?.length - 1)) {
      handleReset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextStep = () => {
    if (executionSteps?.length && currentStep < (executionSteps?.length - 1)) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <>
      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="h-full flex flex-col p-4">
            {/* Fullscreen Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold flex items-center">
                <Play className="w-5 h-5 mr-2 text-blue-600" />
                {title} - Full Screen
              </h3>
              <div className="flex items-center space-x-4">
                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <div className="flex bg-gray-200 rounded-md">
                    <button
                      onClick={() => setViewMode('algorithm')}
                      className={`px-3 py-1 text-sm font-medium rounded-l-md transition-colors ${
                        viewMode === 'algorithm' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Algorithm
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-1 text-sm font-medium rounded-r-md transition-colors ${
                        viewMode === 'table' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Table
                    </button>
                  </div>
                </div>
                
                <span className="text-sm text-gray-600">
                  Step {currentStep + 1} of {executionSteps?.length || 0}
                </span>
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Reset animation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Exit fullscreen"
                >
                  <Minimize className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Fullscreen Content */}
            <div className="flex-1 overflow-hidden">
              {viewMode === 'table' ? (
                <div className="h-full flex gap-4">
                  {/* Algorithm Side */}
                  <div className="w-1/2 flex flex-col">
                    <h4 className="font-semibold text-gray-800 mb-3">Algorithm Execution</h4>
                    <div className="flex-1 bg-gray-50 border border-gray-300 p-3 rounded-lg font-mono text-sm overflow-auto">
                      <pre className="whitespace-pre-wrap">
                        {algorithm.map((line, index) => (
                          <div 
                            key={index} 
                            className={`leading-relaxed text-gray-800 transition-all duration-300 ${
                              currentExecution.lineIndex === index 
                                ? 'bg-blue-200 px-2 py-1 rounded font-semibold border-l-4 border-blue-500' 
                                : 'px-2 py-1'
                            }`}
                          >
                            <span className="text-gray-500 mr-3 select-none">{String(index + 1).padStart(2, '0')}</span>
                            {line}
                          </div>
                        ))}
                      </pre>
                    </div>
                    
                    {/* Current Execution Info */}
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-3">
                      <h5 className="font-semibold text-blue-800 mb-1">Current Execution</h5>
                      <p className="text-blue-700 text-sm mb-1">
                        <strong>Line {currentExecution.lineIndex + 1}:</strong> {currentExecution.statement}
                      </p>
                      {currentExecution.explanation && (
                        <p className="text-blue-600 text-xs italic">
                          {currentExecution.explanation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Table Side */}
                  <div className="w-1/2 flex flex-col">
                    <h4 className="font-semibold text-gray-800 mb-3">Execution Table</h4>
                    <div className="flex-1 overflow-auto border border-gray-300 rounded-lg">
                      <table className="w-full border-collapse bg-white">
                        <thead className="sticky top-0">
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left font-semibold text-sm">Step</th>
                            <th className="border border-gray-300 p-2 text-left font-semibold text-sm">Line</th>
                            <th className="border border-gray-300 p-2 text-left font-semibold text-sm">Statement</th>
                            {variableNames.map((varName) => (
                              <th key={varName} className="border border-gray-300 p-2 text-left font-semibold text-sm">{varName}</th>
                            ))}
                            <th className="border border-gray-300 p-2 text-left font-semibold text-sm">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {executionSteps?.slice(0, currentStep + 1).map((step, index) => (
                            <tr 
                              key={index} 
                              className={`transition-all duration-500 ${
                                index === currentStep 
                                  ? 'bg-blue-100 border-l-4 border-l-blue-500' 
                                  : index < currentStep 
                                    ? 'bg-green-50' 
                                    : 'bg-white'
                              }`}
                            >
                              <td className="border border-gray-300 p-2 font-mono font-semibold text-sm">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 p-2 font-mono text-sm">
                                {step.lineIndex + 1}
                              </td>
                              <td className="border border-gray-300 p-2 font-mono text-xs">
                                {step.statement}
                              </td>
                              {variableNames.map((varName) => (
                                <td key={varName} className="border border-gray-300 p-2 font-mono">
                                  <span className={`px-1 py-1 rounded text-xs ${
                                    step.variables[varName] !== '' && step.variables[varName] !== undefined
                                      ? 'bg-green-100 text-green-800 border border-green-300'
                                      : 'bg-gray-100 text-gray-500'
                                  }`}>
                                    {step.variables[varName] === '' || step.variables[varName] === undefined 
                                      ? '—' 
                                      : String(step.variables[varName])}
                                  </span>
                                </td>
                              ))}
                              <td className="border border-gray-300 p-2 text-xs text-gray-600">
                                {step.explanation || ''}
                              </td>
                            </tr>
                          )) || []}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Algorithm view in fullscreen */
                <div className="h-full grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-gray-800">Algorithm Execution</h4>
                    <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg font-mono text-sm h-96 overflow-auto">
                      <pre className="whitespace-pre-wrap">
                        {algorithm.map((line, index) => (
                          <div 
                            key={index} 
                            className={`leading-relaxed text-gray-800 transition-all duration-300 ${
                              currentExecution.lineIndex === index 
                                ? 'bg-blue-200 px-3 py-2 rounded font-semibold border-l-4 border-blue-500' 
                                : 'px-3 py-2'
                            }`}
                          >
                            <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                            {line}
                          </div>
                        ))}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Variable States</h4>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg">
                      {variableNames.map((variable, index) => (
                        <div 
                          key={variable} 
                          className={`px-4 py-3 ${index !== variableNames.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">{variable}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-3 py-1 rounded font-mono text-sm transition-all duration-300 ${
                                currentExecution.variables[variable] !== '' && currentExecution.variables[variable] !== undefined
                                  ? 'bg-green-100 text-green-800 border border-green-300'
                                  : 'bg-gray-100 text-gray-500 border border-gray-300'
                              }`}>
                                {currentExecution.variables[variable] === '' || currentExecution.variables[variable] === undefined 
                                  ? '—' 
                                  : String(currentExecution.variables[variable])}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fullscreen Controls */}
            <div className="flex items-center justify-between pt-4 bg-gray-50 p-4 rounded-lg mt-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handlePlayPause}
                  className={`flex items-center px-4 py-2 rounded transition-colors ${
                    isPlaying 
                      ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-1" />
                      {executionSteps?.length && currentStep >= (executionSteps?.length - 1) ? 'Restart' : 'Play'}
                    </>
                  )}
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!executionSteps?.length || currentStep >= (executionSteps?.length - 1)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>

              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">Speed:</span>
                <select
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value={2000}>Slow</option>
                  <option value={1000}>Normal</option>
                  <option value={500}>Fast</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Component */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Play className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex bg-gray-200 rounded-md">
              <button
                onClick={() => setViewMode('algorithm')}
                className={`px-3 py-1 text-sm font-medium rounded-l-md transition-colors ${
                  viewMode === 'algorithm' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Algorithm
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 text-sm font-medium rounded-r-md transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Table
              </button>
            </div>
          </div>
          
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {executionSteps?.length || 0}
          </span>
          <button
            onClick={handleReset}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Reset animation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {viewMode === 'table' && (
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
              title="Open fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {viewMode === 'algorithm' ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Algorithm Display */}
          <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold text-gray-800">Algorithm Execution</h4>
          <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap">
              {algorithm.map((line, index) => (
                <div 
                  key={index} 
                  className={`leading-relaxed text-gray-800 transition-all duration-300 ${
                    currentExecution.lineIndex === index 
                      ? 'bg-blue-200 px-3 py-2 rounded font-semibold border-l-4 border-blue-500' 
                      : 'px-3 py-2'
                  }`}
                >
                  <span className="text-gray-500 mr-4 select-none">{String(index + 1).padStart(2, '0')}</span>
                  {line}
                </div>
              ))}
            </pre>
          </div>

          {/* Current Execution Info */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2">Current Execution</h5>
            <p className="text-blue-700 text-sm mb-2">
              <strong>Line {currentExecution.lineIndex + 1}:</strong> {currentExecution.statement}
            </p>
            {currentExecution.explanation && (
              <p className="text-blue-600 text-xs italic">
                {currentExecution.explanation}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handlePlayPause}
                className={`flex items-center px-4 py-2 rounded transition-colors ${
                  isPlaying 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    {executionSteps?.length && currentStep >= (executionSteps?.length - 1) ? 'Restart' : 'Play'}
                  </>
                )}
              </button>
              <button
                onClick={handleNextStep}
                disabled={!executionSteps?.length || currentStep >= (executionSteps?.length - 1)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            {/* Speed Control */}
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value={2000}>Slow</option>
                <option value={1000}>Normal</option>
                <option value={500}>Fast</option>
              </select>
            </div>
          </div>
        </div>

        {/* Variable State Display */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Variable States</h4>
          
          <div className="bg-gray-50 border border-gray-300 rounded-lg">
            {variableNames.map((variable, index) => (
              <div 
                key={variable} 
                className={`px-4 py-3 ${index !== variableNames.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{variable}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded font-mono text-sm transition-all duration-300 ${
                      currentExecution.variables[variable] !== '' && currentExecution.variables[variable] !== undefined
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-500 border border-gray-300'
                    }`}>
                      {currentExecution.variables[variable] === '' || currentExecution.variables[variable] === undefined 
                        ? '—' 
                        : String(currentExecution.variables[variable])}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Execution Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h5 className="font-semibold text-gray-800 mb-3">Execution Progress</h5>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${executionSteps?.length ? ((currentStep + 1) / executionSteps?.length) * 100 : 0}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              Completed {currentStep + 1} of {executionSteps?.length || 0} steps
            </p>
          </div>
        </div>
        </div>
      ) : (
        /* Table View */
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Execution Table</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left font-semibold">Step</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Line</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Statement</th>
                  {variableNames.map((varName) => (
                    <th key={varName} className="border border-gray-300 p-3 text-left font-semibold">{varName}</th>
                  ))}
                  <th className="border border-gray-300 p-3 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {executionSteps?.slice(0, currentStep + 1).map((step, index) => (
                  <tr 
                    key={index} 
                    className={`transition-all duration-500 ${
                      index === currentStep 
                        ? 'bg-blue-100 border-l-4 border-l-blue-500' 
                        : index < currentStep 
                          ? 'bg-green-50' 
                          : 'bg-white'
                    }`}
                  >
                    <td className="border border-gray-300 p-3 font-mono font-semibold">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 p-3 font-mono">
                      {step.lineIndex + 1}
                    </td>
                    <td className="border border-gray-300 p-3 font-mono text-sm">
                      {step.statement}
                    </td>
                    {variableNames.map((varName) => (
                      <td key={varName} className="border border-gray-300 p-3 font-mono">
                        <span className={`px-2 py-1 rounded text-sm ${
                          step.variables[varName] !== '' && step.variables[varName] !== undefined
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {step.variables[varName] === '' || step.variables[varName] === undefined 
                            ? '—' 
                            : String(step.variables[varName])}
                        </span>
                      </td>
                    ))}
                    <td className="border border-gray-300 p-3 text-sm text-gray-600">
                      {step.explanation || ''}
                    </td>
                  </tr>
                )) || []}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Controls (shared between both views) */}
      <div className="flex items-center justify-between pt-4 bg-gray-50 p-4 rounded-lg mt-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handlePlayPause}
            className={`flex items-center px-4 py-2 rounded transition-colors ${
              isPlaying 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                {executionSteps?.length && currentStep >= (executionSteps?.length - 1) ? 'Restart' : 'Play'}
              </>
            )}
          </button>
          <button
            onClick={handleNextStep}
            disabled={!executionSteps?.length || currentStep >= (executionSteps?.length - 1)}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-600">Speed:</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          >
            <option value={2000}>Slow</option>
            <option value={1000}>Normal</option>
            <option value={500}>Fast</option>
          </select>
        </div>
      </div>
      </div>
    </>
  );
};

export default TraceTable;
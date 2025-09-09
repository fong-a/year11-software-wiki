import React, { useState } from 'react';
import { Calculator, BookOpen, ArrowRight } from 'lucide-react';

interface ConversionMethod {
  id: string;
  title: string;
  description: string;
}

const conversionMethods: ConversionMethod[] = [
  {
    id: 'mathematical',
    title: 'Mathematical Method',
    description: 'Division and remainder method using calculations'
  },
  {
    id: 'manual',
    title: 'Manual/Pen & Paper Method', 
    description: 'Using place values and bit positions visually'
  }
];

const ConversionExplorer: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('mathematical');
  const [conversionType, setConversionType] = useState<'binary' | 'hex'>('binary');
  const [inputNumber] = useState<number>(156);

  const renderMathematicalToBinary = (num: number) => {
    const steps = [];
    let current = num;
    
    while (current > 0) {
      const quotient = Math.floor(current / 2);
      const remainder = current % 2;
      steps.push({ division: `${current} ÷ 2 = ${quotient}`, remainder });
      current = quotient;
    }
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-blue-800">Converting {num} to Binary (Mathematical)</h4>
        <p className="text-sm text-gray-700">Divide by 2 repeatedly, keep track of remainders:</p>
        
        <div className="bg-white p-4 rounded border">
          {steps.map((step, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
              <span className="font-mono text-sm">{step.division}</span>
              <span className="font-bold text-blue-600">remainder: {step.remainder}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-blue-700 mb-2"><strong>Read remainders from bottom to top:</strong></p>
          <div className="font-mono text-lg text-center">
            {steps.reverse().map(step => step.remainder).join('')}₂
          </div>
        </div>
      </div>
    );
  };

  const renderManualToBinary = (num: number) => {
    const binaryPositions = [128, 64, 32, 16, 8, 4, 2, 1];
    const result = [];
    let remaining = num;
    
    for (const position of binaryPositions) {
      if (remaining >= position) {
        result.push(1);
        remaining -= position;
      } else {
        result.push(0);
      }
    }
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-blue-800">Converting {num} to Binary (Manual/Pen & Paper)</h4>
        <p className="text-sm text-gray-700">Write out the binary place values and fit the number in:</p>
        
        {/* Place values */}
        <div className="bg-white p-4 rounded border">
          <div className="text-xs text-gray-500 mb-2 text-center">Binary Place Values:</div>
          <div className="grid grid-cols-8 gap-2 mb-4">
            {binaryPositions.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 p-2 rounded text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
          
          {/* Step-by-step breakdown */}
          <div className="space-y-2 text-sm">
            <p><strong>Step 1:</strong> Can we fit 128 in {num}? {num >= 128 ? 'Yes → 1' : 'No → 0'}</p>
            {num >= 128 && <p className="ml-4">Remaining: {num} - 128 = {num - 128}</p>}
            
            <p><strong>Step 2:</strong> Can we fit 64 in {num >= 128 ? num - 128 : num}? {(num >= 128 ? num - 128 >= 64 : num >= 64) ? 'Yes → 1' : 'No → 0'}</p>
            {((num >= 128 && num - 128 >= 64) || (num < 128 && num >= 64)) && 
              <p className="ml-4">Remaining: {num >= 128 ? num - 128 - 64 : num - 64}</p>}
            
            <p className="text-gray-600">...continuing this process...</p>
          </div>
          
          {/* Final result */}
          <div className="mt-4 grid grid-cols-8 gap-2">
            {result.map((bit, index) => (
              <div key={index} className={`text-center p-2 rounded font-bold ${bit ? 'bg-blue-100 text-blue-800' : 'bg-gray-50 text-gray-500'}`}>
                {bit}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <span className="font-mono text-lg">{result.join('')}₂</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMathematicalToHex = (num: number) => {
    const steps = [];
    let current = num;
    
    while (current > 0) {
      const quotient = Math.floor(current / 16);
      const remainder = current % 16;
      const hexRemainder = remainder < 10 ? remainder.toString() : String.fromCharCode(65 + remainder - 10);
      steps.push({ division: `${current} ÷ 16 = ${quotient}`, remainder: hexRemainder });
      current = quotient;
    }
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-orange-800">Converting {num} to Hexadecimal (Mathematical)</h4>
        <p className="text-sm text-gray-700">Divide by 16 repeatedly, convert remainders to hex:</p>
        
        <div className="bg-white p-4 rounded border">
          {steps.map((step, index) => (
            <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
              <span className="font-mono text-sm">{step.division}</span>
              <span className="font-bold text-orange-600">remainder: {step.remainder}</span>
            </div>
          ))}
        </div>
        
        <div className="bg-orange-50 p-4 rounded">
          <p className="text-sm text-orange-700 mb-2"><strong>Hex conversion table:</strong></p>
          <div className="text-xs mb-2 font-mono">10=A, 11=B, 12=C, 13=D, 14=E, 15=F</div>
          <p className="text-sm text-orange-700 mb-2"><strong>Read remainders from bottom to top:</strong></p>
          <div className="font-mono text-lg text-center">
            {steps.reverse().map(step => step.remainder).join('')}₁₆
          </div>
        </div>
      </div>
    );
  };

  const renderManualToHex = (num: number) => {
    // First convert to 8-bit binary
    const binaryPositions = [128, 64, 32, 16, 8, 4, 2, 1];
    const binaryResult = [];
    let remaining = num;
    
    for (const position of binaryPositions) {
      if (remaining >= position) {
        binaryResult.push(1);
        remaining -= position;
      } else {
        binaryResult.push(0);
      }
    }
    
    // Split into two 4-bit groups
    const leftGroup = binaryResult.slice(0, 4);
    const rightGroup = binaryResult.slice(4, 8);
    
    // Convert each 4-bit group to hex
    const leftValue = leftGroup.reduce((sum, bit, index) => sum + bit * Math.pow(2, 3 - index), 0);
    const rightValue = rightGroup.reduce((sum, bit, index) => sum + bit * Math.pow(2, 3 - index), 0);
    
    const leftHex = leftValue < 10 ? leftValue.toString() : String.fromCharCode(65 + leftValue - 10);
    const rightHex = rightValue < 10 ? rightValue.toString() : String.fromCharCode(65 + rightValue - 10);
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-orange-800">Converting {num} to Hex (Manual/Pen & Paper)</h4>
        <p className="text-sm text-gray-700">Step 1: Convert to 8-bit binary, then split into 4-bit groups:</p>
        
        <div className="bg-white p-4 rounded border">
          <div className="text-center mb-4">
            <div className="font-mono text-lg mb-2">{binaryResult.join('')}₂</div>
            <ArrowRight className="w-4 h-4 mx-auto text-gray-400" />
          </div>
          
          <div className="flex justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Left 4 bits</div>
              <div className="grid grid-cols-4 gap-1">
                {leftGroup.map((bit, index) => (
                  <div key={index} className="bg-orange-100 text-orange-800 p-2 rounded font-mono text-center">
                    {bit}
                  </div>
                ))}
              </div>
              <div className="text-sm mt-1">= {leftValue} = {leftHex}</div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Right 4 bits</div>
              <div className="grid grid-cols-4 gap-1">
                {rightGroup.map((bit, index) => (
                  <div key={index} className="bg-orange-100 text-orange-800 p-2 rounded font-mono text-center">
                    {bit}
                  </div>
                ))}
              </div>
              <div className="text-sm mt-1">= {rightValue} = {rightHex}</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-orange-50 p-3 rounded">
              <div className="font-mono text-lg">{leftHex}{rightHex}₁₆</div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Remember the hex table:</strong> 0-9 stay the same, 10=A, 11=B, 12=C, 13=D, 14=E, 15=F
          </p>
        </div>
      </div>
    );
  };

  const renderConversion = () => {
    if (conversionType === 'binary') {
      return selectedMethod === 'mathematical' 
        ? renderMathematicalToBinary(inputNumber)
        : renderManualToBinary(inputNumber);
    } else {
      return selectedMethod === 'mathematical'
        ? renderMathematicalToHex(inputNumber)
        : renderManualToHex(inputNumber);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Number System Conversion Methods</h3>
        <p className="text-gray-600">
          Learn both calculation and visual methods for converting decimal numbers
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Conversion Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Convert to:</label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setConversionType('binary')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                conversionType === 'binary'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Binary (Base 2)
            </button>
            <button
              onClick={() => setConversionType('hex')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                conversionType === 'hex'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hexadecimal (Base 16)
            </button>
          </div>
        </div>

        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Method:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conversionMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === method.id 
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                    method.id === 'mathematical' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {method.id === 'mathematical' ? <Calculator className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  </div>
                  <h4 className="font-semibold text-sm">{method.title}</h4>
                </div>
                <p className="text-xs opacity-80">{method.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Example */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Example:</strong> Converting decimal <span className="font-mono text-lg">{inputNumber}</span> to {conversionType === 'binary' ? 'binary' : 'hexadecimal'}
        </p>
      </div>

      {/* Conversion Display */}
      <div className={`p-6 rounded-lg border-2 ${
        conversionType === 'binary' ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'
      }`}>
        {renderConversion()}
      </div>
    </div>
  );
};

export default ConversionExplorer;
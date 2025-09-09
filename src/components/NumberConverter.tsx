import React, { useState, useEffect } from 'react';
import { Calculator, RotateCcw, ArrowRight, Binary, Hash, HelpCircle } from 'lucide-react';

interface ConversionStep {
  step: number;
  operation: string;
  result: string;
  explanation: string;
}

interface NumberConverterProps {
  title?: string;
}

export const NumberConverter: React.FC<NumberConverterProps> = ({
  title = "Number Base Converter"
}) => {
  const [inputValue, setInputValue] = useState('42');
  const [inputBase, setInputBase] = useState<number>(10);
  const [results, setResults] = useState<{[key: number]: string}>({});
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [conversionSteps, setConversionSteps] = useState<ConversionStep[]>([]);
  const [animatingBase, setAnimatingBase] = useState<number | null>(null);

  const bases = [
    { value: 2, name: 'Binary', icon: <Binary className="w-4 h-4" />, color: 'bg-green-100 text-green-800' },
    { value: 10, name: 'Decimal', icon: <Calculator className="w-4 h-4" />, color: 'bg-blue-100 text-blue-800' },
    { value: 16, name: 'Hexadecimal', icon: <Hash className="w-4 h-4" />, color: 'bg-purple-100 text-purple-800' }
  ];

  useEffect(() => {
    convertNumber();
  }, [inputValue, inputBase]);

  const convertNumber = () => {
    try {
      // Parse input number from specified base
      const decimalValue = parseInt(inputValue, inputBase);
      
      if (isNaN(decimalValue)) {
        setResults({});
        setConversionSteps([]);
        return;
      }

      // Convert to all bases
      const newResults: {[key: number]: string} = {};
      newResults[2] = decimalValue.toString(2);
      newResults[8] = decimalValue.toString(8);
      newResults[10] = decimalValue.toString(10);
      newResults[16] = decimalValue.toString(16).toUpperCase();
      
      setResults(newResults);
      
      // Generate conversion steps for decimal to binary
      if (inputBase === 10) {
        generateBinarySteps(decimalValue);
      } else {
        generateDecimalSteps(inputValue, inputBase, decimalValue);
      }
    } catch (error) {
      setResults({});
      setConversionSteps([]);
    }
  };

  const generateBinarySteps = (decimal: number) => {
    const steps: ConversionStep[] = [];
    let value = decimal;
    let stepNum = 1;
    const remainders: string[] = [];
    
    if (value === 0) {
      steps.push({
        step: 1,
        operation: "0 ÷ 2 = 0 remainder 0",
        result: "0",
        explanation: "Special case: 0 in any base is 0"
      });
    } else {
      // Add initial explanation
      steps.push({
        step: stepNum++,
        operation: `Starting with decimal ${decimal}`,
        result: decimal.toString(),
        explanation: "We'll use the division-by-2 method to convert to binary"
      });
      
      while (value > 0) {
        const remainder = value % 2;
        const quotient = Math.floor(value / 2);
        remainders.unshift(remainder.toString()); // Add to front for correct order
        
        steps.push({
          step: stepNum,
          operation: `${value} ÷ 2 = ${quotient} remainder ${remainder}`,
          result: `Quotient: ${quotient}, Remainder: ${remainder}`,
          explanation: quotient > 0 ? `Keep the remainder ${remainder}, continue with quotient ${quotient}` : `Keep the remainder ${remainder}, quotient is 0 so we're done`
        });
        
        value = quotient;
        stepNum++;
      }
      
      steps.push({
        step: stepNum,
        operation: `Collect remainders from bottom to top: ${remainders.join(', ')}`,
        result: remainders.join(''),
        explanation: `Reading remainders in reverse order gives us the binary result: ${remainders.join('')}₂`
      });
    }
    
    setConversionSteps(steps);
  };

  const generateDecimalSteps = (input: string, base: number, decimalResult: number) => {
    const steps: ConversionStep[] = [];
    const digits = input.split('').reverse();
    let sum = 0;
    const contributions: string[] = [];
    
    // Add initial explanation
    steps.push({
      step: 1,
      operation: `Converting ${input}₍${base}₎ to decimal`,
      result: input,
      explanation: `We'll use positional notation: each digit is multiplied by the base raised to its position power`
    });
    
    digits.forEach((digit, index) => {
      const digitValue = parseInt(digit, base);
      const placeValue = Math.pow(base, index);
      const contribution = digitValue * placeValue;
      sum += contribution;
      contributions.push(contribution.toString());
      
      steps.push({
        step: index + 2,
        operation: `Position ${index}: ${digit} × ${base}^${index} = ${digitValue} × ${placeValue} = ${contribution}`,
        result: `Running total: ${sum}`,
        explanation: `Digit '${digit}' in position ${index} (counting from right, starting at 0) contributes ${contribution} to the total`
      });
    });
    
    steps.push({
      step: steps.length + 1,
      operation: `Sum all position values: ${contributions.join(' + ')} = ${decimalResult}`,
      result: decimalResult.toString(),
      explanation: `Adding all contributions gives us the final decimal value: ${decimalResult}₁₀`
    });
    
    setConversionSteps(steps);
  };

  const animateConversion = (targetBase: number) => {
    setAnimatingBase(targetBase);
    setTimeout(() => setAnimatingBase(null), 1000);
  };

  const isValidInput = (value: string, base: number): boolean => {
    if (!value) return false;
    
    const validChars = base <= 10 
      ? Array.from({length: base}, (_, i) => i.toString())
      : [...Array.from({length: 10}, (_, i) => i.toString()), ...Array.from({length: base - 10}, (_, i) => String.fromCharCode(65 + i))];
    
    return value.toUpperCase().split('').every(char => validChars.includes(char));
  };

  const getBaseInfo = (base: number) => {
    const info = {
      2: { name: 'Binary', chars: '0, 1', usage: 'Computer internal representation' },
      10: { name: 'Decimal', chars: '0-9', usage: 'Standard human counting system' },
      16: { name: 'Hexadecimal', chars: '0-9, A-F', usage: 'Memory addresses, colors, debugging' }
    };
    return info[base as keyof typeof info];
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <button
          onClick={() => { setInputValue('42'); setInputBase(10); }}
          className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Reset
        </button>
      </div>

      {/* Input Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-3">Input Number</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number Value</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                isValidInput(inputValue, inputBase) 
                  ? 'border-gray-300 focus:border-blue-500' 
                  : 'border-red-300 focus:border-red-500 bg-red-50'
              }`}
              placeholder="Enter number..."
            />
            {!isValidInput(inputValue, inputBase) && inputValue && (
              <p className="text-red-600 text-xs mt-1">
                Invalid characters for base {inputBase}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Input Base</label>
            <select
              value={inputBase}
              onChange={(e) => setInputBase(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {bases.map(base => (
                <option key={base.value} value={base.value}>
                  {base.name} (Base {base.value})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {inputBase && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>{getBaseInfo(inputBase)?.name}:</strong> Uses {getBaseInfo(inputBase)?.chars} | 
            Common use: {getBaseInfo(inputBase)?.usage}
          </div>
        )}
      </div>

      {/* Results Grid */}
      {Object.keys(results).length > 0 && isValidInput(inputValue, inputBase) && (
        <div className="mb-6">
          <h4 className="font-semibold mb-4">Converted Results</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bases.map(base => (
              <div 
                key={base.value}
                className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                  animatingBase === base.value 
                    ? 'scale-105 shadow-lg border-blue-400' 
                    : 'border-gray-200'
                } ${base.color}`}
                onClick={() => animateConversion(base.value)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {base.icon}
                    <span className="ml-2 font-semibold text-sm">{base.name}</span>
                  </div>
                  <span className="text-xs opacity-70">Base {base.value}</span>
                </div>
                
                <div className="font-mono text-lg font-bold mb-1">
                  {results[base.value] || '—'}
                  <sub className="text-xs font-normal">{base.value}</sub>
                </div>
                
                <div className="text-xs opacity-70">
                  {results[base.value]?.length} digits
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Steps */}
      {conversionSteps.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Step-by-Step Conversion</h4>
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="flex items-center px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded text-sm transition-colors"
            >
              <HelpCircle className="w-3 h-3 mr-1" />
              {showSteps ? 'Hide Steps' : 'Show Steps'}
            </button>
          </div>
          
          {showSteps && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              {conversionSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-sm bg-white p-2 rounded border">
                      {step.operation}
                    </div>
                    <div className="text-xs text-blue-700 mt-1">
                      {step.explanation}
                    </div>
                  </div>
                  {step.result && (
                    <div className="flex-shrink-0 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                      {step.result}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Reference */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2">Quick Reference</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
          <div>
            <strong>Common Values:</strong>
            <ul className="mt-1 space-y-1">
              <li>8₁₀ = 1000₂ = 10₈ = 8₁₆</li>
              <li>15₁₀ = 1111₂ = 17₈ = F₁₆</li>
              <li>255₁₀ = 11111111₂ = 377₈ = FF₁₆</li>
            </ul>
          </div>
          <div>
            <strong>Conversion Tips:</strong>
            <ul className="mt-1 space-y-1">
              <li>Binary: Divide by 2, read remainders up</li>
              <li>To Decimal: Multiply by powers of base</li>
              <li>Hex: Use A=10, B=11, C=12, D=13, E=14, F=15</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberConverter;
import React, { useState } from 'react';
import { Code2, ArrowRight, BookOpen, Users, Wrench, TestTube } from 'lucide-react';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  benefit: string;
  pseudocode: string[];
  python: string[];
  explanation: string;
  icon: React.ComponentType<any>;
  color: string;
}

const modularExamples: CodeExample[] = [
  {
    id: 'validation',
    title: 'Input Validation',
    description: 'Reusable validation for user inputs',
    benefit: 'Write validation once, use everywhere',
    pseudocode: [
      'FUNCTION isValidEmail(email)',
      '  IF email contains "@" AND email contains "." THEN',
      '    RETURN True',
      '  ELSE',
      '    RETURN False',
      '  ENDIF',
      'ENDFUNCTION',
      '',
      'PROCEDURE registerUser()',
      '  PRINT "Enter email:"',
      '  INPUT userEmail',
      '  ',
      '  IF isValidEmail(userEmail) THEN',
      '    PRINT "Registration successful!"',
      '  ELSE',
      '    PRINT "Invalid email format"',
      '  ENDIF',
      'ENDPROCEDURE'
    ],
    python: [
      'def is_valid_email(email):',
      '    if "@" in email and "." in email:',
      '        return True',
      '    else:',
      '        return False',
      '',
      'def register_user():',
      '    user_email = input("Enter email: ")',
      '    ',
      '    if is_valid_email(user_email):',
      '        print("Registration successful!")',
      '    else:',
      '        print("Invalid email format")'
    ],
    explanation: 'The validation function can be reused for login, registration, password reset, and any other place that needs email validation.',
    icon: Wrench,
    color: 'blue'
  },
  {
    id: 'calculations',
    title: 'Reusable Calculations',
    description: 'Mathematical functions for repeated calculations',
    benefit: 'Consistent calculations across the program',
    pseudocode: [
      'FUNCTION calculateGST(amount)',
      '  SET gstRate = 0.1',
      '  RETURN amount * gstRate',
      'ENDFUNCTION',
      '',
      'FUNCTION calculateTotal(subtotal)',
      '  SET gst = calculateGST(subtotal)',
      '  RETURN subtotal + gst',
      'ENDFUNCTION',
      '',
      '// Usage in different parts of program',
      'SET orderTotal = calculateTotal(150.00)',
      'SET invoiceTotal = calculateTotal(99.50)',
      'PRINT "Order: $" + orderTotal',
      'PRINT "Invoice: $" + invoiceTotal'
    ],
    python: [
      'def calculate_gst(amount):',
      '    gst_rate = 0.1',
      '    return amount * gst_rate',
      '',
      'def calculate_total(subtotal):',
      '    gst = calculate_gst(subtotal)',
      '    return subtotal + gst',
      '',
      '# Usage in different parts of program',
      'order_total = calculate_total(150.00)',
      'invoice_total = calculate_total(99.50)',
      'print(f"Order: ${order_total:.2f}")',
      'print(f"Invoice: ${invoice_total:.2f}")'
    ],
    explanation: 'If GST rate changes from 10% to 11%, you only need to update one line instead of finding every calculation in your code.',
    icon: Code2,
    color: 'green'
  },
  {
    id: 'formatting',
    title: 'Output Formatting',
    description: 'Consistent display formatting across the application',
    benefit: 'Uniform appearance and easy styling updates',
    pseudocode: [
      'PROCEDURE displayHeader(title)',
      '  PRINT "=" * 40',
      '  PRINT "    " + title',
      '  PRINT "=" * 40',
      'ENDPROCEDURE',
      '',
      'PROCEDURE displayMenuItem(number, description, price)',
      '  PRINT number + ". " + description + " - $" + price',
      'ENDPROCEDURE',
      '',
      '// Usage throughout the program',
      'displayHeader("CAFE MENU")',
      'displayMenuItem("1", "Coffee", "4.50")',
      'displayMenuItem("2", "Tea", "3.00")',
      'displayMenuItem("3", "Muffin", "5.25")'
    ],
    python: [
      'def display_header(title):',
      '    print("=" * 40)',
      '    print(f"    {title}")',
      '    print("=" * 40)',
      '',
      'def display_menu_item(number, description, price):',
      '    print(f"{number}. {description} - ${price}")',
      '',
      '# Usage throughout the program',
      'display_header("CAFE MENU")',
      'display_menu_item("1", "Coffee", "4.50")',
      'display_menu_item("2", "Tea", "3.00")',
      'display_menu_item("3", "Muffin", "5.25")'
    ],
    explanation: 'Need to change the menu format? Update the procedure once and it changes everywhere. Want to add colors or borders? Easy!',
    icon: BookOpen,
    color: 'purple'
  },
  {
    id: 'teamwork',
    title: 'Team Development',
    description: 'How modular code helps teams work together',
    benefit: 'Different people can work on different functions simultaneously',
    pseudocode: [
      '// Developer 1 works on user management',
      'FUNCTION createUser(name, email)',
      '  // Implementation here',
      'ENDFUNCTION',
      '',
      '// Developer 2 works on order processing',
      'FUNCTION processOrder(items, userID)',
      '  // Can call createUser if needed',
      '  // Implementation here',
      'ENDFUNCTION',
      '',
      '// Developer 3 works on reporting',
      'PROCEDURE generateReport(orderID)',
      '  // Can use both functions above',
      '  // Implementation here',
      'ENDPROCEDURE'
    ],
    python: [
      '# Developer 1 works on user management',
      'def create_user(name, email):',
      '    # Implementation here',
      '    pass',
      '',
      '# Developer 2 works on order processing',
      'def process_order(items, user_id):',
      '    # Can call create_user if needed',
      '    # Implementation here',
      '    pass',
      '',
      '# Developer 3 works on reporting',
      'def generate_report(order_id):',
      '    # Can use both functions above',
      '    # Implementation here',
      '    pass'
    ],
    explanation: 'Each developer can focus on their expertise area. Clear function names and parameters make it easy to understand and use each other\'s code.',
    icon: Users,
    color: 'orange'
  },
  {
    id: 'debugging',
    title: 'Easier Debugging',
    description: 'Find and fix problems faster with modular code',
    benefit: 'Isolate problems to specific functions for faster fixes',
    pseudocode: [
      'FUNCTION calculateDiscount(price, discountPercent)',
      '  // Easy to test this function separately',
      '  IF discountPercent < 0 OR discountPercent > 100 THEN',
      '    RETURN price  // No discount for invalid input',
      '  ENDIF',
      '  ',
      '  SET discountAmount = price * (discountPercent / 100)',
      '  RETURN price - discountAmount',
      'ENDFUNCTION',
      '',
      'PROCEDURE displayPrice(originalPrice, discount)',
      '  SET finalPrice = calculateDiscount(originalPrice, discount)',
      '  PRINT "Original: $" + originalPrice',
      '  PRINT "Final: $" + finalPrice',
      'ENDPROCEDURE'
    ],
    python: [
      'def calculate_discount(price, discount_percent):',
      '    # Easy to test this function separately',
      '    if discount_percent < 0 or discount_percent > 100:',
      '        return price  # No discount for invalid input',
      '    ',
      '    discount_amount = price * (discount_percent / 100)',
      '    return price - discount_amount',
      '',
      'def display_price(original_price, discount):',
      '    final_price = calculate_discount(original_price, discount)',
      '    print(f"Original: ${original_price:.2f}")',
      '    print(f"Final: ${final_price:.2f}")'
    ],
    explanation: 'If there\'s a bug in price calculation, you know it\'s in the calculateDiscount function. You can test just that function with different inputs to find the problem.',
    icon: TestTube,
    color: 'red'
  }
];

const ModularCodeExplorer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [viewMode, setViewMode] = useState<'pseudocode' | 'python'>('pseudocode');

  const currentExample = modularExamples[selectedExample];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-800 border-blue-200',
      green: 'bg-green-50 text-green-800 border-green-200',
      purple: 'bg-purple-50 text-purple-800 border-purple-200',
      orange: 'bg-orange-50 text-orange-800 border-orange-200',
      red: 'bg-red-50 text-red-800 border-red-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600', 
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Modular Programming in Action</h3>
        <p className="text-gray-600">
          See how functions and procedures make code more reusable, maintainable, and team-friendly
        </p>
      </div>

      {/* Example Selection */}
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {modularExamples.map((example, index) => (
            <button
              key={example.id}
              onClick={() => setSelectedExample(index)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedExample === index 
                  ? getColorClasses(example.color)
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${getIconColorClasses(example.color)}`}>
                  <example.icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm">{example.title}</h4>
              </div>
              <p className="text-xs opacity-80">{example.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Current Example Display */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code View */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">{currentExample.title}</h4>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('pseudocode')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'pseudocode'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pseudocode
              </button>
              <button
                onClick={() => setViewMode('python')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'python'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Python
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 font-mono text-base">
            <pre className="text-gray-900 overflow-x-auto leading-relaxed">
              <code>
                {viewMode === 'pseudocode' 
                  ? currentExample.pseudocode.join('\n')
                  : currentExample.python.join('\n')
                }
              </code>
            </pre>
          </div>
        </div>

        {/* Benefits and Explanation */}
        <div>
          <div className={`p-4 rounded-lg border-2 mb-4 ${getColorClasses(currentExample.color)}`}>
            <div className="flex items-center mb-2">
              <ArrowRight className="w-5 h-5 mr-2" />
              <h5 className="font-semibold">Key Benefit</h5>
            </div>
            <p className="text-sm font-medium">{currentExample.benefit}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">Why This Helps</h5>
            <p className="text-sm text-gray-700 leading-relaxed">{currentExample.explanation}</p>
          </div>

          {/* Visual Benefit Indicators */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center text-green-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-xs font-medium">Reusable</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center text-blue-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-xs font-medium">Maintainable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModularCodeExplorer;
import React, { useState } from 'react';
import { MessageCircle, Send, ArrowRight, Play, RotateCcw, Zap, Eye } from 'lucide-react';

interface Message {
  id: string;
  from: string;
  to: string;
  method: string;
  parameters: any[];
  returnValue?: any;
  timestamp: number;
  status: 'sending' | 'processing' | 'complete';
}

interface ClassObject {
  id: string;
  name: string;
  className: string;
  methods: string[];
  currentState: Record<string, any>;
  position: { x: number; y: number };
}

interface MessagePassingScenario {
  id: string;
  title: string;
  description: string;
  objects: ClassObject[];
  messageSequence: {
    from: string;
    to: string;
    method: string;
    parameters: any[];
    returnValue?: any;
    explanation: string;
  }[];
  learningPoints: string[];
}

interface MessagePassingDemoProps {
  title?: string;
}

export const MessagePassingDemo: React.FC<MessagePassingDemoProps> = ({
  title = "OOP Message Passing Demo"
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('bank_transaction');
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showInternalState, setShowInternalState] = useState<boolean>(true);

  const scenarios: MessagePassingScenario[] = [
    {
      id: 'bank_transaction',
      title: 'Bank Account Transaction',
      description: 'Money transfer between bank accounts using method calls',
      objects: [
        {
          id: 'account1',
          name: 'Alice\'s Account',
          className: 'BankAccount',
          methods: ['withdraw(amount)', 'deposit(amount)', 'getBalance()', 'transfer(to, amount)'],
          currentState: { balance: 1000, accountNumber: '12345' },
          position: { x: 50, y: 50 }
        },
        {
          id: 'account2',
          name: 'Bob\'s Account',
          className: 'BankAccount',
          methods: ['withdraw(amount)', 'deposit(amount)', 'getBalance()', 'transfer(to, amount)'],
          currentState: { balance: 500, accountNumber: '67890' },
          position: { x: 300, y: 50 }
        },
        {
          id: 'bank',
          name: 'Bank System',
          className: 'Bank',
          methods: ['processTransfer(from, to, amount)', 'validateAccount(account)', 'logTransaction(details)'],
          currentState: { totalTransactions: 0 },
          position: { x: 175, y: 200 }
        }
      ],
      messageSequence: [
        {
          from: 'account1',
          to: 'bank',
          method: 'processTransfer',
          parameters: ['account1', 'account2', 200],
          explanation: 'Alice initiates a $200 transfer to Bob through the bank system'
        },
        {
          from: 'bank',
          to: 'account1',
          method: 'getBalance',
          parameters: [],
          returnValue: 1000,
          explanation: 'Bank checks Alice\'s current balance before processing'
        },
        {
          from: 'bank',
          to: 'account2',
          method: 'validateAccount',
          parameters: ['67890'],
          returnValue: true,
          explanation: 'Bank validates Bob\'s account exists and is active'
        },
        {
          from: 'bank',
          to: 'account1',
          method: 'withdraw',
          parameters: [200],
          returnValue: true,
          explanation: 'Bank instructs Alice\'s account to withdraw $200'
        },
        {
          from: 'bank',
          to: 'account2',
          method: 'deposit',
          parameters: [200],
          returnValue: true,
          explanation: 'Bank instructs Bob\'s account to deposit $200'
        },
        {
          from: 'bank',
          to: 'bank',
          method: 'logTransaction',
          parameters: ['Transfer: $200 from 12345 to 67890'],
          explanation: 'Bank logs the completed transaction for audit purposes'
        }
      ],
      learningPoints: [
        'Objects communicate by calling each other\'s methods',
        'Parameters pass data between objects',
        'Return values provide feedback about operation success',
        'Complex operations involve multiple message exchanges',
        'Objects maintain their own internal state'
      ]
    },
    {
      id: 'online_shopping',
      title: 'Online Shopping System',
      description: 'Customer placing an order with inventory and payment processing',
      objects: [
        {
          id: 'customer',
          name: 'Customer',
          className: 'Customer',
          methods: ['placeOrder(items)', 'makePayment(amount)', 'receiveConfirmation()'],
          currentState: { name: 'Sarah', creditCard: '**** 4567', orders: [] },
          position: { x: 50, y: 50 }
        },
        {
          id: 'inventory',
          name: 'Inventory System',
          className: 'Inventory',
          methods: ['checkStock(item)', 'reserveItems(items)', 'updateStock(item, quantity)'],
          currentState: { laptop_stock: 5, mouse_stock: 12 },
          position: { x: 300, y: 50 }
        },
        {
          id: 'payment',
          name: 'Payment Processor',
          className: 'PaymentProcessor',
          methods: ['processPayment(card, amount)', 'validateCard(card)', 'sendReceipt(customer)'],
          currentState: { transactions_today: 156 },
          position: { x: 50, y: 200 }
        },
        {
          id: 'order',
          name: 'Order System',
          className: 'OrderSystem',
          methods: ['createOrder(customer, items)', 'calculateTotal(items)', 'confirmOrder(orderId)'],
          currentState: { pending_orders: 3, completed_orders: 24 },
          position: { x: 300, y: 200 }
        }
      ],
      messageSequence: [
        {
          from: 'customer',
          to: 'order',
          method: 'createOrder',
          parameters: [{ item: 'laptop', quantity: 1 }],
          explanation: 'Customer initiates order for 1 laptop'
        },
        {
          from: 'order',
          to: 'inventory',
          method: 'checkStock',
          parameters: ['laptop'],
          returnValue: 5,
          explanation: 'Order system checks if laptop is in stock'
        },
        {
          from: 'order',
          to: 'inventory',
          method: 'reserveItems',
          parameters: [{ item: 'laptop', quantity: 1 }],
          returnValue: true,
          explanation: 'Order system reserves 1 laptop for this customer'
        },
        {
          from: 'order',
          to: 'order',
          method: 'calculateTotal',
          parameters: [{ item: 'laptop', price: 999 }],
          returnValue: 999,
          explanation: 'Order system calculates total price including tax'
        },
        {
          from: 'order',
          to: 'payment',
          method: 'processPayment',
          parameters: ['**** 4567', 999],
          returnValue: { success: true, transactionId: 'TXN789' },
          explanation: 'Order system requests payment processing'
        },
        {
          from: 'payment',
          to: 'customer',
          method: 'sendReceipt',
          parameters: ['Order #12345: $999 - TXN789'],
          explanation: 'Payment system sends receipt to customer'
        },
        {
          from: 'order',
          to: 'customer',
          method: 'receiveConfirmation',
          parameters: ['Order #12345 confirmed - ships in 2 days'],
          explanation: 'Order system confirms successful order to customer'
        }
      ],
      learningPoints: [
        'Objects collaborate to complete complex business processes',
        'Each object has specialized responsibilities',
        'Messages flow between objects to coordinate actions',
        'Return values confirm successful operations',
        'Real systems involve many objects working together'
      ]
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario);
  const currentMessage = currentScenario?.messageSequence[currentMessageIndex];

  const playSequence = () => {
    if (!currentScenario) return;
    
    setIsPlaying(true);
    setActiveMessages([]);
    
    let messageIndex = 0;
    
    const sendNextMessage = () => {
      if (messageIndex >= currentScenario.messageSequence.length) {
        setIsPlaying(false);
        return;
      }

      const messageData = currentScenario.messageSequence[messageIndex];
      const newMessage: Message = {
        id: Date.now().toString(),
        from: messageData.from,
        to: messageData.to,
        method: messageData.method,
        parameters: messageData.parameters,
        returnValue: messageData.returnValue,
        timestamp: Date.now(),
        status: 'sending'
      };

      setActiveMessages(prev => [...prev, newMessage]);
      setCurrentMessageIndex(messageIndex);

      // Simulate message processing
      setTimeout(() => {
        setActiveMessages(prev => 
          prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'processing' } : msg)
        );
      }, 500);

      setTimeout(() => {
        setActiveMessages(prev => 
          prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'complete' } : msg)
        );
        
        // Update object states based on the message
        updateObjectState(messageData);
        
        messageIndex++;
        setTimeout(sendNextMessage, 1000);
      }, 1500);
    };

    sendNextMessage();
  };

  const updateObjectState = (messageData: any) => {
    // This would update object states based on the method called
    // For demo purposes, we'll simulate some state changes
    if (messageData.method === 'withdraw' && messageData.from === 'bank') {
      // Update balance for account1
    } else if (messageData.method === 'deposit' && messageData.from === 'bank') {
      // Update balance for account2
    }
    // Add more state updates as needed
  };

  const reset = () => {
    setCurrentMessageIndex(0);
    setActiveMessages([]);
    setIsPlaying(false);
  };

  const nextMessage = () => {
    if (currentScenario && currentMessageIndex < currentScenario.messageSequence.length - 1) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const prevMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    }
  };

  const getObjectPosition = (objectId: string) => {
    const obj = currentScenario?.objects.find(o => o.id === objectId);
    return obj?.position || { x: 0, y: 0 };
  };

  const isMessageActive = (from: string, to: string) => {
    return activeMessages.some(msg => 
      msg.from === from && msg.to === to && msg.status !== 'complete'
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowInternalState(!showInternalState)}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              showInternalState 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-3 h-3 mr-1" />
            {showInternalState ? 'Hide State' : 'Show State'}
          </button>
          <button
            onClick={reset}
            className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Reset
          </button>
        </div>
      </div>

      {/* Introduction */}
      <div className="mb-6 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
        <h4 className="font-semibold text-purple-800 mb-2">Message Passing in OOP</h4>
        <p className="text-purple-700 text-sm">
          Objects communicate by sending messages (calling methods). Watch how objects collaborate by passing data and receiving responses to complete complex tasks.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Choose Message Passing Scenario:</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => {
                setSelectedScenario(scenario.id);
                reset();
              }}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedScenario === scenario.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 hover:border-blue-300'
              }`}
            >
              <h5 className="font-medium mb-2">{scenario.title}</h5>
              <p className={`text-sm ${
                selectedScenario === scenario.id ? 'text-blue-100' : 'text-gray-600'
              }`}>
                {scenario.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Object Diagram */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Object Interaction Diagram</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={playSequence}
                disabled={isPlaying}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                <Play className="w-3 h-3 mr-1" />
                {isPlaying ? 'Playing' : 'Play All'}
              </button>
              <button
                onClick={prevMessage}
                disabled={currentMessageIndex === 0}
                className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                ←
              </button>
              <span className="text-sm text-gray-600">
                {currentMessageIndex + 1} / {currentScenario?.messageSequence.length || 0}
              </span>
              <button
                onClick={nextMessage}
                disabled={!currentScenario || currentMessageIndex >= currentScenario.messageSequence.length - 1}
                className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                →
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 min-h-96 relative overflow-hidden">
            {/* Objects */}
            {currentScenario?.objects.map((obj) => (
              <div
                key={obj.id}
                className={`absolute w-40 bg-white border-2 rounded-lg p-3 shadow-sm transition-all duration-300 ${
                  currentMessage && (currentMessage.from === obj.id || currentMessage.to === obj.id)
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-300'
                }`}
                style={{
                  left: `${obj.position.x}px`,
                  top: `${obj.position.y}px`
                }}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm mb-1">{obj.name}</div>
                  <div className="text-xs text-gray-600 mb-2">({obj.className})</div>
                  
                  {showInternalState && (
                    <div className="bg-gray-100 p-2 rounded text-xs">
                      <div className="font-medium text-gray-700 mb-1">State:</div>
                      {Object.entries(obj.currentState).map(([key, value]) => (
                        <div key={key} className="text-gray-600">
                          {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active message indicators */}
                {activeMessages.some(msg => msg.from === obj.id && msg.status === 'sending') && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse">
                    <Send className="w-2 h-2 text-white m-1" />
                  </div>
                )}
                {activeMessages.some(msg => msg.to === obj.id && msg.status === 'processing') && (
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-orange-500 rounded-full animate-pulse">
                    <Zap className="w-2 h-2 text-white m-1" />
                  </div>
                )}
              </div>
            ))}

            {/* Message arrows */}
            {activeMessages.map((message) => {
              const fromPos = getObjectPosition(message.from);
              const toPos = getObjectPosition(message.to);
              
              if (message.from === message.to) return null; // Skip self-messages for now
              
              const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
              const distance = Math.sqrt(Math.pow(toPos.x - fromPos.x, 2) + Math.pow(toPos.y - fromPos.y, 2));
              
              return (
                <div
                  key={message.id}
                  className={`absolute transition-opacity duration-500 ${
                    message.status === 'complete' ? 'opacity-30' : 'opacity-100'
                  }`}
                  style={{
                    left: `${fromPos.x + 80}px`,
                    top: `${fromPos.y + 40}px`,
                    width: `${distance - 160}px`,
                    transform: `rotate(${angle}rad)`,
                    transformOrigin: '0 50%'
                  }}
                >
                  <div className={`h-0.5 w-full relative ${
                    message.status === 'sending' ? 'bg-blue-500' :
                    message.status === 'processing' ? 'bg-orange-500' :
                    'bg-green-500'
                  }`}>
                    <ArrowRight className={`w-3 h-3 absolute right-0 -top-1 ${
                      message.status === 'sending' ? 'text-blue-500' :
                      message.status === 'processing' ? 'text-orange-500' :
                      'text-green-500'
                    }`} />
                  </div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-mono whitespace-nowrap">
                    {message.method}({message.parameters.map(p => typeof p === 'object' ? JSON.stringify(p) : String(p)).join(', ')})
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Details */}
        <div>
          <h4 className="font-semibold mb-3">Current Message Details</h4>
          
          {currentMessage && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">Message {currentMessageIndex + 1}</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <strong>From:</strong> {currentMessage.from}
                </div>
                <div>
                  <strong>To:</strong> {currentMessage.to}
                </div>
                <div>
                  <strong>Method:</strong> <code className="bg-white px-1 rounded">{currentMessage.method}</code>
                </div>
                <div>
                  <strong>Parameters:</strong>
                  <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                    [{currentMessage.parameters.map(p => 
                      typeof p === 'object' ? JSON.stringify(p) : 
                      typeof p === 'string' ? `"${p}"` : String(p)
                    ).join(', ')}]
                  </div>
                </div>
                {currentMessage.returnValue !== undefined && (
                  <div>
                    <strong>Returns:</strong>
                    <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                      {typeof currentMessage.returnValue === 'object' 
                        ? JSON.stringify(currentMessage.returnValue)
                        : String(currentMessage.returnValue)}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-3 p-2 bg-white rounded border">
                <div className="font-medium text-gray-700 mb-1">Explanation:</div>
                <p className="text-sm text-gray-600">{currentMessage.explanation}</p>
              </div>
            </div>
          )}

          {/* Object Methods */}
          <div className="mb-4">
            <h5 className="font-medium mb-2">Available Methods</h5>
            <div className="space-y-2">
              {currentScenario?.objects.map((obj) => (
                <div key={obj.id} className="bg-gray-50 p-2 rounded">
                  <div className="font-medium text-sm text-gray-700">{obj.name}</div>
                  <div className="text-xs text-gray-600">
                    {obj.methods.map((method, index) => (
                      <div key={index} className="font-mono">• {method}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Points */}
          {currentScenario && (
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h5 className="font-medium mb-2 text-green-800">Key Concepts</h5>
              <ul className="space-y-1">
                {currentScenario.learningPoints.map((point, index) => (
                  <li key={index} className="text-sm text-green-700 flex items-start">
                    <span className="text-green-600 mr-2 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Message Flow Summary */}
      <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-3">Message Flow Pattern</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span><strong>Sending:</strong> Message initiated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span><strong>Processing:</strong> Method executing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span><strong>Complete:</strong> Response returned</span>
          </div>
        </div>
        <p className="text-amber-700 text-sm mt-3">
          In OOP, objects don't directly manipulate each other's data. Instead, they send messages (method calls) 
          with parameters and receive responses. This maintains encapsulation while enabling collaboration.
        </p>
      </div>
    </div>
  );
};

export default MessagePassingDemo;
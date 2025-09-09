import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Users, Code, TestTube, Rocket } from 'lucide-react';

interface StoryStep {
  id: string;
  title: string;
  description: string;
  scenario: string;
  keyActions: string[];
  deliverables: string[];
  challenges: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const developmentSteps: StoryStep[] = [
  {
    id: 'requirements',
    title: 'Requirements Definition',
    description: 'Understanding what needs to be built',
    scenario: 'Sarah, the project manager, meets with school administrators who want a new Learning Management System to replace SEQTA. They discuss what features are needed, who will use it, and what SEQTA pain points need solving.',
    keyActions: [
      'Conduct stakeholder interviews with teachers, students, and admin staff',
      'Document functional requirements (assignment submission, gradebook, messaging)',
      'Define non-functional requirements (speed, security, mobile compatibility)',
      'Create acceptance criteria for each feature'
    ],
    deliverables: ['Requirements Document', 'User Stories', 'Acceptance Criteria'],
    challenges: ['Unclear client expectations', 'Conflicting stakeholder needs', 'Scope creep'],
    icon: Users,
    color: 'blue'
  },
  {
    id: 'specifications',
    title: 'Determining Specifications',
    description: 'Converting requirements into technical blueprints',
    scenario: 'The technical architect, Mike, takes the requirements and decides on the technology stack. Should they build a web app for all devices? What database can handle thousands of students and assignments? How will it integrate with existing school systems?',
    keyActions: [
      'Choose technology stack (React + Node.js + PostgreSQL)',
      'Define system architecture for LMS modules (classes, assignments, grades)',
      'Specify data formats for assignments, submissions, and gradebooks',
      'Set performance benchmarks for peak usage (exam periods)'
    ],
    deliverables: ['Technical Specifications', 'Architecture Diagrams', 'API Documentation'],
    challenges: ['Technology decisions impact entire project', 'Balancing performance vs. complexity', 'Future-proofing choices'],
    icon: Code,
    color: 'green'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Creating the blueprint before building',
    scenario: 'Designer Emma creates mockups showing how students will submit assignments and check grades. The database designer creates tables for users, classes, assignments, and submissions. The system architect maps out how LMS modules connect.',
    keyActions: [
      'Create user interface wireframes for teacher and student dashboards',
      'Design database schema for classes, assignments, grades, and submissions',
      'Plan system architecture for LMS core modules',
      'Design algorithms for grade calculation and assignment distribution'
    ],
    deliverables: ['UI/UX Designs', 'Database Schema', 'System Architecture', 'Algorithm Designs'],
    challenges: ['Balancing user experience with technical constraints', 'Ensuring scalable design', 'Getting stakeholder approval'],
    icon: Code,
    color: 'purple'
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Building the actual software',
    scenario: 'The development team starts coding. Alex builds the book search feature, Jordan creates the user authentication system, and Casey implements the checkout process. They use Git to coordinate their work.',
    keyActions: [
      'Write source code following established coding standards',
      'Implement algorithms and data structures as designed',
      'Create user interfaces matching the approved designs',
      'Use version control and maintain comprehensive documentation'
    ],
    deliverables: ['Source Code', 'Unit Tests', 'Code Documentation', 'Version History'],
    challenges: ['Coding bugs and unexpected issues', 'Team coordination and merge conflicts', 'Staying on schedule'],
    icon: Code,
    color: 'orange'
  },
  {
    id: 'integration',
    title: 'Integration',
    description: 'Connecting all the pieces together',
    scenario: 'The team combines Alex\'s search feature with Jordan\'s login system and Casey\'s checkout process. They discover the search is slow when thousands of users are logged in simultaneously.',
    keyActions: [
      'Combine individual modules into unified system',
      'Connect with external services (school database, email system)',
      'Ensure all components communicate properly',
      'Test system behavior under realistic conditions'
    ],
    deliverables: ['Integrated System', 'Integration Test Results', 'Performance Reports'],
    challenges: ['Components don\'t work together as expected', 'Performance issues emerge', 'External system dependencies'],
    icon: Code,
    color: 'teal'
  },
  {
    id: 'testing',
    title: 'Testing and Debugging',
    description: 'Finding and fixing problems before launch',
    scenario: 'Quality Assurance tester Maria discovers that students can accidentally check out the same book twice. The team also finds the system crashes when the library has internet issues.',
    keyActions: [
      'Perform unit testing on individual components',
      'Conduct integration testing across the whole system',
      'Execute system testing against original requirements',
      'Run user acceptance testing with real librarians and students'
    ],
    deliverables: ['Test Reports', 'Bug Reports', 'Fixed Code', 'User Acceptance Sign-off'],
    challenges: ['Critical bugs found late in process', 'User feedback requires major changes', 'Time pressure to launch'],
    icon: TestTube,
    color: 'red'
  },
  {
    id: 'installation',
    title: 'Installation',
    description: 'Deploying to the real environment',
    scenario: 'The system goes live at Riverside High School. The IT team installs it on school servers, imports existing book data, and trains librarians. Students start using it immediately.',
    keyActions: [
      'Set up production servers with proper security',
      'Import existing data from old library system',
      'Train staff and create user documentation',
      'Monitor system during initial launch period'
    ],
    deliverables: ['Live System', 'Training Materials', 'User Manuals', 'Launch Report'],
    challenges: ['Data migration problems', 'User adoption difficulties', 'Performance issues under real load'],
    icon: Rocket,
    color: 'indigo'
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Ongoing support and improvements',
    scenario: 'Six months later, the library wants to add e-book support. The team also fixes a bug where overdue notices weren\'t being sent during school holidays. They continuously monitor and improve the system.',
    keyActions: [
      'Fix bugs reported by users in production',
      'Add new features requested by stakeholders',
      'Improve performance based on usage patterns',
      'Update system for changing requirements and technology'
    ],
    deliverables: ['Bug Fixes', 'New Features', 'Performance Improvements', 'Updated Documentation'],
    challenges: ['Balancing new features with stability', 'Managing changing requirements', 'Long-term technical debt'],
    icon: Code,
    color: 'gray'
  }
];

export default function DevelopmentStepsStory() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState<'actions' | 'deliverables' | 'challenges'>('actions');

  const currentStoryStep = developmentSteps[currentStep];

  const nextStep = () => {
    setCurrentStep(prev => (prev + 1) % developmentSteps.length);
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev - 1 + developmentSteps.length) % developmentSteps.length);
  };

  const resetStory = () => {
    setCurrentStep(0);
  };


  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
      teal: 'text-teal-600 bg-teal-100',
      red: 'text-red-600 bg-red-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      gray: 'text-gray-600 bg-gray-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
      <div className="mb-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Software Development Journey</h3>
        </div>


        {/* Step Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {developmentSteps.map((step, index) => {
            const getStepButtonColor = (color: string) => {
              const colors = {
                blue: 'bg-blue-100 text-blue-800',
                green: 'bg-green-100 text-green-800',
                purple: 'bg-purple-100 text-purple-800',
                orange: 'bg-orange-100 text-orange-800',
                teal: 'bg-teal-100 text-teal-800',
                red: 'bg-red-100 text-red-800',
                indigo: 'bg-indigo-100 text-indigo-800',
                gray: 'bg-gray-100 text-gray-800'
              };
              return colors[color as keyof typeof colors] || colors.blue;
            };

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  index === currentStep
                    ? getStepButtonColor(step.color)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {step.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Step Display */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-start mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(currentStoryStep.color)} mr-4`}>
            <currentStoryStep.icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{currentStoryStep.title}</h4>
            <p className="text-gray-600 mb-4">{currentStoryStep.description}</p>
          </div>
        </div>

        {/* Scenario Story */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
          <h5 className="font-semibold text-blue-900 mb-2">Real-World Scenario:</h5>
          <p className="text-blue-800 text-sm leading-relaxed">{currentStoryStep.scenario}</p>
        </div>

        {/* Detailed Information - Always Visible */}
        <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveDetailTab('actions')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDetailTab === 'actions'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Key Actions
              </button>
              <button
                onClick={() => setActiveDetailTab('deliverables')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDetailTab === 'deliverables'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Deliverables
              </button>
              <button
                onClick={() => setActiveDetailTab('challenges')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDetailTab === 'challenges'
                    ? 'bg-white text-orange-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Common Challenges
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              {activeDetailTab === 'actions' && (
                <div>
                  <h6 className="font-semibold text-green-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Key Actions for {currentStoryStep.title}
                  </h6>
                  <ul className="space-y-2">
                    {currentStoryStep.keyActions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-500 mr-3 font-bold">{index + 1}.</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeDetailTab === 'deliverables' && (
                <div>
                  <h6 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Expected Deliverables
                  </h6>
                  <ul className="space-y-2">
                    {currentStoryStep.deliverables.map((deliverable, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-3 font-bold">📄</span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeDetailTab === 'challenges' && (
                <div>
                  <h6 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    Common Challenges to Watch For
                  </h6>
                  <ul className="space-y-2">
                    {currentStoryStep.challenges.map((challenge, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-orange-500 mr-3 font-bold">⚠️</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          <span className="text-sm text-gray-600">
            {currentStep + 1} / {developmentSteps.length}
          </span>

          <button
            onClick={nextStep}
            disabled={currentStep === developmentSteps.length - 1}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-amber-800 text-sm">
          <strong>Remember:</strong> Software development is iterative - these steps often overlap and may be repeated. 
          In Agile methodologies, you might cycle through steps 3-6 multiple times before reaching installation.
        </p>
      </div>
    </div>
  );
}
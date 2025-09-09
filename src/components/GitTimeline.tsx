import React, { useState } from 'react';
import { GitBranch, GitCommit, GitMerge, Users, Clock, Code, MessageSquare, Play, RotateCcw } from 'lucide-react';

interface GitCommit {
  id: string;
  hash: string;
  message: string;
  author: string;
  timestamp: string;
  files: string[];
  branch: string;
  type: 'commit' | 'merge' | 'branch-create';
  parentCommit?: string;
}

interface CollaborationScenario {
  id: string;
  title: string;
  description: string;
  commits: GitCommit[];
  learningPoints: string[];
}

interface GitTimelineProps {
  title?: string;
}

export const GitTimeline: React.FC<GitTimelineProps> = ({
  title = "Git Collaboration Timeline"
}) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('feature_collaboration');
  const [currentCommitIndex, setCurrentCommitIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showBranches, setShowBranches] = useState<boolean>(true);

  const scenarios: CollaborationScenario[] = [
    {
      id: 'feature_collaboration',
      title: 'Feature Development Collaboration',
      description: 'Two developers working on different features simultaneously',
      commits: [
        {
          id: '1',
          hash: '4f2a8c1',
          message: 'Initial project setup with basic structure',
          author: 'Alice',
          timestamp: '2024-01-15 09:00',
          files: ['index.html', 'style.css', 'script.js'],
          branch: 'main',
          type: 'commit'
        },
        {
          id: '2',
          hash: '8e5b9f3',
          message: 'Create user-auth branch for login feature',
          author: 'Alice',
          timestamp: '2024-01-15 09:30',
          files: [],
          branch: 'user-auth',
          type: 'branch-create',
          parentCommit: '1'
        },
        {
          id: '3',
          hash: '1a7c6d9',
          message: 'Add login form HTML structure',
          author: 'Alice',
          timestamp: '2024-01-15 10:00',
          files: ['login.html', 'auth.css'],
          branch: 'user-auth',
          type: 'commit'
        },
        {
          id: '4',
          hash: '3d8f2e5',
          message: 'Create shopping-cart branch',
          author: 'Bob',
          timestamp: '2024-01-15 10:15',
          files: [],
          branch: 'shopping-cart',
          type: 'branch-create',
          parentCommit: '1'
        },
        {
          id: '5',
          hash: '9b4a1c7',
          message: 'Add cart HTML structure and basic styling',
          author: 'Bob',
          timestamp: '2024-01-15 11:00',
          files: ['cart.html', 'cart.css'],
          branch: 'shopping-cart',
          type: 'commit'
        },
        {
          id: '6',
          hash: '2f5e8a1',
          message: 'Implement login validation logic',
          author: 'Alice',
          timestamp: '2024-01-15 14:00',
          files: ['auth.js', 'validation.js'],
          branch: 'user-auth',
          type: 'commit'
        },
        {
          id: '7',
          hash: '7c9d3b6',
          message: 'Add cart item management functions',
          author: 'Bob',
          timestamp: '2024-01-15 15:30',
          files: ['cart.js', 'storage.js'],
          branch: 'shopping-cart',
          type: 'commit'
        },
        {
          id: '8',
          hash: '5a2f7e9',
          message: 'Merge user-auth feature into main',
          author: 'Alice',
          timestamp: '2024-01-16 09:00',
          files: ['login.html', 'auth.css', 'auth.js', 'validation.js'],
          branch: 'main',
          type: 'merge',
          parentCommit: '6'
        },
        {
          id: '9',
          hash: '8f1b4d2',
          message: 'Merge shopping-cart feature into main',
          author: 'Bob',
          timestamp: '2024-01-16 11:00',
          files: ['cart.html', 'cart.css', 'cart.js', 'storage.js'],
          branch: 'main',
          type: 'merge',
          parentCommit: '7'
        }
      ],
      learningPoints: [
        'Branching allows parallel development without conflicts',
        'Regular commits create clear project history',
        'Merge commits integrate feature branches back to main',
        'Different developers can work independently',
        'Git tracks who made which changes and when'
      ]
    },
    {
      id: 'bug_fix_hotfix',
      title: 'Bug Fix and Hotfix Workflow',
      description: 'Handling urgent bug fixes while feature development continues',
      commits: [
        {
          id: '10',
          hash: '9a3f5c8',
          message: 'Version 1.0 release - stable main branch',
          author: 'Team Lead',
          timestamp: '2024-01-20 10:00',
          files: ['app.js', 'README.md'],
          branch: 'main',
          type: 'commit'
        },
        {
          id: '11',
          hash: '2e7b9f1',
          message: 'Start development of new feature',
          author: 'Charlie',
          timestamp: '2024-01-20 14:00',
          files: ['feature.js'],
          branch: 'feature/dashboard',
          type: 'branch-create',
          parentCommit: '10'
        },
        {
          id: '12',
          hash: '4c8d2a6',
          message: 'Critical bug discovered in production!',
          author: 'Diana',
          timestamp: '2024-01-21 09:00',
          files: [],
          branch: 'hotfix/critical-bug',
          type: 'branch-create',
          parentCommit: '10'
        },
        {
          id: '13',
          hash: '7f3e9b5',
          message: 'Fix critical security vulnerability',
          author: 'Diana',
          timestamp: '2024-01-21 09:45',
          files: ['security.js', 'auth.js'],
          branch: 'hotfix/critical-bug',
          type: 'commit'
        },
        {
          id: '14',
          hash: '1a5f8c3',
          message: 'Continue dashboard feature development',
          author: 'Charlie',
          timestamp: '2024-01-21 10:00',
          files: ['dashboard.html', 'charts.js'],
          branch: 'feature/dashboard',
          type: 'commit'
        },
        {
          id: '15',
          hash: '6b9d4e7',
          message: 'Merge hotfix to main - Version 1.0.1',
          author: 'Diana',
          timestamp: '2024-01-21 11:00',
          files: ['security.js', 'auth.js'],
          branch: 'main',
          type: 'merge',
          parentCommit: '13'
        },
        {
          id: '16',
          hash: '8d2a7f1',
          message: 'Merge hotfix into feature branch to stay current',
          author: 'Charlie',
          timestamp: '2024-01-21 14:00',
          files: ['security.js', 'auth.js'],
          branch: 'feature/dashboard',
          type: 'merge',
          parentCommit: '15'
        }
      ],
      learningPoints: [
        'Hotfix branches allow urgent fixes without disrupting development',
        'Critical fixes should be merged to main immediately',
        'Feature branches should merge hotfixes to stay current',
        'Git enables simultaneous bug fixing and feature development',
        'Version tags help track releases and fixes'
      ]
    }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario);
  const visibleCommits = currentScenario?.commits.slice(0, currentCommitIndex + 1) || [];
  const currentCommit = visibleCommits[currentCommitIndex];

  const playTimeline = () => {
    if (!currentScenario) return;
    
    setIsPlaying(true);
    
    const interval = setInterval(() => {
      setCurrentCommitIndex(prev => {
        if (prev >= currentScenario.commits.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const reset = () => {
    setCurrentCommitIndex(0);
    setIsPlaying(false);
  };

  const nextCommit = () => {
    if (currentScenario && currentCommitIndex < currentScenario.commits.length - 1) {
      setCurrentCommitIndex(currentCommitIndex + 1);
    }
  };

  const prevCommit = () => {
    if (currentCommitIndex > 0) {
      setCurrentCommitIndex(currentCommitIndex - 1);
    }
  };

  const getCommitIcon = (type: string) => {
    switch (type) {
      case 'commit': return <GitCommit className="w-4 h-4" />;
      case 'merge': return <GitMerge className="w-4 h-4" />;
      case 'branch-create': return <GitBranch className="w-4 h-4" />;
      default: return <GitCommit className="w-4 h-4" />;
    }
  };

  const getBranchColor = (branch: string) => {
    const colors: Record<string, string> = {
      'main': 'border-blue-500 bg-blue-100',
      'user-auth': 'border-green-500 bg-green-100',
      'shopping-cart': 'border-purple-500 bg-purple-100',
      'feature/dashboard': 'border-orange-500 bg-orange-100',
      'hotfix/critical-bug': 'border-red-500 bg-red-100'
    };
    return colors[branch] || 'border-gray-500 bg-gray-100';
  };

  const getAuthorAvatar = (author: string) => {
    const colors: Record<string, string> = {
      'Alice': 'bg-blue-500',
      'Bob': 'bg-green-500',
      'Charlie': 'bg-orange-500',
      'Diana': 'bg-purple-500',
      'Team Lead': 'bg-red-500'
    };
    return colors[author] || 'bg-gray-500';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <GitBranch className="w-5 h-5 mr-2 text-blue-600" />
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBranches(!showBranches)}
            className={`flex items-center px-3 py-1 rounded text-sm transition-colors ${
              showBranches 
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <GitBranch className="w-3 h-3 mr-1" />
            {showBranches ? 'Hide Branches' : 'Show Branches'}
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
      <div className="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
        <h4 className="font-semibold text-green-800 mb-2">Git Collaboration Simulation</h4>
        <p className="text-green-700 text-sm">
          Watch how multiple developers collaborate using Git. See how branches, commits, and merges work together to enable parallel development without conflicts.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Choose Collaboration Scenario:</h4>
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
        {/* Timeline Visualization */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Commit Timeline</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={playTimeline}
                disabled={isPlaying}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                <Play className="w-3 h-3 mr-1" />
                {isPlaying ? 'Playing' : 'Play'}
              </button>
              <button
                onClick={prevCommit}
                disabled={currentCommitIndex === 0}
                className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                ←
              </button>
              <span className="text-sm text-gray-600">
                {currentCommitIndex + 1} / {currentScenario?.commits.length || 0}
              </span>
              <button
                onClick={nextCommit}
                disabled={!currentScenario || currentCommitIndex >= currentScenario.commits.length - 1}
                className="px-2 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                →
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              {visibleCommits.map((commit, index) => (
                <div
                  key={commit.id}
                  className={`flex items-start space-x-4 p-3 rounded-lg transition-all duration-500 ${
                    index === currentCommitIndex 
                      ? 'bg-blue-100 border-l-4 border-blue-500' 
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Branch line and icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white ${
                      commit.type === 'merge' ? 'bg-purple-500 border-purple-600' :
                      commit.type === 'branch-create' ? 'bg-green-500 border-green-600' :
                      'bg-blue-500 border-blue-600'
                    }`}>
                      {getCommitIcon(commit.type)}
                    </div>
                    {index < visibleCommits.length - 1 && (
                      <div className="w-px h-8 bg-gray-300 mt-2"></div>
                    )}
                  </div>

                  {/* Commit details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                          {commit.hash}
                        </span>
                        {showBranches && (
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getBranchColor(commit.branch)}`}>
                            {commit.branch}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{commit.timestamp}</span>
                      </div>
                    </div>
                    
                    <h5 className="font-medium mb-2">{commit.message}</h5>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAuthorAvatar(commit.author)}`}>
                          {commit.author.charAt(0)}
                        </div>
                        <span className="text-sm text-gray-700">{commit.author}</span>
                      </div>
                      
                      {commit.files.length > 0 && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Code className="w-3 h-3" />
                          <span>{commit.files.length} files</span>
                        </div>
                      )}
                    </div>

                    {commit.files.length > 0 && index === currentCommitIndex && (
                      <div className="mt-3 p-2 bg-gray-100 rounded">
                        <h6 className="text-xs font-medium text-gray-600 mb-1">Modified Files:</h6>
                        <div className="flex flex-wrap gap-1">
                          {commit.files.map((file, fileIndex) => (
                            <span
                              key={fileIndex}
                              className="px-2 py-1 bg-white text-xs font-mono border rounded"
                            >
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div>
          <h4 className="font-semibold mb-3">Current Commit Details</h4>
          
          {currentCommit && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${getAuthorAvatar(currentCommit.author)}`}>
                  {currentCommit.author.charAt(0)}
                </div>
                <span className="ml-2 font-medium">{currentCommit.author}</span>
              </div>
              <h5 className="font-medium text-blue-800 mb-1">{currentCommit.message}</h5>
              <div className="text-sm text-blue-600 space-y-1">
                <div>Hash: <code className="bg-white px-1 rounded">{currentCommit.hash}</code></div>
                <div>Branch: <code className="bg-white px-1 rounded">{currentCommit.branch}</code></div>
                <div>Type: <span className="capitalize">{currentCommit.type.replace('-', ' ')}</span></div>
                <div>Time: {currentCommit.timestamp}</div>
              </div>
            </div>
          )}

          {/* Team Members */}
          <div className="mb-4">
            <h5 className="font-medium mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Team Members
            </h5>
            <div className="space-y-2">
              {['Alice', 'Bob', 'Charlie', 'Diana', 'Team Lead'].map((member) => (
                <div key={member} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full ${getAuthorAvatar(member)}`}></div>
                  <span className="text-sm">{member}</span>
                  {visibleCommits.some(c => c.author === member) && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {visibleCommits.filter(c => c.author === member).length} commits
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Learning Points */}
          {currentScenario && (
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h5 className="font-medium mb-2 text-green-800 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Key Learning Points
              </h5>
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

      {/* Git Commands Reference */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Git Commands Used in This Scenario</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium mb-2">Basic Commands:</h5>
            <div className="space-y-1 font-mono text-sm bg-gray-900 text-green-400 p-3 rounded">
              <div>git init</div>
              <div>git add .</div>
              <div>git commit -m "message"</div>
              <div>git status</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-2">Collaboration Commands:</h5>
            <div className="space-y-1 font-mono text-sm bg-gray-900 text-green-400 p-3 rounded">
              <div>git branch feature-name</div>
              <div>git checkout feature-name</div>
              <div>git merge feature-name</div>
              <div>git pull origin main</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitTimeline;
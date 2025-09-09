import React from 'react';

// Base path for GitHub Pages deployment
const BASE_PATH = '/year11-software-wiki';

const TopicTiles: React.FC = () => {
  const topics = [
    {
      href: `${BASE_PATH}/topics/programming-fundamentals`,
      title: 'Programming Fundamentals',
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
      hoverBorder: 'hover:border-blue-300',
      hoverText: 'group-hover:text-blue-600',
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      )
    },
    {
      href: `${BASE_PATH}/topics/object-oriented-programming`,
      title: 'Object-Oriented Programming',
      bgColor: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
      hoverBorder: 'hover:border-emerald-300',
      hoverText: 'group-hover:text-emerald-600',
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      )
    },
    {
      href: `${BASE_PATH}/topics/mechatronics`,
      title: 'Mechatronics',
      bgColor: 'bg-gradient-to-br from-purple-600 to-purple-700',
      hoverBorder: 'hover:border-purple-300',
      hoverText: 'group-hover:text-purple-600',
      icon: (
        <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
      {topics.map((topic, index) => (
        <a
          key={index}
          href={topic.href}
          className="block group hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out"
        >
          <div className={`border border-gray-200 ${topic.hoverBorder} hover:shadow-lg transition-all duration-300 bg-white p-8 h-64 rounded-lg`}>
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center">
                <div className={`w-20 h-20 rounded-xl ${topic.bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <div className="w-12 h-12">
                    {topic.icon}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h2 className={`text-xl font-semibold text-gray-900 ${topic.hoverText} transition-colors`}>
                  {topic.title}
                </h2>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default TopicTiles;
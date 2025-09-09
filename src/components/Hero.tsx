import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, BookOpen, Code2, Sparkles } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title = "Year 11 Software Engineering",
  subtitle = "Master the fundamentals with interactive learning",
  description = "A comprehensive revision wiki designed to help you excel in programming, algorithms, and software development concepts."
}) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 animate-float">
        <Code2 className="w-8 h-8 text-blue-400 opacity-60" />
      </div>
      <div className="absolute top-40 right-32 animate-float delay-1000">
        <BookOpen className="w-6 h-6 text-purple-400 opacity-60" />
      </div>
      <div className="absolute bottom-32 left-16 animate-float delay-2000">
        <Sparkles className="w-7 h-7 text-pink-400 opacity-60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Interactive Learning Platform
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
          {subtitle}
        </p>
        
        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-base group"
            onClick={() => document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Learning
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            Explore Topics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
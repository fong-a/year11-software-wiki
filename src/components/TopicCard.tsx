import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface TopicCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  features: string[];
  gradient: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  features,
  gradient
}) => {
  return (
    <Card className="h-full border border-gray-200 hover:border-gray-400 transition-colors bg-white cursor-pointer" onClick={() => window.location.href = href}>
      <CardHeader className="pb-3">
        <div className={`w-10 h-10 rounded flex items-center justify-center mb-2 ${gradient}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <CardTitle className="text-lg font-medium text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-gray-600 text-sm mb-3">
          {description}
        </CardDescription>
        
        <div className="space-y-1">
          {features.map((feature, index) => (
            <div key={index} className="text-xs text-gray-500">
              • {feature}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicCard;
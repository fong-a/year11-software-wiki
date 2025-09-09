import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  title: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent, title }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full h-80 perspective-1000">
      <motion.div
        className="relative w-full h-full cursor-pointer transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden border border-gray-200 rounded-lg bg-white shadow-lg">
          <div className="p-6 h-full flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
            <div className="flex-1 flex items-center justify-center">
              {frontContent}
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">Click to see pros/cons</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden border border-gray-200 rounded-lg bg-white shadow-lg rotate-y-180">
          <div className="p-6 h-full">
            <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
            <div className="h-full overflow-y-auto">
              {backContent}
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">Click to see diagram</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
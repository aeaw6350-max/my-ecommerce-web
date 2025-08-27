import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ConfigPanelHeaderProps {
  title: string;
  onBack: () => void;
}

const ConfigPanelHeader: React.FC<ConfigPanelHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <ArrowRight className="h-5 w-5 text-gray-600" />
      </motion.button>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
  );
};

export default ConfigPanelHeader;

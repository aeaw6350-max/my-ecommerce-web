import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Moon, 
  Sun, 
  User, 
  Menu, 
  Globe,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { useStoreDesign } from '../../contexts/StoreDesignContext';

const StoreHeader: React.FC = () => {
  const { state } = useStoreDesign();
  const { headerConfig, viewMode } = state;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        backgroundColor: headerConfig.backgroundColor,
        color: headerConfig.textColor,
      }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className={`${viewMode === 'mobile' ? 'px-4' : 'px-6'} py-4`}>
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          {viewMode === 'mobile' && headerConfig.menuButtonEnabled && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20"
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          )}

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {headerConfig.logo.charAt(0)}
              </span>
            </div>
            <span className="font-bold text-lg">{headerConfig.logo}</span>
          </motion.div>

          {/* Search Bar (Desktop/Tablet only) */}
          {headerConfig.searchEnabled && viewMode !== 'mobile' && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              className="flex-1 max-w-md mx-8"
            >
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في المنتجات..."
                  className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {headerConfig.languageButtonEnabled && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20"
              >
                <Globe className="h-5 w-5" />
              </motion.button>
            )}

            {headerConfig.darkModeEnabled && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20"
              >
                <Moon className="h-5 w-5" />
              </motion.button>
            )}

            {headerConfig.lightModeEnabled && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20"
              >
                <Sun className="h-5 w-5" />
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20 relative"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </motion.button>

            {headerConfig.userIconEnabled && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20"
              >
                <User className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        {headerConfig.searchEnabled && viewMode === 'mobile' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4"
          >
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث..."
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default StoreHeader;

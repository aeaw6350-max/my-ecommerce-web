import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Tablet, Smartphone, Eye, EyeOff, Sparkles, Palette } from 'lucide-react';
import { useStoreDesign } from '../contexts/StoreDesignContext';
import StorePreview from './preview/StorePreview';

const MainContent: React.FC = () => {
  const { state, dispatch } = useStoreDesign();

  const viewModes = [
    { 
      mode: 'desktop', 
      icon: Monitor, 
      label: 'سطح المكتب', 
      size: '1920x1080',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      mode: 'tablet', 
      icon: Tablet, 
      label: 'تابلت', 
      size: '768x1024',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      mode: 'mobile', 
      icon: Smartphone, 
      label: 'موبايل', 
      size: '375x667',
      color: 'from-green-500 to-green-600'
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navigation Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-gray-200 shadow-sm"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">معاينة المتجر</h1>
                  <p className="text-sm text-gray-600">تصميم تفاعلي ومتجاوب</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {viewModes.map((viewMode) => {
                  const IconComponent = viewMode.icon;
                  const isActive = state.viewMode === viewMode.mode;
                  
                  return (
                    <motion.button
                      key={viewMode.mode}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: viewMode.mode as any })}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? `bg-gradient-to-r ${viewMode.color} text-white shadow-lg shadow-${viewMode.mode === 'desktop' ? 'blue' : viewMode.mode === 'tablet' ? 'purple' : 'green'}-200`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <div className="text-right hidden sm:block">
                        <span className="text-sm font-medium block">{viewMode.label}</span>
                        <span className="text-xs opacity-80">{viewMode.size}</span>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">
                  {state.collections.length} كولكشن
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'TOGGLE_PREVIEW_MODE' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  state.isPreviewMode
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-200'
                }`}
              >
                {state.isPreviewMode ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    <span className="hidden sm:inline">إنهاء المعاينة</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">معاينة كاملة</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Preview Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex justify-center">
          <motion.div
            key={state.viewMode}
            initial={{ scale: 0.8, opacity: 0, rotateY: 45 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 20, 
              stiffness: 100,
              duration: 0.6
            }}
            className={`relative ${
              state.viewMode === 'desktop' ? 'w-full max-w-7xl' :
              state.viewMode === 'tablet' ? 'w-[768px]' :
              'w-[375px]'
            } bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200`}
            style={{
              minHeight: state.viewMode === 'mobile' ? '667px' : '800px',
            }}
          >
            {/* Device Frame */}
            <div className={`absolute inset-0 pointer-events-none z-10 ${
              state.viewMode === 'mobile' ? 'rounded-2xl' : 'rounded-2xl'
            }`}>
              {state.viewMode === 'mobile' && (
                <>
                  {/* Mobile notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl"></div>
                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full"></div>
                </>
              )}
            </div>
            
            <StorePreview />
            
            {/* Preview overlay when in preview mode */}
            {state.isPreviewMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20 flex items-end justify-center pb-8"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-800">
                  وضع المعاينة الكاملة
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* Device info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-200">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
              state.viewMode === 'desktop' ? 'from-blue-400 to-blue-500' :
              state.viewMode === 'tablet' ? 'from-purple-400 to-purple-500' :
              'from-green-400 to-green-500'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">
              {viewModes.find(vm => vm.mode === state.viewMode)?.size}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainContent;

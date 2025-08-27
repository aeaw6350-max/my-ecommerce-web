import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type } from 'lucide-react';
import { useStoreDesign } from '../../contexts/StoreDesignContext';
import ConfigPanelHeader from './ConfigPanelHeader';

const HeaderConfig: React.FC = () => {
  const { state, dispatch } = useStoreDesign();
  const { headerConfig } = state;

  const handleConfigChange = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_HEADER', payload: { [key]: value } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <ConfigPanelHeader
        title="إعدادات الهيدر"
        onBack={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: null })}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">الشعار</label>
        <input
          type="text"
          value={headerConfig.logo}
          onChange={(e) => handleConfigChange('logo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="اسم المتجر"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 flex items-center gap-2">
          <Type className="h-4 w-4" />
          الميزات
        </h4>
        
        {[
          { key: 'searchEnabled', label: 'شريط البحث' },
          { key: 'darkModeEnabled', label: 'الوضع المظلم' },
          { key: 'lightModeEnabled', label: 'الوضع الفاتح' },
          { key: 'userIconEnabled', label: 'أيقونة المستخدم' },
          { key: 'menuButtonEnabled', label: 'زر القائمة' },
          { key: 'languageButtonEnabled', label: 'زر اللغة' },
        ].map((feature) => (
          <motion.div
            key={feature.key}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="text-sm text-gray-700">{feature.label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={headerConfig[feature.key as keyof typeof headerConfig] as boolean}
                onChange={(e) => handleConfigChange(feature.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 flex items-center gap-2">
          <Palette className="h-4 w-4" />
          الألوان
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">لون الخلفية</label>
            <input
              type="color"
              value={headerConfig.backgroundColor}
              onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">لون النص</label>
            <input
              type="color"
              value={headerConfig.textColor}
              onChange={(e) => handleConfigChange('textColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: null })}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        إغلاق
      </motion.button>
    </motion.div>
  );
};

export default HeaderConfig;

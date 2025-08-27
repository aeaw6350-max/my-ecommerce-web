import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Palette } from 'lucide-react';
import { useStoreDesign } from '../../contexts/StoreDesignContext';
import ConfigPanelHeader from './ConfigPanelHeader';

const FooterConfig: React.FC = () => {
  const { state, dispatch } = useStoreDesign();
  const { footerConfig } = state;
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [newSocial, setNewSocial] = useState({ platform: '', url: '' });

  const handleConfigChange = (key: string, value: any) => {
    dispatch({ type: 'UPDATE_FOOTER', payload: { [key]: value } });
  };

  const addImportantLink = () => {
    if (newLink.title && newLink.url) {
      handleConfigChange('importantLinks', [...footerConfig.importantLinks, newLink]);
      setNewLink({ title: '', url: '' });
    }
  };

  const removeImportantLink = (index: number) => {
    const updatedLinks = footerConfig.importantLinks.filter((_, i) => i !== index);
    handleConfigChange('importantLinks', updatedLinks);
  };

  const addSocialMedia = () => {
    if (newSocial.platform && newSocial.url) {
      handleConfigChange('socialMedia', [...footerConfig.socialMedia, newSocial]);
      setNewSocial({ platform: '', url: '' });
    }
  };

  const removeSocialMedia = (index: number) => {
    const updatedSocial = footerConfig.socialMedia.filter((_, i) => i !== index);
    handleConfigChange('socialMedia', updatedSocial);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 p-6"
    >
      <ConfigPanelHeader
        title="إعدادات الفوتر"
        onBack={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: null })}
      />

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">الروابط المهمة</h4>
        <div className="space-y-2">
          {footerConfig.importantLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <span className="text-sm font-medium">{link.title}</span>
                <p className="text-xs text-gray-500">{link.url}</p>
              </div>
              <button
                onClick={() => removeImportantLink(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="عنوان الرابط"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="URL الرابط"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={addImportantLink}
            className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            إضافة رابط
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">السوشال ميديا</h4>
        <div className="space-y-2">
          {footerConfig.socialMedia.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <span className="text-sm font-medium capitalize">{social.platform}</span>
                <p className="text-xs text-gray-500">{social.url}</p>
              </div>
              <button
                onClick={() => removeSocialMedia(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="اسم المنصة"
            value={newSocial.platform}
            onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <input
            type="text"
            placeholder="رابط المنصة"
            value={newSocial.url}
            onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={addSocialMedia}
            className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            إضافة منصة
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">تحميل التطبيق</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">رابط iOS</label>
            <input
              type="text"
              value={footerConfig.appDownload.ios}
              onChange={(e) => handleConfigChange('appDownload', { ...footerConfig.appDownload, ios: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">رابط Android</label>
            <input
              type="text"
              value={footerConfig.appDownload.android}
              onChange={(e) => handleConfigChange('appDownload', { ...footerConfig.appDownload, android: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
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
              value={footerConfig.backgroundColor}
              onChange={(e) => handleConfigChange('backgroundColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">لون النص</label>
            <input
              type="color"
              value={footerConfig.textColor}
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

export default FooterConfig;

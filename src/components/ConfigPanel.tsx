import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoreDesign } from '../contexts/StoreDesignContext';
import HeaderConfig from './config/HeaderConfig';
import FooterConfig from './config/FooterConfig';
import CollectionConfigRouter from './config/CollectionConfigRouter';

const ConfigPanel: React.FC = () => {
  const { state } = useStoreDesign();

  const renderPanelContent = () => {
    if (state.editingCollectionId) {
      return <CollectionConfigRouter collectionId={state.editingCollectionId} />;
    }
    if (state.activeTab === 'header') {
      return <HeaderConfig />;
    }
    if (state.activeTab === 'footer') {
      return <FooterConfig />;
    }
    return null;
  };

  const panelContent = renderPanelContent();

  return (
    <AnimatePresence mode="wait">
      {panelContent && (
        <motion.div
          key={state.editingCollectionId || state.activeTab}
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="absolute inset-0 bg-white z-10 overflow-y-auto"
        >
          {panelContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfigPanel;

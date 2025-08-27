import React from 'react';
import { motion } from 'framer-motion';
import { useStoreDesign } from '../../contexts/StoreDesignContext';
import StoreHeader from './StoreHeader';
import StoreFooter from './StoreFooter';
import CollectionRenderer from './CollectionRenderer';

const StorePreview: React.FC = () => {
  const { state } = useStoreDesign();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full flex flex-col"
    >
      <StoreHeader />
      
      <main className="flex-1">
        {state.collections.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <p className="text-lg mb-2">لم يتم إضافة أي كولكشن بعد</p>
              <p className="text-sm">استخدم الشريط الجانبي لإضافة كولكشن جديد</p>
            </div>
          </div>
        ) : (
          <div className="space-y-0">
            {state.collections
              .sort((a, b) => a.order - b.order)
              .map((collection) => (
                <CollectionRenderer key={collection.id} collection={collection} />
              ))}
          </div>
        )}
      </main>

      <StoreFooter />
    </motion.div>
  );
};

export default StorePreview;

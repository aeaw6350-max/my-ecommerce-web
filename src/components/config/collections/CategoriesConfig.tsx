import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useStoreDesign, Collection, Category } from '../../../contexts/StoreDesignContext';
import ConfigPanelHeader from '../ConfigPanelHeader';
import { fakerAR as faker } from '@faker-js/faker';

interface CategoriesConfigProps {
  collection: Collection;
}

const CategoriesConfig: React.FC<CategoriesConfigProps> = ({ collection }) => {
  const { dispatch } = useStoreDesign();

  const updateCollectionData = (data: Partial<Collection['data']>) => {
    dispatch({
      type: 'UPDATE_COLLECTION',
      payload: { ...collection, data: { ...collection.data, ...data } },
    });
  };

  const handleCategoryChange = (catId: string, field: keyof Category, value: string) => {
    const updatedCategories = (collection.data.categories || []).map(cat =>
      cat.id === catId ? { ...cat, [field]: value } : cat
    );
    updateCollectionData({ categories: updatedCategories });
  };

  const addCategory = () => {
    const newCategory: Category = {
      id: faker.string.uuid(),
      name: 'قسم جديد',
      icon: '✨',
    };
    const updatedCategories = [...(collection.data.categories || []), newCategory];
    updateCollectionData({ categories: updatedCategories });
  };

  const removeCategory = (catId: string) => {
    const updatedCategories = (collection.data.categories || []).filter(cat => cat.id !== catId);
    updateCollectionData({ categories: updatedCategories });
  };

  return (
    <div className="space-y-6">
      <ConfigPanelHeader
        title={`تعديل: ${collection.name}`}
        onBack={() => dispatch({ type: 'SET_EDITING_COLLECTION_ID', payload: null })}
      />

      <div className="space-y-2">
        <label className="text-sm text-gray-600">عنوان الكولكشن</label>
        <input
          type="text"
          value={collection.data.title || ''}
          onChange={(e) => updateCollectionData({ title: e.target.value })}
          className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">الأقسام</h4>
        {(collection.data.categories || []).map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => handleCategoryChange(cat.id, 'name', e.target.value)}
                className="font-semibold text-sm bg-transparent"
              />
              <button onClick={() => removeCategory(cat.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-600">الأيقونة (Emoji)</label>
              <input
                type="text"
                value={cat.icon}
                onChange={(e) => handleCategoryChange(cat.id, 'icon', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </motion.div>
        ))}
        <button
          onClick={addCategory}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          إضافة قسم
        </button>
      </div>
    </div>
  );
};

export default CategoriesConfig;

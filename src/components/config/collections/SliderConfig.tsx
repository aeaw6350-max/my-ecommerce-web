import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useStoreDesign, Collection, Slide } from '../../../contexts/StoreDesignContext';
import ConfigPanelHeader from '../ConfigPanelHeader';
import { fakerAR as faker } from '@faker-js/faker';

interface SliderConfigProps {
  collection: Collection;
}

const SliderConfig: React.FC<SliderConfigProps> = ({ collection }) => {
  const { dispatch } = useStoreDesign();

  const updateCollectionData = (data: Partial<Collection['data']>) => {
    dispatch({
      type: 'UPDATE_COLLECTION',
      payload: { ...collection, data: { ...collection.data, ...data } },
    });
  };

  const handleSlideChange = (slideId: string, field: keyof Slide, value: string) => {
    const updatedSlides = (collection.data.slides || []).map(slide =>
      slide.id === slideId ? { ...slide, [field]: value } : slide
    );
    updateCollectionData({ slides: updatedSlides });
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: faker.string.uuid(),
      imageUrl: faker.image.urlLoremFlickr({ category: 'nature' }),
      title: 'عنوان جديد',
      subtitle: 'وصف قصير للشريحة الجديدة',
      buttonText: 'المزيد',
    };
    const updatedSlides = [...(collection.data.slides || []), newSlide];
    updateCollectionData({ slides: updatedSlides });
  };

  const removeSlide = (slideId: string) => {
    const updatedSlides = (collection.data.slides || []).filter(slide => slide.id !== slideId);
    updateCollectionData({ slides: updatedSlides });
  };

  return (
    <div className="space-y-6">
      <ConfigPanelHeader
        title={`تعديل: ${collection.name}`}
        onBack={() => dispatch({ type: 'SET_EDITING_COLLECTION_ID', payload: null })}
      />

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">الشرائح</h4>
        {(collection.data.slides || []).map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <h5 className="font-semibold text-sm">الشريحة #{index + 1}</h5>
              <button onClick={() => removeSlide(slide.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-600">رابط الصورة</label>
              <input
                type="text"
                value={slide.imageUrl}
                onChange={(e) => handleSlideChange(slide.id, 'imageUrl', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">العنوان الرئيسي</label>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleSlideChange(slide.id, 'title', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">العنوان الفرعي</label>
              <input
                type="text"
                value={slide.subtitle}
                onChange={(e) => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">نص الزر</label>
              <input
                type="text"
                value={slide.buttonText}
                onChange={(e) => handleSlideChange(slide.id, 'buttonText', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </motion.div>
        ))}
        <button
          onClick={addSlide}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          إضافة شريحة
        </button>
      </div>
    </div>
  );
};

export default SliderConfig;

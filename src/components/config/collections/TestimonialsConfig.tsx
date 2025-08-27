import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useStoreDesign, Collection, Testimonial } from '../../../contexts/StoreDesignContext';
import ConfigPanelHeader from '../ConfigPanelHeader';
import { fakerAR as faker } from '@faker-js/faker';

interface TestimonialsConfigProps {
  collection: Collection;
}

const TestimonialsConfig: React.FC<TestimonialsConfigProps> = ({ collection }) => {
  const { dispatch } = useStoreDesign();

  const updateCollectionData = (data: Partial<Collection['data']>) => {
    dispatch({
      type: 'UPDATE_COLLECTION',
      payload: { ...collection, data: { ...collection.data, ...data } },
    });
  };

  const handleTestimonialChange = (id: string, field: keyof Testimonial, value: string | number) => {
    const updatedTestimonials = (collection.data.testimonials || []).map(t =>
      t.id === id ? { ...t, [field]: value } : t
    );
    updateCollectionData({ testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      rating: 5,
      text: faker.lorem.paragraph(),
    };
    const updatedTestimonials = [...(collection.data.testimonials || []), newTestimonial];
    updateCollectionData({ testimonials: updatedTestimonials });
  };

  const removeTestimonial = (id: string) => {
    const updatedTestimonials = (collection.data.testimonials || []).filter(t => t.id !== id);
    updateCollectionData({ testimonials: updatedTestimonials });
  };

  return (
    <div className="space-y-6">
      <ConfigPanelHeader
        title={`تعديل: ${collection.name}`}
        onBack={() => dispatch({ type: 'SET_EDITING_COLLECTION_ID', payload: null })}
      />

      <div className="space-y-4">
        <h4 className="font-medium text-gray-800">الآراء</h4>
        {(collection.data.testimonials || []).map((testimonial) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={testimonial.name}
                onChange={(e) => handleTestimonialChange(testimonial.id, 'name', e.target.value)}
                className="font-semibold text-sm bg-transparent"
              />
              <button onClick={() => removeTestimonial(testimonial.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-600">نص الرأي</label>
              <textarea
                value={testimonial.text}
                onChange={(e) => handleTestimonialChange(testimonial.id, 'text', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">التقييم (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={testimonial.rating}
                onChange={(e) => handleTestimonialChange(testimonial.id, 'rating', parseInt(e.target.value))}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </motion.div>
        ))}
        <button
          onClick={addTestimonial}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          إضافة رأي
        </button>
      </div>
    </div>
  );
};

export default TestimonialsConfig;

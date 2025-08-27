import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useStoreDesign, Collection, Product } from '../../../contexts/StoreDesignContext';
import ConfigPanelHeader from '../ConfigPanelHeader';
import { fakerAR as faker } from '@faker-js/faker';

interface ProductCarouselConfigProps {
  collection: Collection;
}

const ProductCarouselConfig: React.FC<ProductCarouselConfigProps> = ({ collection }) => {
  const { dispatch } = useStoreDesign();

  const updateCollectionData = (data: Partial<Collection['data']>) => {
    dispatch({
      type: 'UPDATE_COLLECTION',
      payload: { ...collection, data: { ...collection.data, ...data } },
    });
  };

  const handleProductChange = (prodId: string, field: keyof Product, value: string | number) => {
    const updatedProducts = (collection.data.products || []).map(prod =>
      prod.id === prodId ? { ...prod, [field]: value } : prod
    );
    updateCollectionData({ products: updatedProducts });
  };

  const addProduct = () => {
    const newProduct: Product = {
        id: faker.string.uuid(),
        imageUrl: faker.image.urlLoremFlickr({ category: 'technics' }),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
        originalPrice: parseFloat(faker.commerce.price({ min: 500, max: 1000 })),
        rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
    };
    const updatedProducts = [...(collection.data.products || []), newProduct];
    updateCollectionData({ products: updatedProducts });
  };

  const removeProduct = (prodId: string) => {
    const updatedProducts = (collection.data.products || []).filter(prod => prod.id !== prodId);
    updateCollectionData({ products: updatedProducts });
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
        <h4 className="font-medium text-gray-800">المنتجات</h4>
        {(collection.data.products || []).map((prod) => (
          <motion.div
            key={prod.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={prod.name}
                onChange={(e) => handleProductChange(prod.id, 'name', e.target.value)}
                className="font-semibold text-sm bg-transparent w-full"
              />
              <button onClick={() => removeProduct(prod.id)} className="text-red-500 hover:text-red-700 p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div>
              <label className="text-xs text-gray-600">رابط الصورة</label>
              <input
                type="text"
                value={prod.imageUrl}
                onChange={(e) => handleProductChange(prod.id, 'imageUrl', e.target.value)}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">السعر</label>
              <input
                type="number"
                value={prod.price}
                onChange={(e) => handleProductChange(prod.id, 'price', parseFloat(e.target.value))}
                className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </motion.div>
        ))}
        <button
          onClick={addProduct}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          إضافة منتج
        </button>
      </div>
    </div>
  );
};

export default ProductCarouselConfig;

import React from 'react';
import { useStoreDesign } from '../../contexts/StoreDesignContext';
import SliderConfig from './collections/SliderConfig';
import CategoriesConfig from './collections/CategoriesConfig';
import ProductCarouselConfig from './collections/ProductCarouselConfig';
import OffersConfig from './collections/OffersConfig';
import TestimonialsConfig from './collections/TestimonialsConfig';
import DiscountBannerConfig from './collections/DiscountBannerConfig';
import { AnimatePresence, motion } from 'framer-motion';

interface CollectionConfigRouterProps {
  collectionId: string;
}

const CollectionConfigRouter: React.FC<CollectionConfigRouterProps> = ({ collectionId }) => {
  const { state } = useStoreDesign();
  const collection = state.collections.find(c => c.id === collectionId);

  if (!collection) {
    return (
      <div className="p-6 text-center text-red-500">
        خطأ: لم يتم العثور على الكولكشن.
      </div>
    );
  }

  const renderConfigComponent = () => {
    switch (collection.type) {
      case 'slider':
        return <SliderConfig collection={collection} />;
      case 'categories':
        return <CategoriesConfig collection={collection} />;
      case 'product-carousel':
        return <ProductCarouselConfig collection={collection} />;
      case 'offers':
        return <OffersConfig collection={collection} />;
      case 'testimonials':
        return <TestimonialsConfig collection={collection} />;
      case 'discount-banner':
        return <DiscountBannerConfig collection={collection} />;
      default:
        return <div>محرر غير متوفر لهذا النوع.</div>;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={collection.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-6"
      >
        {renderConfigComponent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default CollectionConfigRouter;

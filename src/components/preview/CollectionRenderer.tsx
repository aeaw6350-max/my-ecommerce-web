import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collection } from '../../contexts/StoreDesignContext';
import { useStoreDesign } from '../../contexts/StoreDesignContext';
import { Star, Heart, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';

interface CollectionRendererProps {
  collection: Collection;
}

const CollectionRenderer: React.FC<CollectionRendererProps> = ({ collection }) => {
  const { state } = useStoreDesign();
  const { viewMode } = state;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderCollection = () => {
    const isMobile = viewMode === 'mobile';
    const isTablet = viewMode === 'tablet';
    
    switch (collection.type) {
      case 'slider': {
        const [currentSlide, setCurrentSlide] = useState(0);
        const slides = collection.data.slides || [];
        if (slides.length === 0) return null;

        const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

        return (
          <div className={`relative ${isMobile ? 'h-72' : 'h-96'} bg-gray-800 flex items-center justify-center overflow-hidden`}>
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slides[currentSlide].imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </motion.div>
            </AnimatePresence>
            
            <div className="relative z-10 text-center text-white px-6">
              <motion.h2 
                key={`title-${currentSlide}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold mb-4 leading-tight`}
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p 
                key={`subtitle-${currentSlide}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} opacity-90 mb-6`}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.button
                key={`button-${currentSlide}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform"
              >
                {slides[currentSlide].buttonText}
              </motion.button>
            </div>
            
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full text-white hover:bg-white/40">
              <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 rounded-full text-white hover:bg-white/40">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
        );
      }

      case 'categories': {
        const categories = collection.data.categories || [];
        if (categories.length === 0) return null;
        return (
          <motion.div 
            variants={containerVariants}
            className={`py-16 ${isMobile ? 'px-4' : 'px-6'} bg-gradient-to-b from-gray-50 to-white`}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-800 mb-4`}>{collection.data.title}</h2>
            </motion.div>
            
            <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : isTablet ? 'grid-cols-3 gap-6' : 'grid-cols-4 gap-8'} max-w-6xl mx-auto`}>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  transition={{delay: index * 0.1}}
                  whileHover={{ y: -10, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                >
                  <div className={`w-full aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl mb-4 flex items-center justify-center group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  </div>
                  <h3 className="font-semibold text-center text-gray-800 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      }

      case 'product-carousel': {
        const products = collection.data.products || [];
        if (products.length === 0) return null;
        return (
          <motion.div 
            variants={containerVariants}
            className={`py-16 ${isMobile ? 'px-4' : 'px-6'} bg-white`}
          >
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-12">
              <div>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-800 mb-2`}>{collection.data.title}</h2>
              </div>
            </motion.div>
            
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : isTablet ? 'grid-cols-2 gap-6' : 'grid-cols-4 gap-6'} max-w-7xl mx-auto`}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  transition={{delay: index * 0.1}}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group border border-gray-100"
                >
                  <div className="relative">
                    <div className="h-48 bg-gray-200 bg-cover bg-center" style={{backgroundImage: `url(${product.imageUrl})`}}></div>
                    <div className="absolute top-3 right-3">
                      <motion.button className="p-2 bg-white/90 rounded-full shadow-md"><Heart className="h-4 w-4 text-gray-600" /></motion.button>
                    </div>
                    {product.originalPrice && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors truncate">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star 
                          key={starIndex} 
                          className={`h-4 w-4 ${starIndex < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 mr-1">({product.rating.toFixed(1)})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">{product.price} ر.س</span>
                        {product.originalPrice && <span className="text-sm text-gray-500 line-through">{product.originalPrice} ر.س</span>}
                      </div>
                      <motion.button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium">
                        <ShoppingCart className="h-4 w-4" />
                        {isMobile ? '' : 'أضف للسلة'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      }

      case 'offers': {
        const calculateTimeLeft = () => {
          const difference = +new Date(collection.data.countdownDate || new Date()) - +new Date();
          let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
            };
          }
          return timeLeft;
        };
        const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
        useEffect(() => {
          const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
          return () => clearTimeout(timer);
        });

        return (
          <motion.div 
            variants={containerVariants}
            className={`py-16 ${isMobile ? 'px-4' : 'px-6'} bg-gradient-to-br from-red-50 to-pink-50`}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-3xl p-8 text-white text-center max-w-4xl mx-auto"
            >
              <h3 className={`${isMobile ? 'text-3xl' : 'text-5xl'} font-bold mb-4`}>{collection.data.title}</h3>
              <p className={`${isMobile ? 'text-base' : 'text-xl'} mb-6 opacity-90`}>{collection.data.subtitle}</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-3 text-center w-20"><div className="text-2xl font-bold">{timeLeft.days}</div><div className="text-sm opacity-80">أيام</div></div>
                <div className="bg-white/20 rounded-lg p-3 text-center w-20"><div className="text-2xl font-bold">{timeLeft.hours}</div><div className="text-sm opacity-80">ساعات</div></div>
                <div className="bg-white/20 rounded-lg p-3 text-center w-20"><div className="text-2xl font-bold">{timeLeft.minutes}</div><div className="text-sm opacity-80">دقائق</div></div>
                <div className="bg-white/20 rounded-lg p-3 text-center w-20"><div className="text-2xl font-bold">{timeLeft.seconds}</div><div className="text-sm opacity-80">ثواني</div></div>
              </div>
              
              <motion.button className="px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg">{collection.data.buttonText}</motion.button>
            </motion.div>
          </motion.div>
        );
      }

      case 'testimonials': {
        const testimonials = collection.data.testimonials || [];
        if (testimonials.length === 0) return null;
        return (
          <motion.div 
            variants={containerVariants}
            className={`py-16 ${isMobile ? 'px-4' : 'px-6'} bg-gradient-to-b from-blue-50 to-white`}
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-800 mb-4`}>{collection.data.title}</h2>
            </motion.div>
            
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-3 gap-8'} max-w-6xl mx-auto`}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemVariants}
                  transition={{delay: index * 0.1}}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                    <div className="mr-3">
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star 
                            key={starIndex} 
                            className={`h-4 w-4 ${starIndex < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.text}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      }

      case 'discount-banner':
        return (
          <motion.div 
            variants={containerVariants}
            className={`py-16 ${isMobile ? 'px-4' : 'px-6'} bg-gradient-to-br from-yellow-50 to-orange-50`}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white max-w-6xl mx-auto"
            >
              <div className={`${isMobile ? 'text-center' : 'text-right'} ${isMobile ? 'w-full mb-6' : 'flex-1'}`}>
                <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold mb-2`}>{collection.data.title}</h3>
                <p className={`${isMobile ? 'text-sm' : 'text-lg'} opacity-90 mb-4`}>{collection.data.subtitle}</p>
                <div className="inline-block bg-white/20 rounded-lg px-3 py-1 text-sm font-semibold">
                  استخدم الكود: {collection.data.couponCode}
                </div>
              </div>
              <motion.button className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg shrink-0">
                {collection.data.buttonText}
              </motion.button>
            </motion.div>
          </motion.div>
        );

      default:
        return (
          <motion.div className={`py-16 ${isMobile ? 'px-4' : 'px-6'} bg-gray-100`}>
            <div className="text-center text-gray-600">
              <h3 className="text-lg font-medium mb-2">كولكشن مخصص</h3>
              <p className="text-sm">{collection.name}</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full relative"
    >
      {renderCollection()}
    </motion.section>
  );
};

export default CollectionRenderer;

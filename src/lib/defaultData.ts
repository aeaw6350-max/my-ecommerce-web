import { fakerAR as faker } from '@faker-js/faker';
import { CollectionData } from '../contexts/StoreDesignContext';

export const createDefaultData = (type: string): CollectionData => {
  switch (type) {
    case 'slider':
      return {
        enabled: true,
        slides: Array.from({ length: 3 }).map(() => ({
          id: faker.string.uuid(),
          imageUrl: faker.image.urlLoremFlickr({ category: 'business', width: 1280, height: 720 }),
          title: faker.lorem.sentence(4),
          subtitle: faker.lorem.sentence(10),
          buttonText: 'اكتشف المزيد',
        })),
      };
    case 'categories':
      return {
        enabled: true,
        title: 'تسوق حسب الفئة',
        categories: [
          { id: faker.string.uuid(), name: 'إلكترونيات', icon: '📱' },
          { id: faker.string.uuid(), name: 'ملابس', icon: '👕' },
          { id: faker.string.uuid(), name: 'منزل', icon: '🏠' },
          { id: faker.string.uuid(), name: 'جمال', icon: '💄' },
        ],
      };
    case 'product-carousel':
      return {
        enabled: true,
        title: 'منتجات مميزة',
        products: Array.from({ length: 4 }).map(() => ({
          id: faker.string.uuid(),
          imageUrl: faker.image.urlLoremFlickr({ category: 'technics', width: 400, height: 400 }),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
          originalPrice: parseFloat(faker.commerce.price({ min: 500, max: 1000 })),
          rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
        })),
      };
    case 'offers':
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      return {
        enabled: true,
        title: 'خصم يصل إلى 70%',
        subtitle: 'على مجموعة مختارة من أفضل المنتجات',
        countdownDate: futureDate.toISOString().slice(0, 16),
        buttonText: 'اشترِ الآن',
      };
    case 'testimonials':
      return {
        enabled: true,
        title: 'آراء عملائنا الكرام',
        testimonials: Array.from({ length: 3 }).map(() => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          avatar: faker.image.avatar(),
          rating: faker.number.int({ min: 4, max: 5 }),
          text: faker.lorem.paragraph(),
        })),
      };
    case 'discount-banner':
      return {
        enabled: true,
        title: 'وفر أكثر مع كل عملية شراء!',
        subtitle: 'خصم إضافي 25% عند الشراء بقيمة 500 ريال أو أكثر',
        couponCode: 'SAVE25',
        buttonText: 'تسوق واستفد',
      };
    default:
      return { enabled: true };
  }
};

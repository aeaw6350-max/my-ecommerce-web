import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { createDefaultData } from '../lib/defaultData';

// Data Structures
export interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // emoji
}

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
}

export interface Testimonial {
  id:string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface CollectionData {
  title?: string;
  subtitle?: string;
  enabled: boolean;
  slides?: Slide[];
  categories?: Category[];
  products?: Product[];
  countdownDate?: string;
  buttonText?: string;
  couponCode?: string;
  testimonials?: Testimonial[];
}

export interface Collection {
  id: string;
  type: 'slider' | 'categories' | 'product-carousel' | 'offers' | 'testimonials' | 'discount-banner';
  name: string;
  data: CollectionData;
  order: number;
}

export interface HeaderConfig {
  logo: string;
  searchEnabled: boolean;
  darkModeEnabled: boolean;
  lightModeEnabled: boolean;
  userIconEnabled: boolean;
  menuButtonEnabled: boolean;
  languageButtonEnabled: boolean;
  backgroundColor: string;
  textColor: string;
}

export interface FooterConfig {
  importantLinks: { title: string; url: string }[];
  socialMedia: { platform: string; url: string }[];
  appDownload: { ios: string; android: string };
  paymentMethods: string[];
  shippingCompanies: string[];
  backgroundColor: string;
  textColor: string;
}

export interface StoreDesignState {
  activeTab: 'header' | 'collections' | 'footer' | null;
  editingCollectionId: string | null;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  collections: Collection[];
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  isPreviewMode: boolean;
}

type StoreDesignAction =
  | { type: 'SET_ACTIVE_TAB'; payload: 'header' | 'collections' | 'footer' | null }
  | { type: 'SET_EDITING_COLLECTION_ID'; payload: string | null }
  | { type: 'SET_VIEW_MODE'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'ADD_COLLECTION'; payload: { type: string; name: string } }
  | { type: 'UPDATE_COLLECTION'; payload: Collection }
  | { type: 'DELETE_COLLECTION'; payload: string }
  | { type: 'REORDER_COLLECTIONS'; payload: Collection[] }
  | { type: 'UPDATE_HEADER'; payload: Partial<HeaderConfig> }
  | { type: 'UPDATE_FOOTER'; payload: Partial<FooterConfig> }
  | { type: 'TOGGLE_PREVIEW_MODE' };

const initialState: StoreDesignState = {
  activeTab: null,
  editingCollectionId: null,
  viewMode: 'desktop',
  collections: [],
  headerConfig: {
    logo: 'متجري',
    searchEnabled: true,
    darkModeEnabled: true,
    lightModeEnabled: true,
    userIconEnabled: true,
    menuButtonEnabled: true,
    languageButtonEnabled: true,
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
  footerConfig: {
    importantLinks: [
      { title: 'من نحن', url: '/about' },
      { title: 'اتصل بنا', url: '/contact' },
      { title: 'سياسة الخصوصية', url: '/privacy' },
    ],
    socialMedia: [
      { platform: 'facebook', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'instagram', url: '#' },
    ],
    appDownload: { ios: '#', android: '#' },
    paymentMethods: ['visa', 'mastercard', 'paypal'],
    shippingCompanies: ['dhl', 'fedex', 'aramex'],
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
  },
  isPreviewMode: false,
};

const storeDesignReducer = (state: StoreDesignState, action: StoreDesignAction): StoreDesignState => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload, editingCollectionId: null };
    case 'SET_EDITING_COLLECTION_ID':
      return { ...state, editingCollectionId: action.payload, activeTab: null };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    case 'ADD_COLLECTION': {
      const newCollection: Collection = {
        id: `collection-${Date.now()}`,
        type: action.payload.type as Collection['type'],
        name: action.payload.name,
        data: createDefaultData(action.payload.type),
        order: state.collections.length,
      };
      return { 
        ...state, 
        collections: [...state.collections, newCollection],
        editingCollectionId: newCollection.id, // Automatically edit new collection
        activeTab: null, // Close the "add collection" panel
      };
    }
    case 'UPDATE_COLLECTION':
      return {
        ...state,
        collections: state.collections.map(col =>
          col.id === action.payload.id ? action.payload : col
        ),
      };
    case 'DELETE_COLLECTION':
      return {
        ...state,
        collections: state.collections.filter(col => col.id !== action.payload),
        editingCollectionId: state.editingCollectionId === action.payload ? null : state.editingCollectionId,
      };
    case 'REORDER_COLLECTIONS':
      return { ...state, collections: action.payload };
    case 'UPDATE_HEADER':
      return { ...state, headerConfig: { ...state.headerConfig, ...action.payload } };
    case 'UPDATE_FOOTER':
      return { ...state, footerConfig: { ...state.footerConfig, ...action.payload } };
    case 'TOGGLE_PREVIEW_MODE':
      return { ...state, isPreviewMode: !state.isPreviewMode };
    default:
      return state;
  }
};

const StoreDesignContext = createContext<{
  state: StoreDesignState;
  dispatch: React.Dispatch<StoreDesignAction>;
} | null>(null);

export const StoreDesignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeDesignReducer, initialState);

  return (
    <StoreDesignContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreDesignContext.Provider>
  );
};

export const useStoreDesign = () => {
  const context = useContext(StoreDesignContext);
  if (!context) {
    throw new Error('useStoreDesign must be used within a StoreDesignProvider');
  }
  return context;
};

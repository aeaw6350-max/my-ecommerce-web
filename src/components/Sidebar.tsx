import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutPanelTop,
  Grid3X3,
  Layout,
  Plus,
  ChevronRight,
  Settings,
  Image,
  ShoppingCart,
  Star,
  Gift,
  Percent,
  Edit3,
  Trash2,
  GripVertical,
} from 'lucide-react';
import { useStoreDesign, Collection } from '../contexts/StoreDesignContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const collectionTypes = [
  { type: 'slider', name: 'شرائح الصور', icon: Image, color: 'bg-blue-100 text-blue-600' },
  { type: 'categories', name: 'الأقسام', icon: Grid3X3, color: 'bg-green-100 text-green-600' },
  { type: 'product-carousel', name: 'كاروسيل المنتجات', icon: ShoppingCart, color: 'bg-purple-100 text-purple-600' },
  { type: 'offers', name: 'العروض', icon: Gift, color: 'bg-red-100 text-red-600' },
  { type: 'testimonials', name: 'آراء العملاء', icon: Star, color: 'bg-yellow-100 text-yellow-600' },
  { type: 'discount-banner', name: 'بانر خصم', icon: Percent, color: 'bg-orange-100 text-orange-600' },
];

interface SortableCollectionItemProps {
  collection: Collection;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const SortableCollectionItem: React.FC<SortableCollectionItemProps> = ({ collection, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: collection.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
  };

  const collectionType = collectionTypes.find(ct => ct.type === collection.type);
  const IconComponent = collectionType?.icon || Grid3X3;

  return (
    <div ref={setNodeRef} style={style}>
      <motion.div
        whileHover={{ x: 5 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 group hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2">
              <button {...attributes} {...listeners} className="cursor-move p-1">
                <GripVertical className="h-4 w-4 text-gray-400" />
              </button>
              <div className={`p-2 rounded-lg ${collectionType?.color || 'bg-gray-100 text-gray-600'}`}>
                <IconComponent className="h-3 w-3" />
              </div>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700 block">
                {collection.name}
              </span>
              <span className="text-xs text-gray-500">الترتيب #{collection.order + 1}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onEdit(collection.id)}
              className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
            >
              <Edit3 className="h-3 w-3" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(collection.id)}
              className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { state, dispatch } = useStoreDesign();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleTabClick = (tab: 'header' | 'collections' | 'footer') => {
    dispatch({ 
      type: 'SET_ACTIVE_TAB', 
      payload: state.activeTab === tab ? null : tab 
    });
  };

  const handleAddCollection = (type: string) => {
    const collectionType = collectionTypes.find(ct => ct.type === type);
    if (!collectionType) return;
    
    dispatch({ 
      type: 'ADD_COLLECTION', 
      payload: { type: collectionType.type, name: collectionType.name }
    });
  };

  const handleDeleteCollection = (collectionId: string) => {
    dispatch({ type: 'DELETE_COLLECTION', payload: collectionId });
  };

  const handleEditCollection = (collectionId: string) => {
    dispatch({ type: 'SET_EDITING_COLLECTION_ID', payload: collectionId });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = state.collections.findIndex((c) => c.id === active.id);
      const newIndex = state.collections.findIndex((c) => c.id === over.id);
      
      const newOrderedCollections = arrayMove(state.collections, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));

      dispatch({ type: 'REORDER_COLLECTIONS', payload: newOrderedCollections });
    }
  };

  return (
    <motion.div
      initial={{ x: state.isPreviewMode ? -300 : 0 }}
      animate={{ x: state.isPreviewMode ? -300 : 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto shadow-lg"
    >
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-600" />
          إعدادات التصميم
        </h2>
        <p className="text-sm text-gray-600 mt-1">قم بتخصيص متجرك الإلكتروني</p>
      </div>

      <div className="p-4 space-y-4">
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleTabClick('header')}
          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 group ${
            state.activeTab === 'header'
              ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-lg'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${state.activeTab === 'header' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'} transition-colors`}>
              <LayoutPanelTop className="h-4 w-4" />
            </div>
            <div className="text-right">
              <span className="font-medium block">تصميم الهيدر</span>
              <span className="text-xs opacity-70">الشعار، البحث، الأيقونات</span>
            </div>
          </div>
          <ChevronRight 
            className={`h-4 w-4 transition-transform duration-300 ${
              state.activeTab === 'header' ? 'rotate-90' : 'group-hover:rotate-45'
            }`} 
          />
        </motion.button>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">الكولكشن المضافة</h3>
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {state.collections.length}
            </span>
          </div>
          
          {state.collections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6 text-gray-500"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Grid3X3 className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm">لم يتم إضافة أي كولكشن بعد</p>
            </motion.div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={state.collections.map(c => c.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {state.collections.map((collection) => (
                    <SortableCollectionItem
                      key={collection.id}
                      collection={collection}
                      onDelete={handleDeleteCollection}
                      onEdit={handleEditCollection}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleTabClick('footer')}
          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 group ${
            state.activeTab === 'footer'
              ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 shadow-lg'
              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${state.activeTab === 'footer' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'} transition-colors`}>
              <Layout className="h-4 w-4" />
            </div>
            <div className="text-right">
              <span className="font-medium block">تصميم الفوتر</span>
              <span className="text-xs opacity-70">الروابط، السوشال ميديا</span>
            </div>
          </div>
          <ChevronRight 
            className={`h-4 w-4 transition-transform duration-300 ${
              state.activeTab === 'footer' ? 'rotate-90' : 'group-hover:rotate-45'
            }`} 
          />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleTabClick('collections')}
          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 group ${
            state.activeTab === 'collections'
              ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-lg'
              : 'border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${state.activeTab === 'collections' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600 group-hover:bg-green-200'} transition-colors`}>
              <Plus className="h-4 w-4" />
            </div>
            <div className="text-right">
              <span className="font-medium block">إضافة كولكشن جديد</span>
              <span className="text-xs opacity-70">اختر من القوالب المتاحة</span>
            </div>
          </div>
          <ChevronRight 
            className={`h-4 w-4 transition-transform duration-300 ${
              state.activeTab === 'collections' ? 'rotate-90' : 'group-hover:rotate-45'
            }`} 
          />
        </motion.button>

        <AnimatePresence>
          {state.activeTab === 'collections' && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="space-y-3 pl-2"
            >
              <div className="text-xs font-medium text-gray-600 mb-3 flex items-center gap-2">
                <div className="w-8 h-[1px] bg-gray-300"></div>
                <span>اختر نوع الكولكشن</span>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
              </div>
              
              {collectionTypes.map((collectionType, index) => {
                const IconComponent = collectionType.icon;
                return (
                  <motion.button
                    key={collectionType.type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddCollection(collectionType.type)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 text-gray-700 transition-all duration-300 group border border-transparent hover:border-gray-200"
                  >
                    <div className={`p-2 rounded-lg ${collectionType.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="text-right flex-1">
                      <span className="text-sm font-medium block">{collectionType.name}</span>
                    </div>
                    <Plus className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-4 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3">
              <div className="text-lg font-bold text-blue-600">{state.collections.length}</div>
              <div className="text-xs text-blue-600 opacity-80">كولكشن</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3">
              <div className="text-lg font-bold text-green-600">
                {state.headerConfig.searchEnabled ? '✓' : '✗'}
              </div>
              <div className="text-xs text-green-600 opacity-80">البحث</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

import React from 'react';
import { useStoreDesign, Collection } from '../../../contexts/StoreDesignContext';
import ConfigPanelHeader from '../ConfigPanelHeader';

interface OffersConfigProps {
  collection: Collection;
}

const OffersConfig: React.FC<OffersConfigProps> = ({ collection }) => {
  const { dispatch } = useStoreDesign();

  const updateCollectionData = (data: Partial<Collection['data']>) => {
    dispatch({
      type: 'UPDATE_COLLECTION',
      payload: { ...collection, data: { ...collection.data, ...data } },
    });
  };

  return (
    <div className="space-y-6">
      <ConfigPanelHeader
        title={`تعديل: ${collection.name}`}
        onBack={() => dispatch({ type: 'SET_EDITING_COLLECTION_ID', payload: null })}
      />

      <div className="space-y-2">
        <label className="text-sm text-gray-600">العنوان الرئيسي</label>
        <input
          type="text"
          value={collection.data.title || ''}
          onChange={(e) => updateCollectionData({ title: e.target.value })}
          className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">العنوان الفرعي</label>
        <input
          type="text"
          value={collection.data.subtitle || ''}
          onChange={(e) => updateCollectionData({ subtitle: e.target.value })}
          className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">تاريخ انتهاء العداد</label>
        <input
          type="datetime-local"
          value={collection.data.countdownDate || ''}
          onChange={(e) => updateCollectionData({ countdownDate: e.target.value })}
          className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">نص الزر</label>
        <input
          type="text"
          value={collection.data.buttonText || ''}
          onChange={(e) => updateCollectionData({ buttonText: e.target.value })}
          className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default OffersConfig;

import React from 'react';
import { StoreDesignProvider } from './contexts/StoreDesignContext';
import Sidebar from './components/Sidebar';
import ConfigPanel from './components/ConfigPanel';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  return (
    <StoreDesignProvider>
      <div className="h-screen flex bg-gray-100">
        <div className="relative">
          <Sidebar />
          <ConfigPanel />
        </div>
        <MainContent />
      </div>
    </StoreDesignProvider>
  );
};

export default App;

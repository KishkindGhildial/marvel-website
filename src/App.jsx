import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

import Header from './components/Header';
import Carousel from './components/Carousel';
import Comics from './components/Comics';

function App() {
  const queryClient = new QueryClient();

  const [selectedItems, setSelectedItems] = useState({
    ids: [],
    names: [],
  });
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    if (selectedItems.ids.length > 0) setCurrentAction('select');
  }, [selectedItems]);

  const handleCharClick = (id, name) => {
    setSelectedItems(prev => {
      const state = { ...prev };
      const index = state.ids.indexOf(id);

      if (index !== -1) {
        state.ids.splice(index, 1);
        state.names.splice(index, 1);
      } else {
        state.ids.push(id);
        state.names.push(name);
      }

      return state;
    });
  };

  return (
    <>
      <Header
        setGlobalSearchTerm={setGlobalSearchTerm}
        setCurrentAction={setCurrentAction}
      />
      <QueryClientProvider client={queryClient}>
        <Carousel
          selectedItems={selectedItems}
          handleItemClick={handleCharClick}
        />
        <Comics
          currentAction={currentAction}
          searchTerm={globalSearchTerm}
          selectedItems={selectedItems}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;

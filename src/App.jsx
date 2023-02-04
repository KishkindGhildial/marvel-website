import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import Carousel from './components/Carousel';
import Comics from './components/Comics';

import charSeed from './seeds/characters';

function App() {
  const [selectedItems, setSelectedItems] = useState({
    ids: [],
    names: [],
  });

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
      <Header />
      <Carousel
        data={charSeed.data.results}
        selectedItems={selectedItems}
        handleItemClick={handleCharClick}
      />
      <Comics />
    </>
  );
}

export default App;

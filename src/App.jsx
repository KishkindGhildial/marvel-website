import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import Carousel from './components/Carousel';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Carousel />
      <h1>Marvel</h1>
    </>
  );
}

export default App;

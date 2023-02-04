import { useState } from 'react';
import './App.css';

import Header from './components/Header';
import Carousel from './components/Carousel';
import Comics from './components/Comics';

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Comics />
      <h1>Marvel</h1>
    </>
  );
}

export default App;

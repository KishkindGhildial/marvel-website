import { useState } from 'react';
import './App.css';

import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <h1>Marvel</h1>
    </>
  );
}

export default App;

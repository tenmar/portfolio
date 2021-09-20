import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Camera, Landing } from './Components'

function App() {
  return (
    <div className="App">
      <Camera center={<Landing />}  />
    </div>
  );
}

export default App;

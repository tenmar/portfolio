import React from 'react';
import './App.css';

import { CameraProvider } from './Model'
import { Camera, Landing } from './Components'

function App() {
  return (
    <div className="App">
      <CameraProvider>
        <Camera center={<Landing />}  />
      </CameraProvider>
    </div>
  );
}

export default App;

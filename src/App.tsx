import React from 'react';
import './App.css';

import { CameraProvider } from './Model'
import { Camera, Landing, Experience, Projects, Skills, Credits } from './Components'

function App() {
  return (
    <div className="App">
      <CameraProvider>
        <Camera center={<Landing />} left={<Experience/>} up={<Projects />} right={<Skills />} down={<Credits />} />
      </CameraProvider>
    </div>
  );
}

export default App;

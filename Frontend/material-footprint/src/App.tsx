import React from 'react';
import './App.sass';

/* Components */
import Configurator from 'Configurator/Configurator';
import { isLocalMode } from 'API';

/* Utilities */

/* Shared */

const localMode = isLocalMode();

function App() {
  return (
    <div className="App">
      <header>
        Material Footprint
        { localMode && <span className="App-local-mode">Local Mode</span> }
      </header>
      <div className="App-content">
        <Configurator></Configurator>
      </div>
      <footer>
        <a href="https://github.com/marc7s/MaterialFootprint" target="_blank" rel="noopener noreferrer">Source code</a>
      </footer>
    </div>
  );
}

export default App;

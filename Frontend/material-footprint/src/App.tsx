import React from 'react';
import './App.sass';

/* Components */
import Configurator from './Configurator/Configurator';
import Widget from './Widget/Widget';

/* Utilities */

/* Shared */


function App() {
  return (
    <div className="App">
      <header>
        Material Footprint
      </header>
      <div className="App-content">
        <Configurator></Configurator>
        <Widget></Widget>
      </div>
      <footer>
        <a href="https://github.com/marc7s/MaterialFootprint" target="_blank" rel="noopener noreferrer">Source code</a>
      </footer>
    </div>
  );
}

export default App;

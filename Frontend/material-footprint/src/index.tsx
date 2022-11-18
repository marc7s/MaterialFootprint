import React from 'react';
import './index.sass';

/* Components */
import App from 'App';

/* Utilities */
import ReactDOM from 'react-dom/client';

/* Shared */

  
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
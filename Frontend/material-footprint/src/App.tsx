import React, { useEffect, useState } from 'react';
import './App.sass';

/* Components */
import Configurator from 'Configurator/Configurator';
import { getClients, isLocalMode } from 'API';

/* Utilities */

/* Shared */
import { Client } from 'shared/interfaces';



const localMode = isLocalMode();

function App() {
  const [clients, setClients] = useState([] as Client[]);
  const [currentClient, setCurrentClient] = useState(null as Client | null);

  // Load clients from API on first render
  useEffect(() => {
    async function loadClients() {
      getClients().then(c => setClients(c));
    }
    loadClients();
  }, []);

  // Set current client to first client once they have been loaded
  useEffect(() => {
    setCurrentClient(clients[0]);
  }, [clients]);

  // Call the parent's onMaterialChange function when a material is selected
  function changeClient(e: React.ChangeEvent<HTMLSelectElement>): void {
    const clientID: number = parseInt(e.target.value);
    if(Number.isNaN(clientID)) return;
    
    const client: Client | undefined = clients.find(c => c.id === clientID);
    if(client === undefined) return;
    
    setCurrentClient(client);
  }

  return (
    <div className="App">
      <header>
        Material Footprint
        { localMode && <span className="App-local-mode">Local Mode</span> }
        <div className="App-client-container">
          <select onChange={changeClient}>
            { clients.map(c => <option key={c.id} className="App-client" value={c.id}>{c.name}</option>) }
          </select>
        </div>
      </header>
      <div className="App-content">
        { 
          currentClient && 
          <Configurator currentClient={currentClient}></Configurator> 
        }
      </div>
      <footer>
        <a href="https://github.com/marc7s/MaterialFootprint" target="_blank" rel="noopener noreferrer">Source code</a>
      </footer>
    </div>
  );
}

export default App;

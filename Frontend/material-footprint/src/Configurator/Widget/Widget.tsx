import React, { useEffect, useState } from 'react';
import './Widget.sass';

/* Components */
import EmissionComponent from 'Configurator/EmissionComponent/EmissionComponent';

/* Utilities */

/* Shared */
import { ModelPart, Emission, EmissionCost, Model, Client } from 'shared/interfaces';
import { uniqueID } from 'shared/utils';

export interface WidgetProp {
  currentModel: Model;
  currentClient: Client;
}

async function calculatePartEmission(clientID: number, modelPart: ModelPart): Promise<Emission> {
  const data = {
    partName: modelPart.name,
    clientID: clientID,
    area: modelPart.area,
    volume: modelPart.volume,
    materialID: modelPart.material.id,
    surfaceTreatmentIDs: modelPart.surfaceTreatments.map(st => st.id)
  };
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return new Promise((resolve, reject) => {
      const baseEndpoint: string | undefined = process.env.REACT_APP_BACKEND_ENDPOINT;
      if(baseEndpoint === undefined)
          reject(new Error('No backend endpoint specified'));

      fetch(new URL('calculate-part-emission', baseEndpoint), options)
      .then(response => response.json())
      .then(data => resolve(data as Emission))
      .catch(error => console.error(error));
  });
}

// Get a list of all the materials from the API
// Since the widget is separated this is defined here and not in the API file
async function getEmissions(client: Client, modelParts: ModelPart[]): Promise<Emission[]> {
  const mockData = [
      {
          partName: "Seat",
          emissionCost: {
              co2Amount: 100,
              h2oAmount: 200,
              priceInDollar: 300
          }
      },
      {
          partName: "Armrests",
          emissionCost: {
              co2Amount: 1000,
              h2oAmount: 2000,
              priceInDollar: 3000
          }
      },
      {
          partName: "Frame",
          emissionCost: {
              co2Amount: 10000,
              h2oAmount: 20000,
              priceInDollar: 30000
          }
      }
  ];

  // Return mock data if in local mode
  if(process.env.REACT_APP_LOCAL_MODE === '1')
    return Promise.resolve(mockData);
  
  const calculatedEmissions: Emission[] = [];
  for(const modelPart of modelParts) {
    const calculatedEmission: Emission = await calculatePartEmission(client.id, modelPart);
    calculatedEmissions.push(calculatedEmission);
  }

  return calculatedEmissions;
}

function Widget({ currentModel, currentClient }: WidgetProp) {
  const [emissions, setEmissions] = useState([] as Emission[]);

  // Load emissions from API on first render
  useEffect(() => {
    async function loadEmissions() {
      getEmissions(currentClient, currentModel.parts).then(m => setEmissions(m));
    }
    loadEmissions();
  }, [currentModel, currentClient]);

  function sum(a: number, b: number) {
    return a + b;
  }

  const totalEmissionCost: EmissionCost = {
    co2Amount: emissions.map(e => e.emissionCost.co2Amount).reduce(sum, 0),
    h2oAmount: emissions.map(e => e.emissionCost.h2oAmount).reduce(sum, 0),
    priceInDollar: emissions.map(e => e.emissionCost.priceInDollar).reduce(sum, 0)
  }

  return (
    <div className="Widget-container">
      <div className="Widget-total">
        <h3 className="Widget-title">Total emissions</h3>
        <div className="Widget-total-value"><i className="Widget-icon Co2-icon"></i>CO<sub>2</sub>: { totalEmissionCost.co2Amount } kg</div>
        <div className="Widget-total-value"><i className="Widget-icon Water-icon"></i>Water: { totalEmissionCost.h2oAmount } L</div>
        <div className="Widget-total-value"><i className="Widget-icon Money-icon"></i>Cost: { totalEmissionCost.priceInDollar } SEK</div>
      </div>
      <div>
        <h3 className="Widget-title">Part emissions</h3>
      </div>
      {
        emissions.map(e => <EmissionComponent key={uniqueID()} emission={e} totalEmissionCost={totalEmissionCost}></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

import { useEffect, useState } from 'react';
import './Widget.sass';

/* Components */
import EmissionComponent from 'Configurator/EmissionComponent/EmissionComponent';
import StatComponent from 'Configurator/StatComponent/StatComponent';

/* Utilities */

/* Shared */
import { ModelPart, Emission, EmissionCost, Model, Client, EmissionIcon } from 'shared/interfaces';
import IconComponent from 'Configurator/IconComponent/IconComponent';

export interface WidgetProp {
  currentModel: Model;
  currentClient: Client;
}

// Calculates the emissions for a specific part by contacting the API
async function calculatePartEmission(clientID: number, modelPart: ModelPart): Promise<Emission> {
  // Create the request body with the correct parameters
  const request = {
    partName: modelPart.name,
    clientID: clientID,
    area: modelPart.area,
    volume: modelPart.volume,
    materialID: modelPart.material.id,
    surfaceTreatmentIDs: modelPart.surfaceTreatments.map(st => st.id)
  };
  
  // Create the request options
  const options: RequestInit = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }

  return new Promise((resolve, reject) => {
      const baseEndpoint: string | undefined = process.env.REACT_APP_BACKEND_ENDPOINT;
      if(baseEndpoint === undefined)
          reject(new Error('No backend endpoint specified'));

      // Fetch the result from the API
      fetch(new URL('calculate-part-emission', baseEndpoint), options)
      .then(response => response.json())
      .then(data => resolve(data as Emission))
      .catch(error => console.error(error));
  });
}

// Get a list of all the emissions from the API
// Since the widget is separated this is defined here and not in the API file
async function getEmissions(client: Client, modelParts: ModelPart[]): Promise<Emission[]> {
  // Define mock data for use in local mode testing
  const mockData = [
      {
          partName: "Seat",
          emissionCost: {
              co2Amount: 100,
              h2oAmount: 200,
              priceInSEK: 300
          },
          minEmissionCost: {
            co2Amount: 100,
            h2oAmount: 150,
            priceInSEK: 200
          },
          maxEmissionCost: {
            co2Amount: 200,
            h2oAmount: 250,
            priceInSEK: 300
          }
      },
      {
          partName: "Armrests",
          emissionCost: {
              co2Amount: 1000,
              h2oAmount: 2000,
              priceInSEK: 3000
          },
          minEmissionCost: {
            co2Amount: 500,
            h2oAmount: 1500,
            priceInSEK: 1500
          },
          maxEmissionCost: {
            co2Amount: 1000,
            h2oAmount: 2000,
            priceInSEK: 3000
          }
      },
      {
          partName: "Frame",
          emissionCost: {
              co2Amount: 10000,
              h2oAmount: 20000,
              priceInSEK: 30000
          },
          minEmissionCost: {
            co2Amount: 7500,
            h2oAmount: 18000,
            priceInSEK: 20000
          },
          maxEmissionCost: {
            co2Amount: 12000,
            h2oAmount: 25000,
            priceInSEK: 30000
          }
      }
  ];

  // Return mock data if in local mode
  if(process.env.REACT_APP_LOCAL_MODE === '1')
    return Promise.resolve(mockData);
  
  // Initialise an empty array to store the emissions
  const calculatedEmissions: Emission[] = [];
  
  // For each part in the model, calculate the emissions for that part and append to the array
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
    getEmissions(currentClient, currentModel.parts).then(m => setEmissions(m));
  }, [currentModel, currentClient]);

  // Helper function for use with `reduce`
  function sum(a: number, b: number) {
    return a + b;
  }

  // Calculate the total emission cost
  const totalEmissionCost: EmissionCost = {
    co2Amount: emissions.map(e => e.emissionCost.co2Amount).reduce(sum, 0),
    h2oAmount: emissions.map(e => e.emissionCost.h2oAmount).reduce(sum, 0),
    priceInSEK: emissions.map(e => e.emissionCost.priceInSEK).reduce(sum, 0)
  }

  // Calculate the minimum emission cost
  const minEmissionCost: EmissionCost = {
    co2Amount: emissions.map(e => e.minEmissionCost.co2Amount).reduce(sum, 0),
    h2oAmount: emissions.map(e => e.minEmissionCost.h2oAmount).reduce(sum, 0),
    priceInSEK: emissions.map(e => e.minEmissionCost.priceInSEK).reduce(sum, 0)
  }

  // Calculate the maximum emission cost
  const maxEmissionCost: EmissionCost = {
    co2Amount: emissions.map(e => e.maxEmissionCost.co2Amount).reduce(sum, 0),
    h2oAmount: emissions.map(e => e.maxEmissionCost.h2oAmount).reduce(sum, 0),
    priceInSEK: emissions.map(e => e.maxEmissionCost.priceInSEK).reduce(sum, 0)
  }

  return (
    <div className="Widget-container">
      <div className="Widget-total">
        <h3 className="Widget-title">Total emissions</h3>
        <div className="Widget-total-value">
          <IconComponent icon={ EmissionIcon.CO2 }/>
          <span className="Widget-stat-title">CO<sub>2</sub>:</span>
          <StatComponent amount={ totalEmissionCost.co2Amount } minAmount={ minEmissionCost.co2Amount } maxAmount={ maxEmissionCost.co2Amount } unit={ 'kg' } />
        </div>
        <div className="Widget-total-value">
          <IconComponent icon={ EmissionIcon.WATER }/>
          <span className="Widget-stat-title">Water:</span>
          <StatComponent amount={ totalEmissionCost.h2oAmount } minAmount={ minEmissionCost.h2oAmount } maxAmount={ maxEmissionCost.h2oAmount } unit={ 'L' }  />
        </div>
        <div className="Widget-total-value">
          <IconComponent icon={ EmissionIcon.MONEY }/>
          <span className="Widget-stat-title">Price:</span>
          <StatComponent amount={ totalEmissionCost.priceInSEK } minAmount={ minEmissionCost.priceInSEK } maxAmount={ maxEmissionCost.priceInSEK } unit={ 'SEK' }  />
        </div>
      </div>
      <div>
        <h3 className="Widget-title">Emissions by part</h3>
      </div>
      {
        emissions.map(e => <EmissionComponent key={ e.partName } emission={ e } totalEmissionCost={ totalEmissionCost }></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

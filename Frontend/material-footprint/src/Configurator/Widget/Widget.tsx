import React, { useEffect, useState } from 'react';
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
    priceInSEK: emissions.map(e => e.emissionCost.priceInSEK).reduce(sum, 0)
  }

  const minEmissionCost: EmissionCost = {
    co2Amount: emissions.map(e => e.minEmissionCost.co2Amount).reduce(sum, 0),
    h2oAmount: emissions.map(e => e.minEmissionCost.h2oAmount).reduce(sum, 0),
    priceInSEK: emissions.map(e => e.minEmissionCost.priceInSEK).reduce(sum, 0)
  }

  const maxEmissionCost: EmissionCost = {
    co2Amount: emissions.map(e => e.maxEmissionCost.co2Amount).reduce(sum, 0),
    h2oAmount: emissions.map(e => e.maxEmissionCost.h2oAmount).reduce(sum, 0),
    priceInSEK: emissions.map(e => e.maxEmissionCost.priceInSEK).reduce(sum, 0)
  }

  function getEmissionStyle(amount: number, minAmount: number, maxAmount: number): React.CSSProperties {
    enum colors {
      BAD = '#F72E41', // Rapid Red 01
      OK = '#FFAB5C', // Rapid Orange
      GOOD = '#45CB5E' // Rapid Green
    };
    const percentage: number = 100 * (amount - minAmount) / (maxAmount - minAmount);
    return  {
        color:  percentage < 33 ? colors.GOOD 
                        : percentage < 66 ? colors.OK
                        : colors.BAD
    }
  }

  return (
    <div className="Widget-container">
      <div className="Widget-total">
        <h3 className="Widget-title">Total emissions</h3>
        <div className="Widget-total-value">
          <IconComponent icon={ EmissionIcon.CO2 }/>
          <span className="Widget-stat-title">CO<sub>2</sub>:</span>
          <StatComponent amount={ totalEmissionCost.co2Amount } unit={ 'kg' } style={getEmissionStyle(totalEmissionCost.co2Amount, minEmissionCost.co2Amount, maxEmissionCost.co2Amount)} />
        </div>
        <div className="Widget-total-value">
          <IconComponent icon={ EmissionIcon.WATER }/>
          <span className="Widget-stat-title">Water:</span>
          <StatComponent amount={ totalEmissionCost.h2oAmount } unit={ 'L' } style={getEmissionStyle(totalEmissionCost.h2oAmount, minEmissionCost.h2oAmount, maxEmissionCost.h2oAmount)} />
        </div>
        <div className="Widget-total-value">
          <IconComponent icon={ EmissionIcon.MONEY }/>
          <span className="Widget-stat-title">Price:</span>
          <StatComponent amount={ totalEmissionCost.priceInSEK } unit={ 'SEK' } style={getEmissionStyle(totalEmissionCost.priceInSEK, minEmissionCost.priceInSEK, maxEmissionCost.priceInSEK)} />
        </div>
      </div>
      <div>
        <h3 className="Widget-title">Emissions by part</h3>
      </div>
      {
        emissions.map(e => <EmissionComponent key={e.partName} emission={e} totalEmissionCost={totalEmissionCost} getEmissionStyle={getEmissionStyle}></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

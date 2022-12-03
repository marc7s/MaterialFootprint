import React, { useEffect, useState } from 'react';
import './Widget.sass';

/* Components */
import EmissionComponent from 'Configurator/EmissionComponent/EmissionComponent';

/* Utilities */
import { getMaterials } from 'API';

/* Shared */
import { ModelPart, Emission, EmissionCost } from 'shared/interfaces';
import { uniqueID } from 'shared/utils';



export interface WidgetProp {
  currentModelParts: ModelPart[];
}

// Get a list of all the materials from the API
// Since the widget is separated this is defined here and not in the API file
async function getEmissions(modelParts: ModelPart[]): Promise<Emission[]> {
  const materials = await getMaterials();
  return [
      {
          partName: "Seat",
          material: materials.find(material => material.name === 'Textile')!,
          emissionCost: {
              co2AmountPerKg: 100,
              h2oAmountPerKg: 200,
              priceInDollar: 300
          }
      },
      {
          partName: "Armrests",
          material: materials.find(material => material.name === 'Plastic')!,
          emissionCost: {
              co2AmountPerKg: 1000,
              h2oAmountPerKg: 2000,
              priceInDollar: 3000
          }
      },
      {
          partName: "Frame",
          material: materials.find(material => material.name === 'Steel')!,
          emissionCost: {
              co2AmountPerKg: 10000,
              h2oAmountPerKg: 20000,
              priceInDollar: 30000
          }
      }
  ]
}

function Widget({ currentModelParts }: WidgetProp) {
  const [emissions, setEmissions] = useState([] as Emission[]);

  // Load emissions from API on first render
  useEffect(() => {
    async function loadEmissions() {
      getEmissions(currentModelParts).then(m => setEmissions(m));
    }
    loadEmissions();
  }, [currentModelParts]);

  function sum(a: number, b: number) {
    return a + b;
  }

  const totalEmissionCost: EmissionCost = {
    co2AmountPerKg: emissions.map(e => e.emissionCost.co2AmountPerKg).reduce(sum, 0),
    h2oAmountPerKg: emissions.map(e => e.emissionCost.h2oAmountPerKg).reduce(sum, 0),
    priceInDollar: emissions.map(e => e.emissionCost.priceInDollar).reduce(sum, 0)
  }

  return (
    <div className="Widget-container">
      <div className="Widget-total">
        <h3 className="Widget-title">Total emissions</h3>
        <div className="Widget-total-value"> CO<sub>2</sub>: { totalEmissionCost.co2AmountPerKg } kg</div>
        <div className="Widget-total-value"> Water: { totalEmissionCost.h2oAmountPerKg } L</div>
        <div className="Widget-total-value"> Cost: { totalEmissionCost.priceInDollar } SEK</div>
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

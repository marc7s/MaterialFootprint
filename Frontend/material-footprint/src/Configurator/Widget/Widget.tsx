import React, { useEffect, useState } from 'react';
import './Widget.sass';

/* Components */
import EmissionComponent from 'Configurator/EmissionComponent/EmissionComponent';

/* Utilities */
import { getEmissions } from 'API';
import { Model } from 'Configurator/interfaces';

/* Shared */
import { Emission, EmissionCost } from 'shared/interfaces';
import { uniqueID } from 'shared/utils';



export interface WidgetProp {
  currentModel: Model;
}

function Widget({ currentModel }: WidgetProp) {
  const [emissions, setEmissions] = useState([] as Emission[]);

  // Load emissions from API on first render
  useEffect(() => {
    async function loadEmissions() {
      getEmissions(currentModel.parts).then(m => setEmissions(m));
    }
    loadEmissions();
  }, [currentModel]);

  function sum(a: number, b: number) {
    return a + b;
  }

  const totalEmissionCost: EmissionCost = {
    co2CostInDollar: emissions.map(e => e.emissionCost.co2CostInDollar).reduce(sum, 0),
    h2oCostInDollar: emissions.map(e => e.emissionCost.h2oCostInDollar).reduce(sum, 0),
    priceInDollar: emissions.map(e => e.emissionCost.priceInDollar).reduce(sum, 0)
  }

  return (
    <div className="Widget-container">
      <div className="Widget-total">
        <h3 className="Widget-title">Total emissions</h3>
        <div className="Widget-total-value"> CO<sub>2</sub>: { totalEmissionCost.co2CostInDollar } kg</div>
        <div className="Widget-total-value"> Water: { totalEmissionCost.h2oCostInDollar } L</div>
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

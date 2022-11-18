import React, { useEffect, useState } from 'react';
import './Widget.sass';

/* Components */
import EmissionComponent from 'Configurator/EmissionComponent/EmissionComponent';

/* Utilities */
import { getEmissions } from 'API';
import { Model } from 'Configurator/interfaces';

/* Shared */
import { Emission } from 'shared/interfaces';
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

  return (
    <div className="flex-box">
      <div className="everything">
        <h3>Everything</h3>
        <div className="text-container"> CO<sub>2</sub>: { emissions.map(e => e.emissionCost.co2CostInDollar).reduce(sum, 0) } kg</div>
        <div className="text-container"> Water: { emissions.map(e => e.emissionCost.h2oCostInDollar).reduce(sum, 0) } L</div>
        <div className="text-container"> Cost: { emissions.map(e => e.emissionCost.priceInDollar).reduce(sum, 0) } SEK</div>
      </div>
      {
        emissions.map(e => <EmissionComponent key={uniqueID()} emission={e}></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

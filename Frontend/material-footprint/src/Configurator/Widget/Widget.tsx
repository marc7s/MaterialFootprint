import React, { useEffect, useState } from 'react';
import './Widget.sass';

import { getEmissions } from '../../API';
import { Emission } from '../../shared/interfaces';
import EmissionComponent from '../EmissionComponent/EmissionComponent';
import { uniqueID } from '../../shared/utils';
import { Model } from 'Configurator/interfaces';


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

  var totalCo2 = 0;
  var totalWater = 0;
  var totalCost = 0;
  for (let i = 0; i < emissions.length; i++) {
    totalCo2 += emissions[i].emissionCost.co2CostInDollar;
    totalWater += emissions[i].emissionCost.h2oCostInDollar;
    totalCost += emissions[i].emissionCost.priceInDollar;
  }

  return (
    <div className="flex-box">
      <div className="everything">
        <h3>Everything</h3>
        <div className="text-container"> CO<sub>2</sub>: {totalCo2} kg</div>
        <div className="text-container"> Water: {totalWater} L</div>
        <div className="text-container"> Cost: {totalCost} SEK</div>
      </div>
      {
        emissions.map(e => <EmissionComponent key={uniqueID()} emission={e}></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

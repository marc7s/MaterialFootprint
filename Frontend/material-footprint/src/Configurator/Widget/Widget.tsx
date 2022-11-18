import React, { useEffect, useState } from 'react';
import './Widget.sass';

import { getEmissions } from '../../API';
import { Emission } from '../../shared/interfaces';
import { WidgetProp } from '../props';
import EmissionComponent from '../EmissionComponent/EmissionComponent';
import { uniqueID } from '../../shared/utils';


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
    totalCo2 += emissions[i].co2CountInKg;
    totalWater += emissions[i].h2oCountInL;
    totalCost += emissions[i].priceInDollar;
  }

  return (
    <div className="flex-box">
      <div className="text-container"> Total CO<sub>2</sub>: {totalCo2} kg</div>
      <div className="text-container"> Total water: {totalWater} L</div>
      <div className="text-container"> Total cost: {totalCost} sek</div>
      {
        emissions.map(e => <EmissionComponent key={uniqueID()} emission={e}></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

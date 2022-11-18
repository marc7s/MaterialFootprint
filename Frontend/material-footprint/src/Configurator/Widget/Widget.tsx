import React, { useEffect, useState } from 'react';
import './Widget.sass';

import { getEmissions } from '../../API';
import { Emission } from '../../shared/interfaces';
import EmissionComponent from '../EmissionComponent/EmissionComponent';
import { uniqueID } from '../../shared/utils';


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
  });

  return (
    <div className="flex-box">
      <div className="text-container">
        Total CO<sub>2</sub> emissions: 
      </div>
      {
        emissions.map(e => <EmissionComponent key={uniqueID()} emission={e}></EmissionComponent>)
      }
    </div>
  );
}

export default Widget;

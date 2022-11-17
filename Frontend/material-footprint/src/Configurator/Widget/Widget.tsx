import React, { useEffect, useState } from 'react';
import './Widget.sass';

import { getEmissions } from '../../API';
import { Emission } from '../../shared/interfaces';
import { WidgetProp } from '../props';
import EmissionComponent from '../EmissionComponent/EmissionComponent';


function Widget({ currentModel }: WidgetProp) {
  const [emissions, setEmissions] = useState([] as Emission[]);

  // Load emissions from API on first render
  useEffect(() => {
    async function loadEmissions() {
      getEmissions(currentModel.parts).then(m => setEmissions(m));
    }
    loadEmissions();
  }, []);

  return (
    <div className="flex-box">
      <div className="text-container">
        Total CO<sub>2</sub> emissions: 
      </div>
      {
        emissions.map(e => <EmissionComponent emission={e}></EmissionComponent>)
      }
      {/* <table>
        <tr>
          <th>Part</th><th>Material</th><th>CO<sub>2</sub></th><th>Water</th><th>Price</th>
        </tr>
        {
          emissions.map(e => <EmissionComponent emission={e}></EmissionComponent>)
        }
      </table> */}
    </div>
  );
}

export default Widget;

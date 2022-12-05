import './EmissionComponent.sass';
import { useState } from 'react';

/* Components */
import ColorIndicator from 'Configurator/ColorIndicator/ColorIndicator';

/* Utilities */

/* Shared */
import { uniqueID } from 'shared/utils';
import { Emission, EmissionCost } from 'shared/interfaces';

export interface EmissionProp {
  emission: Emission;
  totalEmissionCost: EmissionCost;
}

interface EmissionEntry {
  title: JSX.Element;
  cost: number;
  unit: string;
  percentage: number;
}

function EmissionComponent({ emission, totalEmissionCost }: EmissionProp) {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded(!expanded);
  }

  // TODO: Change this to a proper algorithm or redo the percentages
  function calculateTotalEmissionPercent(emissionCost: EmissionCost, totalEmissionCost: EmissionCost) {
    return Math.round((emissionCost.priceInDollar / totalEmissionCost.priceInDollar) * 100);
  }

  function calculateEmissionPercent(cost: number, totalCost: number) {
    return Math.round((cost / totalCost) * 100);
  }

  const emissions: EmissionEntry[] = [
    {
      title: <>CO<sub>2</sub></>,
      cost: emission.emissionCost.co2Amount,
      unit: 'kg',
      percentage: calculateEmissionPercent(emission.emissionCost.co2Amount, totalEmissionCost.co2Amount)
    },
    {
      title: <>Water</>,
      cost: emission.emissionCost.h2oAmount,
      unit: 'L',
      percentage: calculateEmissionPercent(emission.emissionCost.h2oAmount, totalEmissionCost.h2oAmount)
    },
    {
      title: <>Price</>,
      cost: emission.emissionCost.priceInDollar,
      unit: 'SEK',
      percentage: calculateEmissionPercent(emission.emissionCost.priceInDollar, totalEmissionCost.priceInDollar)
    }
  ];

  // Render an EmissionComponent for each part in the model
  return (
    <div className={'EmissionComponent-container EmissionComponent-' + (expanded ? 'expanded' : 'collapsed')}>
      <div className="EmissionComponent-part-name" onClick={toggleExpand}>
        <div className="EmissionComponent-part-left">
          <h4>{ emission.partName }</h4>
          <ColorIndicator color={emission.material.color}></ColorIndicator>
        </div>
        
        <div className="EmissionComponent-part-right">
          <h4>{ calculateTotalEmissionPercent(emission.emissionCost, totalEmissionCost) }%</h4>
          <i className="EmissionComponent-expand-icon"></i>
        </div>
      </div>
      
      <table className="EmissionComponent-emission-table">
        <tbody>
          {
            emissions.map(e => 
              <tr key={ uniqueID() }>
                <td className="EmissionComponent-title">{ e.title }</td>
                <td className="EmissionComponent-value">{ e.cost } { e.unit } ({e.percentage}%)</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

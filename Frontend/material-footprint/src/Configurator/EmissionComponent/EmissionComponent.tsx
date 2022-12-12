import './EmissionComponent.sass';
import { useEffect, useState } from 'react';

/* Components */

/* Utilities */

/* Shared */
import { uniqueID } from 'shared/utils';
import { Emission, EmissionCost, EmissionIcon } from 'shared/interfaces';
import StatComponent from 'Configurator/StatComponent/StatComponent';
import IconComponent from 'Configurator/IconComponent/IconComponent';

export interface EmissionProp {
  emission: Emission;
  totalEmissionCost: EmissionCost;
  getEmissionStyle: (amount: number, maxAmount: number) => React.CSSProperties;
}

interface EmissionEntry {
  icon: EmissionIcon;
  cost: number;
  maxCost: number;
  unit: string;
  percentage: number;
}

function EmissionComponent({ emission, totalEmissionCost, getEmissionStyle }: EmissionProp) {
  const [expanded, setExpanded] = useState(false);
  const expandedStateKey = emission.partName;

  useEffect(() => {
    const isExpanded: boolean = (localStorage.getItem(expandedStateKey) ?? 'false') === 'true';
    setExpanded(isExpanded);
  }, [expandedStateKey]);

  function toggleExpand() {
    const newExpandedState: boolean = !expanded;
    setExpanded(newExpandedState);
    localStorage.setItem(expandedStateKey, newExpandedState.toString());
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
      icon: EmissionIcon.CO2,
      cost: emission.emissionCost.co2Amount,
      maxCost: emission.maxEmissionCost.co2Amount,
      unit: 'kg',
      percentage: calculateEmissionPercent(emission.emissionCost.co2Amount, totalEmissionCost.co2Amount)
    },
    {
      icon: EmissionIcon.WATER,
      cost: emission.emissionCost.h2oAmount,
      maxCost: emission.maxEmissionCost.h2oAmount,
      unit: 'L',
      percentage: calculateEmissionPercent(emission.emissionCost.h2oAmount, totalEmissionCost.h2oAmount)
    },
    {
      icon: EmissionIcon.MONEY,
      cost: emission.emissionCost.priceInDollar,
      maxCost: emission.maxEmissionCost.priceInDollar,
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
              <tr key={ uniqueID() } style={getEmissionStyle(e.cost, e.maxCost)}>
                <td className="EmissionComponent-icon"><IconComponent icon={e.icon}></IconComponent></td>
                <td className="EmissionComponent-value"><StatComponent amount={e.cost} unit={e.unit} />({e.percentage}%)</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

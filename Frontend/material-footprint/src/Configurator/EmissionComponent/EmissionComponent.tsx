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
}

interface EmissionEntry {
  icon: EmissionIcon;
  cost: number;
  minCost: number;
  maxCost: number;
  unit: string;
  percentage: number;
}

function EmissionComponent({ emission, totalEmissionCost }: EmissionProp) {
  const [expanded, setExpanded] = useState(false);
  
  // The key used to store the expanded state in local storage
  const expandedStateKey = emission.partName;

  useEffect(() => {
    // Get the expanded state from local storage if it exists, otherwise default to collapsed
    const isExpanded: boolean = (localStorage.getItem(expandedStateKey) ?? 'false') === 'true';
    setExpanded(isExpanded);
  }, [expandedStateKey]);

  // Toggle the expanded state and save it to local storage
  function toggleExpand() {
    const newExpandedState: boolean = !expanded;
    setExpanded(newExpandedState);
    localStorage.setItem(expandedStateKey, newExpandedState.toString());
  }
  
  // Calculate emission estimate as the average of the co2 and water emission percentages compared to the total emission
  function calculateTotalEmissionPercent(emissionCost: EmissionCost, totalEmissionCost: EmissionCost) {
    return Math.round(100 * (emissionCost.co2Amount / totalEmissionCost.co2Amount + emissionCost.h2oAmount / totalEmissionCost.h2oAmount) / 2);
  }

  // Helper function to return a formatted percentage of the emission compared to the total emission
  function calculateEmissionPercent(cost: number, totalCost: number) {
    return Math.round((cost / totalCost) * 100);
  }

  // The emission entries to display
  const emissions: EmissionEntry[] = [
    {
      icon: EmissionIcon.CO2,
      cost: emission.emissionCost.co2Amount,
      minCost: emission.minEmissionCost.co2Amount,
      maxCost: emission.maxEmissionCost.co2Amount,
      unit: 'kg',
      percentage: calculateEmissionPercent(emission.emissionCost.co2Amount, totalEmissionCost.co2Amount)
    },
    {
      icon: EmissionIcon.WATER,
      cost: emission.emissionCost.h2oAmount,
      minCost: emission.minEmissionCost.h2oAmount,
      maxCost: emission.maxEmissionCost.h2oAmount,
      unit: 'L',
      percentage: calculateEmissionPercent(emission.emissionCost.h2oAmount, totalEmissionCost.h2oAmount)
    },
    {
      icon: EmissionIcon.MONEY,
      cost: emission.emissionCost.priceInSEK,
      minCost: emission.minEmissionCost.priceInSEK,
      maxCost: emission.maxEmissionCost.priceInSEK,
      unit: 'SEK',
      percentage: calculateEmissionPercent(emission.emissionCost.priceInSEK, totalEmissionCost.priceInSEK)
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
              <tr key={ uniqueID() }>
                <td className="EmissionComponent-icon"><IconComponent icon={e.icon}></IconComponent></td>
                <td className="EmissionComponent-value"><StatComponent amount={e.cost} unit={e.unit} minAmount={ e.minCost } maxAmount={ e.maxCost } />({e.percentage}%)</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

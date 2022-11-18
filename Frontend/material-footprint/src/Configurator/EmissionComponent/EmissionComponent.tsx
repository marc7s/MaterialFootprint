import './EmissionComponent.sass';
import { Emission } from 'shared/interfaces';

/* Components */

/* Utilities */

/* Shared */
import { uniqueID } from 'shared/utils';

export interface EmissionProp {
  emission: Emission;
}

function EmissionComponent({ emission }: EmissionProp) {
  // Render an EmissionComponent for each part in the model
  return (
    <div className="component">
      <h4>{ emission.partName }</h4>
      <table>
        <tbody>
          <tr key={ uniqueID() }>
            <td className="string">CO<sub>2</sub>:</td>
            <td className="number">{ emission.emissionCost.co2CostInDollar } kg</td>
          </tr>
          <tr key={ uniqueID() }>
            <td className="string">Water:</td>
            <td className="number">{ emission.emissionCost.h2oCostInDollar } L</td>
          </tr>
          <tr key={ uniqueID() }>
            <td className="string">Cost:</td>
            <td className="number">{ emission.emissionCost.priceInDollar } SEK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

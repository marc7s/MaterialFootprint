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
    <div>
      <h4 className="EmissionComponent-part-name">{ emission.partName }</h4>
      <table className="EmissionComponent-emission-table">
        <tbody>
          <tr key={ uniqueID() }>
            <td className="EmissionComponent-title">CO<sub>2</sub>:</td>
            <td className="EmissionComponent-value">{ emission.emissionCost.co2CostInDollar } kg</td>
          </tr>
          <tr key={ uniqueID() }>
            <td className="EmissionComponent-title">Water:</td>
            <td className="EmissionComponent-value">{ emission.emissionCost.h2oCostInDollar } L</td>
          </tr>
          <tr key={ uniqueID() }>
            <td className="EmissionComponent-title">Cost:</td>
            <td className="EmissionComponent-value">{ emission.emissionCost.priceInDollar } SEK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

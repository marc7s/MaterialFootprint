import './EmissionComponent.sass';
import { Emission } from 'shared/interfaces';

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
            <td className="number">{ emission.co2CountInKg } kg</td>
          </tr>
          <tr key={ uniqueID() }>
            <td className="string">Water:</td>
            <td className="number">{ emission.h2oCountInL } L</td>
          </tr>
          <tr key={ uniqueID() }>
            <td className="string">Cost:</td>
            <td className="number">{ emission.priceInDollar } SEK</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

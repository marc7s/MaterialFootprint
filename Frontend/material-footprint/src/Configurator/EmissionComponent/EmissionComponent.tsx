import './EmissionComponent.sass';
import { uniqueID } from '../../shared/utils';
import { Emission } from 'shared/interfaces';


export interface EmissionProp {
  emission: Emission;
}

function EmissionComponent({ emission }: EmissionProp) {
  // Render an EmissionComponent for each part in the model
  return (
    <div className="component">
      <h3>Component: { emission.partName }</h3>
      <table>
        <tr><td className="string">CO<sub>2</sub>:</td><td className="number">{ emission.co2CountInKg }  </td></tr>
        <tr><td className="string">Water:</td><td className="number">{ emission.h2oCountInL }   </td></tr>
        <tr><td className="string">Cost:</td><td className="number">{ emission.priceInDollar } </td></tr>
      </table>
    </div>
      // <tr>
      //   <td className="string">{ emission.partName }</td>
      //   <td className="string">{ emission.material.name }</td>
      //   <td className="number">{ emission.co2CountInKg }</td>
      //   <td className="number">{ emission.h2oCountInL }</td>
      //   <td className="number">{ emission.priceInDollar }</td>
      // </tr>
  );
}

export default EmissionComponent;

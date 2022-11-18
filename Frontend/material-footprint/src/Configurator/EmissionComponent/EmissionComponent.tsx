import './EmissionComponent.sass';
import { EmissionProp } from '../props';
import { uniqueID } from '../../shared/utils';


function EmissionComponent({ emission }: EmissionProp) {
  // Render an EmissionComponent for each part in the model
  return (
    <div className="component">
      <h3>Component: { emission.partName }</h3>
      <table>
        <tbody>
          <tr key={ uniqueID() }><td className="string">CO<sub>2</sub>:</td><td className="number">{ emission.co2CountInKg }  </td></tr>
          <tr key={ uniqueID() }><td className="string">Water:</td><td className="number">{ emission.h2oCountInL }   </td></tr>
          <tr key={ uniqueID() }><td className="string">Cost:</td><td className="number">{ emission.priceInDollar } </td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmissionComponent;

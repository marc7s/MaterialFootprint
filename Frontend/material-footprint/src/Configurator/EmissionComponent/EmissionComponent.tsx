import React from 'react';
import './EmissionComponent.sass';
import { uniqueID } from '../../shared/utils';
import { EmissionProp } from '../props';

function EmissionComponent({ emission }: EmissionProp) {

  // Render an EmissionComponent for each part in the model
  return (
      <tr>
        <td className="string">{ emission.partName }</td>
        <td className="string">{ emission.material.name }</td>
        <td className="number">{ emission.co2CountInKg }</td>
        <td className="number">{ emission.h2oCountInL }</td>
        <td className="number">{ emission.priceInDollar }</td>
      </tr>
  );
}

export default EmissionComponent;

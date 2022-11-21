import React from 'react';
import './ModelConfiguratorComponent.sass';

/* Components */
import ConfiguratorPart from 'Configurator/ConfiguratorPart/ConfiguratorPart';

/* Utilities */
import { Model } from 'Configurator/interfaces';

/* Shared */
import { uniqueID } from 'shared/utils';



export interface ModelConfiguratorProp {
  model: Model;
  onPartMaterialChange: (partID: string, materialID: number) => void;
  onPartSurfaceTreatmentChange: (partID: string, surfaceTreatmentID: number, added: boolean) => void;
}

function ModelConfiguratorComponent({model, onPartMaterialChange, onPartSurfaceTreatmentChange}: ModelConfiguratorProp) {
  // Render a ConfiguratorPart for each part in the model
  return (
    <table className="ModelConfiguratorComponent-table">
      <tbody>
        <tr className="ModelConfiguratorComponent-header">
          <th>Part</th>
          <th>Material</th>
          <th>Surface</th>
        </tr>
        {
          model.parts.map(part => <ConfiguratorPart key={uniqueID()} part={part} onMaterialChange={materialID => onPartMaterialChange(part.id, materialID)} onSurfaceTreatmentChange={(surfaceTreatmentID: number, added: boolean) => onPartSurfaceTreatmentChange(part.id, surfaceTreatmentID, added)}></ConfiguratorPart>)
        }
      </tbody>
    </table>
  );
}

export default ModelConfiguratorComponent;

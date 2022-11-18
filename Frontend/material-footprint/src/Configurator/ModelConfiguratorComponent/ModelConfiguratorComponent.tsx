import React from 'react';
import './ModelConfiguratorComponent.sass';

/* Components */
import ConfiguratorPart from '../ConfiguratorPart/ConfiguratorPart';

/* Utilities */
import { Model } from 'Configurator/interfaces';

/* Shared */
import { uniqueID } from '../../shared/utils';



export interface ModelConfiguratorProp {
  model: Model;
  onPartMaterialChange: (partID: string, materialID: number) => void;
}

function ModelConfiguratorComponent({model, onPartMaterialChange}: ModelConfiguratorProp) {
  // Render a ConfiguratorPart for each part in the model
  return (
    <div className="ModelConfiguratorComponent-container">
      {
        model.parts.map(part => <ConfiguratorPart key={uniqueID()} part={part} onMaterialChange={materialID => onPartMaterialChange(part.id, materialID)}></ConfiguratorPart>)
      }
    </div>
  );
}

export default ModelConfiguratorComponent;

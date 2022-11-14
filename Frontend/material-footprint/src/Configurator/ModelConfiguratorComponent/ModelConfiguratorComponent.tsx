import React from 'react';

import { ModelConfiguratorProp } from 'src/Configurator/props';
import './ModelConfiguratorComponent.sass';
import ConfiguratorPart from '../ConfiguratorPart/ConfiguratorPart';
import { uniqueID } from '../../shared/utils';

function ModelConfiguratorComponent({model, onPartMaterialChange}: ModelConfiguratorProp) {
  // Render a ConfiguratorPart for each part in the model
  return (
    <div className="modelConfigurator">
      {
        model.parts.map(part => <ConfiguratorPart key={uniqueID()} part={part} onMaterialChange={materialID => onPartMaterialChange(part.id, materialID)}></ConfiguratorPart>)
      }
    </div>
  );
}

export default ModelConfiguratorComponent;

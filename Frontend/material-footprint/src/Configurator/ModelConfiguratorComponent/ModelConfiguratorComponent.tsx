import React from 'react';

import { ModelConfiguratorProp } from 'src/Configurator/interfaces';
import './ModelConfiguratorComponent.sass';
import ConfiguratorPart from '../ConfiguratorPart/ConfiguratorPart';
import { uniqueID } from '../../shared/utils';

function ModelConfiguratorComponent({model, onPartMaterialChange}: ModelConfiguratorProp) {
  return (
    <div className="modelConfigurator">
      {
        model.parts.map(part => <ConfiguratorPart key={uniqueID()} part={part} onMaterialChange={materialID => onPartMaterialChange(part.id, materialID)}></ConfiguratorPart>)
      }
    </div>
  );
}

export default ModelConfiguratorComponent;

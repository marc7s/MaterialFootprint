import React from 'react';
import ModelPart from '../ModelPartComponent/ModelPartComponent';
import { ModelProp } from 'src/Configurator/props';
import './ModelComponent.sass';
import { uniqueID } from '../../shared/utils';

function ModelComponent({model, active, onModelChange}: ModelProp) {
  const activeClass: string = active ? ' active' : '';

  const onModelClick = () => {
    onModelChange(model.id);
  };

  // Render a ModelPart for each part in the model
  return (
      <div className={'model' + activeClass} onClick={onModelClick}>
        {
          model.parts.map(part => <ModelPart key={uniqueID()} part={part}></ModelPart>)
        }
      </div>
  );
}

export default ModelComponent;

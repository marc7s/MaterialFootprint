import React from 'react';
import ModelPart from '../ModelPartComponent/ModelPartComponent';
import { ModelProp } from 'src/Configurator/interfaces';
import './ModelComponent.sass';
import { uniqueID } from '../../shared/utils';

function ModelComponent({model, active, onModelChange}: ModelProp) {
  const activeClass: string = active ? ' active' : '';

  const onModelClick = () => {
    onModelChange(model.id);
  };

  return (
      <div className={'model' + activeClass} onClick={onModelClick}>
        {
          model.parts.map(part => <ModelPart key={uniqueID()} part={part}></ModelPart>)
        }
      </div>
  );
}

export default ModelComponent;

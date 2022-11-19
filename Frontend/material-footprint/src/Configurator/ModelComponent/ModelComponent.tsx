import React from 'react';
import './ModelComponent.sass';

/* Components */
import ModelPart from 'Configurator/ModelPartComponent/ModelPartComponent';

/* Utilities */
import { Model } from 'Configurator/interfaces';

/* Shared */
import { uniqueID } from 'shared/utils';
import { Size } from 'shared/interfaces';


export interface ModelProp {
  model: Model;
  size: Size;
  active?: boolean;
  onModelChange?: (modelID: number) => void;
}

function ModelComponent({model, size, active, onModelChange}: ModelProp) {
  const activeClass: string = active ? ' active' : '';

  const onModelClick = () => {
    if(onModelChange) 
      onModelChange(model.id);
  };

  // Render a ModelPart for each part in the model
  return (
      <div className={'ModelComponent-model' + activeClass} onClick={onModelClick}>
        {
          model.parts.map(part => <ModelPart key={uniqueID()} size={size} part={part}></ModelPart>)
        }
      </div>
  );
}

export default ModelComponent;

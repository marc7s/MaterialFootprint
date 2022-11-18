import React from 'react';
import './ModelComponent.sass';

/* Components */
import ModelPart from '../ModelPartComponent/ModelPartComponent';

/* Utilities */
import { Model } from 'Configurator/interfaces';

/* Shared */
import { uniqueID } from '../../shared/utils';


export interface ModelProp {
  model: Model;
  active: boolean;
  onModelChange: (modelID: number) => void;
}

function ModelComponent({model, active, onModelChange}: ModelProp) {
  const activeClass: string = active ? ' active' : '';

  const onModelClick = () => {
    onModelChange(model.id);
  };

  // Render a ModelPart for each part in the model
  return (
      <div className={'ModelComponent-model' + activeClass} onClick={onModelClick}>
        {
          model.parts.map(part => <ModelPart key={uniqueID()} part={part}></ModelPart>)
        }
      </div>
  );
}

export default ModelComponent;

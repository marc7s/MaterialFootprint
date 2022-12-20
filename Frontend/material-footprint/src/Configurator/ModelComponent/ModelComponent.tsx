import './ModelComponent.sass';

/* Components */
import ModelViewerComponent from 'Configurator/ModelViewerComponent/ModelViewerComponent';

/* Utilities */

/* Shared */
import { MaterialTexture, Model, Size } from 'shared/interfaces';


export interface ModelProp {
  model: Model;
  materialTexture: MaterialTexture[];
  size: Size;
  active?: boolean;
  onModelChange?: (modelID: number) => void;
}

function ModelComponent({model, materialTexture, size, active, onModelChange}: ModelProp) {
  // Determine the active and size classes
  const activeClass: string = active ? ' ModelComponent-active' : '';
  const sizeClass: string = ` ModelComponent-size-${size}`;

  // Call the parent's onModelChange function when a model is selected (if it exists)
  const onModelClick = () => {
    if(onModelChange) 
      onModelChange(model.id);
  };

  // Render the 3D model viewer component
  return (
    <div className={'ModelComponent-model' + activeClass + sizeClass} onClick={onModelClick}>
      {
        <ModelViewerComponent model={model} materialTexture={materialTexture} size={size} />
      }
    </div>
  );
}

export default ModelComponent;

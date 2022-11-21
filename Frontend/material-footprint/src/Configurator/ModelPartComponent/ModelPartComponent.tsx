import React from 'react';
import './ModelPartComponent.sass';

/* Components */

/* Utilities */
import { ModelPart } from 'Configurator/interfaces';
import { Size } from 'shared/interfaces';

/* Shared */

export interface ModelPartProps {
  part: ModelPart,
  size: Size
}

function ModelPartComponent({part, size}: ModelPartProps) {
  const sizeClass: string = ` size-${size}`;
  
  // Set the background image of the part and the color based on its material
  const styling: React.CSSProperties = {
    backgroundImage: `url(${part.image})`,
    filter: `opacity(0.5) ${`drop-shadow(0 0 0 ${part.material.color})`.repeat(3)}`
  }

  // Render the part of the model as one image layer
  // All part images rendered on top of each other will form the final model image
  return (
    <div className={'ModelPartComponent-img' + sizeClass} key={part.id} style={styling}></div>
  );
}

export default ModelPartComponent;

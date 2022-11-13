import React from 'react';
import { ModelPart } from 'src/Configurator/interfaces';
import './ModelPartComponent.sass';

interface ModelPartProps {
  part: ModelPart
}

function ModelPartComponent({part}: ModelPartProps) {
  const styling: React.CSSProperties = {
    backgroundImage: `url(${part.image})`,
    backgroundSize: 'contain',
    width: '300px',
    height: '300px',
    filter: `opacity(0.5) ${`drop-shadow(0 0 0 ${part.material.color})`.repeat(3)}`
  }

  return (
    <div className="img" key={part.id} style={styling}></div>
  );
}

export default ModelPartComponent;

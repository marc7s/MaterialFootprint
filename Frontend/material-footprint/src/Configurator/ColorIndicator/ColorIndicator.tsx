import React from 'react';
import './ColorIndicator.sass';

interface ColorIndicatorProp {
  color: string
}

function ColorIndicator({color}: ColorIndicatorProp) {
  const styling: React.CSSProperties = {
    backgroundColor: color
  }
  return (
      <div className="color-indicator" style={styling}></div>
  );
}

export default ColorIndicator;

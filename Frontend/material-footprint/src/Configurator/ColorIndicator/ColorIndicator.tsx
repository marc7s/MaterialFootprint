import React from 'react';
import './ColorIndicator.sass';

interface ColorIndicatorProp {
  color: string
}

function ColorIndicator({color}: ColorIndicatorProp) {
  // Set the background color of the indicator based on the parameter
  const styling: React.CSSProperties = {
    backgroundColor: color
  }
  
  // Render a color indicator with the given color
  return (
      <div className="ColorIndicator-indicator" style={styling}></div>
  );
}

export default ColorIndicator;

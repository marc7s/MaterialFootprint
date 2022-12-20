import './IconComponent.sass';

/* Components */

/* Utilities */

/* Shared */
import { EmissionIcon } from 'shared/interfaces';

interface IconProp {
  icon: EmissionIcon;
}

function IconComponent({ icon }: IconProp) {
  // Determine the icon class based on the icon type
  const iconClass = "Widget-icon " + (
    icon === EmissionIcon.CO2 ? "Co2-icon" :
    icon === EmissionIcon.WATER ? "Water-icon" :
    icon === EmissionIcon.MONEY ? "Money-icon" :
    "");
  return <i className={iconClass}/>;
}

export default IconComponent;
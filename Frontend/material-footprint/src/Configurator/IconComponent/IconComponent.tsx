import './IconComponent.sass';

/* Components */

/* Utilities */

/* Shared */
import { EmissionIcon } from 'shared/interfaces';

interface IconProp {
  icon: EmissionIcon;
}

function IconComponent({ icon }: IconProp) {
  // Render an EmissionComponent for each part in the model
  let iconClass = "Widget-icon ";
  switch (icon) {
    case EmissionIcon.CO2:
      iconClass += "Co2-icon";
      break;
    case EmissionIcon.WATER:
      iconClass += "Water-icon";
      break;
    case EmissionIcon.MONEY:
      iconClass += "Money-icon";
      break;
  }
  return <i className={iconClass}/>;
}

export default IconComponent;
import React, { useEffect, useState } from 'react';

import { ConfiguratorPartProp } from 'src/Configurator/props';
import './ConfiguratorPart.sass';
import { getMaterials } from '../../API';
import { uniqueID } from '../../shared/utils';
import ColorIndicator from '../ColorIndicator/ColorIndicator';
import { Material } from '../../shared/interfaces';

function ConfiguratorPart({part, onMaterialChange}: ConfiguratorPartProp) {
  const [materials, setMaterials] = useState([] as Material[]);
  
  useEffect(() => {
    async function loadMaterials() {
      getMaterials().then(m => setMaterials(m));
    }
    loadMaterials();
  }, []);

  // Call the parent's onMaterialChange function when a material is selected
  function changeMaterial(e: React.ChangeEvent<HTMLSelectElement>): void {
    const materialID: number = parseInt(e.target.value);
    onMaterialChange(materialID);
  }

  // Render an entry in the part configurator list for this part
  return (
    <div key={uniqueID()} className="ConfiguratorPart-entry">
      <div className="ConfiguratorPart-part">
        {part.name}
        <ColorIndicator color={part.material.color}></ColorIndicator>
      </div>
      <select defaultValue={part.material.id} onChange={changeMaterial}>
        {materials.map(material => <option key={uniqueID()} value={material.id}>{material.name}</option>)}
      </select>
    </div>
  );
}

export default ConfiguratorPart;

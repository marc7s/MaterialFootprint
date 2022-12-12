import React, { useEffect, useState } from 'react';
import './ConfiguratorPart.sass';

/* Components */

/* Utilities */
import { getMaterials, getSurfaceTreatments } from 'API';

/* Shared */
import { ModelPart, Material, SurfaceTreatment } from 'shared/interfaces';
import { uniqueID } from 'shared/utils';

export interface ConfiguratorPartProp {
  part: ModelPart;
  onMaterialChange: (materialID: number) => void;
  onSurfaceTreatmentChange: (surfaceTreatmentID: number, added: boolean) => void;
}

function ConfiguratorPart({part, onMaterialChange, onSurfaceTreatmentChange}: ConfiguratorPartProp) {
  const [materials, setMaterials] = useState([] as Material[]);
  const [surfaceTreatments, setSurfaceTreatments] = useState([] as SurfaceTreatment[]);
  
  useEffect(() => {
    async function loadMaterials() {
      getMaterials().then(m => setMaterials(m));
    }
    loadMaterials();
  }, []);

  useEffect(() => {
    async function loadSurfaceTreatments() {
      getSurfaceTreatments().then(s => setSurfaceTreatments(s));
    }
    loadSurfaceTreatments();
  }, []);

  // Call the parent's onMaterialChange function when a material is selected
  function changeMaterial(e: React.ChangeEvent<HTMLSelectElement>): void {
    const materialID: number = parseInt(e.target.value);
    onMaterialChange(materialID);
  }

  // Call the parent's onSurfaceTreatmentChange function when a surface treatment is selected
  function changeSurfaceTreatment(e: React.ChangeEvent<HTMLInputElement>): void {
    const surfaceTreatmentID: number = parseInt(e.target.value);
    onSurfaceTreatmentChange(surfaceTreatmentID, e.target.checked);
  }

  // Render an entry in the part configurator list for this part
  return (
    <tr key={uniqueID()} className="ConfiguratorPart-entry">
      <td className="ConfiguratorPart-part">{part.name}</td>
      <td>
        <select defaultValue={part.material.id} onChange={changeMaterial} style={{backgroundColor: `${part.material.color}50`}}>
          { 
            materials.map(material => <option key={uniqueID()} value={ material.id }>{ material.name }</option>) 
          }
        </select>
      </td>
      <td className="ConfiguratorPart-surface-treatments">
        { 
          surfaceTreatments.map(surfaceTreatment => { 
            return <div key={uniqueID()} className="ConfiguratorPart-surface-treatment">
                    <span>{ surfaceTreatment.name }</span>
                    <input type="checkbox" onChange={changeSurfaceTreatment} value={surfaceTreatment.id} checked={part.surfaceTreatments.filter(st => st.id === surfaceTreatment.id).length > 0}/>
                  </div>;
          })
        }
      </td>
    </tr>
  );
}

export default ConfiguratorPart;

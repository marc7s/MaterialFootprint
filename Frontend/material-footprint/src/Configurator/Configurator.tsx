import React, { useEffect, useState } from 'react';
import './Configurator.sass';

/* Components */
import ModelConfiguratorComponent from 'Configurator/ModelConfiguratorComponent/ModelConfiguratorComponent';
import ModelComponent from 'Configurator/ModelComponent/ModelComponent';
import Widget from 'Configurator/Widget/Widget';

/* Utilities */
import { Model } from 'Configurator/interfaces';
import { getMaterials, getModels } from 'API';

/* Shared */
import { uniqueID } from 'shared/utils';
import { Material } from 'shared/interfaces';

function Configurator() {
  const [models, setModels] = useState([] as Model[]);
  const [materials, setMaterials] = useState([] as Material[]);
  const [currentModel, setCurrentModel] = useState(null as Model | null);

  // Load models from API on first render
  useEffect(() => {
    async function loadModels() {
      getModels().then(m => setModels(m));
    }
    loadModels();
  }, []);

  // Load materials from API on first render
  useEffect(() => {
    async function loadMaterials() {
      getMaterials().then(m => setMaterials(m));
    }
    loadMaterials();
  }, []);

  // Set current model to first model once they have been loaded
  useEffect(() => {
    setCurrentModel(models[0]); // Set the current model to the first model
  }, [models]);

  // Handle a material change for a part
  const onPartMaterialChange = (partID: string, materialID: number) => {
    // Check that the models and materials have been loaded
    if(!currentModel) return;
    if(!materials) return;
    
    // Create a copy of the current model to avoid mutating state
    const newModel = Object.assign({}, currentModel);
    
    // Find the part that had its material changed
    const part = newModel.parts.find(p => p.id === partID);
    
    // Check that the part was found
    if (!part) return;

    // Change the part's material to the new material
    part.material = materials.find(m => m.id === materialID) || part.material;
    
    // Update the current model
    setCurrentModel(newModel);
  };

  // Handle a model change
  const onModelChange = (modelID: number) => {
    // Check that the models have been loaded
    if(!currentModel) return;
    if(!models) return;
    
    // Find the new model
    const newModel = models.find(m => m.id === modelID);
    
    // Check that the new model was found
    if (!newModel) return;

    // Don't do anything if the current model was selected
    if(newModel.id === currentModel.id) return;

    // Update the current model
    setCurrentModel(newModel);
  };

  return (
    <>
      <div className="Configurator-models">
        {
          models.map(model => <ModelComponent key={uniqueID()} model={model} active={model.id === currentModel?.id} onModelChange={onModelChange}></ModelComponent>)
        }
      </div>
      <div className="Configurator-modelConfig">
        {
          currentModel && <ModelConfiguratorComponent model={currentModel} onPartMaterialChange={onPartMaterialChange}></ModelConfiguratorComponent>
        }
      </div>
      {
        currentModel && <Widget currentModel={currentModel}></Widget>
      }
      
    </>
  );
}

export default Configurator;

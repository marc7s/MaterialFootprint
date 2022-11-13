import React, { useEffect, useState } from 'react';
import './Configurator.sass';

import { Model } from './interfaces';
import ModelComponent from './ModelComponent/ModelComponent';
import ModelConfiguratorComponent from './ModelConfiguratorComponent/ModelConfiguratorComponent';
import { uniqueID } from '../shared/utils';
import { getMaterials, getModels } from '../API';
import { Material } from '../shared/interfaces';

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

  const onPartMaterialChange = (partID: string, materialID: number) => {
    if(!currentModel) return;
    if(!materials) return;
    
    const newModel = Object.assign({}, currentModel);
    const part = newModel.parts.find(p => p.id === partID);
    
    if (!part) return;

    
    part.material = materials.find(m => m.id === materialID) || part.material;
    setCurrentModel(newModel);
  };

  const onModelChange = (modelID: number) => {
    if(!currentModel) return;
    if(!models) return;
    
    const newModel = models.find(m => m.id === modelID);
    
    if (!newModel) return;

    setCurrentModel(newModel);
  };

  return (
    <>
      <div className="models">
        {
          models.map(model => <ModelComponent key={uniqueID()} model={model} active={model.id === currentModel?.id} onModelChange={onModelChange}></ModelComponent>)
        }
      </div>
      <div className="modelConfig">
        {
          currentModel && <ModelConfiguratorComponent model={currentModel} onPartMaterialChange={onPartMaterialChange}></ModelConfiguratorComponent>
        }
      </div>
    </>
  );
}

export default Configurator;

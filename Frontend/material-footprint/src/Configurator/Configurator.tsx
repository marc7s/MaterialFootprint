import React, { useEffect, useState } from 'react';
import './Configurator.sass';

/* Components */
import ModelConfiguratorComponent from 'Configurator/ModelConfiguratorComponent/ModelConfiguratorComponent';
import ModelComponent from 'Configurator/ModelComponent/ModelComponent';
import Widget from 'Configurator/Widget/Widget';

/* Utilities */
import { getMaterials, getModels, getSurfaceTreatments, getTexturesURL } from 'API';
import * as THREE from 'three';

/* Shared */
import { uniqueID } from 'shared/utils';
import { Model, Material, Size, SurfaceTreatment, Client, MaterialTexture } from 'shared/interfaces';


interface ConfiguratorProps {
  currentClient: Client;
}

function Configurator({ currentClient }: ConfiguratorProps) {
  const [models, setModels] = useState([] as Model[]);
  const [materialTexture, setMaterialTextures] = useState([] as MaterialTexture[]);
  const [materials, setMaterials] = useState([] as Material[]);
  const [surfaceTreatments, setSurfaceTreatments] = useState([] as SurfaceTreatment[]);
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
      getMaterials().then(m => {
        setMaterials(m)
        const materialTexture: MaterialTexture[] = m.map(material => {
          const normalMap: THREE.Texture = new THREE.TextureLoader().load(getTexturesURL(material.textureMap.normalMapURL));
          normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
          const roughnessMap: THREE.Texture = new THREE.TextureLoader().load(getTexturesURL(material.textureMap.roughnessMapURL));
          roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;
          const occlusionMap: THREE.Texture = new THREE.TextureLoader().load(getTexturesURL(material.textureMap.occlusionMapURL));
          occlusionMap.wrapS = occlusionMap.wrapT = THREE.RepeatWrapping;
          const materialTexture = {
            material: material,
            normalMap: normalMap,
            roughnessMap: roughnessMap,
            occlusionMap: occlusionMap
          }
          return materialTexture;
        });
        setMaterialTextures(materialTexture);
      });
    }
    loadMaterials();
  }, []);

  // Load surface treatments from API on first render
  useEffect(() => {
    async function loadSurfaceTreatments() {
      getSurfaceTreatments().then(s => setSurfaceTreatments(s));
    }
    loadSurfaceTreatments();
  }, []);

  // Set current model to first model once they have been loaded
  useEffect(() => {
    setCurrentModel(models[0]); // Set the current model to the first model
  }, [models]);

  // Handle a material change for a part
  const onPartMaterialChange = (partID: number, materialID: number) => {
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

  // Handle a surface treatment change for a part
  const onPartSurfaceTreatmentChange = (partID: number, surfaceTreatmentID: number, added: boolean) => {
    // Check that the models and surface treatments have been loaded
    if(!currentModel) return;
    if(!surfaceTreatments) return;
    
    // Create a copy of the current model to avoid mutating state
    const newModel = Object.assign({}, currentModel);
    
    // Find the part that had its material changed
    const part = newModel.parts.find(p => p.id === partID);
    
    // Check that the part was found
    if (!part) return;

    // Change the part's surface treatment to the new surface treatment
    const surfaceTreatment = surfaceTreatments.find(s => s.id === surfaceTreatmentID);
    if(!surfaceTreatment) return;

    // If the surface treatment was added and not already in the part's surface treatments, add it
    if(added && part.surfaceTreatments.find(s => s.id === surfaceTreatmentID) === undefined) {
      part.surfaceTreatments = [...part.surfaceTreatments, surfaceTreatment];
    }
    // If the surface treatment was removed and already in the part's surface treatments, remove it
    else if(!added && part.surfaceTreatments.find(s => s.id === surfaceTreatmentID) !== undefined) {
      part.surfaceTreatments = [...part.surfaceTreatments].filter(s => s.id !== surfaceTreatmentID);
    }
    
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
      <div className="Configurator-container">
        <div className="Configurator-model-container">
          <div className="Configurator-model-carousel">
            {
              models.map(model => <ModelComponent key={uniqueID()} model={model} materialTexture={materialTexture} size={Size.SMALL} active={model.id === currentModel?.id} onModelChange={onModelChange}></ModelComponent>)
            }
          </div>
          <div className="Configurator-current-model">
            {
              currentModel && 
              <ModelComponent model={currentModel} materialTexture={materialTexture} size={Size.LARGE}></ModelComponent>
            }
          </div>
        </div>
        <div className="Configurator-model-config-widget">
          {
            currentModel && 
            <>
              <ModelConfiguratorComponent model={currentModel} onPartMaterialChange={onPartMaterialChange} onPartSurfaceTreatmentChange={onPartSurfaceTreatmentChange}></ModelConfiguratorComponent>
              <Widget currentModel={currentModel} currentClient={currentClient}></Widget>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default Configurator;

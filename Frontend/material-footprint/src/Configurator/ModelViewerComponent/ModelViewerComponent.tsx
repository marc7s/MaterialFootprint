import React from 'react';
import './ModelViewerComponent.sass';

/* Components */

/* Utilities */
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { isLocalMode } from 'API';

/* Shared */
import { Model, ModelPart, Size } from 'shared/interfaces';
import { applyMetadataAndSaveModel } from 'Configurator/ModelViewerComponent/modelManipulator';


export interface ModelViewerComponentProp {
    model: Model;
    size: Size;
}

function ModelViewerComponent({ model, size }: ModelViewerComponentProp) {
    // Load the model from the url to the 3D object
    const { scene } = useGLTF(model.url);
    
    // Apply all materials to the model according to the metadata in the Model object
    applyMaterials(scene, model);
    
    
    // Connect edit and save button to functionality
    function editAndSave(evt: any) {
      applyMetadataAndSaveModel(scene, model.name);
    }
  
  
    return ( 
      <>
        <div className="ModelViewerComponent-container">
          <Canvas className="ModelViewerComponent-canvas"> 
            <ambientLight intensity={1} />
  
            <PerspectiveCamera
              makeDefault
              position={[70, 50, 90]}
              fov={60}
            />
            
            <OrbitControls target={[0, 10, 0]} enabled={size !== Size.SMALL} />
            
            <primitive object={scene.clone(true) } />
          </Canvas>
        </div>
        {
          // Only add the edit and save button to the large model previews, not to the carousel
          // Note: this is a dev feature to allow for manipulation of the 3D objects
          isLocalMode() && size !== Size.SMALL &&
          (
            <div>
              <button onClick={editAndSave}>Edit and Save 3D Model</button>
            </div>
          )
        }
      </>
    )
  }
  
  // A function that applies the materials to the 3D model according to the metadata in the Model object
  function applyMaterials(object: any, model: Model) {
    // Apply materials to 3D model components of type Mesh
    const type: string = 'Mesh';
    
    // Recursively search the 3D model for the correct components
    object.children.forEach((child: any, index: number) => {
      // Apply the material to the component if it is of the correct type
      if (child.type === type) {
        // Try to get the partID from the userData of the component. All predefined ModelParts will have a
        // custom userData property saved with the partID and part name
        const partID: number | undefined = parseInt(child.userData?.partID);
        
        // Return if the partID is not found
        if(partID === undefined) 
          return;
        
        // Find the ModelPart with the corresponding partID
        const modelPart: ModelPart | undefined = model.parts.find(m => m.id === partID);
  
        // Apply the material to the component if the ModelPart is found
        if(modelPart !== undefined)
          child.material = new THREE.MeshStandardMaterial({ color: modelPart.material.color });
      }
      // Recursively search the children of the component
      applyMaterials(child, model);
    });
  }

export default ModelViewerComponent;
import React from 'react';
import './ModelViewerComponent.sass';

/* Components */

/* Utilities */
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Backdrop, OrbitControls, PerspectiveCamera, Preload, PresentationControls, Stars, Trail, View, useGLTF } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

/* Shared */
import { Model, ModelPart, Size } from 'shared/interfaces';


export interface ModelViewerComponentProp {
    model: Model;
    size: Size;
}

function ModelViewerComponent({ model, size }: ModelViewerComponentProp) {
    const { scene } = useGLTF(model.url);
    
    // Apply all materials to the model according to the metadata in the Model object
    applyMaterials(scene, model)
    function editAndSave(evt: any) {
      // When adding a new model, it might need to be rescaled in order to fit the sizes of the other models
      // In that case, use the following lines to rescale the model
      /*
        const scale: number = 0.5;
        scene.scale.set(scale, scale, scale)
      */
      
      // First, add the metadata to the model
      edit3dObject(scene, model.name)
      // Then, save the model with the included metadata as a GLB file
      save3dObject(scene)
    }
  
  
    return ( 
      <>
        <div style={{ position: 'relative', overflow: 'hidden', width: "100%", height: "100%"}}>
          <Canvas className="ModelViewerComponent-canvas"> 
            <ambientLight intensity={1} />
  
            <PerspectiveCamera
              makeDefault
              position={[80, 80, 80]}
              fov={60}
            />
            
            <OrbitControls target={[0,50,0]} enabled={size !== Size.SMALL} />
            
            <primitive object={scene.clone(true) } />
          </Canvas>
        </div>
        {
          // Only add the edit and save button to the large model previews, not to the carousel
          size !== Size.SMALL &&
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
  
  
  
  
  
  
  /* 
  
    Helper functions that allows for manipulation of the 3D models
  
  */
  
  // A function that saves the 3D model as a GLB file
  function save3dObject(scene: any) {
    
    // Create a download link and add it to the DOM
    const link = document.createElement('a');
    document.body.appendChild(link);
  
    // Create an exporter
    const exporter = new GLTFExporter();
    
    // Parse the scene and save the result as a GLB file
    exporter.parse(
      scene,
      result => saveArrayBuffer(result, 'model.glb'),
      error => console.error( 'An error happened', error),
      { 
        binary: true 
      }
    )
  
    // Helper function that saves the parsed scene
    function saveArrayBuffer(buffer: any, fileName: any) {
      save(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
    }
    
    // Downloads the GLB file
    function save(blob: any, filename: any) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
  }
  
  interface GLBObjectMapping {
    name: string, // The name of the model
    offset: number, // The offset to use when assigning the partIDs as the IDs are incremented by 1 for each part, regardless of the model it belongs to
    parts: GLBObjectPart[] // A list of the parts in the model
  }
  
  interface GLBObjectPart {
    index: number, // The index of the part in the GLB file
    name: string, // The name of the part that it corresponds to in the metadata
    partID: number // The partID of the part that it corresponds to in the metadata
  }
  
  // The GLB mappings for the models to our metadata
  // Explanations: The GLB files comes as objects with different meshes. To create the connection between our
  // metadata and the GLB file, we need to know which meshes correspond to which parts. This mapping
  // tells us which meshes correspond to which parts
  const glbObjects: GLBObjectMapping[] = [
    {
      name: 'Koenigsegg',
      offset: 0,
      // 11 parts, indexes 0-10
      parts: [
        {
          index: 0,
          name: 'Aero',
          partID: 1
        },
        {
          index: 1,
          name: 'Windshield',
          partID: 2
        },
        {
          index: 2,
          name: 'Intakes',
          partID: 3
        },
        // Index 3 is the window seal, so we ignore it
        {
          index: 4,
          name: 'Body',
          partID: 4
        }
        // Index 5 is the emblem, so we ignore it
        // Index 6 are the rear lights, so we ignore it
        // Index 7 is the front left wheel, so we ignore it
        // Index 8 is the front right wheel, so we ignore it
        // Index 9 is the rear left wheel, so we ignore it
        // Index 10 is the rear right wheel, so we ignore it
      ]
    },
    {
      name: 'Chair',
      offset: 4,
      // 4 parts, indexes 0-3
      parts: [
        {
          index: 0,
          name: 'Seat',
          partID: 1
        },
        {
          index: 1,
          name: 'Front legs',
          partID: 2
        },
        {
          index: 2,
          name: 'Back legs',
          partID: 3
        },
        {
          index: 3,
          name: 'Backrest',
          partID: 4
        }
      ]
    }
  ]
  
  // A function that edits the 3D model and adds our metadata to it
  function edit3dObject(object: any, name: string) {
    // The type of component to edit
    const type = 'Mesh';
    
    // Find the right GLBObject mapping
    const glbObject: GLBObjectMapping | undefined = glbObjects.find(o => o.name === name);
    
    // Return if the mapping is not found
    if(glbObject === undefined) {
      console.log(`Could not find object with name '${name}'`);
      return;
    };
    
    console.log(`Editing with offset ${glbObject.offset}`);
    
    // Recursively search the 3D model for the correct components
    object.children.forEach((child: any, index: any) => {
      if (child.type === type) {
        // Try to find the part with the corresponding index
        const part: GLBObjectPart | undefined = glbObject.parts.find(p => p.index === index);
        if(part !== undefined) {
          console.log('Found part', part);
          
          // Add the metadata to the component using the userData property
          child.userData = {
            name: part.name,
            partID: glbObject.offset + part.partID
          }
  
          console.log('New mesh:', child);
        }
      }
      edit3dObject(child, name);
  });
  }

export default ModelViewerComponent;
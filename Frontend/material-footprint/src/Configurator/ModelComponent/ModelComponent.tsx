import React, { Suspense, useEffect, useState, useRef } from 'react';
import './ModelComponent.sass';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Backdrop, OrbitControls, PerspectiveCamera, Preload, PresentationControls, Stars, Trail, View} from '@react-three/drei';


/* Components */
import ModelPart from 'Configurator/ModelPartComponent/ModelPartComponent';

/* Utilities */

/* Shared */
import { Model, Size } from 'shared/interfaces';
import Configurator from 'Configurator/Configurator';


export interface ModelProp {
  model: Model;
  size: Size;
  active?: boolean;
  onModelChange?: (modelID: number) => void;
}

function ModelComponent({model, size, active, onModelChange}: ModelProp) {
  const activeClass: string = active ? ' ModelComponent-active' : '';
  const sizeClass: string = ` ModelComponent-size-${size}`;

  const onModelClick = () => {
    if(onModelChange) 
      onModelChange(model.id);
  };
  /*
fetch('http://localhost:5000/models').then(function(response) {
  return response.json();
}).then(function(response) {
  console.log(response);
});
*/
  // Render a ModelPart for each part in the model
  return (
      <div className={'ModelComponent-model' + activeClass + sizeClass} onClick={onModelClick}>
        {
          <ConfiguratorTest model={model} size={size} />
        }
      </div>
  );
}

export interface ConfiguratorTestProp {
  model: Model;
  size: Size;
}

function ConfiguratorTest({ model, size }: ConfiguratorTestProp): JSX.Element {
  const loader1 = useLoader(GLTFLoader, model.id === 1 ? 'chairmodel1.glb' : 'chairmodel2.glb')

  // recursivly find all meshes in the model
  findType(loader1.scene, 'Mesh', model)
 // loader1.scene.scale.set(0.02, 0.02, 0.02)
  const container: any = React.createRef()

  function editAndSave(evt: any) {
    //loader1.scene.scale.set(0.5, 0.5, 0.5)
    edit3dObject(loader1.scene, true)
    save3dObject(loader1)
  }


  return ( 
    <>
      <div style={{ position: 'relative', overflow: 'hidden', width: "100%", height: "100%"}} >
        <Canvas className="canvas"> 
          <ambientLight intensity={1} />

          <PerspectiveCamera
            makeDefault
            position={[80, 80, 80]}
            fov={60}
          />
          <OrbitControls target={[0,50,0]} enabled={size !== Size.SMALL}/>
          <primitive object={loader1.scene.clone(true) } />
        </Canvas>
      </div>
      {
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

function findType(object: any, type: any, model: Model) {
  object.children.forEach((child: any, index: any) => {
      if (child.type === type) {
        console.log(`Model ${model.id}, part ${child.userData.partID}`)
        const partID: number = parseInt(child.userData.partID);
        console.log(`PartID: ${partID}`);
        console.log(model.parts.find(m => m.id === partID))
  
        child.material = new THREE.MeshStandardMaterial({ color: model.parts.find(m => m.id === partID)!.material.color})

        console.log(child.name);
      }
      findType(child, type, model);
  });
}

function save3dObject(object: any) {
  
  // downloads the glb file
  const link = document.createElement('a')
  document.body.appendChild(link)

  const exporter = new GLTFExporter();
  exporter.parse(
    object.scene,
    function (result) {
    saveArrayBuffer(result, 'chairmodel1.glb')
  },
  function ( error ) {

    console.log( 'An error happened' );

  },
  { 
    binary: true 
  }
  )


  function saveArrayBuffer(buffer: any, filenName: any) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filenName);
  }

  function save(blob: any, filename: any) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}

function edit3dObject(object: any, isPart1: boolean, type: any = 'Mesh') {
  const offset = isPart1 ? 0 : 4;
  console.log(`Editing with offset ${offset}`);
  object.children.forEach((child: any, index: any) => {
    if (child.type === type) {
      if (index == 0) {
        child.userData = {
          name: 'Seat',
          partID: offset + 1
        }
      }
      if (index == 1) {
        child.userData = {
          name: 'Front legs',
          partID: offset + 2
        }
      }
      if (index == 2) {
        child.userData = {
          name: 'Back legs',
          partID: offset + 3
        }
      }
      if (index == 3) {
        child.userData = {
          name: 'Backrest',
          partID: offset + 4
        }
      }
      console.log(child);
      
  
    }
    edit3dObject(child, type);
});
}



export default ModelComponent;

import React, { Suspense, useEffect, useState, useRef } from 'react';
import './ModelComponent.sass';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { OrbitControls, PerspectiveCamera, Preload, PresentationControls, Stars, Trail, View } from '@react-three/drei';


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
          <ConfiguratorTest model={model} />
        }
      </div>
  );
}

export interface ConfiguratorTestProp {
  model: Model;
}

function ConfiguratorTest({ model }: ConfiguratorTestProp): JSX.Element {
  const loader1 = useLoader(GLTFLoader, 'testmodel.glb')

  // recursivly find all meshes in the model
  findType(loader1.scene, 'Mesh', model)

  const container: any = React.createRef()
  const view1: any = React.createRef()

  return ( 
    <div ref = {container} style={{width: "100%", height: "100%"}}>
   
      <div className='bajs' ref={view1} style={{ position: 'relative', overflow: 'hidden', width: "100%", height: "100%"}} ></div>
     

     <Canvas eventSource={container} className="canvas">
     
      <View track={view1}>
        <PerspectiveCamera
          makeDefault
          position={[100, 100, 100]}
          fov={60}
          zoom={0.9}
        />
        <OrbitControls target={[0,50,0]}>

        </OrbitControls>
    
          <primitive object={loader1.scene.clone(true) } />
      
        <ambientLight intensity={0.5} />
      </View>
      <Preload all />

</Canvas>
    </div>     


  )
}

function findType(object: any, type: any, model: Model) {
  console.log(model)
  object.children.forEach((child: any, index: any) => {
      if (child.type === type) {
        const partID = 1;
        console.log(model.parts.find(m => m.id === partID)!.material.color)
        child.material = new THREE.MeshStandardMaterial({ color: model.parts.find(m => m.id === partID)!.material.color})
        
        /*child.name = 'part' + index
        if (child.name === 'part0') {
          child.material = new THREE.MeshStandardMaterial({ color: 0xff0000})
        }
        if (child.name === 'part1') {
          child.material = new THREE.MeshStandardMaterial({ color: 0x0000ff})
        }
        if (child.name === 'part2') {
          child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00})
        }
        if (child.name === 'part3') {
          child.material = new THREE.MeshStandardMaterial({ color: 0x000000})
        }*/
        /*
        if (index % 2 == 0) {
          child.material = new THREE.MeshStandardMaterial({ color: Math.floor(Math.random()*16777215) })
        } else {
          child.material = new THREE.MeshStandardMaterial({ color: Math.floor(Math.random()*16777215) })
        }
        */
          console.log(child.name);
      }
      findType(child, type, model);
  });
}


export default ModelComponent;

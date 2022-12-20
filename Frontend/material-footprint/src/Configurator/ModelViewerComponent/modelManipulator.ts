/* Components */

/* Utilities */
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

/* Shared */


interface GLBObjectMapping {
    name: string, // The name of the model
    offset: number, // The offset to use when assigning the partIDs as the IDs are incremented by 1 for each part, regardless of the model it belongs to
    parts: GLBObjectPart[] // A list of the parts in the model
}

interface GLBObjectPart {
    index: number, // The index of the part in the GLB file
    name: string, // The name of the part that it corresponds to in the metadata
    relativePartID: number // The partID of the part that it corresponds to in the metadata
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
            // Index 0 is the windshield, so we ignore it
            // Index 1 is the window seal, so we ignore it
            // Index 2 is the emblem, so we ignore it
            // Index 3 are the rear lights, so we ignore it
            // Index 4 is the front left wheel, so we ignore it
            // Index 5 is the front right wheel, so we ignore it
            // Index 6 is the rear left wheel, so we ignore it
            // Index 7 is the rear right wheel, so we ignore it
            {
                index: 8,
                name: 'Body',
                relativePartID: 3
            },
            {
                index: 9,
                name: 'Aero',
                relativePartID: 1
            },
            {
                index: 10,
                name: 'Intakes',
                relativePartID: 2
            }
        ]
    },
    {
        name: 'Chair',
        offset: 3,
        // 4 parts, indexes 0-3
        parts: [
            {
                index: 0,
                name: 'Seat',
                relativePartID: 1
            },
            {
                index: 1,
                name: 'Front legs',
                relativePartID: 2
            },
            {
                index: 2,
                name: 'Back legs',
                relativePartID: 3
            },
            {
                index: 3,
                name: 'Backrest',
                relativePartID: 4
            }
        ]
    }
];

export function applyMetadataAndSaveModel(scene: any, name: string) {
    // When adding a new model, it might need to be rescaled in order to fit the sizes of the other models
    // In that case, use the following lines to rescale the model
    /*
        const scale: number = 2;
        scene.scale.set(scale, scale, scale)
    */
    
    // It also might need to be recentered. In that case, use the following lines to recenter the model
    /*
        scene.position.set(0, -25, 50)
    */

    // Find the right GLBObject mapping
    const glbObjectMapping: GLBObjectMapping | undefined = glbObjects.find(o => o.name === name);
    
    // Return if the mapping is not found
    if(glbObjectMapping === undefined) {
      console.log(`Could not find object with name '${name}'`);
      return;
    }
    
    console.log(`Editing object ${glbObjectMapping.name} with offset ${glbObjectMapping.offset}`);
    

    // First, add the metadata to the model
    applyMetadataTo3DObject(scene, glbObjectMapping);

    // Then, save the model with the included metadata as a GLB file
    save3DObject(scene);
}

// A function that edits the 3D model and adds our metadata to it
function applyMetadataTo3DObject(object: any, glbObjectMapping: GLBObjectMapping) {
    // The type of component to edit
    const type = 'Mesh';
    
    // Recursively search the 3D model for the correct components
    object.children.forEach((child: any, index: any) => {
      if (child.type === type) {
        // Try to find the part with the corresponding index
        const part: GLBObjectPart | undefined = glbObjectMapping.parts.find(p => p.index === index);
        if(part !== undefined) {
          console.log('Found part', part);
          
          // Add the metadata to the component using the userData property
          child.userData = {
            name: part.name,
            partID: glbObjectMapping.offset + part.relativePartID
          }
  
          console.log('New mesh:', child);
        } else {
            // Clear the user data if the part is not included in the metadata
            child.userData = {};
        }
      }
      applyMetadataTo3DObject(child, glbObjectMapping);
  });
}

// A function that saves the 3D model as a GLB file
function save3DObject(scene: any) {
    // Create a download link and add it to the DOM
    const link = document.createElement('a');
    document.body.appendChild(link);

    // Create an exporter
    const exporter = new GLTFExporter();

    // Parse the scene and save the result as a GLB file
    exporter.parse(
        scene,
        result => saveArrayBuffer(result, 'model.glb'),
        error => console.error('An error happened', error),
        { 
            binary: true 
        }
    );

    // Helper function that saves the parsed scene
    function saveArrayBuffer(buffer: any, fileName: string) {
        save(new Blob([buffer], { type: 'application/octet-stream' }), fileName);
    }

    // Downloads the GLB file
    function save(blob: any, fileName: string) {
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    }
}
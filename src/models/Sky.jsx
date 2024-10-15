import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import skySceneUrl from "../assets/3d/sky.glb?url";

const Sky = () => {
  const { scene } = useGLTF(skySceneUrl);

  useEffect(() => {
    return () => {
      // Cleanup function to unload the GLTF model when the component unmounts
      if (scene) {
        scene.traverse((object) => {
          if (object.isMesh) {
            object.geometry.dispose();
            object.material.dispose();
          }
        });
      }
    };
  }, [scene]);

  if (!scene) {
    console.error("Failed to load sky model");
    return null;
  }

  return (
    <primitive object={scene} />
  );
};

export default Sky;

// Add this at the end of the file
useGLTF.preload(skySceneUrl);

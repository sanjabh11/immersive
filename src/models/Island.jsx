import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import islandSceneUrl from "../assets/3d/island.glb?url";

const Island = () => {
  const { scene } = useGLTF(islandSceneUrl);

  useEffect(() => {
    return () => {
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
    console.error("Failed to load island model");
    return null;
  }

  return (
    <primitive object={scene} />
  );
};

export default Island;

// Add this at the end of the file
useGLTF.preload(islandSceneUrl);

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import planeSceneUrl from "../assets/3d/plane.glb?url";

const Plane = () => {
  const { scene } = useGLTF(planeSceneUrl);

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
    console.error("Failed to load plane model");
    return null;
  }

  return (
    <primitive object={scene} />
  );
};

export default Plane;

// Add this at the end of the file
useGLTF.preload(planeSceneUrl);

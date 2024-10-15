import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from "@react-three/drei";
import birdScene from "../assets/3d/bird.glb?url";

const Bird = () => {
  const birdRef = useRef();
  const { scene, animations } = useGLTF(birdScene);

  useFrame(({ clock }) => {
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
  });

  useEffect(() => {
    // You might need to adjust the scale of the bird model
    scene.scale.set(0.003, 0.003, 0.003);
  }, [scene]);

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
    console.error("Failed to load bird model");
    return null;
  }

  return <primitive ref={birdRef} object={scene} />;
};

export default Bird;

useGLTF.preload(birdScene);

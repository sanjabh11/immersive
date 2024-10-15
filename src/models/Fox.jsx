import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import foxScene from "../assets/3d/fox.glb?url";

const Fox = ({ currentAnimation, ...props }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(foxScene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions[currentAnimation];
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => action.fadeOut(0.5);
    }
  }, [actions, currentAnimation]);

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
    console.error("Failed to load fox model");
    return null;
  }

  return <primitive ref={group} object={scene} {...props} />;
};

export default Fox;

useGLTF.preload(foxScene);

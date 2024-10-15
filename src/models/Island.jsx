import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

// Import the placeholder instead of the .glb file
import islandScene from "../assets/3d/island.js";

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (isRotating) {
      islandRef.current.rotation.y += 0.25 * delta;
      
      // Update camera position based on island rotation
      const angle = islandRef.current.rotation.y;
      const radius = 7;
      camera.position.x = Math.sin(angle) * radius;
      camera.position.z = Math.cos(angle) * radius;
      camera.lookAt(0, 0, 0);
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsRotating(true);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setIsRotating(false);
  };

  return (
    <group ref={islandRef} {...props} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
      <mesh>
        <boxGeometry args={[3, 0.5, 3]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Island;
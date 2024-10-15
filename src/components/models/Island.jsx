import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();

  useFrame(() => {
    if (isRotating) {
      islandRef.current.rotation.y += 0.01;
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
    <group
      ref={islandRef}
      {...props}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <mesh>
        <boxGeometry args={[3, 0.5, 3]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
};

export default Island;
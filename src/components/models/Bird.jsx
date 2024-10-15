import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Bird = () => {
  const birdRef = useRef();

  useFrame(({ clock }) => {
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
  });

  return (
    <mesh ref={birdRef}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default Bird;
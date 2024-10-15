import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Fox = () => {
  const foxRef = useRef();

  useFrame(({ clock }) => {
    foxRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;
  });

  return (
    <mesh ref={foxRef}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="darkbrown" />
    </mesh>
  );
};

export default Fox;

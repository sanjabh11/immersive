import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    if (isRotating) {
      ref.current.position.y = 2;
    } else {
      ref.current.position.y = 0;
    }
  }, [isRotating]);

  useFrame(({ clock }) => {
    ref.current.position.x = Math.sin(clock.elapsedTime) * 2;
  });

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[1, 0.2, 0.5]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Plane;
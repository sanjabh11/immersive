import React from 'react';

const Sky = ({ isRotating }) => {
  return (
    <mesh>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial color="blue" side={2} />
    </mesh>
  );
};

export default Sky;
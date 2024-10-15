import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Import the placeholder instead of the .glb file
import planeScene from "../assets/3d/plane.js";

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    if (isRotating) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 + 2;
    }
  });

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[1, 0.2, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Plane;
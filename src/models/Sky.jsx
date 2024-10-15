import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Import the placeholder instead of the .glb file
import skyScene from "../assets/3d/sky.js";

const Sky = ({ isRotating }) => {
  const skyRef = useRef();

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <mesh ref={skyRef}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial color="#87CEEB" side={2} />
    </mesh>
  );
};

export default Sky;
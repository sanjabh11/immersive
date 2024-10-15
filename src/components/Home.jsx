import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';
import Fox from '../models/Fox';
import HomeInfo from './HomeInfo';
import Loader from './Loader';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.7, 0.7, 0.7];
      screenPosition = [0, -6.5, -40];
    } else {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -40];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative overflow-auto'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{ position: [0, 0, 10], near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          {Bird && <Bird scale={[0.005, 0.005, 0.005]} position={[0, 0, -5]} />}
          {Sky && <Sky isRotating={isRotating} scale={[0.1, 0.1, 0.1]} />}
          {Island && (
            <Island
              position={islandPosition}
              scale={islandScale}
              rotation={[0.1, 4.7, 0]}
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
            />
          )}
          {Plane && (
            <Plane
              isRotating={isRotating}
              position={[0, -4, -4]}
              rotation={[0, 20, 0]}
              scale={[2, 2, 2]}
            />
          )}
          {Fox && (
            <Fox
              position={[0, -7, -5]}
              rotation={[0, 0.5, 0]}
              scale={[0.007, 0.007, 0.007]}
              currentAnimation="Idle"
            />
          )}
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </section>
  );
};

export default Home;
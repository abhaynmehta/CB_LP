
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

interface ThreeSceneProps {
  isMouseActive?: boolean;
}

// Floating geometric shapes component
const FloatingShapes = ({ isMouseActive }: { isMouseActive?: boolean }) => {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      const speed = isMouseActive ? 0.07 : 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * (speed * 2)) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating cubes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <FloatingCube key={i} position={[
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ]} isMouseActive={isMouseActive} />
      ))}
      
      {/* Floating spheres */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FloatingSphere key={i} position={[
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8
        ]} isMouseActive={isMouseActive} />
      ))}
    </group>
  );
};

// Individual floating cube
const FloatingCube = ({ position, isMouseActive }: { position: [number, number, number], isMouseActive?: boolean }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const speed = isMouseActive ? 0.007 : 0.01;
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * (isMouseActive ? 0.0014 : 0.002);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color="#15cea0" 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
};

// Individual floating sphere
const FloatingSphere = ({ position, isMouseActive }: { position: [number, number, number], isMouseActive?: boolean }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const speed = isMouseActive ? 0.0035 : 0.005;
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.z += speed;
      meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * (isMouseActive ? 0.0007 : 0.001);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial 
        color="#0c9a77" 
        transparent 
        opacity={0.4}
      />
    </mesh>
  );
};

// Digital particles effect
const DigitalParticles = ({ isMouseActive }: { isMouseActive?: boolean }) => {
  const groupRef = useRef<any>();

  useFrame((state) => {
    if (groupRef.current) {
      const speed = isMouseActive ? 0.035 : 0.05;
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Particle key={i} position={[
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15
        ]} isMouseActive={isMouseActive} />
      ))}
    </group>
  );
};

// Individual particle
const Particle = ({ position, isMouseActive }: { position: [number, number, number], isMouseActive?: boolean }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const speed = isMouseActive ? 0.0007 : 0.001;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * (isMouseActive ? 0.35 : 0.5);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial 
        color="#15cea0" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

const ThreeScene = ({ isMouseActive = false }: ThreeSceneProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#15cea0" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0c9a77" />
          
          <FloatingShapes isMouseActive={isMouseActive} />
          <DigitalParticles isMouseActive={isMouseActive} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;

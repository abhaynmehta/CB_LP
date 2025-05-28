
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';

const GeometricShape = ({ position, color, shape = 'box' }: { position: [number, number, number], color: string, shape?: string }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {shape === 'sphere' ? (
          <sphereGeometry args={[0.5, 32, 32]} />
        ) : shape === 'octahedron' ? (
          <octahedronGeometry args={[0.7]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const DigitalPixels = () => {
  const particlesRef = useRef<Mesh[]>([]);

  useFrame((state) => {
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        particle.position.y = Math.sin(state.clock.elapsedTime + index) * 2;
        particle.rotation.z = state.clock.elapsedTime * 0.5;
      }
    });
  });

  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) particlesRef.current[index] = el;
          }}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="#15cea0" />
        </mesh>
      ))}
    </>
  );
};

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Geometric Shapes */}
        <GeometricShape position={[-3, 2, 0]} color="#15cea0" shape="box" />
        <GeometricShape position={[3, -2, 0]} color="#0c9a77" shape="sphere" />
        <GeometricShape position={[0, 3, -2]} color="#15cea0" shape="octahedron" />
        <GeometricShape position={[-2, -3, 1]} color="#0c9a77" shape="box" />
        
        {/* Digital Pixels */}
        <DigitalPixels />
        
        {/* Floating 3D Text */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Center position={[0, 0, -3]}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.5}
              height={0.1}
              curveSegments={12}
            >
              CRAFT
              <meshStandardMaterial color="#15cea0" />
            </Text3D>
          </Center>
        </Float>
      </Canvas>
    </div>
  );
};

export default ThreeScene;

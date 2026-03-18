import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

function CoreSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <Sphere args={[2, 48, 48]} ref={sphereRef}>
        <MeshDistortMaterial
          color="#1e293b"
          emissive="#0f172a"
          emissiveIntensity={0.1}
          wireframe={true}
          distort={0.15}
          speed={0.5}
          transparent={true}
          opacity={0.1}
        />
      </Sphere>
      
      {/* Inner glowing core */}
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.03} />
      </Sphere>
    </Float>
  );
}

function CameraRig() {
  useFrame((state) => {
    // Parallax effect using mouse coordinates
    state.camera.position.lerp(
      new THREE.Vector3(state.pointer.x * 2, state.pointer.y * 2, 5),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function AICore() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.2} color="#38bdf8" />
        
        <Stars radius={100} depth={50} count={3000} factor={2} saturation={0} fade speed={0.5} />
        
        <CoreSphere />
        <CameraRig />
      </Canvas>
    </div>
  );
}

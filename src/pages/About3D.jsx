import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text, useGLTF } from '@react-three/drei';
import { Suspense, useState, useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { resumeData, fetchWorkExperiencesData } from '../data/resumeData';

function Character({ position, rotation }) {
  const { scene } = useGLTF('/models/character.glb');
  return <primitive object={scene} position={position} rotation={rotation} scale={0.02} />;

  // return (
  //   <mesh position={position} rotation={rotation} scale={0.5}>
  //     <boxGeometry args={[1, 2, 1]} />
  //     <meshStandardMaterial color="blue" />
  //   </mesh>
  // );
}

function House({ position, rotation, onClick, isActive, company }) {
  const { scene } = useGLTF('/models/building_07.glb');
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    // Create hover material
    const hoverMaterial = new THREE.MeshStandardMaterial({ color: 'hotpink' });
    
    clone.traverse((child) => {
      if (child.isMesh) {
        // Store original material and hover material
        child.userData.originalMaterial = child.material;
        child.userData.hoverMaterial = hoverMaterial;
      }
    });
    return clone;
  }, [scene]);

  // Calculate ground elevation at this position
  const groundElevation = useMemo(() => {
    const x = position[0];
    const z = position[2];
    const wave1 = Math.sin(x * 0.1) * 2;
    const wave3 = Math.sin(z * 0.1) * 2;
    return (wave1 + wave3) * 1.5;
  }, [position]);
  
  return (
    <group position={[position[0], groundElevation, position[2]]} rotation={rotation}>
      <group
        onClick={onClick}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer';
          // Switch to hover material
          clonedScene.traverse((child) => {
            if (child.isMesh) {
              child.material = child.userData.hoverMaterial;
            }
          });
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = 'auto';
          // Switch back to original material
          clonedScene.traverse((child) => {
            if (child.isMesh) {
              child.material = child.userData.originalMaterial;
            }
          });
        }}
      >
        <primitive 
          object={clonedScene} 
          scale={[1.0, 1.0, 1.0]}
          position={[0, 0, 0]}
        />
      </group>
      <Text
        position={[0, 3.5, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {company}
      </Text>
    </group>
  );
}

function Ground() {
  const geometry = useMemo(() => {
    const width = 100;
    const height = 100;
    const widthSegments = 100;
    const heightSegments = 100;
    
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const vertices = geometry.attributes.position.array;
    
    // Add height variations
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      
      // Create a wave-like pattern
      const wave1 = Math.sin(x * 0.1) * 2;
      const wave3 = Math.sin(y * 0.1) * 2;
      const wave2 = Math.cos(z * 0.1) * 2;
      const noise = (Math.random() - 0.5) * 1;
      
      // vertices[i + 1] = (wave1 + wave2 + wave3 + noise) * 0.5;
      // vertices[i + 1] = noise;
      vertices[i+2] = ( wave1 + wave3 -2.1) * 1.5;
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <primitive object={geometry} />
        <meshStandardMaterial 
          color="#2d5a27" 
          wireframe={false}
          side={THREE.DoubleSide}
          flatShading={false}
          roughness={0.9}
          metalness={0.0}
          envMapIntensity={0.2}
        />
      </mesh>
      
      {/* Grid helper */}
      {/* <gridHelper args={[100, 20, '#ff0000', '#ff0000']} position={[0, 0, 0]} /> */}
      
      {/* Axes helper */}
      <axesHelper args={[10]} />
    </group>
  );
}

function ExperienceInfo({ experience }) {
  if (!experience) return null;
  
  return (
    <div className="absolute top-[100px] left-4 bg-white/80 p-4 rounded-lg shadow-lg max-w-md z-10">
      <h3 className="text-xl font-bold">{experience.company}</h3>
      <p className="text-gray-600">{experience.title}</p>
      <p className="text-gray-500">{experience.period}</p>
      <p className="text-gray-700 mt-2">{experience.description}</p>
      <div className="mt-3">
        <h4 className="font-semibold text-gray-800">Technologies:</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {experience.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function About3D() {
  const [activeHouse, setActiveHouse] = useState(null);
  const [characterPosition, setCharacterPosition] = useState([0, -3, 0]);
  const [characterRotation, setCharacterRotation] = useState([0, 0, 0]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkExperiences = async () => {
      try {
        const experiences = await fetchWorkExperiencesData();
        setWorkExperiences(experiences);
      } catch (err) {
        console.error('Error loading work experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWorkExperiences();
  }, []);

  // Add 3D positions to the fetched work experiences
  const experiences = workExperiences.map((exp, index) => ({
    ...exp,
    position: [15 - (index * 10), 0, -5]  // Distributed positions
  }));

  const moveCharacter = (targetPosition) => {
    // Calculate ground elevation at target position
    const targetX = targetPosition[0];
    const targetZ = targetPosition[2];
    const wave1 = Math.sin(targetX * 0.1) * 2;
    const wave3 = Math.sin(targetZ * 0.1) * 2;
    targetPosition[1] = (wave1 + wave3) * 1.5;

    const direction = new THREE.Vector3()
      .subVectors(
        new THREE.Vector3(...targetPosition),
        new THREE.Vector3(...characterPosition)
      )
      .normalize();
    
    const targetRotation = Math.atan2(direction.y, direction.x);
    setCharacterRotation([0, targetRotation, 0]);
    
    // Animate movement
    const interval = setInterval(() => {
      setCharacterPosition(prev => {
        const newX = prev[0] + direction.x * 0.1;
        const newZ = prev[2] + direction.z * 0.1;
        
        // Calculate ground elevation at current position
        const currentWave1 = Math.sin(newX * 0.1) * 2;
        const currentWave3 = Math.sin(newZ * 0.1) * 2;
        const newY = (currentWave1 + currentWave3) * 1.5;
        
        const newPos = [newX, newY, newZ];
        
        if (Math.abs(newX - targetPosition[0]) < 0.1 && 
            Math.abs(newZ - targetPosition[2]) < 0.1) {
          clearInterval(interval);
          return targetPosition;
        }
        return newPos;
      });
    }, 16);
  };

  if (loading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading 3D work experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <ExperienceInfo experience={activeHouse} />
      <Canvas
        onCreated={({ gl }) => {
          console.log('WebGL context created successfully');
        }}
        onError={(error) => {
          console.error('Canvas error:', error);
          // This error will be caught by the ErrorBoundary in AboutWrapper
          throw new Error('Failed to create 3D scene');
        }}
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <p>Loading 3D environment...</p>
            </div>
          </div>
        }
      >
        <PerspectiveCamera makeDefault position={[30, 10, 10]} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <directionalLight position={[-10, 20, -10]} intensity={0.5} />
        <Environment preset="sunset" />
        <Ground />
        <Suspense fallback={null}>
          <Character position={characterPosition} rotation={characterRotation} />
          {experiences.map((exp, index) => (
            <House
              key={index}
              position={exp.position}
              rotation={[0, Math.PI / 4, 0]}
              onClick={() => {
                setActiveHouse(exp);
                moveCharacter(exp.position);
              }}
              isActive={activeHouse === exp}
              company={exp.company.split(',')[0]}
            />
          ))}
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
}

export default About3D; 
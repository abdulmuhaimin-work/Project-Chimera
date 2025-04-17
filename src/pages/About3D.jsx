import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Character({ position, rotation }) {
  const { scene } = useGLTF('/models/character.glb');
  return <primitive object={scene} position={position} rotation={rotation} scale={0.5} />;
}

function House({ position, rotation, onClick, isActive }) {
  const { scene } = useGLTF('/models/house.glb');
  return (
    <group position={position} rotation={rotation}>
      <primitive 
        object={scene} 
        scale={0.3} 
        onClick={onClick}
        onPointerOver={(e) => {
          e.object.material.color.set('hotpink');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.object.material.color.set('white');
          document.body.style.cursor = 'auto';
        }}
      />
      {isActive && (
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      )}
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

function ExperienceInfo({ experience }) {
  if (!experience) return null;
  
  return (
    <div className="absolute top-4 left-4 bg-white/80 p-4 rounded-lg shadow-lg max-w-md">
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
  const [characterPosition, setCharacterPosition] = useState([0, 0, 0]);
  const [characterRotation, setCharacterRotation] = useState([0, 0, 0]);

  const experiences = [
    {
      period: "August 2024 – Present",
      title: "Consultant, Full Stack Developer",
      company: "Bestinet Sdn Bhd, Kuala Lumpur",
      description: "Developed and maintained web applications using NextJS, Typescript and TailwindCSS. Implemented integration with microservices API. Planned and implemented new features and improvements. Automated build, test and deployment of pipelines using Gitlab and Jenkins.",
      technologies: ["NextJS", "TypeScript", "TailwindCSS", "GitLab", "Jenkins"],
      position: [5, 0, 5]
    },
    {
      period: "August 2023 – August 2024",
      title: "Mid-level Developer",
      company: "Nematix Sdn Bhd, Seri Kembangan",
      description: "Built responsive web applications using Typescript and React. Collaborated with designers to implement user-friendly interfaces. Developed Interactive Data Visualization dashboards using React Charts and CubeJS. Implemented GIS related features using Google Maps API and Kinetica.",
      technologies: ["React", "TypeScript", "CubeJS", "Google Maps API", "Kinetica", "Supertokens", "Supabase"],
      position: [-5, 0, 5]
    },
    {
      period: "September 2021 – August 2023",
      title: "Front End Developer",
      company: "REKA Inisiatif Sdn Bhd, Kuala Lumpur",
      description: "Developed and maintained web applications using ReactJS and Bootstrap. Implemented authentication and authorization using Firebase Auth. Developed and maintained RESTful APIs using Firebase Cloud Functions. Developed backend services using NodeJS and Express.",
      technologies: ["React", "Bootstrap", "Firebase", "NodeJS", "Express", "Stripe", "MongoDB"],
      position: [0, 0, -5]
    },
    {
      period: "February 2020 – April 2020",
      title: "Software Developer",
      company: "Elm Lab Sdn Bhd, Beranang",
      description: "Heavily involved in the development of the landing page to onboard new users of the system. Developed the front end interface and integrated with RESTful API. Ensured deliverables and tasks were completed on time for project delivery date.",
      technologies: ["HTML", "CSS", "JavaScript", "RESTful API"],
      position: [5, 0, -5]
    }
  ];

  const moveCharacter = (targetPosition) => {
    const direction = new THREE.Vector3()
      .subVectors(
        new THREE.Vector3(...targetPosition),
        new THREE.Vector3(...characterPosition)
      )
      .normalize();
    
    const targetRotation = Math.atan2(direction.x, direction.z);
    setCharacterRotation([0, targetRotation, 0]);
    
    // Animate movement
    const interval = setInterval(() => {
      setCharacterPosition(prev => {
        const newPos = [
          prev[0] + direction.x * 0.1,
          prev[1],
          prev[2] + direction.z * 0.1
        ];
        
        if (Math.abs(newPos[0] - targetPosition[0]) < 0.1 && 
            Math.abs(newPos[2] - targetPosition[2]) < 0.1) {
          clearInterval(interval);
          return targetPosition;
        }
        return newPos;
      });
    }, 16);
  };

  return (
    <div className="relative w-full h-screen">
      <ExperienceInfo experience={activeHouse} />
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
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
            />
          ))}
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
}

export default About3D; 
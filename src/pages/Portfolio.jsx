import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';

function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "SERV Sfera Auto",
      description: "A web app to manage workshops owner and users daily activity",
      techStack: ["ReactJS", "Firebase", "Bootstrap", "Cloudfunction"],
      image: "/project-1.jpg", // You'll need to add project images
      link: "https://business.sfera.ai"
    },
    {
      title: "Stripe Payment Server",
      description: "Back-end API for the payment system to integrate the payment of our various apps with the Stripe payment system.",
      techStack: ["ExpressJS", "NodeJS", "MongoDB"],
      image: "/project-2.jpg",
      link: "Private Company Project"
    },
    {
      title: "Autonomous Vehicle Dashboard",
      description: "Tasked with developing the dashboard for displaying data that was pulled from our autonomous vehicle",
      techStack: ["ReactJS"],
      image: "/project-3.jpg",
      link: "Private Company Project"
    },
    {
      title: "Forklift Management System Integration",
      description: "Project scope is to integrate data from our system to client old system",
      techStack: ["React", "Firebase"],
      image: "/project-4.jpg",
      link: "Private Company Project"
    },
    {
      title: "MicroFrontend Analytics Module",
      description: "Develope a dynamic dashboard module for an analytics and monitoring system.",
      techStack: ["Typescript", "TailwindCSS", "ReactJS", "CubeJS", "Vite", "NodeJS"],
      image: "/project-5.jpg",
      link: "Private Company Project"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <section className="mb-16 fade-in">
          <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">My Projects</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 text-center">
            Here are some of the projects I've worked on throughout my career
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`card overflow-hidden transform transition-all duration-500 ${
                loading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-600" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                    <BiCodeAlt size={48} />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <FaGithub /> Code
                  </a>
                  {project.link && project.link !== "Private Company Project" && (
                    <a 
                      href={project.link} 
                      className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  {project.link && project.link === "Private Company Project" && (
                    <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <FaLock /> Private Company Project
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio; 
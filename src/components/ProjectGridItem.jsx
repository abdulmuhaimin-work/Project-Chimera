import { useState, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock, FaGripLines } from 'react-icons/fa';
import LazyImage from './LazyImage';

function ProjectGridItem({ project, loading, onSelect, getIcon }) {
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeoutRef = useRef(null);
  
  // Function to limit description length based on tags count
  const getDescription = () => {
    // For private projects, make description shorter to accommodate disclaimer
    const maxLength = !project.liveUrl && !project.repoUrl 
      ? 100 
      : project.tags.length > 4 ? 120 : 180;
      
    if (project.description.length <= maxLength) return project.description;
    return project.description.substring(0, maxLength) + '...';
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    // Use a timeout to prevent the click from firing immediately after drag
    clickTimeoutRef.current = setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const handleCardClick = () => {
    if (!isDragging) {
      onSelect(project);
    }
  };

  // Clean up timeout on unmount
  const handleMouseLeave = () => {
    setHovered(false);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  };
  
  return (
    <div 
      className={`card overflow-hidden transition-all duration-500 ${
        loading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      } ${hovered ? 'shadow-lg transform scale-[1.01]' : 'shadow'} w-full flex flex-col relative`}
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Improved drag handle - entire top section */}
      <div 
        className="drag-handle w-full h-10 absolute top-0 left-0 cursor-move z-20 flex justify-between items-center px-3 bg-gradient-to-b from-gray-200/70 dark:from-gray-800/70 to-transparent"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {/* Drag indicator text on left */}
        <span className="text-xs text-gray-500 dark:text-gray-400 select-none">
          Drag here
        </span>
        
        {/* Grip icon on right */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center shadow-sm">
          <FaGripLines className="text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      
      {/* Card content - marked as clickable */}
      <div className="clickable-card-content flex flex-col flex-grow">
        <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
          {loading ? (
            <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-600" />
          ) : (
            <>
              <LazyImage 
                src={project.image || '/placeholder-project.jpg'} 
                alt={project.title} 
                className={`w-full h-full transition-all duration-500 ${hovered ? 'scale-105' : 'scale-100'} object-cover`}
              />
              <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${hovered ? 'opacity-30' : 'opacity-0'}`}></div>
            </>
          )}
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 dark:text-white line-clamp-1">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{getDescription()}</p>
          
          <div className="mb-4 overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                >
                  <span className="mr-1">{getIcon(tech)}</span> {tech}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                  +{project.tags.length - 4} more
                </span>
              )}
            </div>
          </div>

          <div className="mt-auto flex gap-4">
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub /> Code
              </a>
            )}
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
            {!project.liveUrl && !project.repoUrl && (
              <span className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                <FaLock className="text-yellow-600 dark:text-yellow-400" /> Private Project
              </span>
            )}
          </div>
          
          {!project.liveUrl && !project.repoUrl && (
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic border-l-2 border-yellow-400 pl-3">
              Note: Details have been anonymized due to NDA requirements. This case study focuses on my technical contribution while respecting confidentiality.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectGridItem; 
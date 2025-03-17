import { useState } from 'react';
import { HiChevronDown, HiExternalLink, HiCode, HiPhotograph } from 'react-icons/hi';

function ProjectCaseStudy({ project }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  
  if (!project) return null;

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  
  const nextScreenshot = () => {
    if (!hasScreenshots) return;
    setCurrentScreenshotIndex((prev) => 
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevScreenshot = () => {
    if (!hasScreenshots) return;
    setCurrentScreenshotIndex((prev) => 
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-custom overflow-hidden">
      {/* Project header with image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-contain bg-gray-900"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-primary/80 text-white rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <button 
          className={`px-4 py-3 font-medium whitespace-nowrap ${
            activeTab === 'overview' 
              ? 'border-b-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        {hasScreenshots && (
          <button 
            className={`px-4 py-3 font-medium whitespace-nowrap flex items-center ${
              activeTab === 'screenshots' 
                ? 'border-b-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('screenshots')}
          >
            <HiPhotograph className="mr-1" /> Screenshots
          </button>
        )}
        <button 
          className={`px-4 py-3 font-medium whitespace-nowrap ${
            activeTab === 'approach' 
              ? 'border-b-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('approach')}
        >
          Approach
        </button>
        <button 
          className={`px-4 py-3 font-medium whitespace-nowrap ${
            activeTab === 'results' 
              ? 'border-b-2 border-primary dark:border-blue-400 text-primary dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>
      
      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Project Overview</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{project.overview}</p>
            
            {project.features && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 dark:text-white">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary dark:text-blue-400 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 dark:text-white">The Problem</h4>
              <p className="text-gray-700 dark:text-gray-300">{project.problem}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 dark:text-white">The Solution</h4>
              <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-3 dark:text-white">Tech Stack</h4>
              <div className="flex flex-wrap gap-3">
                {project.technologies && project.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <span className="text-gray-700 dark:text-gray-300">{tech.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <h5 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Timeline</h5>
                <p className="text-gray-900 dark:text-white">{project.timeline}</p>
              </div>
              <div>
                <h5 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Role</h5>
                <p className="text-gray-900 dark:text-white">{project.role}</p>
              </div>
              <div>
                <h5 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Client</h5>
                <p className="text-gray-900 dark:text-white">{project.client}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  <HiExternalLink /> View Live
                </a>
              )}
              {project.repoUrl && (
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <HiCode /> View Code
                </a>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'screenshots' && hasScreenshots && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Project Screenshots</h3>
            
            <div className="relative mb-4">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-lg">
                <img 
                  src={project.screenshots[currentScreenshotIndex].path} 
                  alt={project.screenshots[currentScreenshotIndex].caption} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Navigation arrows */}
              {project.screenshots.length > 1 && (
                <>
                  <button 
                    onClick={prevScreenshot}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    ←
                  </button>
                  <button 
                    onClick={nextScreenshot}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            
            <p className="text-center text-gray-600 dark:text-gray-400 italic mb-6">
              {project.screenshots[currentScreenshotIndex].caption}
            </p>
            
            {/* Thumbnail navigation */}
            {project.screenshots.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {project.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshotIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentScreenshotIndex === index
                        ? 'bg-primary dark:bg-blue-400'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'approach' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Project Approach</h3>
            
            {project.challenges && (
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 dark:text-white">Challenges</h4>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary dark:text-blue-400 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.approach && (
              <div className="space-y-6">
                {project.approach.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-medium mb-2 dark:text-white">{item.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'results' && (
          <div>
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Project Results</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{project.outcome}</p>
            
            {project.results && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.results.map((result, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary dark:text-blue-400 mb-1">{result.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{result.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCaseStudy; 
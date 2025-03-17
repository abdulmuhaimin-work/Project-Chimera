import { useState, useRef, useEffect } from 'react';

function InteractiveTimeline({ experiences }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRefs = useRef([]);
  
  // Effect to check which timeline items are in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [experiences]);
  
  if (!experiences || experiences.length === 0) {
    return null;
  }
  
  return (
    <div className="relative w-full max-w-4xl mx-auto py-16">
      {/* Timeline center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 z-0"></div>
      
      {/* Timeline items */}
      {experiences.map((experience, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div 
            key={index}
            ref={(el) => (timelineRefs.current[index] = el)}
            data-index={index}
            className={`relative flex items-center mb-12 ${isEven ? 'justify-start' : 'justify-end'}`}
          >
            {/* Timeline dot */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 transition-all duration-300 z-10 ${
              activeIndex === index 
                ? 'bg-primary border-primary-light scale-125' 
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }`}></div>
            
            {/* Timeline card */}
            <div 
              className={`w-5/12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-custom hover:shadow-custom-lg transition-all duration-300 
                ${activeIndex === index ? 'scale-105' : 'scale-100'} 
                ${isEven 
                  ? 'mr-auto pr-12 animate-[slideIn_0.5s_ease-out_forwards]' 
                  : 'ml-auto pl-12 animate-[slideInRight_0.5s_ease-out_forwards]'
                }`}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {experience.period}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  {experience.title}
                </h3>
                <h4 className="text-md font-medium text-primary dark:text-blue-400 mt-1">
                  {experience.company}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  {experience.description}
                </p>
                
                {experience.technologies && (
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InteractiveTimeline; 
import { useState, useEffect, lazy, Suspense } from 'react';
import { projects, getIconName } from '../data/projectsData';
import { FaLock, FaReact, FaNodeJs, FaFire, FaBootstrap } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss3, SiVite } from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Lazy load heavy components for better performance
const SearchProjects = lazy(() => import('../components/SearchProjects'));
const ProjectCaseStudy = lazy(() => import('../components/ProjectCaseStudy'));
const ProjectGridItem = lazy(() => import('../components/ProjectGridItem'));

// Create a responsive grid layout with width provider
const ResponsiveGridLayout = WidthProvider(Responsive);

// Icon mapping function to render actual React icons
const getIcon = (iconName) => {
  const iconMap = {
    'FaReact': <FaReact />,
    'SiTypescript': <SiTypescript />,
    'SiTailwindcss': <SiTailwindcss />,
    'FaNodeJs': <FaNodeJs />,
    'SiExpress': <SiExpress />,
    'SiMongodb': <SiMongodb />,
    'FaFire': <FaFire />,
    'FaBootstrap': <FaBootstrap />,
    'SiJavascript': <SiJavascript />,
    'SiHtml5': <SiHtml5 />,
    'SiCss3': <SiCss3 />,
    'SiVite': <SiVite />,
    'BiCodeAlt': <BiCodeAlt />
  };
  return iconMap[iconName] || <BiCodeAlt />;
};

// Loading component for lazy-loaded components
const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [layouts, setLayouts] = useState(null);

  // Load saved layouts from localStorage if available
  useEffect(() => {
    const savedLayouts = localStorage.getItem('portfolio-grid-layouts');
    if (savedLayouts) {
      try {
        setLayouts(JSON.parse(savedLayouts));
      } catch (e) {
        console.error('Error loading saved layouts:', e);
        generateDefaultLayouts();
      }
    } else {
      generateDefaultLayouts();
    }
  }, []);

  // Generate default layouts if no saved layouts exist
  const generateDefaultLayouts = () => {
    if (!projects) return;
    
    // Define layouts for different breakpoints with autoHeight
    const lg = projects.map((project, index) => ({
      i: project.id.toString(),
      x: (index % 2) * 6,
      y: Math.floor(index / 2) * 4,
      w: 6,
      h: 12
    }));

    const md = projects.map((project, index) => ({
      i: project.id.toString(),
      x: (index % 2) * 5,
      y: Math.floor(index / 2) * 4,
      w: 5,
      h: 12
    }));

    const sm = projects.map((project, index) => ({
      i: project.id.toString(),
      x: 0,
      y: index * 4,
      w: 12,
      h: 12
    }));

    setLayouts({ lg, md, sm });
  };

  // Save layouts to localStorage when changed
  const handleLayoutChange = (currentLayout, allLayouts) => {
    const validatedLayouts = {};
    Object.keys(allLayouts).forEach(breakpoint => {
      validatedLayouts[breakpoint] = allLayouts[breakpoint].map(item => ({
        ...item,
        h: item.h || 12
      }));
    });
    
    localStorage.setItem('portfolio-grid-layouts', JSON.stringify(validatedLayouts));
  };

  // Handler for when items are resized
  const handleResizeComplete = (layout, oldItem, newItem, placeholder, e, element) => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  };

  // Reset layouts to default
  const resetLayouts = () => {
    localStorage.removeItem('portfolio-grid-layouts');
    generateDefaultLayouts();
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <section className="mb-16 fade-in">
          <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">My Projects</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
            Here are some of the projects I've worked on throughout my career
          </p>
          
          {/* Private Project Explanation */}
          <div className="mb-10 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400 flex items-center">
              <FaLock className="mr-2" /> About My Private Projects
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Many of my professional projects are under non-disclosure agreements (NDAs). While I can't share code or specific implementation details, each project description focuses on:
            </p>
            <ul className="mt-3 ml-6 list-disc text-gray-600 dark:text-gray-400">
              <li>Technical challenges I overcame</li>
              <li>My specific role and contributions</li>
              <li>Technologies and methodologies used</li>
              <li>Measurable results and outcomes</li>
            </ul>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              I'm happy to discuss these projects in more detail during interviews, within confidentiality boundaries.
            </p>
          </div>
          
          {/* Search Projects Component */}
          <div className="mb-12 relative">
            <Suspense fallback={<ComponentLoader />}>
              <SearchProjects 
                projects={projects} 
                onProjectSelect={handleProjectSelect} 
              />
            </Suspense>
          </div>
        </section>

        {/* Project Case Study (visible when a project is selected) */}
        {selectedProject && (
          <section className="mb-16 fade-in">
            <Suspense fallback={<ComponentLoader />}>
              <ProjectCaseStudy project={selectedProject} />
            </Suspense>
            <div className="flex justify-center mt-8">
              <button 
                onClick={closeProjectDetails}
                className="btn secondary"
              >
                Back to All Projects
              </button>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section className="mb-16 fade-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">All Projects</h2>
            <button 
              onClick={resetLayouts}
              className="btn secondary text-sm"
            >
              Reset Layout
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="projects-grid">
              {layouts && (
                <ResponsiveGridLayout
                  className="layout"
                  layouts={layouts}
                  onLayoutChange={handleLayoutChange}
                  onResizeStop={handleResizeComplete}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  autoSize={true}
                  verticalCompact={true}
                  preventCollision={false}
                  useCSSTransforms={true}
                  isResizable={true}
                  isDraggable={true}
                  compactType="vertical"
                  margin={[20, 20]}
                  containerPadding={[0, 0]}
                >
                  {projects.map((project) => (
                    <div key={project.id} className="project-grid-item">
                      <Suspense fallback={<ComponentLoader />}>
                        <ProjectGridItem 
                          project={project} 
                          onProjectSelect={handleProjectSelect}
                          getIcon={getIcon}
                        />
                      </Suspense>
                    </div>
                  ))}
                </ResponsiveGridLayout>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Portfolio; 
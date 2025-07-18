import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock, FaReact, FaNodeJs, FaFire, FaBootstrap, FaSpinner } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss3, SiVite } from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';
import SearchProjects from '../components/SearchProjects';
import ProjectCaseStudy from '../components/ProjectCaseStudy';
import ProjectGridItem from '../components/ProjectGridItem';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { API_ENDPOINTS } from '../config/api';

// Create a responsive grid layout with width provider
const ResponsiveGridLayout = WidthProvider(Responsive);

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [layouts, setLayouts] = useState(null);

  // Fetch projects from backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.projects);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        const transformedProjects = transformProjectsData(data.data || []);
        setProjects(transformedProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Transform backend data to frontend format
  const transformProjectsData = (backendProjects) => {
    return backendProjects.map(project => ({
      ...project,
      // Map backend field names to frontend expectations
      repoUrl: project.repo_url,
      liveUrl: project.live_url,
      techStack: project.tech_stack || [],
      // Transform tech_stack to technologies format with icons
      technologies: (project.tech_stack || []).map(tech => ({
        name: tech,
        icon: getIcon(tech)
      })),
      // Provide defaults for missing fields
      features: [],
      screenshots: [],
      challenges: [],
      approach: [],
      results: []
    }));
  };

  // Load saved layouts from localStorage if available
  useEffect(() => {
    if (projects.length > 0) {
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
    }
  }, [projects]);

  // Generate default layouts if no saved layouts exist
  const generateDefaultLayouts = () => {
    if (!projects || projects.length === 0) return;
    
    // Define layouts for different breakpoints with autoHeight
    // Each item has an i (ID), x (column), y (row), w (width), h (height)
    const lg = projects.map((project, index) => ({
      i: project.id.toString(),
      x: (index % 2) * 6,
      y: Math.floor(index / 2) * 4, // Rough initial position, will be adjusted automatically
      w: 6,
      h: 12 // Default height that will be overridden by autoSize
    }));

    const md = projects.map((project, index) => ({
      i: project.id.toString(),
      x: (index % 2) * 5,
      y: Math.floor(index / 2) * 4, // Rough initial position, will be adjusted automatically
      w: 5,
      h: 12 // Default height that will be overridden by autoSize
    }));

    const sm = projects.map((project, index) => ({
      i: project.id.toString(),
      x: 0,
      y: index * 4, // Rough initial position, will be adjusted automatically
      w: 12,
      h: 12 // Default height that will be overridden by autoSize
    }));

    setLayouts({ lg, md, sm });
  };

  // Save layouts to localStorage when changed
  const handleLayoutChange = (currentLayout, allLayouts) => {
    // Make sure all layout items have a height value
    const validatedLayouts = {};
    Object.keys(allLayouts).forEach(breakpoint => {
      validatedLayouts[breakpoint] = allLayouts[breakpoint].map(item => ({
        ...item,
        h: item.h || 12 // Ensure each item has a height
      }));
    });
    
    localStorage.setItem('portfolio-grid-layouts', JSON.stringify(validatedLayouts));
  };

  // Handler for when items are resized
  const handleResizeComplete = (layout, oldItem, newItem, placeholder, e, element) => {
    // Force the grid to recalculate positions and sizes
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  };

  // Reset layouts to default
  const resetLayouts = () => {
    localStorage.removeItem('portfolio-grid-layouts');
    generateDefaultLayouts();
  };

  // Icon mapping function
  const getIcon = (tech) => {
    const iconMap = {
      'React': <FaReact />,
      'ReactJS': <FaReact />,
      'TailwindCSS': <SiTailwindcss />,
      'Tailwind': <SiTailwindcss />,
      'TypeScript': <SiTypescript />,
      'JavaScript': <SiJavascript />,
      'Node.js': <FaNodeJs />,
      'NodeJS': <FaNodeJs />,
      'Express': <SiExpress />,
      'ExpressJS': <SiExpress />,
      'MongoDB': <SiMongodb />,
      'Firebase': <FaFire />,
      'Bootstrap': <FaBootstrap />,
      'HTML': <SiHtml5 />,
      'CSS': <SiCss3 />,
      'Vite': <SiVite />,
      'Unity': <BiCodeAlt />,
      'C#': <BiCodeAlt />
    };
    return iconMap[tech] || <BiCodeAlt />;
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-primary mb-4 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BiCodeAlt className="text-6xl text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Error: {error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Make sure the backend server is running and accessible
          </p>
        </div>
      </div>
    );
  }

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
            <SearchProjects 
              projects={projects} 
              onProjectSelect={handleProjectSelect} 
            />
          </div>
        </section>

        {/* Project Case Study (visible when a project is selected) */}
        {selectedProject && (
          <section className="mb-16 fade-in">
            <ProjectCaseStudy project={selectedProject} />
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

        {/* Projects Grid with React Grid Layout (hidden when viewing case study) */}
        {!selectedProject && layouts && projects.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h3 className="text-xl text-gray-700 dark:text-gray-300 mb-2">
                Interactive Project Grid
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                <span className="inline-block bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1 mr-1">
                  Drag and rearrange
                </span>
                projects to customize your view
              </p>
              <button 
                onClick={resetLayouts}
                className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded-md text-gray-700 dark:text-gray-300 transition-colors"
              >
                Reset Layout
              </button>
            </div>
            <ResponsiveGridLayout
              className="fade-in"
              layouts={layouts}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 12, xs: 6, xxs: 4 }}
              rowHeight={30}
              margin={[16, 24]}
              containerPadding={[0, 0]}
              isDraggable={true}
              isResizable={false}
              isBounded={true}
              onLayoutChange={handleLayoutChange}
              onResizeStop={handleResizeComplete}
              onDragStop={handleResizeComplete}
              draggableHandle=".drag-handle"
              verticalCompact={true}
              compactType="vertical"
              preventCollision={false}
              useCSSTransforms={true}
              autoSize={true}
              cancel=".clickable-card-content"
              draggableCancel=".clickable-card-content"
            >
              {projects.map((project) => (
                <div key={project.id.toString()} className="grid-item-container">
                  <ProjectGridItem 
                    project={project}
                    loading={false}
                    onSelect={handleProjectSelect}
                    getIcon={getIcon}
                  />
                </div>
              ))}
            </ResponsiveGridLayout>
          </>
        )}

        {/* Show message when no projects are found */}
        {!selectedProject && !loading && !error && projects.length === 0 && (
          <div className="text-center py-16">
            <BiCodeAlt className="text-6xl text-gray-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for new projects!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio; 
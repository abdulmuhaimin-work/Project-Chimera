import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaLock, FaReact, FaNodeJs, FaFire, FaBootstrap } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss3, SiVite } from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';
import SearchProjects from '../components/SearchProjects';
import ProjectCaseStudy from '../components/ProjectCaseStudy';
import ProjectGridItem from '../components/ProjectGridItem';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Create a responsive grid layout with width provider
const ResponsiveGridLayout = WidthProvider(Responsive);

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

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (tech) => {
    switch (tech.toLowerCase()) {
      case 'react':
      case 'reactjs':
        return <FaReact />;
      case 'typescript':
        return <SiTypescript />;
      case 'tailwindcss':
        return <SiTailwindcss />;
      case 'nodejs':
        return <FaNodeJs />;
      case 'express':
      case 'expressjs':
        return <SiExpress />;
      case 'mongodb':
        return <SiMongodb />;
      case 'firebase':
        return <FaFire />;
      case 'bootstrap':
        return <FaBootstrap />;
      case 'javascript':
        return <SiJavascript />;
      case 'html':
        return <SiHtml5 />;
      case 'css':
        return <SiCss3 />;
      case 'vite':
        return <SiVite />;
      default:
        return <BiCodeAlt />;
    }
  };

  const projects = [
    {
      id: 0,
      title: "Interactive Portfolio Website",
      description: "A responsive, interactive portfolio showcasing my work with dynamic layouts, animations, and advanced React components.",
      overview: "This portfolio website is designed as both a showcase of my projects and a project itself. It features an interactive grid layout, custom animations, theme switching, and advanced React components to create an engaging user experience that demonstrates my frontend development capabilities.",
      problem: "Traditional portfolio websites often present work in a static, non-interactive way that doesn't effectively demonstrate a developer's capabilities, especially in dynamic UI development and state management.",
      solution: "I built this portfolio using React and Tailwind CSS with a focus on interactivity. Features include a draggable project grid, custom cursor effects, dark mode support, lazy-loaded images, and animated transitions between sections.",
      outcome: "The result is a portfolio that not only presents my work effectively but also serves as a living demonstration of my technical skills, UX sensibilities, and attention to detail in frontend development.",
      tags: ["React", "TailwindCSS", "Responsive Design", "React Grid Layout", "Custom Animations"],
      techStack: ["React", "TailwindCSS", "React Grid Layout", "React Icons"],
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "TailwindCSS", icon: <SiTailwindcss /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "CSS", icon: <SiCss3 /> }
      ],
      image: "/portfolioweb.png",
      repoUrl: "https://github.com/abdulmuhaimin-work/Project-Chimera",
      liveUrl: "https://abdulmuhaimin.my",
      timeline: "2 months",
      role: "Full-stack Developer",
      client: "Personal Project",
      screenshots: [
        {
          path: "/placeholder-portfolio-dark.jpg",
          caption: "Dark mode view of the portfolio with animated background"
        },
        { 
          path: "/placeholder-portfolio-grid.jpg", 
          caption: "Interactive draggable project grid with custom drag handle" 
        },
        { 
          path: "/placeholder-portfolio-mobile.jpg", 
          caption: "Responsive mobile view with optimized layouts" 
        }
      ],
      features: [
        "Interactive project grid with drag-and-drop rearrangement",
        "Custom animated cursor and scroll progress indicator",
        "Dark/light theme support with smooth transitions",
        "Responsive design for all device sizes",
        "Comprehensive case studies for each project",
        "Project search and filtering functionality",
        "Lazy-loaded images for performance optimization",
        "Animated page transitions and UI elements",
        "GitHub activity integration",
        "Testimonials carousel with client feedback"
      ],
      challenges: [
        "Creating a performant drag-and-drop interface that works on both desktop and mobile",
        "Designing a component architecture that supports dynamic content",
        "Implementing an accessible dark mode that respects user preferences",
        "Balancing visual aesthetics with performance",
        "Creating components that gracefully adapt to variable content lengths"
      ],
      approach: [
        { 
          title: "Component-Based Architecture", 
          description: "Developed reusable, isolated components to maintain clean separation of concerns and enable easier maintenance." 
        },
        { 
          title: "Mobile-First Design", 
          description: "Started with mobile layouts and progressively enhanced the experience for larger screens." 
        },
        { 
          title: "Progressive Enhancement", 
          description: "Implemented core functionality first, then layered in animations and advanced features." 
        },
        {
          title: "User Experience Focus",
          description: "Continuously refined interactions to ensure intuitive navigation and satisfying feedback on user actions."
        }
      ],
      results: [
        { value: "100%", label: "Lighthouse accessibility score" },
        { value: "95+", label: "Performance score" },
        { value: "60%", label: "Reduction in bounce rate compared to previous portfolio" },
        { value: "2x", label: "Increase in time spent on site" }
      ]
    },
    {
      id: 1,
      title: "SERV Sfera Auto",
      description: "A comprehensive web app for auto workshop management with secure authentication and role-based access control",
      overview: "SERV Sfera Auto is a comprehensive web application designed to streamline the daily operations of auto workshop owners and their customers. The platform provides tools for appointment scheduling, service tracking, inventory management, and customer communication. The system features secure authentication and role-based access control to protect sensitive business and customer data.",
      problem: "Auto workshop owners faced challenges with manual booking systems, difficulty tracking service history, and inefficient inventory management, leading to lost revenue and customer dissatisfaction.",
      solution: "We developed a centralized platform that digitizes all aspects of workshop management, allowing owners to track appointments, manage inventory, and communicate with customers through a single interface.",
      outcome: "The application resulted in a 35% reduction in administrative tasks, 28% improvement in customer satisfaction, and an average 15% increase in revenue for workshop owners through better inventory management and appointment scheduling.",
      tags: ["ReactJS", "Firebase", "Bootstrap", "Cloudfunction"],
      techStack: ["ReactJS", "Firebase", "Bootstrap", "Cloudfunction"],
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "Firebase", icon: <FaFire /> },
        { name: "Bootstrap", icon: <FaBootstrap /> },
        { name: "Cloud Functions", icon: <FaNodeJs /> }
      ],
      image: "/SferaAuto.PNG",
      liveUrl: "https://business.sfera.ai",
      timeline: "6 months",
      role: "Frontend Developer",
      client: "Sfera Auto",
      screenshots: [
        {
          path: "/SferaAuto.PNG",
          caption: "Secure login interface with email authentication and brand identity"
        },
        { 
          path: "/serv1.png", 
          caption: "Dashboard with quick access links and QR code for customer requests" 
        },
        { 
          path: "/serv2.png", 
          caption: "Subscription management with tiered pricing plans" 
        },
        { 
          path: "/serv3.png", 
          caption: "Staff management and access control interface" 
        }
      ],
      features: [
        "Secure authentication system with email/password login",
        "Password recovery and account management features",
        "Remember me functionality for improved user experience",
        "User dashboard with quick-start tutorial links and onboarding",
        "Tiered subscription model (Free, Basic, Pro) with different feature sets",
        "Staff access management and role-based permissions",
        "Customer and vehicle management module",
        "Appointment scheduling and tracking",
        "Service quoting and invoicing",
        "QR code generation for customer interactions",
        "Multi-workshop/outlet support for larger businesses",
        "Comprehensive reporting system"
      ],
      challenges: [
        "Integration with multiple third-party automotive systems",
        "Real-time inventory tracking across multiple locations",
        "Implementing a secure payment processing system",
        "Building a scalable role-based access control system",
        "Creating an intuitive UI for users with varying technical abilities"
      ],
      approach: [
        { 
          title: "User Research & Requirements", 
          description: "Conducted interviews with 15 workshop owners to understand pain points and essential features needed." 
        },
        { 
          title: "System Architecture", 
          description: "Designed a Firebase-based architecture to ensure real-time data synchronization across user devices." 
        },
        { 
          title: "Development & Testing", 
          description: "Implemented core features iteratively, with continuous feedback from real workshop owners." 
        },
        {
          title: "Subscription Model",
          description: "Created tiered pricing plans to accommodate workshops of different sizes and needs, from free for startups to premium for multi-branch operations."
        }
      ],
      results: [
        { value: "35%", label: "Reduction in administrative tasks" },
        { value: "28%", label: "Improvement in customer satisfaction" },
        { value: "15%", label: "Average increase in workshop revenue" },
        { value: "50+", label: "Active workshop businesses" }
      ]
    },
    {
      id: 2,
      title: "Stripe Payment Server",
      description: "Back-end API for the payment system to integrate the payment of our various apps with the Stripe payment system.",
      overview: "A centralized payment processing server that integrates multiple company applications with Stripe, handling transactions, subscriptions, and payment analytics in a secure environment.",
      problem: "The company had multiple applications each with their own payment implementation, leading to inconsistent user experiences, security concerns, and difficulty in financial reporting.",
      solution: "We created a unified payment API that interfaces with Stripe, allowing all company applications to process payments through a single, secure channel with consistent behavior and centralized reporting.",
      outcome: "The system has processed over $2M in transactions with 99.9% uptime, reduced payment-related customer support tickets by 64%, and simplified financial reconciliation processes.",
      tags: ["ExpressJS", "NodeJS", "MongoDB", "API", "Payment"],
      techStack: ["ExpressJS", "NodeJS", "MongoDB"],
      technologies: [
        { name: "Express", icon: <SiExpress /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "MongoDB", icon: <SiMongodb /> }
      ],
      image: "/project-2.jpg",
      timeline: "3 months",
      role: "Backend Developer",
      client: "Internal Project",
      challenges: [
        "Ensuring PCI compliance across all payment flows",
        "Handling multi-currency transactions",
        "Creating robust error handling for failed payments"
      ],
      approach: [
        { 
          title: "Security First Design", 
          description: "Implemented security best practices including encryption, tokenization, and audit logging from the beginning." 
        },
        { 
          title: "API Design", 
          description: "Created a flexible, well-documented API that could support various payment scenarios across different applications." 
        },
        { 
          title: "Monitoring & Analytics", 
          description: "Integrated comprehensive logging and monitoring to track system health and transaction patterns." 
        }
      ],
      results: [
        { value: "$2M+", label: "Transactions processed" },
        { value: "99.9%", label: "System uptime" },
        { value: "64%", label: "Reduction in payment support tickets" }
      ]
    },
    {
      id: 3,
      title: "Autonomous Vehicle Dashboard",
      description: "Tasked with developing the dashboard for displaying data that was pulled from our autonomous vehicle",
      overview: "A real-time monitoring dashboard for autonomous vehicle data, providing engineers and operators with critical insights into vehicle performance, sensor readings, and system health.",
      problem: "Engineers needed a way to visualize and analyze complex data streams from autonomous vehicles during testing, with the ability to spot anomalies and issues in real-time.",
      solution: "We developed a responsive dashboard that processes and visualizes telemetry data from multiple vehicle sensors, with customizable views and alert systems for critical parameters.",
      outcome: "The dashboard reduced issue detection time by 73%, improved debugging efficiency by 45%, and became an essential tool for the autonomous vehicle development team.",
      tags: ["ReactJS", "Data Visualization", "Real-time", "Autonomous"],
      techStack: ["ReactJS"],
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "WebSockets", icon: <SiJavascript /> },
        { name: "D3.js", icon: <BiCodeAlt /> }
      ],
      image: "/project-3.jpg",
      timeline: "4 months",
      role: "Frontend Developer",
      client: "Automotive R&D Department",
      challenges: [
        "Processing and visualizing high-volume data streams",
        "Creating an intuitive interface for complex technical data",
        "Ensuring low-latency updates for critical metrics"
      ],
      approach: [
        { 
          title: "Performance Optimization", 
          description: "Implemented efficient rendering techniques to handle continuous data updates without UI lag." 
        },
        { 
          title: "UX Research", 
          description: "Worked directly with vehicle engineers to design information displays that matched their mental models and workflows." 
        },
        { 
          title: "Modular Architecture", 
          description: "Built a component-based system that allowed for easy customization of dashboard layouts and metrics." 
        }
      ],
      results: [
        { value: "73%", label: "Reduction in issue detection time" },
        { value: "45%", label: "Improvement in debugging efficiency" },
        { value: "98%", label: "Engineer satisfaction rating" }
      ]
    },
    {
      id: 4,
      title: "Forklift Management System Integration",
      description: "Project scope is to integrate data from our system to client old system",
      overview: "A middleware solution that bridges modern cloud-based forklift management software with a client's legacy warehouse management system, enabling seamless data flow and operation.",
      problem: "The client needed to maintain their existing warehouse management system while integrating new smart forklifts that used a modern cloud platform, creating a significant technology gap.",
      solution: "We developed a custom integration layer that translates data bidirectionally between systems, allowing the client to leverage new forklift capabilities without replacing their core infrastructure.",
      outcome: "The integration increased warehouse efficiency by 22%, provided previously unavailable analytics on forklift utilization, and extended the useful life of the client's existing systems.",
      tags: ["React", "Firebase", "Integration", "Middleware"],
      techStack: ["React", "Firebase"],
      technologies: [
        { name: "React", icon: <FaReact /> },
        { name: "Firebase", icon: <FaFire /> },
        { name: "REST APIs", icon: <BiCodeAlt /> }
      ],
      image: "/project-4.jpg",
      timeline: "5 months",
      role: "Integration Specialist",
      client: "Manufacturing Company",
      challenges: [
        "Understanding and mapping data between disparate systems",
        "Managing real-time updates with an older batch-oriented system",
        "Ensuring data integrity across platforms"
      ],
      approach: [
        { 
          title: "Legacy System Analysis", 
          description: "Conducted a thorough assessment of the existing system's architecture, data formats, and API capabilities." 
        },
        { 
          title: "Data Mapping & Transformation", 
          description: "Created detailed mappings between systems and built transformation logic to ensure compatibility." 
        },
        { 
          title: "Reliability Engineering", 
          description: "Implemented robust error handling, retry mechanisms, and data validation to ensure system resilience." 
        }
      ],
      results: [
        { value: "22%", label: "Increase in warehouse efficiency" },
        { value: "100%", label: "Data accuracy between systems" },
        { value: "5+ years", label: "Extended life of legacy system" }
      ]
    },
    {
      id: 5,
      title: "MicroFrontend Analytics Module",
      description: "Developed a dynamic dashboard module for an analytics and monitoring system.",
      overview: "A standalone analytics module built using micro-frontend architecture that integrates into a larger enterprise monitoring system, providing customizable data visualization and reporting capabilities.",
      problem: "The company needed a flexible analytics solution that could be integrated into their existing monitoring platform without requiring a complete rebuild of the system.",
      solution: "We developed a self-contained micro-frontend module using React and Typescript that communicates through a well-defined API, allowing it to be embedded in the main application while maintaining independent deployment.",
      outcome: "The module has been successfully integrated across 3 different internal applications, reduced report generation time by 87%, and allowed non-technical users to create custom analytics dashboards.",
      tags: ["Typescript", "TailwindCSS", "ReactJS", "CubeJS", "Vite", "NodeJS", "MicroFrontend"],
      techStack: ["Typescript", "TailwindCSS", "ReactJS", "CubeJS", "Vite", "NodeJS"],
      technologies: [
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "React", icon: <FaReact /> },
        { name: "TailwindCSS", icon: <SiTailwindcss /> },
        { name: "CubeJS", icon: <BiCodeAlt /> },
        { name: "Vite", icon: <SiVite /> },
        { name: "Node.js", icon: <FaNodeJs /> }
      ],
      image: "/project-5.jpg",
      timeline: "7 months",
      role: "Frontend Developer",
      client: "Internal Product Team",
      challenges: [
        "Ensuring seamless visual integration with host applications",
        "Managing state and authentication across application boundaries",
        "Creating a flexible API that could accommodate different data sources"
      ],
      approach: [
        { 
          title: "Architecture Design", 
          description: "Adopted a micro-frontend approach with clear boundaries and interfaces to ensure module independence." 
        },
        { 
          title: "Component Library", 
          description: "Built a reusable component library with TailwindCSS that could adapt to different visual themes." 
        },
        { 
          title: "Performance Optimization", 
          description: "Used advanced React patterns and memoization techniques to handle large datasets efficiently." 
        }
      ],
      results: [
        { value: "3", label: "Applications successfully integrated" },
        { value: "87%", label: "Reduction in report generation time" },
        { value: "65+", label: "Custom dashboards created by users" }
      ]
    },
    {
      id: 6,
      title: "A Simple Math Quiz Website",
      description: "A simple math quiz website that allows users to answer math questions and see their result.",
      overview: "An interactive math quiz application designed to help users practice basic arithmetic skills in an engaging format, with instant feedback and score tracking.",
      problem: "Many existing math practice tools are either too complex for beginners or lack engaging elements to maintain user interest, particularly for younger students.",
      solution: "We created a straightforward yet visually appealing quiz application that focuses on fundamental math operations with progressive difficulty levels and immediate feedback.",
      outcome: "The application has been used by over 500 students, with an average session length of 15 minutes and a 70% completion rate for quiz sets.",
      tags: ["HTML", "CSS", "JavaScript", "Education"],
      techStack: ["HTML", "CSS", "JavaScript"],
      technologies: [
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "CSS", icon: <SiCss3 /> },
        { name: "JavaScript", icon: <SiJavascript /> }
      ],
      image: "/math.png",
      liveUrl: "https://test-bridge-seven.vercel.app/",
      repoUrl: "https://github.com/abdulmuhaimin-work/test-bridge",
      timeline: "1 weeks",
      role: "Developer",
      client: "Personal Project",
      challenges: [
        // "Creating dynamically generated math problems of appropriate difficulty",
        "Designing a user interface suitable for younger users",
        "Implementing reliable score tracking without a backend"
      ],
      approach: [
        { 
          title: "Responsive Design", 
          description: "Created a mobile-first interface that works well on all devices, including tablets used in educational settings." 
        },
        { 
          title: "Local Storage", 
          description: "Implemented browser local storage to maintain user progress and scores between sessions." 
        }
      ],
      results: [
      ]
    },
    {
      id: 7,
      title: "Sanatoria",
      description: "A horror game developed in Unity during a 1-month game jam at REKA.",
      overview: "Sanatoria is an atmospheric horror game that immerses players in a tense, psychological experience. Developed during a one-month game jam at REKA, the game demonstrates rapid prototyping, 3D environment design, and gameplay mechanics that create suspense and fear.",
      problem: "Creating an engaging horror experience requires carefully balanced gameplay mechanics, atmospheric sound design, and visual elements that work together to create tension without frustrating players.",
      solution: "We focused on creating a psychologically tense atmosphere through strategic lighting, immersive sound design, and unpredictable enemy AI rather than relying solely on jump scares.",
      outcome: "The game was successfully completed within the one-month time constraint and received positive feedback from game jam judges and players for its atmosphere and tension-building mechanics.",
      tags: ["Unity", "C#", "3D", "Game Development", "Horror"],
      techStack: ["Unity", "C#"],
      technologies: [
        { name: "Unity", icon: <BiCodeAlt /> },
        { name: "C#", icon: <BiCodeAlt /> }
      ],
      image: "/sanatoria.jpg",
      timeline: "1 month",
      role: "Game Developer",
      client: "Game Jam Project",
      challenges: [
        "Creating a compelling horror atmosphere with limited development time",
        "Balancing game difficulty to maintain tension without frustrating players",
        "Optimizing 3D environments and lighting for performance"
      ],
      approach: [
        { 
          title: "Rapid Prototyping", 
          description: "Used an iterative development approach to quickly test and refine game mechanics within the time constraints of the game jam." 
        },
        { 
          title: "Atmospheric Design", 
          description: "Focused on creating an immersive environment through strategic lighting, sound design, and environmental storytelling." 
        },
        { 
          title: "Playtesting", 
          description: "Conducted regular playtesting sessions to refine the horror experience and ensure game mechanics were intuitive." 
        }
      ],
      results: [
        { value: "1 month", label: "Development time" },
        { value: "Complete", label: "Game jam submission" }
      ],
      liveUrl: "https://drive.google.com/drive/folders/1Snn7Z5bUt7SyO0eUhI5uYKJAvqQQbMm5?usp=sharing",
    }
  ];

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
        {!selectedProject && layouts && (
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
                    loading={loading}
                    onSelect={handleProjectSelect}
                    getIcon={getIcon}
                  />
                </div>
              ))}
            </ResponsiveGridLayout>
          </>
        )}
      </div>
    </div>
  );
}

export default Portfolio; 
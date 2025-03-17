import { FaBriefcase, FaGraduationCap, FaLanguage } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { HiCalendar } from 'react-icons/hi';
import InteractiveTimeline from '../components/InteractiveTimeline';
import SkillsChart from '../components/SkillsChart';

function About() {
  // Work experience data for the timeline
  const workExperiences = [
    {
      period: "August 2024 – Present",
      title: "Consultant, Full Stack Developer",
      company: "Bestinet Sdn Bhd, Kuala Lumpur",
      description: "Developed and maintained web applications using NextJS, Typescript and TailwindCSS. Implemented integration with microservices API. Planned and implemented new features and improvements. Automated build, test and deployment of pipelines using Gitlab and Jenkins.",
      technologies: ["NextJS", "TypeScript", "TailwindCSS", "GitLab", "Jenkins"]
    },
    {
      period: "August 2023 – August 2024",
      title: "Mid-level Developer",
      company: "Nematix Sdn Bhd, Seri Kembangan",
      description: "Built responsive web applications using Typescript and React. Collaborated with designers to implement user-friendly interfaces. Developed Interactive Data Visualization dashboards using React Charts and CubeJS. Implemented GIS related features using Google Maps API and Kinetica.",
      technologies: ["React", "TypeScript", "CubeJS", "Google Maps API", "Kinetica", "Supertokens", "Supabase"]
    },
    {
      period: "September 2021 – August 2023",
      title: "Front End Developer",
      company: "REKA Inisiatif Sdn Bhd, Kuala Lumpur",
      description: "Developed and maintained web applications using ReactJS and Bootstrap. Implemented authentication and authorization using Firebase Auth. Developed and maintained RESTful APIs using Firebase Cloud Functions. Developed backend services using NodeJS and Express.",
      technologies: ["React", "Bootstrap", "Firebase", "NodeJS", "Express", "Stripe", "MongoDB"]
    },
    {
      period: "February 2020 – April 2020",
      title: "Software Developer",
      company: "Elm Lab Sdn Bhd, Beranang",
      description: "Heavily involved in the development of the landing page to onboard new users of the system. Developed the front end interface and integrated with RESTful API. Ensured deliverables and tasks were completed on time for project delivery date.",
      technologies: ["HTML", "CSS", "JavaScript", "RESTful API"]
    }
  ];

  // Skills data for the skills chart
  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "NextJS", level: 80, category: "Frontend" },
    { name: "TailwindCSS", level: 95, category: "Frontend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "HTML5/CSS3", level: 90, category: "Frontend" },
    { name: "NodeJS", level: 75, category: "Backend" },
    { name: "Express", level: 70, category: "Backend" },
    { name: "Firebase", level: 85, category: "Backend" },
    { name: "MongoDB", level: 65, category: "Backend" },
    { name: "Supabase", level: 75, category: "Backend" },
    { name: "Git", level: 85, category: "Tools" },
    { name: "GitLab CI/CD", level: 70, category: "Tools" },
    { name: "Jenkins", level: 60, category: "Tools" },
    { name: "Figma", level: 65, category: "Design" }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <section className="mb-16 fade-in">
          <h1 className="text-4xl font-bold text-center mb-6 dark:text-white">About Me</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400 text-center">
            Dynamic Front-end Developer with 4 years of comprehensive experience in web application development, excelling in both front-end and back-end technologies. Proficient in creating responsive user interfaces and integrating complex APIs, ensuring seamless functionality and enhanced user experience.
          </p>
        </section>

        <section className="mb-16 slide-up">
          <div className="flex items-center gap-3 mb-8">
            <FaBriefcase className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Work Experience</h2>
          </div>
          
          {/* Interactive Timeline Component */}
          <InteractiveTimeline experiences={workExperiences} />
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <FaBriefcase className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Technical Skills</h2>
          </div>
          
          {/* Skills Chart Component */}
          <SkillsChart skills={skills} />
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <FaGraduationCap className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Education</h2>
          </div>
          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold dark:text-white">Bachelors Degree in Mechanical Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400">Universiti Teknologi Petronas, Perak, Malaysia</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">January 2009 – January 2014</span>
            </div>
          </div>
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <FaLanguage className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Languages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg dark:text-white">Bahasa Melayu</span>
                <span className="text-primary dark:text-blue-400">★★★★★</span>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg dark:text-white">English</span>
                <span className="text-primary dark:text-blue-400">★★★★☆</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default About; 
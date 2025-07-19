import { FaBriefcase, FaGraduationCap, FaLanguage } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { HiCalendar } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import InteractiveTimeline from '../components/InteractiveTimeline';
import SkillsChart from '../components/SkillsChart';
import { resumeData, fetchWorkExperiencesData } from '../data/resumeData';

function About() {
  const [workExperiences, setWorkExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkExperiences = async () => {
      try {
        const experiences = await fetchWorkExperiencesData();
        setWorkExperiences(experiences);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkExperiences();
  }, []);
  // Skills data for the skills chart with proficiency levels
  const skillsWithLevels = [
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
            {resumeData.summary}
          </p>
        </section>

        <section className="mb-16 slide-up">
          <div className="flex items-center gap-3 mb-8">
            <FaBriefcase className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Work Experience</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary dark:border-blue-400 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading work experiences...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400">Error loading work experiences: {error}</p>
            </div>
          ) : (
            <InteractiveTimeline experiences={workExperiences} />
          )}
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <FaBriefcase className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Technical Skills</h2>
          </div>
          
          {/* Skills Chart Component */}
          <SkillsChart skills={skillsWithLevels} />
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <FaGraduationCap className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Education</h2>
          </div>
          <div className="card p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold dark:text-white">{resumeData.education.degree}</h3>
                <p className="text-gray-600 dark:text-gray-400">{resumeData.education.institution}</p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{resumeData.education.period}</span>
            </div>
          </div>
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center gap-3 mb-8">
            <FaLanguage className="text-2xl text-primary dark:text-blue-400" />
            <h2 className="text-3xl font-bold dark:text-white">Languages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeData.languages.map((language, index) => (
              <div key={index} className="card p-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg dark:text-white">{language.name}</span>
                  <span className="text-primary dark:text-blue-400">
                    {language.level === 'Native' ? '★★★★★' : '★★★★☆'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
export default About; 
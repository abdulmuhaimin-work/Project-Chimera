import { FaBriefcase, FaGraduationCap, FaLanguage } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { HiCalendar } from 'react-icons/hi';

function About() {
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
          <div className="space-y-8">
            {[
              {
                title: "Consultant, Full Stack Developer",
                company: "Bestinet Sdn Bhd, Kuala Lumpur",
                period: "August 2024 – Present",
                duties: [
                  "Developed and maintained web applications using NextJS, Typescript and TailwindCSS",
                  "Implemented integration with microservices API",
                  "Planned and implemented new features and improvements",
                  "Automate build, test and deployment of pipelines using Gitlab and Jenkins"
                ]
              },
              {
                title: "Mid-level Developer",
                company: "Nematix Sdn Bhd, Seri Kembangan",
                period: "August 2023 – August 2024",
                duties: [
                  "Built responsive web applications using Typescript and React",
                  "Collaborated with designers to implement user-friendly interfaces",
                  "Develop Interactive Data Visualization dashboards using React Charts and CubeJS",
                  "Implemented GIS related features using Google Maps API and Kinetica",
                  "Achieved at least 2 hours of development time saving per module by developing scripts to automate boilerplate tasks",
                  "Implemented authentication and authorization using Supertokens and Supabase Auth",
                  "Participated in daily stand-ups and sprint planning meetings"
                ]
              },
              {
                title: "Front End Developer",
                company: "REKA Inisiatif Sdn Bhd, Kuala Lumpur",
                period: "September 2021 – August 2023",
                duties: [
                  "Developed and maintained web applications using ReactJS and Bootstrap",
                  "Implemented authentication and authorization using Firebase Auth",
                  "Developed and maintained RESTful APIs using Firebase Cloud Functions",
                  "Developed backend services using NodeJS and Express",
                  "Implemented payment processing using Stripe",
                  "Implemented database using Firebase and MongoDB"
                ]
              },
              {
                title: "Software Developer",
                company: "Elm Lab Sdn Bhd, Beranang",
                period: "February 2020 – April 2020",
                duties: [
                  "Heavily involved in the development of the landing page to onboard new users of the system",
                  "Develop the front end interface and integrate with RESTful API",
                  "Ensure deliverables and tasks were completed on time for project delivery date"
                ]
              }

              
            ].map((exp, index) => (
              <div 
                key={exp.title}
                className="card p-6 transform transition-all duration-500"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BsBuilding className="text-gray-600 dark:text-gray-400" />
                      <h3 className="text-xl font-semibold dark:text-white">{exp.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <HiCalendar />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                  {exp.duties.map((duty, i) => (
                    <li key={i}>{duty}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 slide-up" style={{ animationDelay: '400ms' }}>
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

        <section className="mb-16 slide-up" style={{ animationDelay: '600ms' }}>
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
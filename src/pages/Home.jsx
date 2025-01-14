import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen pt-20 dark:bg-gray-900">
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 fade-in">
        <h1 className="text-5xl font-bold mb-4 dark:text-white">Abdul Muhaimin</h1>
        <h2 className="text-2xl text-secondary dark:text-gray-300 mb-6">Full Stack Developer</h2>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-8">
          Dynamic Front-end Developer with 4 years of comprehensive experience in web application development, excelling in both front-end and back-end technologies.
        </p>
        <div className="flex gap-4">
          <Link to="/portfolio" className="btn primary">View My Work</Link>
          <Link to="/contact" className="btn secondary">Contact Me</Link>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white slide-up">Technical Skills</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Frontend",
              skills: ['HTML5', 'JavaScript', 'TypeScript', 'ReactJS', 'CSS']
            },
            {
              title: "Backend",
              skills: ['Node.js', 'ExpressJS', 'Elixir', 'Erlang', 'Ruby']
            },
            {
              title: "Tools & Platforms",
              skills: ['Firebase', 'Git', 'MongoDB', 'Supabase']
            }
          ].map((category, index) => (
            <div 
              key={category.title}
              className="card p-6 slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4 dark:text-white">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-gray-600 dark:text-gray-400">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home; 
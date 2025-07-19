import { FaGlobe, FaLinkedin, FaGithub, FaGitlab, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import GitHubActivity from '../components/GitHubActivity';
import { resumeData } from '../data/resumeData';

function Contact() {
  const iconComponents = {
    FaGlobe: <FaGlobe />,
    FaLinkedin: <FaLinkedin />,
    FaGithub: <FaGithub />,
    FaGitlab: <FaGitlab />
  };

  const socialLinksWithIcons = resumeData.socialLinks.map(link => ({
    ...link,
    icon: iconComponents[link.icon] || <FaGlobe />
  }));

  return (
    <div className="min-h-screen pt-20 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 dark:text-white fade-in">Get In Touch</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 dark:text-white slide-up">Contact Information</h2>
            <div className="grid gap-6 mb-8">
              {socialLinksWithIcons.map((link, index) => (
                <a 
                  key={link.url}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="card flex items-center gap-3 p-4 hover:shadow-md transition-all duration-300 slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-xl text-primary dark:text-blue-400">
                    {link.icon}
                  </span>
                  <span className="text-lg dark:text-white">{link.name}</span>
                </a>
              ))}
            </div>
            <div className="card p-6 space-y-4 slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-3">
                <FaPhone className="text-xl text-primary dark:text-blue-400" />
                <p className="text-lg dark:text-white">{resumeData.personalInfo.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-xl text-primary dark:text-blue-400" />
                <p className="text-lg dark:text-white">{resumeData.personalInfo.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6 dark:text-white slide-up" style={{ animationDelay: '200ms' }}>
              Send a Message
            </h2>
            <form className="card p-6 flex-grow slide-up" style={{ animationDelay: '300ms' }}>
              <div className="grid gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-blue-400/50"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn primary w-full"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <section className="mb-16 slide-up" style={{ animationDelay: '500ms' }}>
          <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">My GitHub Activity</h2>
          <GitHubActivity username="abdulmuhaimin-work" repoLimit={4} />
        </section>
      </div>
    </div>
  );
}

export default Contact; 
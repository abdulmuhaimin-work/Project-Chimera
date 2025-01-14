import { FaGlobe, FaLinkedin, FaGithub, FaGitlab, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const socialLinks = [
    {
      icon: <FaGlobe />,
      text: "Personal Website",
      url: "https://abdulmuhaimin.my/",
    },
    {
      icon: <FaLinkedin />,
      text: "LinkedIn",
      url: "https://www.linkedin.com/in/abdul-muhaimin-md-shahid/",
    },
    {
      icon: <FaGithub />,
      text: "GitHub",
      url: "https://github.com/abdulmuhaimin-work",
    },
    {
      icon: <FaGitlab />,
      text: "GitLab",
      url: "https://gitlab.com/abdulmuhaimin-work",
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 dark:text-white fade-in">Get In Touch</h1>
        <div className="grid gap-8 mb-12">
          {socialLinks.map((link, index) => (
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
              <span className="text-lg dark:text-white">{link.text}</span>
            </a>
          ))}
        </div>
        <div className="card p-6 space-y-4 slide-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3">
            <FaPhone className="text-xl text-primary dark:text-blue-400" />
            <p className="text-lg dark:text-white">+60135932043</p>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-xl text-primary dark:text-blue-400" />
            <p className="text-lg dark:text-white">Semenyih, Malaysia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 
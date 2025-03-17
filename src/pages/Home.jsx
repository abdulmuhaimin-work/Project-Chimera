import { Link } from 'react-router-dom';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import SkillsChart from '../components/SkillsChart';

function Home() {
  // Sample testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Project Manager at TechCorp",
      quote: "Abdul delivered our project ahead of schedule and exceeded our expectations. His technical expertise and ability to translate complex requirements into elegant solutions is remarkable.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Michael Chen",
      title: "CEO of StartupX",
      quote: "Working with Abdul was a game-changer for our startup. He quickly understood our vision and built a platform that our users love. His attention to detail and focus on performance made all the difference.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/91.jpg"
    },
    {
      name: "Priya Patel",
      title: "UI/UX Designer",
      quote: "As a designer, I appreciate developers who can bring my designs to life exactly as envisioned. Abdul did that and more, suggesting improvements that enhanced the user experience while maintaining the design integrity.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  // Sample skills data with more detailed information
  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "TailwindCSS", level: 95, category: "Frontend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 92, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Express", level: 75, category: "Backend" },
    { name: "Firebase", level: 85, category: "Backend" },
    { name: "MongoDB", level: 70, category: "Backend" },
    { name: "Git", level: 88, category: "Tools" },
    { name: "CI/CD", level: 65, category: "Tools" }
  ];

  return (
    <div className="min-h-screen pt-20 dark:bg-gray-900">
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 fade-in">
        <h1 className="text-5xl font-bold mb-4 dark:text-white">Abdul Muhaimin</h1>
        <h2 className="text-2xl text-secondary dark:text-gray-300 mb-6">Full Stack Developer</h2>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-8">
          Dynamic Full Stack Developer with 4 years of comprehensive experience in web application development, excelling in creating responsive user interfaces and integrating complex APIs.
        </p>
        <div className="flex gap-4">
          <Link to="/portfolio" className="btn primary">View My Work</Link>
          <Link to="/contact" className="btn secondary">Contact Me</Link>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <h2 className="section-title text-center mx-auto mb-12">Technical Skills</h2>
        <SkillsChart skills={skills} />
      </section>

      <section className="py-16 px-4">
        <h2 className="section-title text-center mx-auto mb-12">What Clients Say</h2>
        <TestimonialsCarousel testimonials={testimonials} />
      </section>
      
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 to-tertiary/10 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to Start Your Next Project?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            I'm currently available for freelance work and full-time opportunities. 
            Let's build something amazing together!
          </p>
          <Link to="/contact" className="btn primary">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}

export default Home; 
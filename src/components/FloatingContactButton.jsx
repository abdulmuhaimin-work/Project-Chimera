import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiX } from 'react-icons/hi';

function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Social links that appear when button is clicked */}
      <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <a 
          href="mailto:yourname@example.com" 
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-primary dark:text-blue-400"
          aria-label="Email me"
        >
          <HiOutlineMail size={24} />
        </a>
        <Link 
          to="/contact" 
          className="bg-primary dark:bg-blue-600 text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          Contact Me
        </Link>
      </div>

      {/* Main floating button */}
      <button
        onClick={toggleOpen}
        className={`bg-primary dark:bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-transform hover:scale-105 focus:outline-none`}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        {isOpen ? <HiX size={24} /> : <HiOutlineMail size={24} />}
      </button>
    </div>
  );
}

export default FloatingContactButton; 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import ResumeDownload from './ResumeDownload';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-20">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-primary dark:text-white">
            <Link to="/">Abdul Muhaimin</Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6 items-center">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
            <ResumeDownload />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <div 
        className={`md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 right-0 top-[72px] bg-white dark:bg-gray-900 shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/portfolio" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            to="/blog" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
        <div className="px-5 pb-3 space-y-3">
          <ResumeDownload />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 
import { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { openResumeWindow } from '../utils/resumeGenerator';

function FloatingResumeButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div
        className={`transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } mb-3`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            📄 Download my professional resume
          </p>
        </div>
      </div>
      
      <button
        onClick={openResumeWindow}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800"
        aria-label="Download Resume"
      >
        <FaFilePdf size={24} />
      </button>
    </div>
  );
}

export default FloatingResumeButton; 
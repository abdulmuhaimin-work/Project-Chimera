import { FaFilePdf } from 'react-icons/fa';
import { openResumeWindow } from '../utils/resumeGenerator';

function ResumeDownload() {

  return (
    <button
      onClick={openResumeWindow}
      className="flex items-center gap-2 bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
      aria-label="Download Resume"
    >
      <FaFilePdf className="text-sm" />
      Download Resume
    </button>
  );
}

export default ResumeDownload; 
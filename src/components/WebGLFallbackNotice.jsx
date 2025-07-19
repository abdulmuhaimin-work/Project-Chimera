import { useState } from 'react';
import { FaCube, FaTimes } from 'react-icons/fa';

function WebGLFallbackNotice({ message, onDismiss }) {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  if (isDismissed) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <FaCube className="text-blue-600 dark:text-blue-400 text-xl mt-0.5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              3D Experience Unavailable
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              {message || "Your system doesn't support WebGL or 3D graphics. Don't worry - you can still view all the same content in our optimized 2D layout!"}
            </p>
            <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">
              <strong>Tip:</strong> Try updating your graphics drivers or using a different browser if you'd like to experience the 3D version.
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-blue-400 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-300 transition-colors"
            aria-label="Dismiss notification"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WebGLFallbackNotice; 
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`transition-opacity duration-300 min-h-screen ${
        transitionStage === 'fadeIn' ? 'animate-[fadeIn_0.5s_ease-out_forwards]' : 'animate-[fadeOut_0.3s_ease-out_forwards]'
      }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
}

export default PageTransition; 
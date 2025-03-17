import { useEffect, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
    };

    const mUp = () => {
      setClicked(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, .btn, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    window.addEventListener('mousemove', mMove);
    window.addEventListener('mouseout', mLeave);
    window.addEventListener('mousedown', mDown);
    window.addEventListener('mouseup', mUp);
    
    // Add event listeners for links after a short delay to ensure DOM is ready
    setTimeout(handleLinkHoverEvents, 1000);

    return () => {
      window.removeEventListener('mousemove', mMove);
      window.removeEventListener('mouseout', mLeave);
      window.removeEventListener('mousedown', mDown);
      window.removeEventListener('mouseup', mUp);
    };
  }, []);

  const cursorClasses = `
    fixed pointer-events-none z-50 transition-transform duration-150
    mix-blend-difference
    ${hidden ? 'opacity-0' : 'opacity-100'}
    ${clicked ? 'scale-75' : ''}
    ${linkHovered ? 'scale-150' : ''}
  `;

  return (
    <>
      <div 
        className={`${cursorClasses} w-8 h-8 rounded-full bg-white`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      />
      <div 
        className={`${cursorClasses} w-1.5 h-1.5 rounded-full bg-white`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
}

export default CustomCursor; 
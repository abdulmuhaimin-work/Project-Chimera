import React, { useState, useEffect } from 'react';
import About3D from './About3D';
import About from './About';
import WebGLFallbackNotice from '../components/WebGLFallbackNotice';
import { isWebGLAvailable, getWebGLErrorInfo } from '../utils/webglDetection';

function AboutWrapper() {
  const [webglSupported, setWebglSupported] = useState(null);
  const [showFallback, setShowFallback] = useState(false);
  const [webglError, setWebglError] = useState('');

  useEffect(() => {
    // Check WebGL availability
    const checkWebGL = () => {
      const supported = isWebGLAvailable();
      const errorInfo = getWebGLErrorInfo();
      
      console.log('WebGL Detection:', errorInfo);
      setWebglSupported(supported);
      setWebglError(errorInfo);
    };

    checkWebGL();
  }, []);

  // Handle 3D scene errors
  const handle3DError = () => {
    console.warn('3D scene failed to load, falling back to 2D About page');
    setShowFallback(true);
  };

  // Loading state while checking WebGL
  if (webglSupported === null) {
    return (
      <div className="min-h-screen pt-20 px-4 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking system compatibility...</p>
        </div>
      </div>
    );
  }

  // Show fallback if WebGL not supported or if 3D scene failed
  if (!webglSupported || showFallback) {
    return (
      <div>
        {!webglSupported && (
          <WebGLFallbackNotice message={webglError} />
        )}
        <About />
      </div>
    );
  }

  // Try to render 3D version with error boundary
  return (
    <ErrorBoundary fallback={<About />} onError={handle3DError}>
      <About3D />
    </ErrorBoundary>
  );
}

// Simple Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D About component error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default AboutWrapper; 
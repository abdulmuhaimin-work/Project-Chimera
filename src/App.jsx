import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import FloatingContactButton from './components/FloatingContactButton';
import PageTransition from './components/PageTransition';

// Lazy load heavy components for better code splitting
const Home = lazy(() => import('./pages/Home'));
const About3D = lazy(() => import('./pages/About3D'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component for better UX during code splitting
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-pulse"></div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app min-h-screen">
        {/* Always visible components */}
        <CustomCursor />
        <ParticleBackground />
        <ScrollProgress />
        <Navbar />
        <FloatingContactButton />
        
        {/* Main content with page transitions and lazy loading */}
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/about" element={
                <PageTransition>
                  <About3D />
                </PageTransition>
              } />
              <Route path="/portfolio" element={
                <PageTransition>
                  <Portfolio />
                </PageTransition>
              } />
              <Route path="/blog" element={
                <PageTransition>
                  <Blog />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              } />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutWrapper from './pages/AboutWrapper';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import FloatingContactButton from './components/FloatingContactButton';
import FloatingResumeButton from './components/FloatingResumeButton';
import PageTransition from './components/PageTransition';

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
        <FloatingResumeButton />
        
        {/* Main content with page transitions */}
        <main>
          <Routes>
            <Route path="/" element={
              <PageTransition>
                <Home />
              </PageTransition>
            } />
            <Route path="/about" element={
              <PageTransition>
                <AboutWrapper />
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
        </main>
      </div>
    </Router>
  );
}

export default App; 
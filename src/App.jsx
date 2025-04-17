import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About3D from './pages/About3D';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import FloatingContactButton from './components/FloatingContactButton';
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
        </main>
      </div>
    </Router>
  );
}

export default App; 
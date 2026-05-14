import React, { useCallback, useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Publications from './components/Publications/Publications';
import News from './components/News/News';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

const SECTION_ORDER = ['home', 'about', 'publications', 'experience', 'news', 'contact'];
const WHEEL_PAGE_COOLDOWN = 760;
const WHEEL_DELTA_THRESHOLD = 36;

function App() {
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');
  const activeSectionRef = useRef(activeSection);
  const contentPaneRef = useRef(null);
  const lastWheelPageChangeRef = useRef(0);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const nextTheme = themeMode === 'system'
        ? (mediaQuery.matches ? 'dark' : 'light')
        : themeMode;

      setResolvedTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('themeMode', themeMode);
    };

    applyTheme();
    mediaQuery.addEventListener('change', applyTheme);

    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [themeMode]);

  const handleThemeModeChange = (mode) => {
    setThemeMode(mode);
  };

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    activeSectionRef.current = section;

    contentPaneRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const scrollContainer = contentPaneRef.current;
    if (!scrollContainer) return undefined;

    const handleContentWheel = (event) => {
      if (Math.abs(event.deltaY) < WHEEL_DELTA_THRESHOLD) {
        return;
      }

      const now = Date.now();
      if (now - lastWheelPageChangeRef.current < WHEEL_PAGE_COOLDOWN) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = SECTION_ORDER.indexOf(activeSectionRef.current);
      const nextIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        SECTION_ORDER.length - 1
      );

      event.preventDefault();

      if (nextIndex === currentIndex) {
        lastWheelPageChangeRef.current = now;
        return;
      }

      lastWheelPageChangeRef.current = now;
      handleSectionChange(SECTION_ORDER[nextIndex]);
    };

    scrollContainer.addEventListener('wheel', handleContentWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleContentWheel);
    };
  }, [handleSectionChange]);

  const sectionPages = {
    home: <Hero />,
    about: <About />,
    publications: <Publications />,
    experience: <Experience />,
    news: <News />,
    contact: (
      <>
        <Contact />
        <Footer onSectionChange={handleSectionChange} />
      </>
    )
  };

  return (
    <Router>
      <div className="App">
        <div className="app-atmosphere" aria-hidden="true"></div>
        <div className="settings-window">
          <Header
            activeSection={activeSection}
            resolvedTheme={resolvedTheme}
            onSectionChange={handleSectionChange}
            onThemeModeChange={handleThemeModeChange}
            themeMode={themeMode}
          />
          <div className="content-pane" ref={contentPaneRef}>
            <main>
              <Routes>
                <Route path="/" element={
                  <div className="page-shell">
                    {sectionPages[activeSection]}
                  </div>
                } />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

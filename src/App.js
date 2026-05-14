import React, { useRef, useState, useEffect } from 'react';
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
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastWheelPageChangeRef = useRef(0);

  useEffect(() => {
    // 强制使用暗色模式
    setDarkMode(true);
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleDarkMode = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);

    const scrollContainer = document.querySelector('.content-pane');
    scrollContainer?.scrollTo({ top: 0, behavior: 'auto' });
  };

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
    const currentIndex = SECTION_ORDER.indexOf(activeSection);
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
            darkMode={darkMode}
            onSectionChange={handleSectionChange}
            toggleDarkMode={toggleDarkMode}
          />
          <div className="content-pane" onWheel={handleContentWheel}>
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

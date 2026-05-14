import React, { useState, useEffect } from 'react';
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

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
          <div className="content-pane">
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

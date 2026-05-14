import React, { useCallback, useRef, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
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
const SECTION_ROUTES = {
  home: '/profile',
  about: '/about',
  publications: '/publications',
  experience: '/experience',
  news: '/news',
  contact: '/contact'
};

const getSectionFromPathname = (pathname) => {
  if (pathname.startsWith('/papers/')) return 'publications';
  const matchedSection = SECTION_ORDER.find((section) => SECTION_ROUTES[section] === pathname);
  return matchedSection || 'home';
};

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem('themeMode') || 'system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');
  const contentPaneRef = useRef(null);
  const activeSection = getSectionFromPathname(location.pathname);

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
    navigate(SECTION_ROUTES[section] || SECTION_ROUTES.home);
  }, [navigate]);

  const handlePaperChange = useCallback((paperId) => {
    navigate(`/papers/${paperId}`);
  }, [navigate]);

  useEffect(() => {
    contentPaneRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const sectionPages = {
    home: <Hero />,
    about: <About />,
    publications: <Publications onPublicationSelect={handlePaperChange} />,
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
              <Route path="/" element={<Navigate to="/profile" replace />} />
              <Route path="/profile" element={<div className="page-shell">{sectionPages.home}</div>} />
              <Route path="/about" element={<div className="page-shell">{sectionPages.about}</div>} />
              <Route path="/publications" element={<div className="page-shell">{sectionPages.publications}</div>} />
              <Route path="/papers/:paperId" element={<PaperRoute onPublicationSelect={handlePaperChange} />} />
              <Route path="/experience" element={<div className="page-shell">{sectionPages.experience}</div>} />
              <Route path="/news" element={<div className="page-shell">{sectionPages.news}</div>} />
              <Route path="/contact" element={<div className="page-shell">{sectionPages.contact}</div>} />
              <Route path="*" element={<Navigate to="/profile" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function PaperRoute({ onPublicationSelect }) {
  const { paperId } = useParams();

  return (
    <div className="page-shell">
      <Publications
        selectedPublicationId={paperId}
        onPublicationSelect={onPublicationSelect}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;

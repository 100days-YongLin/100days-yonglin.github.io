import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiUser,
  FiInfo,
  FiBriefcase,
  FiBookOpen,
  FiBell,
  FiMail
} from 'react-icons/fi';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const getScrollContainer = () => document.querySelector('.content-pane');

    const handleScroll = () => {
      const scrollContainer = getScrollContainer();
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      const viewportTop = scrollContainer ? scrollContainer.getBoundingClientRect().top : 0;
      const viewportHeight = scrollContainer ? scrollContainer.clientHeight : window.innerHeight;

      setIsScrolled(scrollTop > 50);

      const sections = ['home', 'about', 'publications', 'experience', 'news', 'contact'];
      let currentSection;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportTop + 140 && rect.bottom > viewportTop + 140) {
          currentSection = section;
        }
      }

      if (currentSection) {
        setActiveSection(currentSection);
      } else if (
        scrollContainer &&
        scrollContainer.scrollTop + viewportHeight >= scrollContainer.scrollHeight - 4
      ) {
        setActiveSection('contact');
      }
    };

    handleScroll();
    const scrollContainer = getScrollContainer();
    scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Profile', href: '#home', icon: FiUser },
    { name: 'About', href: '#about', icon: FiInfo },
    { name: 'Publications', href: '#publications', icon: FiBookOpen },
    { name: 'Experience', href: '#experience', icon: FiBriefcase },
    { name: 'News', href: '#news', icon: FiBell },
    { name: 'Contact', href: '#contact', icon: FiMail }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    const scrollContainer = document.querySelector('.content-pane');

    if (element) {
      if (scrollContainer) {
        const top = scrollContainer.scrollTop + element.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top;
        scrollContainer.scrollTo({ top, behavior: 'smooth' });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }

      setActiveSection(href.slice(1));
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="sidebar-inner">
        <div className="header-content">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" onClick={() => scrollToSection('#home')}>
              <span className="logo-text">Yonglin Chen</span>
              <span className="logo-subtitle">HCI Researcher</span>
            </a>
          </motion.div>

          <nav className="desktop-nav">
            <ul>
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                  >
                    <item.icon />
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <span className="theme-label">{darkMode ? 'Dark' : 'Light'}</span>
            <motion.button
              className="theme-toggle"
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </motion.button>

            <motion.button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>

        <motion.nav
          className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <ul>
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`mobile-nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
                >
                  <item.icon />
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export default Header;

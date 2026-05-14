import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiSun,
  FiMoon,
  FiMonitor,
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

const Header = ({ activeSection, onSectionChange, onThemeModeChange, resolvedTheme, themeMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Profile', href: '#home', icon: FiUser },
    { name: 'About', href: '#about', icon: FiInfo },
    { name: 'Publications', href: '#publications', icon: FiBookOpen },
    { name: 'Experience', href: '#experience', icon: FiBriefcase },
    { name: 'News', href: '#news', icon: FiBell },
    { name: 'Contact', href: '#contact', icon: FiMail }
  ];

  const themeItems = [
    { mode: 'system', icon: FiMonitor, label: 'System' },
    { mode: 'dark', icon: FiMoon, label: 'Dark' },
    { mode: 'light', icon: FiSun, label: 'Light' }
  ];

  const selectSection = (href) => {
    onSectionChange(href.slice(1));
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className="header"
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
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                selectSection('#home');
              }}
            >
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
                      selectSection(item.href);
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
            <span className="theme-label">Theme</span>
            <div className="theme-segmented" role="group" aria-label="Theme mode">
              {themeItems.map((item) => (
                <motion.button
                  key={item.mode}
                  className={`theme-option ${themeMode === item.mode ? 'active' : ''}`}
                  onClick={() => onThemeModeChange(item.mode)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={`${item.label} theme`}
                  aria-pressed={themeMode === item.mode}
                  title={item.mode === 'system' ? `System (${resolvedTheme})` : item.label}
                >
                  <item.icon />
                </motion.button>
              ))}
            </div>

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
                    selectSection(item.href);
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

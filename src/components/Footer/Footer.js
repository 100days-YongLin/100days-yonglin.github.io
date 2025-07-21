import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FiMail, href: 'mailto:yonglin.chen@example.com', label: 'Email' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/yonglin-chen', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Publications', href: '#publications' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3 className="brand-name">Yonglin Chen</h3>
              <p className="brand-tagline">HCI Researcher & Developer</p>
              <p className="brand-description">
                Passionate about creating meaningful human-computer interactions
                that support children's development and well-being.
              </p>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4 className="link-title">Quick Links</h4>
                <ul className="link-list">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className="footer-link"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4 className="link-title">Research Areas</h4>
                <ul className="link-list">
                  <li><span className="research-area">Human-Computer Interaction</span></li>
                  <li><span className="research-area">AI-based Storytelling</span></li>
                  <li><span className="research-area">Children's Mental Health</span></li>
                  <li><span className="research-area">VR/AR Applications</span></li>
                </ul>
              </div>

              <div className="link-group">
                <h4 className="link-title">Connect</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
                <p className="contact-text">
                  Feel free to reach out for research collaborations
                  or academic discussions.
                </p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © {new Date().getFullYear()} Yonglin Chen. Made with TRAE & Claude-4-Sonnet, based on React.
              </p>

              <motion.button
                className="back-to-top"
                onClick={scrollToTop}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Back to top"
              >
                <FiArrowUp />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
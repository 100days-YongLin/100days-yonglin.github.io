import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: FiMail, href: 'mailto:yonglin0711@gmail.com', label: 'Email' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/yonglin-chen-7185ba335/', label: 'LinkedIn' },
    { icon: FiBookOpen, href: 'https://scholar.google.com/citations?user=EUfLhP4AAAAJ&hl=zh-CN', label: 'Google Scholar' }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1 className="hero-title">
              Hello! I am{' '}
              <span className="text-gradient">Yonglin Chen</span>
              <span className="chinese-name">陈泳霖</span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={itemVariants}>
              HCI Researcher & Developer
            </motion.p>

            <motion.p className="hero-description" variants={itemVariants}>
              I'm a HCI researcher focused on AI-based co-storytelling systems
              for children's mental health development. Currently a Visiting Student and incoming PhD Student at School of Design, SUSTech, ShenZhen.
              working on AI based human-computer interaction solutions.
            </motion.p>
          </motion.div>

          {/* <motion.div className="hero-actions" variants={itemVariants}>
            <motion.a
              href="#contact"
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </motion.a>

            <motion.a
              href="/resume.pdf"
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDownload />
              Download CV
            </motion.a>
          </motion.div> */}

          <motion.div className="social-links" variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="avatar-container">
            <div className="avatar-image">
              <img
                src="/imgs/personal_pic.jpg"
                alt="Yonglin Chen"
                className="personal-avatar"
              />
            </div>
            {/* <div className="floating-elements">
              <div className="floating-element element-1">🧠</div>
              <div className="floating-element element-2">💡</div>
              <div className="floating-element element-3">🔬</div>
              <div className="floating-element element-4">👶</div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiLinkedin } from 'react-icons/fi';
import { SiGooglescholar } from 'react-icons/si';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      value: "yonglin0711@gmail.com",
      link: "mailto:yonglin0711@gmail.com",
      label: "Email"
    },
    {
      icon: FiLinkedin,
      title: "LinkedIn",
      value: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/yonglin-chen-7185ba335/",
      label: "LinkedIn"
    },
    {
      icon: SiGooglescholar,
      title: "Google Scholar",
      value: "Google Scholar Profile",
      link: "https://scholar.google.com/citations?user=EUfLhP4AAAAJ&hl=zh-CN",
      label: "Google Scholar"
    }
  ];

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">
              Let's discuss research opportunities, collaborations, or just have a chat about HCI
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div className="contact-info" variants={itemVariants}>
              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-card"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="info-icon">
                      <info.icon />
                    </div>
                    <div className="info-content">
                      <h3 className="info-title">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="info-value"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="info-value">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>


            </motion.div>


          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
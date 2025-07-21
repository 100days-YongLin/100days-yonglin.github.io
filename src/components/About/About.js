import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCpu, FiUsers, FiCode, FiHeart } from 'react-icons/fi';
import './About.css';

const About = () => {
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

  const skills = [
    {
      icon: FiCpu,
      title: "AI-Powered HCI",
      description: "Designing intelligent interfaces using LLMs, Generative Models for adaptive user experiences and personalized interactions"
    },
    {
      icon: FiUsers,
      title: "Human-Centered AI",
      description: "Applying user research methodologies, eye-tracking studies, and behavioral analysis to inform AI system design and evaluation"
    },
    {
      icon: FiCode,
      title: "Technical Implementation",
      description: "Proficient in VR/AR development, 3D reconstruction, and deep learning network construction"
    },
    {
      icon: FiHeart,
      title: "Mental Health Focus",
      description: "Passionate about developing technology solutions for children's mental health and autism support"
    }
  ];

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              Bridging artificial intelligence and human-computer interaction for meaningful experiences
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div className="about-text" variants={itemVariants}>
              <div className="text-content">
                <p>
                  I am an HCI researcher with a deep passion for developing AI-based co-storytelling
                  systems that support children's mental health development. Currently working as a
                  Visiting Student at SUSTech under the supervision of Prof. Xueliang Li.
                </p>

                <p>
                  My research journey has taken me through various fascinating projects, from studying
                  user eye movement patterns using eye-tracking technology at City University of Hong Kong,
                  to building immersive CAVE spaces powered by LLMs for children with autism at Tsinghua
                  University AIR.
                </p>

                <p>
                  I believe technology should be a bridge that connects people and enhances human
                  experiences. My work focuses on creating intuitive, accessible, and meaningful
                  interactions that can make a real difference in people's lives, especially for
                  children who need additional support.
                </p>

                {/* <div className="stats">
                  <div className="stat-item">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">Years AI-HCI Research</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">ML/AI Projects</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">2</span>
                    <span className="stat-label">Publications</span>
                  </div>
                </div> */}
              </div>
            </motion.div>

            <motion.div className="skills-grid" variants={itemVariants}>
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card"
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="skill-icon">
                    <skill.icon />
                  </div>
                  <h3 className="skill-title">{skill.title}</h3>
                  <p className="skill-description">{skill.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
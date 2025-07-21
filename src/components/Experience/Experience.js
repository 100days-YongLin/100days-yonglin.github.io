import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiMapPin, FiUser, FiFileText } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const experiences = [
    {
      id: 1,
      title: "Visiting Student / Incoming PhD student",
      organization: "Southern University of Science and Technology (SUSTech)",
      period: "December 2024 - Present",
      year: 2024,
      location: "Shenzhen, China",
      supervisor: "Prof. Xueliang Li",
      description: "Researching AI-based co-storytelling systems for children to develop mental health under the supervision of Prof. Xueliang Li at the X-Group, School of Design.",
      highlights: [
        "Developing innovative AI-powered storytelling interfaces",
        "Focusing on children's mental health applications"
      ],
      current: true
    },
    {
      id: 2,
      title: "Research Assistant",
      organization: "City University of Hong Kong",
      period: "March 2024 - September 2024",
      year: 2024,
      location: "Hong Kong",
      supervisor: "Prof. Can Liu",
      description: "Studied user eye movement patterns across different transcription interfaces using eye-tracking technology at Prof. LIU Can's ERFI Lab, School of Creative Media.",
      highlights: [
        "Conducted eye-tracking studies on transcription interfaces",
        "Analyzed user behavior patterns and interaction data"
      ],
      current: false
    },
    {
      id: 3,
      title: "Research Participant",
      organization: "Tsinghua University AIR",
      period: "Winter 2023",
      year: 2023,
      location: "Beijing, China",
      supervisor: "Prof. Jiangtao Gong",
      description: "Participated in HCI Winter Camp focusing on an immersive CAVE space powered by LLMs for children with autism. Responsible for building the system and designing the LLM-based interaction framework.",
      highlights: [
        "Built immersive CAVE environment for autism support",
        "Designed LLM-based interaction frameworks"
      ],
      current: false
    },
    {
      id: 4,
      title: "Research Collaborator",
      organization: "Xi'an Jiaotong-Liverpool University (XJTLU)",
      period: "2023",
      year: 2023,
      location: "Suzhou, China",
      supervisor: "Research Group",
      description: "Collaborated with research group studying user experience (e.g., the sense of embodiment) and VR rehabilitation. Responsible for technical implementation, designing, and building VR environments.",
      highlights: [
        "Developed VR rehabilitation environments",
        "Studied user embodiment in virtual reality"
      ],
      current: false
    }
  ];

  // 按年份分组经历
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.year]) {
      acc[exp.year] = [];
    }
    acc[exp.year].push(exp);
    return acc;
  }, {});

  // 获取排序后的年份（从最新到最旧）
  const sortedYears = Object.keys(groupedExperiences).sort((a, b) => b - a);

  return (
    <section id="experience" className="experience section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="experience-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">
              My journey in HCI research and development
            </p>
          </motion.div>

          <div className="timeline">
            {sortedYears.map((year, yearIndex) => (
              <div key={year} className="year-group">
                <motion.div
                  className="year-marker"
                  variants={itemVariants}
                >
                  <div className="year-label">{year}</div>
                  <div className="year-line"></div>
                </motion.div>

                <div className="year-experiences">
                  {groupedExperiences[year].map((exp, expIndex) => (
                    <motion.div
                      key={exp.id}
                      className={`timeline-item ${exp.current ? 'current' : ''}`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="timeline-marker">
                        <div className="timeline-dot"></div>
                      </div>

                      <div className="timeline-content">
                        <div className="experience-card">
                          <div className="card-header">
                            <h3 className="experience-title">{exp.title}</h3>
                            {exp.current && <span className="current-badge">Current</span>}
                          </div>

                          <h4 className="organization">{exp.organization}</h4>

                          <div className="experience-meta">
                            <div className="meta-item">
                              <FiCalendar />
                              <span>{exp.period}</span>
                            </div>
                            <div className="meta-item">
                              <FiMapPin />
                              <span>{exp.location}</span>
                            </div>
                            <div className="meta-item">
                              <FiUser />
                              <span>{exp.supervisor}</span>
                            </div>
                          </div>

                          <p className="experience-description">{exp.description}</p>

                          <ul className="highlights">
                            {exp.highlights.map((highlight, idx) => (
                              <li key={idx}>{highlight}</li>
                            ))}
                          </ul>

                          {exp.papers && exp.papers.length > 0 && (
                            <div className="papers-section">
                              <h5 className="papers-title">
                                <FiFileText />
                                Related Publications
                              </h5>
                              <ul className="papers-list">
                                {exp.papers.map((paper, idx) => (
                                  <li key={idx} className="paper-item">
                                    <a
                                      href={paper.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="paper-link"
                                    >
                                      {paper.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
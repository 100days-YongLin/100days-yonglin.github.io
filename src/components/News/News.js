import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCalendar, FiMapPin, FiAward, FiUsers } from 'react-icons/fi';
import './News.css';

const News = () => {
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
        staggerChildren: 0.15
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

  const newsItems = [
    {
      id: 1,
      date: "Dec 05, 2024",
      title: "Visiting Student at SUSTech",
      description: "I joined the X-Group at the School of Design, Southern University of Science and Technology (SUSTech), as a Visiting Student under the guidance of Prof. Xueliang Li.",
      type: "position",
      icon: FiAward,
      location: "Shenzhen, China",
      recent: true
    },
    {
      id: 2,
      date: "Nov 24, 2024",
      title: "Presented at ChineseCHI 2024",
      description: "Participated in the ChineseCHI 2024 conference held at Southern University of Science and Technology in Shenzhen and presented our work Choices2I. 😄",
      type: "conference",
      icon: FiUsers,
      location: "Shenzhen, China",
      recent: true
    },
    {
      id: 3,
      date: "Mar 15, 2024",
      title: "Research Assistant at CityU",
      description: "Hired as a 6-month Research Assistant at Prof. LIU Can's ERFI Lab, School of Creative Media, City University of Hong Kong.",
      type: "position",
      icon: FiAward,
      location: "Hong Kong",
      recent: false
    }
  ];

  const getIconColor = (type) => {
    switch (type) {
      case 'milestone':
        return 'var(--primary-color)';
      case 'conference':
        return '#10b981';
      case 'position':
        return '#f59e0b';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'milestone':
        return 'Milestone';
      case 'conference':
        return 'Conference';
      case 'position':
        return 'Position';
      default:
        return 'News';
    }
  };

  return (
    <section id="news" className="news section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="news-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Latest News</h2>
            <p className="section-subtitle">
              Recent updates and milestones in my research journey
            </p>
          </motion.div>

          <div className="news-timeline">
            {newsItems.map((item, index) => (
              <motion.article
                key={item.id}
                className={`news-item ${item.recent ? 'recent' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="news-marker">
                  <div className="news-icon" style={{ color: getIconColor(item.type) }}>
                    <item.icon />
                  </div>
                  {index < newsItems.length - 1 && <div className="news-line"></div>}
                </div>

                <div className="news-content-wrapper">
                  <div className="news-card">
                    <div className="news-header">
                      <div className="news-meta">
                        <span className="news-date">
                          <FiCalendar />
                          {item.date}
                        </span>
                        <span className={`news-type type-${item.type}`}>
                          {getTypeLabel(item.type)}
                        </span>
                        {item.recent && <span className="recent-badge">New</span>}
                      </div>
                      {item.location && (
                        <div className="news-location">
                          <FiMapPin />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-description">{item.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* <motion.div className="news-footer" variants={itemVariants}>
            <p className="footer-text">
              Stay tuned for more updates on my research and academic journey!
            </p>
            <motion.a
              href="#contact"
              className="subscribe-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default News;
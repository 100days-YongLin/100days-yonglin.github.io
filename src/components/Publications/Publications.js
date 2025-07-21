import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiFileText, FiUsers, FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { generatePublicationsFromBib } from '../../utils/bibParser';
import './Publications.css';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAbstracts, setExpandedAbstracts] = useState({});

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // 加载 BibTeX 文件
  useEffect(() => {
    const loadPublications = async () => {
      try {
        setLoading(true);
        // 从 public 目录读取 BibTeX 文件
        const response = await fetch('/content/publications.bib');
        if (!response.ok) {
          throw new Error('Failed to load publications');
        }

        const bibContent = await response.text();
        const parsedPublications = generatePublicationsFromBib(bibContent);
        setPublications(parsedPublications);
      } catch (err) {
        console.error('Error loading publications:', err);
        // 如果加载失败，使用备用数据
        setPublications(getFallbackPublications());
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  // 备用数据（如果 BibTeX 加载失败）
  const getFallbackPublications = () => [
    {
      id: 1,
      title: "TouchMark: Partial Tactile Feedback Design for Upper Limb Rehabilitation in Virtual Reality",
      authors: ["Jingjing Zhang", "Mengjie Huang", "Yonglin Chen", "and 4 more authors"],
      journal: "IEEE Transactions on Visualization and Computer Graphics",
      year: "2024",
      type: "Journal Article",
      abstract: "The use of Virtual Reality (VR) technology, especially in medical rehabilitation, has expanded to include tactile cues along with visual stimuli. For patients with upper limb hemoplegia, tangible handles with haptic stimuli could improve their ability to perform daily activities. This research investigates how partial tactile feedback of tangible handles impacts users' embodiment in VR.",
      tags: ["VR", "Haptics", "Rehabilitation", "Embodiment", "Medical Technology"],
      featured: true,
      link: "#"
    }
  ];

  // 切换abstract展开状态
  const toggleAbstract = (pubId) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [pubId]: !prev[pubId]
    }));
  };

  // 截断abstract文本
  const truncateAbstract = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <section id="publications" className="publications section-padding">
        <div className="container">
          <div className="publications-content">
            <div className="section-header">
              <h2 className="section-title">Publications</h2>
              <p className="section-subtitle">Loading publications...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="publications" className="publications section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="publications-content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Publications</h2>
            <p className="section-subtitle">
              Research contributions in HCI, VR, and machine learning
            </p>
          </motion.div>

          <div className="publications-list">
            {publications.map((pub, index) => (
              <motion.article
                key={pub.id}
                className={`publication-item ${pub.featured ? 'featured' : ''}`}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="publication-header">
                  <div className="publication-meta">
                    <span className="publication-type">{pub.type}</span>
                    <span className="publication-year">{pub.year}</span>
                  </div>
                </div>

                <div className="publication-content">
                  {pub.preview && (
                    <div className="publication-image">
                      <img
                        src={`/imgs/publication_preview/${pub.preview}`}
                        alt={`Preview of ${pub.title}`}
                        className="preview-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="publication-details">
                    <h3 className="publication-title">{pub.title}</h3>

                    <div className="authors">
                      <FiUsers className="authors-icon" />
                      <span className="authors-list">
                        {pub.authors.map((author, idx) => (
                          <span key={idx} className={author === "Yonglin Chen" ? "author-highlight" : ""}>
                            {author}
                            {idx < pub.authors.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </span>
                    </div>

                    <div className="journal">
                      <FiFileText className="journal-icon" />
                      <span>{pub.journal}</span>
                    </div>

                    <div className="abstract-section">
                      <p className="abstract">
                        {expandedAbstracts[pub.id]
                          ? pub.abstract
                          : truncateAbstract(pub.abstract)
                        }
                      </p>
                      {pub.abstract.length > 200 && (
                        <button
                          className="expand-button"
                          onClick={() => toggleAbstract(pub.id)}
                        >
                          {expandedAbstracts[pub.id] ? (
                            <>
                              <span>Show less</span>
                              <FiChevronUp />
                            </>
                          ) : (
                            <>
                              <span>Show more</span>
                              <FiChevronDown />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="publication-actions">
                      {pub.pdf && (
                        <motion.a
                          href={`/content/${pub.pdf}`}
                          className="publication-link pdf-link"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Download PDF"
                        >
                          <FiDownload />
                          <span>PDF</span>
                        </motion.a>
                      )}

                      <motion.a
                        href={pub.link}
                        className="publication-link main-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Read Paper</span>
                        <FiExternalLink />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
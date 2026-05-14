import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiFileText, FiUsers, FiDownload, FiX } from 'react-icons/fi';
import { generatePublicationsFromBib } from '../../utils/bibParser';
import './Publications.css';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePublicationIndex, setActivePublicationIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

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

  useEffect(() => {
    if (!isAutoRotating || publications.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setSlideDirection(1);
      setActivePublicationIndex((currentIndex) => (
        (currentIndex + 1) % publications.length
      ));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isAutoRotating, publications.length]);

  useEffect(() => {
    if (!lightboxImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

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

  // 处理PDF下载
  const handlePdfDownload = (pdfFileName) => {
    if (!pdfFileName) return;
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = `/content/${pdfFileName}`;
    link.download = pdfFileName;
    link.target = '_blank';
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectPublication = (index) => {
    setSlideDirection(index >= activePublicationIndex ? 1 : -1);
    setActivePublicationIndex(index);
    setIsAutoRotating(false);
  };

  const openPreviewImage = (publication) => {
    if (!publication?.preview) return;

    setIsAutoRotating(false);
    setLightboxImage({
      src: `/imgs/publication_preview/${publication.preview}`,
      alt: `Preview of ${publication.title}`
    });
  };

  const getVenueAbbreviation = (pub) => {
    const venue = `${pub.journal || ''} ${pub.booktitle || ''}`;

    if (/ICCAIS|Computer Application and Information Security/i.test(venue)) return 'ICCAIS';
    if (/Chinese\s*CHI|ChineseCHI/i.test(venue)) return 'ChineseCHI';
    if (/Human Factors in Computing Systems|CHI Conference|CHI\s*'?\d{2}/i.test(venue)) return 'CHI';
    if (/Intelligent User Interfaces|IUI/i.test(venue)) return 'IUI';
    if (/Visualization and Computer Graphics|TVCG/i.test(venue)) return 'TVCG';
    if (/Virtual Reality|VRW|VR/i.test(venue)) return 'IEEE VR';
    if (/IEEE/i.test(venue)) return 'IEEE';
    if (/ACM/i.test(venue)) return 'ACM';

    return pub.type?.replace(/paper|article/ig, '').trim() || 'Paper';
  };

  const getVenueYear = (pub) => {
    const venue = `${pub.journal || ''} ${pub.booktitle || ''}`;
    const venueYear = venue.match(/\b(20\d{2})\b/)?.[1];

    return venueYear || pub.year;
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

  const detailVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 36 : -36
    }),
    center: {
      opacity: 1,
      x: 0
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

  const activePublication = publications[activePublicationIndex] || publications[0];

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
          {activePublication && (
            <div className="publications-showcase">
              <motion.article
                key={activePublication.id}
                className={`publication-detail-panel ${activePublication.featured ? 'featured' : ''}`}
                custom={slideDirection}
                variants={detailVariants}
                initial="enter"
                animate="center"
                transition={{ duration: 0.34, ease: "easeOut" }}
              >
                <div className="publication-body">
                  <div className="publication-header">
                    <div className="publication-meta">
                      <span className="publication-type">{activePublication.type}</span>
                      <span className="publication-year">{activePublication.year}</span>
                      {isAutoRotating && <span className="publication-rotation-note">Auto preview</span>}
                    </div>
                  </div>

                  <div className="publication-details">
                    <h3 className="publication-title">{activePublication.title}</h3>

                    <div className="authors">
                      <FiUsers className="authors-icon" />
                      <span className="authors-list">
                        {activePublication.authors.map((author, idx) => {
                          // 检查是否包含 "Yonglin Chen" (不区分是否有星号)
                          const isYonglin = author.replace(/\*/g, '').includes("Yonglin Chen");
                          return (
                            <span key={idx} className={isYonglin ? "author-highlight" : ""}>
                              {author}
                              {idx < activePublication.authors.length - 1 ? ", " : ""}
                            </span>
                          );
                        })}
                      </span>
                      {activePublication.authors.some(author => author.includes('*')) && (
                        <span className="equal-contribution-note"> (* Equal contribution)</span>
                      )}
                    </div>

                    <div className="journal">
                      <FiFileText className="journal-icon" />
                      <span>{activePublication.journal}</span>
                    </div>

                    <div className="abstract-section">
                      <p className="abstract">
                        {activePublication.abstract}
                      </p>
                    </div>

                    {activePublication.preview && (
                      <div className="publication-detail-preview">
                        <button
                          type="button"
                          className="publication-detail-preview-button"
                          onClick={() => openPreviewImage(activePublication)}
                          aria-label={`Open larger preview of ${activePublication.title}`}
                        >
                          <img
                            src={`/imgs/publication_preview/${activePublication.preview}`}
                            alt={`Preview of ${activePublication.title}`}
                            onError={(e) => {
                              e.target.closest('button').style.display = 'none';
                            }}
                          />
                        </button>
                      </div>
                    )}

                    <div className="publication-actions">
                      {activePublication.pdf && (
                        <motion.button
                          onClick={() => handlePdfDownload(activePublication.pdf)}
                          className="publication-link pdf-link"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          title="Download PDF"
                        >
                          <FiDownload />
                          <span>PDF</span>
                        </motion.button>
                      )}

                      <motion.a
                        href={activePublication.link}
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

              <div className="publication-preview-strip" aria-label="Publication previews">
                {publications.map((pub, index) => (
                  <button
                    key={pub.id}
                    type="button"
                    className={`publication-thumbnail ${index === activePublicationIndex ? 'active' : ''}`}
                    onClick={() => selectPublication(index)}
                    aria-label={`Show publication: ${pub.title}`}
                  >
                    {pub.preview ? (
                      <img
                        src={`/imgs/publication_preview/${pub.preview}`}
                        alt={`Preview of ${pub.title}`}
                        className="thumbnail-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <FiFileText />
                    )}
                    <span className="thumbnail-meta">
                      <span>{getVenueYear(pub)}</span>
                      <span>{getVenueAbbreviation(pub)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {lightboxImage && (
            <motion.div
              className="publication-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Publication preview image"
            >
              <button
                type="button"
                className="publication-lightbox-close"
                onClick={() => setLightboxImage(null)}
                aria-label="Close preview"
              >
                <FiX />
              </button>
              <motion.img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="publication-lightbox-image"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={(event) => event.stopPropagation()}
              />
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Publications;

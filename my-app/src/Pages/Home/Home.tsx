// Home.tsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    {
      url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
      title: 'Paradise Beaches',
      description: 'Discover the crystal clear waters of Maldives'
    },
    {
      url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
      title: 'Alpine Adventures',
      description: 'Explore the majestic Swiss Alps'
    },
    {
      url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
      title: 'Ancient Culture',
      description: 'Experience the magic of Japanese temples'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div 
          className={styles.heroSlide}
          style={{
            backgroundImage: `url(${backgroundImages[currentImageIndex].url})`
          }}
        >
          <div className={styles.heroOverlay}>
            <h1 className={styles.title}>
              {backgroundImages[currentImageIndex].title}
            </h1>
            <p className={styles.subtitle}>
              {backgroundImages[currentImageIndex].description}
            </p>
            <div className={styles.cta}>
              <a href="/vacations" className={styles.ctaButton}>
                Explore Destinations
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🌴</div>
          <h3>Exclusive Destinations</h3>
          <p>We select the best locations for your perfect vacation</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>💰</div>
          <h3>Best Prices</h3>
          <p>We guarantee the most competitive rates in the market</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🎯</div>
          <h3>Unique Experiences</h3>
          <p>Personalized activities for every type of traveler</p>
        </div>
      </div>

      <div className={styles.popularDestinations}>
        <h2>Popular Destinations</h2>
        <div className={styles.destinationsGrid}>
          <div className={styles.destination}>
            <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd" alt="Maldives" />
            <h3>Maldives</h3>
            <p>From $2,999</p>
          </div>
          <div className={styles.destination}>
            <img src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3" alt="Switzerland" />
            <h3>Switzerland</h3>
            <p>From $3,499</p>
          </div>
          <div className={styles.destination}>
            <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9" alt="Japan" />
            <h3>Japan</h3>
            <p>From $2,799</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

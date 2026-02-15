import React, { useState, useEffect } from 'react';
import '../css/home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroBg from '../assets/home1.jpg';
import skilledWorkersBg from '../assets/skilled-workers-bg.png';
import worker1 from '../assets/worker1.webp';
import worker2 from '../assets/worker2.jpg';
import worker3 from '../assets/worker3.png';
import worker4 from '../assets/worker4.jpeg';
import worker5 from '../assets/worker5.jpg';
import worker6 from '../assets/worker6.jpg';

function Home() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const workerFallbackImages = [worker1, worker2, worker3, worker4, worker5, worker6];

  useEffect(() => {
    // Fetch top-rated workers from backend
    fetchTopWorkers();
  }, []);

  const fetchTopWorkers = async () => {
    try {
      const response = await fetch('http://43.205.115.131:5000/api/workers/top-rated');
      const data = await response.json();
      setWorkers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
        }}
      >
        <div className="hero-content">
          
          <h1>Find It Local</h1>
          <p className="hero-subtitle">May be It is Near You</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3>Electrical Services</h3>
            <p>43 available workers</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔨</div>
            <h3>Carpentry Work</h3>
            <p>38 available workers</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🧱</div>
            <h3>Masonry & Construction</h3>
            <p>52 available workers</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Plumbing Services</h3>
            <p>31 available workers</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Search Service</h3>
            <p>Find the service you need</p>
          </div>
          <div className="step">
            <div className="step-icon">👷</div>
            <h3>Choose Worker</h3>
            <p>Select from available professionals</p>
          </div>
          <div className="step">
            <div className="step-icon">📅</div>
            <h3>Book Service</h3>
            <p>Schedule and confirm</p>
          </div>
        </div>
      </section>

      {/* Top Rated Workers Section */}
      <section id="workers" className="top-workers-section">
        <h2>Top Rated Workers</h2>
        {loading ? (
          <p>Loading workers...</p>
        ) : (
          <div className="workers-grid">
            {workers.length > 0 ? (
              workers.map((worker, index) => (
                <div key={worker._id} className="worker-card">
                  <div className="worker-image">
                    <img
                      src={worker.image || workerFallbackImages[index % workerFallbackImages.length]}
                      alt={worker.name}
                    />
                  </div>
                  <h3>{worker.name}</h3>
                  <p className="worker-profession">{worker.profession} • {worker.experience} years experience</p>
                  <div className="worker-rating">{renderStars(worker.rating)}</div>
                  <p className="worker-availability">
                    {worker.available ? '✓ Available Now' : '○ Not Available'}
                  </p>
                  <button className="view-profile-btn">View Profile</button>
                </div>
              ))
            ) : (
              <p>No workers available</p>
            )}
          </div>
        )}
      </section>

      {/* Call to Action Section */}
      <section
        className="cta-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${skilledWorkersBg})`,
        }}
      >
        <div className="cta-content">
          <h2>Are You a Skilled Worker?</h2>
          <p>Join our platform and connect with customers in your area</p>
          <button className="register-btn">Register Now</button>
        </div>
        <div className="cta-features">
          <div className="cta-feature">
            <span className="feature-icon">💰</span>
            <p>Flexible working hours</p>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">📱</span>
            <p>Direct client connections</p>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">🔒</span>
            <p>Secure payments</p>
          </div>
          <div className="cta-feature">
            <span className="feature-icon">📊</span>
            <p>Profile management</p>
          </div>
        </div>
      </section>

      <section id="about" className="info-section">
        <div className="info-inner">
          <h2>About Us</h2>
          <p>
            Find It Local connects customers with skilled workers nearby.
            Browse services, compare ratings, and book quickly.
          </p>
        </div>
      </section>

      <section id="contact" className="info-section info-section--alt">
        <div className="info-inner">
          <h2>Contact Us</h2>
          <p>
            Email: support@finditlocal.com
            <br />
            Phone: +94 77 123 4567
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

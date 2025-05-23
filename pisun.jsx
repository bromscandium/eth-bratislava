import React, { useState } from 'react';
import './styles.scss'; // We'll include the SCSS directly in the file

const RealEstateMarketplace = () => {
  const [activeTab, setActiveTab] = useState('fixed-price');
  const [properties] = useState([
    {
      id: 1,
      type: 'fixed',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: '2.5 USDC',
      title: 'Modern Apartment in Tallinn',
      location: 'Tallinn, Estonia',
      area: '85m²',
      beds: 2,
      bath: 1,
      currencyIcon: 'https://www.svgrepo.com/show/367255/usdc.svg'
    },
    // Add other properties similarly
  ]);

  const [auctions] = useState([
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      timeLeft: '2d 14h 32m',
      price: '4.2 ETH',
      title: 'Waterfront Villa',
      location: 'Dubai, UAE',
      area: '280m²',
      beds: 5,
      bath: 4,
      currentBid: '4.2 ETH',
      bidder: '0x8f7a...3e4b'
    },
    // Add other auctions similarly
  ]);

  return (
    <div className="real-estate-app">
      <style jsx global>{`
        :root {
          --primary: #0F0712;
          --secondary: #B96BFC;
          --white: #F3F2F5;
          --gray: #C2C2C2;
          --dark-purple: #7E4BC3;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        body {
          background-color: var(--primary);
          color: var(--white);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        
        .particles-js-canvas-el {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 1;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Header */
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid rgba(243, 242, 245, 0.1);
          position: relative;
        }
        
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: var(--white);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        
        .logo:hover {
          color: var(--secondary);
        }
        
        .logo span {
          color: var(--secondary);
          margin-left: 4px;
        }
        
        nav ul {
          display: flex;
          list-style: none;
          gap: 32px;
        }
        
        nav ul li a {
          color: var(--gray);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
          position: relative;
          padding: 8px 0;
        }
        
        nav ul li a:hover {
          color: var(--white);
        }
        
        nav ul li a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--secondary);
          transition: width 0.3s;
        }
        
        nav ul li a:hover::after {
          width: 100%;
        }
        
        nav ul li a.active {
          color: var(--white);
        }
        
        nav ul li a.active::after {
          width: 100%;
        }
        
        .login-button {
          background-color: transparent;
          color: var(--white);
          border: 1px solid var(--secondary);
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .login-button:hover {
          background-color: var(--secondary);
          color: var(--primary);
        }
        
        /* Marketplace Section */
        .marketplace {
          padding: 80px 0;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .section-header h2 {
          font-size: 40px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .section-header p {
          font-size: 18px;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Marketplace Tabs */
        .marketplace-tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
          border-bottom: 1px solid rgba(243, 242, 245, 0.1);
        }
        
        .tab-button {
          background: none;
          border: none;
          color: var(--gray);
          font-size: 18px;
          font-weight: 600;
          padding: 12px 24px;
          cursor: pointer;
          position: relative;
          transition: all 0.3s;
        }
        
        .tab-button:hover {
          color: var(--white);
        }
        
        .tab-button.active {
          color: var(--secondary);
        }
        
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--secondary);
        }
        
        /* Property Grid */
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        
        .property-card {
          background: rgba(243, 242, 245, 0.03);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s;
          border: 1px solid rgba(243, 242, 245, 0.05);
        }
        
        .property-card:hover {
          transform: translateY(-5px);
          border-color: var(--secondary);
          box-shadow: 0 10px 20px rgba(185, 107, 252, 0.1);
        }
        
        .property-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .property-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(15, 7, 18, 0.8);
          color: var(--white);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }
        
        .property-badge.auction {
          background: var(--secondary);
          color: var(--primary);
        }
        
        .property-badge svg {
          width: 14px;
          height: 14px;
          margin-right: 4px;
        }
        
        .property-details {
          padding: 20px;
        }
        
        .property-price {
          font-size: 22px;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        
        .property-price svg {
          width: 16px;
          height: 16px;
          margin-right: 6px;
        }
        
        .property-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--white);
        }
        
        .property-location {
          display: flex;
          align-items: center;
          color: var(--gray);
          font-size: 14px;
          margin-bottom: 16px;
        }
        
        .property-location svg {
          width: 14px;
          height: 14px;
          margin-right: 6px;
        }
        
        .property-features {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(243, 242, 245, 0.1);
          padding-top: 16px;
        }
        
        .feature {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .feature-value {
          font-weight: 600;
          color: var(--white);
        }
        
        .feature-label {
          font-size: 12px;
          color: var(--gray);
        }
        
        /* Auction specific styles */
        .auction-time {
          display: flex;
          align-items: center;
          background: rgba(185, 107, 252, 0.1);
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 12px;
        }
        
        .auction-time svg {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          color: var(--secondary);
        }
        
        .auction-time span {
          font-size: 14px;
          font-weight: 500;
        }
        
        .auction-bid {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
        }
        
        .bid-info {
          font-size: 14px;
          color: var(--gray);
        }
        
        .bid-info strong {
          color: var(--white);
          font-weight: 600;
        }
        
        .bid-button {
          background-color: var(--secondary);
          color: var(--primary);
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }
        
        .bid-button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        
        /* Filter Section */
        .filters {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .search-filter {
          display: flex;
          align-items: center;
          background: rgba(243, 242, 245, 0.05);
          border-radius: 8px;
          padding: 8px 16px;
          flex-grow: 1;
          max-width: 400px;
        }
        
        .search-filter svg {
          width: 18px;
          height: 18px;
          color: var(--gray);
          margin-right: 12px;
        }
        
        .search-filter input {
          background: transparent;
          border: none;
          color: var(--white);
          font-size: 16px;
          width: 100%;
          outline: none;
        }
        
        .search-filter input::placeholder {
          color: var(--gray);
        }
        
        .dropdown-filter {
          position: relative;
          min-width: 200px;
        }
        
        .dropdown-button {
          background: rgba(243, 242, 245, 0.05);
          border: 1px solid rgba(243, 242, 245, 0.1);
          color: var(--white);
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .dropdown-button:hover {
          border-color: var(--secondary);
        }
        
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: var(--primary);
          min-width: 200px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
          border-radius: 8px;
          border: 1px solid rgba(243, 242, 245, 0.1);
          top: 100%;
          right: 0;
        }
        
        .dropdown-content a {
          color: var(--gray);
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: all 0.2s;
        }
        
        .dropdown-content a:hover {
          color: var(--secondary);
          background: rgba(185, 107, 252, 0.05);
        }
        
        .dropdown-filter:hover .dropdown-content {
          display: block;
        }
        
        /* Footer */
        footer {
          padding: 60px 0 30px;
          border-top: 1px solid rgba(243, 242, 245, 0.1);
          background: rgba(15, 7, 18, 0.95);
          position: relative;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 40px;
        }
        
        .footer-logo {
          font-size: 24px;
          font-weight: 700;
          color: var(--white);
          margin-bottom: 20px;
          display: block;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        
        .footer-logo span {
          color: var(--secondary);
          margin-left: 4px;
        }
        
        .footer-about p {
          color: var(--gray);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .social-links {
          display: flex;
          gap: 16px;
        }
        
        .social-links a {
          color: var(--gray);
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(243, 242, 245, 0.05);
        }
        
        .social-links a:hover {
          color: var(--secondary);
          background: rgba(185, 107, 252, 0.1);
        }
        
        .footer-links h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--white);
        }
        
        .footer-links ul {
          list-style: none;
        }
        
        .footer-links ul li {
          margin-bottom: 12px;
        }
        
        .footer-links ul li a {
          color: var(--gray);
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .footer-links ul li a:hover {
          color: var(--secondary);
          padding-left: 5px;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid rgba(243, 242, 245, 0.1);
          color: var(--gray);
          font-size: 14px;
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }
        
        @media (max-width: 768px) {
          .marketplace-tabs {
            flex-direction: column;
            align-items: center;
          }
          
          .tab-button {
            width: 100%;
            text-align: center;
          }
          
          .filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-filter {
            max-width: 100%;
          }
          
          nav {
            display: none;
          }
        }
        
        @media (max-width: 576px) {
          .properties-grid {
            grid-template-columns: 1fr;
          }
          
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Particles Background */}
      <canvas className="particles-js-canvas-el" style={{width: '100%', height: '100%'}} width="1910" height="754"></canvas>

      <div className="content-wrapper">
        <div className="container">
          <header>
            <a href="#" className="logo">d<span>EST</span></a>
            <nav>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#" className="active">Marketplace</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </nav>
            <button className="login-button">Login</button>
          </header>

          <section className="marketplace">
            <div className="section-header">
              <h2>Property Marketplace</h2>
              <p>Buy, sell, and auction properties directly using NFT technology. All transactions are powered by Ethereum blockchain.</p>
            </div>

            <div className="marketplace-tabs">
              <button
                className={`tab-button ${activeTab === 'fixed-price' ? 'active' : ''}`}
                onClick={() => setActiveTab('fixed-price')}
              >
                Fixed Price
              </button>
              <button
                className={`tab-button ${activeTab === 'auctions' ? 'active' : ''}`}
                onClick={() => setActiveTab('auctions')}
              >
                Auctions
              </button>
            </div>

            <div className="filters">
              <div className="search-filter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search by location, property type..." />
              </div>

              <div className="dropdown-filter">
                <button className="dropdown-button">
                  <span>All Countries</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <a href="#">All Countries</a>
                  <a href="#">Estonia</a>
                  <a href="#">Dubai, UAE</a>
                  <a href="#">Switzerland</a>
                  <a href="#">Singapore</a>
                </div>
              </div>

              <div className="dropdown-filter">
                <button className="dropdown-button">
                  <span>Property Type: All</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <a href="#">All Types</a>
                  <a href="#">Apartments</a>
                  <a href="#">Houses</a>
                  <a href="#">Commercial</a>
                  <a href="#">Land</a>
                </div>
              </div>

              <div className="dropdown-filter">
                <button className="dropdown-button">
                  <span>Sort by: Newest</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div className="dropdown-content">
                  <a href="#">Newest</a>
                  <a href="#">Price: Low to High</a>
                  <a href="#">Price: High to Low</a>
                  <a href="#">Square Footage</a>
                </div>
              </div>
            </div>

            {/* Fixed Price Properties */}
            {activeTab === 'fixed-price' && (
              <div id="fixed-price" className="tab-content active">
                <div className="properties-grid">
                  {properties.map(property => (
                    <div className="property-card" key={property.id}>
                      <div className="property-image" style={{backgroundImage: `url(${property.image})`}}>
                        <div className="property-badge">
                          <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}>
                            <img src={property.currencyIcon} alt="Currency Logo" width="16" height="16" />
                            {property.price}
                          </span>
                        </div>
                      </div>
                      <div className="property-details">
                        <div className="property-price">
                          <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}>
                            <img src={property.currencyIcon} alt="Currency Logo" width="25" height="25" />
                            {property.price}
                          </span>
                        </div>
                        <h3 className="property-title">{property.title}</h3>
                        <div className="property-location">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {property.location}
                        </div>
                        <div className="property-features">
                          <div className="feature">
                            <span className="feature-value">{property.area}</span>
                            <span className="feature-label">Area</span>
                          </div>
                          <div className="feature">
                            <span className="feature-value">{property.beds}</span>
                            <span className="feature-label">Beds</span>
                          </div>
                          <div className="feature">
                            <span className="feature-value">{property.bath}</span>
                            <span className="feature-label">Bath</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="load-more">
                  <button className="secondary-button">Load More Properties</button>
                </div>
              </div>
            )}

            {/* Auction Properties */}
            {activeTab === 'auctions' && (
              <div id="auctions" className="tab-content">
                <div className="properties-grid">
                  {auctions.map(auction => (
                    <div className="property-card" key={auction.id}>
                      <div className="property-image" style={{backgroundImage: `url(${auction.image})`}}>
                        <div className="property-badge auction">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Auction
                        </div>
                      </div>
                      <div className="property-details">
                        <div className="auction-time">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>Ends in {auction.timeLeft}</span>
                        </div>
                        <div className="property-price">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" fill="currentColor"/>
                          </svg>
                          {auction.price}
                        </div>
                        <h3 className="property-title">{auction.title}</h3>
                        <div className="property-location">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {auction.location}
                        </div>
                        <div className="property-features">
                          <div className="feature">
                            <span className="feature-value">{auction.area}</span>
                            <span className="feature-label">Area</span>
                          </div>
                          <div className="feature">
                            <span className="feature-value">{auction.beds}</span>
                            <span className="feature-label">Beds</span>
                          </div>
                          <div className="feature">
                            <span className="feature-value">{auction.bath}</span>
                            <span className="feature-label">Bath</span>
                          </div>
                        </div>
                        <div className="auction-bid">
                          <div className="bid-info">
                            Current bid: <strong>{auction.currentBid}</strong> by <strong>{auction.bidder}</strong>
                          </div>
                          <button className="bid-button">Place Bid</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="load-more">
                  <button className="secondary-button">Load More Auctions</button>
                </div>
              </div>
            )}
          </section>

          <footer>
            <div className="container">
              <div className="footer-grid">
                <div className="footer-about">
                  <a href="#" className="footer-logo">d<span>EST</span></a>
                  <p>Decentralized Estate platform revolutionizing real estate transactions through blockchain technology and NFT ownership.</p>
                  <div className="social-links">
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="footer-links">
                  <h4>Marketplace</h4>
                  <ul>
                    <li><a href="#">All Properties</a></li>
                    <li><a href="#">Buy</a></li>
                    <li><a href="#">Sell</a></li>
                    <li><a href="#">Auctions</a></li>
                    <li><a href="#">Price Trends</a></li>
                  </ul>
                </div>
                <div className="footer-links">
                  <h4>Resources</h4>
                  <ul>
                    <li><a href="#">How It Works</a></li>
                    <li><a href="#">NFT Guide</a></li>
                    <li><a href="#">Legal Framework</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Blog</a></li>
                  </ul>
                </div>
                <div className="footer-links">
                  <h4>Company</h4>
                  <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Team</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Press</a></li>
                  </ul>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2023 dEST. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RealEstateMarketplace;
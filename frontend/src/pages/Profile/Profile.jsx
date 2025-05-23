import React, { useState } from 'react';


const Profile = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const ownedProperties = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '2.5 USDC',
            title: 'Modern Apartment in Tallinn',
            location: 'Tallinn, Estonia',
            area: '85m²',
            beds: 2,
            bath: 1,
            currencyIcon: 'https://www.svgrepo.com/show/367255/usdc.svg',
            status: 'owned'
        }
    ];

    const activeListings = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            price: '2.8 USDC',
            title: 'Historic Townhouse',
            location: 'Tallinn, Estonia',
            area: '150m²',
            beds: 3,
            bath: 2,
            currencyIcon: 'https://www.svgrepo.com/show/367255/usdc.svg',
            status: 'for sale'
        }
    ];

    return (
        <div className="user-profile">
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
        
        .user-menu {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          cursor: pointer;
          position: relative;
        }
        
        .user-dropdown {
          display: ${showDropdown ? 'block' : 'none'};
          position: absolute;
          top: 100%;
          right: 0;
          background-color: var(--primary);
          min-width: 200px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
          border-radius: 8px;
          border: 1px solid rgba(243, 242, 245, 0.1);
          margin-top: 10px;
        }
        
        .user-dropdown a {
          color: var(--gray);
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          transition: all 0.2s;
        }
        
        .user-dropdown a:hover {
          color: var(--secondary);
          background: rgba(185, 107, 252, 0.05);
        }
        
        /* Profile Section */
        .profile {
          padding: 60px 0;
        }
        
        .profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          gap: 30px;
        }
        
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background-color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 600;
          color: var(--primary);
        }
        
        .profile-info h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .profile-info p {
          color: var(--gray);
          margin-bottom: 16px;
        }
        
        .wallet-address {
          display: flex;
          align-items: center;
          background: rgba(243, 242, 245, 0.05);
          padding: 8px 16px;
          border-radius: 8px;
          font-family: monospace;
          max-width: fit-content;
        }
        
        .wallet-address svg {
          width: 18px;
          height: 18px;
          margin-right: 10px;
          color: var(--secondary);
        }
        
        .profile-stats {
          display: flex;
          gap: 30px;
          margin-bottom: 40px;
        }
        
        .stat-card {
          background: rgba(243, 242, 245, 0.03);
          border-radius: 12px;
          padding: 20px;
          flex: 1;
          border: 1px solid rgba(243, 242, 245, 0.05);
          transition: all 0.3s;
        }
        
        .stat-card:hover {
          border-color: var(--secondary);
          transform: translateY(-3px);
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--secondary);
          margin-bottom: 8px;
        }
        
        .stat-label {
          color: var(--gray);
          font-size: 14px;
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .section-title svg {
          width: 20px;
          height: 20px;
          color: var(--secondary);
        }
        
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
        
        .property-badge.owned {
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
        
        .edit-button {
          background-color: transparent;
          color: var(--white);
          border: 1px solid var(--secondary);
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .edit-button:hover {
          background-color: var(--secondary);
          color: var(--primary);
        }
        
        .edit-button svg {
          width: 16px;
          height: 16px;
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
          
          .profile-stats {
            flex-wrap: wrap;
          }
          
          .stat-card {
            min-width: calc(50% - 15px);
          }
        }
        
        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            text-align: center;
          }
          
          .wallet-address {
            margin: 0 auto;
          }
          
          .profile-stats {
            flex-direction: column;
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
                    <section className="profile">
                        <div className="profile-header">
                            <div className="profile-avatar">JD</div>
                            <div className="profile-info">
                                <h1>John Doe</h1>
                                <p>Real estate investor and NFT enthusiast</p>
                                <div className="wallet-address">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                    0x8f7a...3e4b
                                </div>
                            </div>
                            <button className="edit-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit Profile
                            </button>
                        </div>

                        <div className="profile-stats">
                            <div className="stat-card">
                                <div className="stat-value">12</div>
                                <div className="stat-label">Properties Owned</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">3.5 USDC</div>
                                <div className="stat-label">Total Spent</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">8.2 USDC</div>
                                <div className="stat-label">Total Value</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">4</div>
                                <div className="stat-label">Active Listings</div>
                            </div>
                        </div>

                        <div className="section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            My Properties
                        </div>

                        <div className="properties-grid">
                            {ownedProperties.map(property => (
                                <div className="property-card" key={property.id}>
                                    <div className="property-image" style={{backgroundImage: `url(${property.image})`}}>
                                        <div className="property-badge owned">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                            </svg>
                                            Owned
                                        </div>
                                    </div>
                                    <div className="property-details">
                                        <div className="property-price">
                      <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}>
                        <img src={property.currencyIcon} alt="USDC Logo" width="16" height="16" />
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

                        <div className="section-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            Active Listings
                        </div>

                        <div className="properties-grid">
                            {activeListings.map(listing => (
                                <div className="property-card" key={listing.id}>
                                    <div className="property-image" style={{backgroundImage: `url(${listing.image})`}}>
                                        <div className="property-badge">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            For Sale
                                        </div>
                                    </div>
                                    <div className="property-details">
                                        <div className="property-price">
                      <span style={{display: 'inline-flex', alignItems: 'center', gap: '4px'}}>
                        <img src={listing.currencyIcon} alt="USDC Logo" width="16" height="16" />
                          {listing.price}
                      </span>
                                        </div>
                                        <h3 className="property-title">{listing.title}</h3>
                                        <div className="property-location">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            {listing.location}
                                        </div>
                                        <div className="property-features">
                                            <div className="feature">
                                                <span className="feature-value">{listing.area}</span>
                                                <span className="feature-label">Area</span>
                                            </div>
                                            <div className="feature">
                                                <span className="feature-value">{listing.beds}</span>
                                                <span className="feature-label">Beds</span>
                                            </div>
                                            <div className="feature">
                                                <span className="feature-value">{listing.bath}</span>
                                                <span className="feature-label">Bath</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
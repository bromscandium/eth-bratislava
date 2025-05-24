import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Countries.scss';

const Countries = () => {
    const navigate = useNavigate();

    const countries = [
        {
            image: 'https://images.unsplash.com/photo-1579033462043-0f11a7862f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            name: 'Estonia',
            countryKey: 'Estonia',
            description: "Estonia's progressive digital society and clear cryptocurrency regulations make it an ideal location for NFT-based real estate transactions."
        },
        {
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            name: 'Dubai, UAE',
            countryKey: 'UAE',
            description: "Dubai's forward-thinking approach to blockchain technology and its special economic zones provide a perfect environment for our platform."
        }
    ];

    const handleViewProperties = (countryKey) => {
        navigate(`/marketplace?country=${countryKey}`);
    };

    return (
        <section className="countries">
            <div className="container">
                <div className="section-header">
                    <h2>Available Jurisdictions</h2>
                    <p>We operate in regions where NFT-based real estate transactions are fully compliant with local laws</p>
                </div>
                <div className="countries-grid">
                    {countries.map((country, index) => (
                        <div className="country-card" key={index}>
                            <div className="country-image" style={{ backgroundImage: `url(${country.image})` }} />
                            <div className="country-details">
                                <h3>{country.name}</h3>
                                <p>{country.description}</p>
                                <button
                                    className="country-button"
                                    onClick={() => handleViewProperties(country.countryKey)}
                                >
                                    View {country.name.split(',')[0]} Properties
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Countries;

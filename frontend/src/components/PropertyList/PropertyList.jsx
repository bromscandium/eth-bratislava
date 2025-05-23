import React from 'react';
import './PropertyList.scss';
import properties from '../../data/data.js';
import { useNavigate } from 'react-router-dom';

const PropertyList = ({ selectedTag, filter }) => {
    const navigate = useNavigate();

    const handleViewDetails = (property) => {
        if (property.hashtag === 'auction') {
            navigate(`/auction/${property.id}`);
        } else if (property.hashtag === 'trade') {
            navigate(`/trade/${property.id}`);
        }
    };

    let filteredProperties = selectedTag
        ? properties.filter(property => property.hashtag === selectedTag)
        : [...properties];

    // Apply sorting based on the selected filter
    if (filter === 'az') {
        filteredProperties.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'za') {
        filteredProperties.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === 'price') {
        filteredProperties.sort((a, b) => a.priceEth - b.priceEth);
    } else if (filter === 'country') {
        filteredProperties.sort((a, b) => (a.country || '').localeCompare(b.country || ''));
    } else if (filter === 'hashtag') {
        filteredProperties.sort((a, b) => a.hashtag.localeCompare(b.hashtag));
    }

    return (
        <section className="properties">
            <div className="container">
                <div className="section-header">
                    <h2>Available Properties</h2>
                    <p>Explore real estate you can own using Ethereum — from mountain cabins to oceanfront villas.</p>
                </div>
                <div className="properties-grid">
                    {filteredProperties.map((property) => (
                        <div className="property-card" key={property.id}>
                            <div
                                className="property-image"
                                style={{ backgroundImage: `url(${property.image})` }}
                            />
                            <div className="property-details">
                                <div className="property-meta">
                                    <span className={`hashtag ${property.hashtag}`}>#{property.hashtag}</span>
                                    <span className="price">{property.priceEth} ETH</span>
                                </div>
                                <h3>{property.name}</h3>
                                <p>{property.description}</p>
                                <button
                                    className="secondary-button"
                                    onClick={() => handleViewDetails(property)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertyList;
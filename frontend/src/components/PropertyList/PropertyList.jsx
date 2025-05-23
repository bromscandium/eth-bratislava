import React, { useState, useEffect } from 'react';
import './PropertyList.scss';
import properties from '../../data/data.js';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const PAGE_SIZE = 12;

const PropertyList = ({ selectedTag, selectedCountry, filter, minPrice, maxPrice, searchQuery }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1);
    }, [selectedTag, selectedCountry, filter, minPrice, maxPrice]);

    const handleViewDetails = (property) => {
        if (property.hashtag === 'auction') {
            navigate(`/auction/${property.id}`);
        } else {
            navigate(`/trade/${property.id}`);
        }
    };

    let filteredProperties = [...properties];

    if (selectedTag && selectedTag !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.hashtag === selectedTag);
    }
    if (selectedCountry && selectedCountry !== 'all') {
        filteredProperties = filteredProperties.filter(p => p.country === selectedCountry);
    }
    if (minPrice) {
        filteredProperties = filteredProperties.filter(p => p.priceUsdC >= +minPrice);
    }
    if (maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.priceUsdC <= +maxPrice);
    }
    if (searchQuery && searchQuery.trim()) {
        filteredProperties = filteredProperties.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (filter === 'az') {
        filteredProperties.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'za') {
        filteredProperties.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === 'price_asc') {
        filteredProperties.sort((a, b) => a.priceUsdC - b.priceUsdC);
    } else if (filter === 'price_desc') {
        filteredProperties.sort((a, b) => b.priceUsdC - a.priceUsdC);
    } else if (filter === 'date_asc') {
        filteredProperties.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
    } else if (filter === 'date_desc') {
        filteredProperties.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    }


    const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
    const pagedProperties = filteredProperties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="property-list-wrapper">
            <div className="properties-grid">
                {pagedProperties.map(property => (
                    <div
                        className="property-card"
                        key={property.id}
                        onClick={() => handleViewDetails(property)}
                        style={{ cursor: 'pointer' }}
                    >

                    <div className="property-image" style={{ backgroundImage: `url(${property.image})` }}>
                            <div className={`property-badge ${property.hashtag}`}>
                                <span>{property.hashtag === 'auction' ? 'Auction' : 'Trade'}</span>
                            </div>
                        </div>
                        <div className="property-details">
                            <div className="property-info">
                                <div className="property-price">
                                    <img src="https://www.svgrepo.com/show/367255/usdc.svg" alt="USDC" width="20" height="20" />
                                    <span>{property.priceUsdC} USDC</span>
                                </div>
                                <h3 className="property-title">{property.name}</h3>
                                <div className="property-location">
                                    <MapPin size={14} strokeWidth={2} className="location-icon" />
                                    <span>{property.city}, {property.country}</span>
                                </div>

                                <div className="property-features">
                                    <div className="feature">
                                        <span className="feature-value">{property.area || '-'}m²</span>
                                        <span className="feature-label">Area</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-value">{property.beds || '-'}</span>
                                        <span className="feature-label">Beds</span>
                                    </div>
                                    <div className="feature">
                                        <span className="feature-value">{property.bath || '-'}</span>
                                        <span className="feature-label">Bath</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination-bar">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={page === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

export default PropertyList;

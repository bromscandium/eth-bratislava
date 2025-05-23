import React, { useState } from 'react';
import './PropertyList.scss';
import properties from '../../data/data.js';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 12;

const PropertyList = ({ selectedTag, selectedCountry, filter, minPrice, maxPrice }) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const handleViewDetails = (property) => {
        if (property.hashtag === 'auction') {
            navigate(`/auction/${property.id}`);
        } else if (property.hashtag === 'trade') {
            navigate(`/trade/${property.id}`);
        }
    };

    let filteredProperties = [...properties];

    if (selectedTag) {
        filteredProperties = filteredProperties.filter(
            (property) => property.hashtag === selectedTag
        );
    }
    if (selectedCountry) {
        filteredProperties = filteredProperties.filter(
            (property) => property.country === selectedCountry
        );
    }

    if (filter === 'price_asc') {
        filteredProperties.sort((a, b) => a.priceUsdC - b.priceEth);
    } else if (filter === 'price_desc') {
        filteredProperties.sort((a, b) => b.priceUsdC - a.priceEth);
    } else if (filter === 'az') {
        filteredProperties.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === 'za') {
        filteredProperties.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filter === 'country') {
        filteredProperties.sort((a, b) =>
            (a.country || '').localeCompare(b.country || '')
        );
    } else if (filter === 'hashtag') {
        filteredProperties.sort((a, b) => a.hashtag.localeCompare(b.hashtag));
    }

    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
        filteredProperties = filteredProperties.filter(
            (property) => property.priceUsdC >= Number(minPrice)
        );
    }
    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
        filteredProperties = filteredProperties.filter(
            (property) => property.priceUsdC <= Number(maxPrice)
        );
    }

    // Pagination
    const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
    const pagedProperties = filteredProperties.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="properties">
            <div className="container">
                <div className="properties-grid">
                    {pagedProperties.length === 0 && (
                        <div className="no-properties">
                            <p>No properties found for your filters.</p>
                        </div>
                    )}
                    {pagedProperties.map((property) => (
                        <div className="property-card" key={property.id}>
                            <div
                                className="property-image"
                                style={{ backgroundImage: `url(${property.image})` }}
                            />
                            <div className="property-details">
                                <div className="property-meta">
                  <span className={`hashtag ${property.hashtag}`}>
                    #{property.hashtag}
                  </span>
                                    <span className="price">
                    {property.priceUsdC} USDC
                  </span>
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
                {totalPages > 1 && (
                    <div className="pagination-bar">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={page === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PropertyList;

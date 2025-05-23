import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import properties from '../../data/data';
import './Auction.scss';

const Auction = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const property = properties.find((p) => p.id === id && p.hashtag === 'auction');

    if (!property) {
        return (
            <div className="auction-page">
                <div className="auction-content">Property not found.</div>
            </div>
        );
    }

    return (
        <div className="auction-page">
            <div className="auction-content">
                <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

                <h1>{property.name}</h1>
                <img src={property.image} alt={property.name} />
                <p>{property.description}</p>
                <p><strong>Price:</strong> <span className="price-value">{property.priceUsdC} USDC</span></p>

                <button className="action-button">Place Bid</button>
            </div>
        </div>
    );
};

export default Auction;

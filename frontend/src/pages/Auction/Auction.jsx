import React from 'react';
import { useParams } from 'react-router-dom';
import properties from '../../data/data';
import './Auction.scss';

const Auction = () => {
    const { id } = useParams();
    const property = properties.find((p) => p.id === id && p.hashtag === 'auction');

    if (!property) {
        return <div className="auction-page"><div className="auction-content">Property not found.</div></div>;
    }

    return (
        <div className="auction-page">
            <div className="auction-content">
                <h1>{property.name}</h1>
                <img src={property.image} alt={property.name} />
                <p>{property.description}</p>
                <p><strong>Price:</strong> {property.priceEth} ETH</p>
            </div>
        </div>
    );
};

export default Auction;
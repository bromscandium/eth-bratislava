// src/pages/Auction/Auction.jsx
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import properties from '../../data/data';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Auction.scss';

import { FiArrowLeft, FiMapPin, FiCalendar, FiLayers, FiHome, FiDroplet } from 'react-icons/fi';
import { FaEthereum } from 'react-icons/fa';

const Auction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const property = properties.find(p => p.id === id && p.hashtag === 'auction');
    const mapRef = useRef(null);

    useEffect(() => {
        if (!property || !mapRef.current || !property.coords) return;

        const map = new maplibregl.Map({
            container: mapRef.current,
            style: 'https://api.maptiler.com/maps/darkmatter/style.json?key=leLKcJqFrGkjyFiGlG7L',
            center: property.coords,
            zoom: 12,
        });

        new maplibregl.Marker({ color: '#B96BFC', scale: 1.2 })
            .setLngLat(property.coords)
            .addTo(map);

        return () => map.remove();
    }, [property]);

    if (!property) {
        return (
            <div className="auction-layout">
                <div className="auction-card">
                    <p>Property not found.</p>
                    <button className="btn-bid" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        );
    }

    const {
        name,
        description,
        image,
        priceUsdC,
        country,
        city,
        postDate,
        area,
        beds,
        bath
    } = property;

    return (
        <div className="auction-layout">
            <canvas className="particles-js-canvas-el"></canvas>

            <div className="auction-card">
                <button className="btn-back" onClick={() => navigate(-1)}>
                    <FiArrowLeft size={20} /> Back
                </button>

                <div className="auction-image">
                    <img src={image} alt={name} />
                    <div className="auction-hashtag">Auction</div>
                </div>

                <div className="auction-header">
                    <h1 className="auction-title">{name}</h1>
                    <div className="auction-price">{priceUsdC.toLocaleString()} USDC</div>
                </div>

                <div className="auction-info">
                    <div className="auction-meta">
                        <span><FiMapPin /> <strong>Location:</strong> {city}, {country}</span>
                        <span><FiCalendar /> <strong>Published:</strong> {new Date(postDate).toLocaleDateString()}</span>
                        <span><FiLayers /> <strong>Area:</strong> {area} m²</span>
                        <span><FiHome /> <strong>Beds:</strong> {beds}</span>
                        <span><FiDroplet /> <strong>Baths:</strong> {bath}</span>
                    </div>

                    <h2>Description</h2>
                    <p className="auction-description">{description}</p>

                    <button className="btn-bid">
                        <FaEthereum size={18} style={{ marginRight: '6px' }} />
                        Place Bid
                    </button>
                </div>
            </div>

            <div className="auction-map" ref={mapRef} />
        </div>
    );
};

export default Auction;

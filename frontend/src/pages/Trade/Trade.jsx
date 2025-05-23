// Trade.jsx
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import properties from '../../data/data';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Trade.scss';
import { DollarSign } from 'lucide-react';



// Icons
import { FiArrowLeft, FiMapPin, FiCalendar, FiLayers, FiHome, FiDroplet } from 'react-icons/fi';
import { FaEthereum } from 'react-icons/fa';

const Trade = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const property = properties.find(p => p.id === id && p.hashtag === 'trade');
    const mapRef = useRef(null);

    useEffect(() => {
        if (!property || !mapRef.current || !property.coords) return;

        const map = new maplibregl.Map({
            container: mapRef.current,
            style: 'https://api.maptiler.com/maps/darkmatter/style.json?key=leLKcJqFrGkjyFiGlG7L',
            center: property.coords,
            zoom: 12,
        });

        new maplibregl.Marker({
            color: '#B96BFC',
            scale: 1.2
        })
            .setLngLat(property.coords)
            .addTo(map);

        return () => map.remove();
    }, [property]);

    if (!property) {
        return (
            <div className="trade-layout">
                <div className="trade-card">
                    <p>Property not found.</p>
                    <button className="btn-buy" onClick={() => navigate(-1)} style={{ width: 'auto' }}>
                      Back
                    </button>
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
        coords,
        hashtag,
        area,
        beds,
        bath
    } = property;

    return (
        <div className="trade-layout">
            <canvas className="particles-js-canvas-el"></canvas>

            <div className="trade-card">
                <button className="btn-back" onClick={() => navigate(-1)}>
                  Back
                </button>

                <div className="trade-image">
                    <img src={image} alt={name} />
                    <div className="trade-hashtag">Trade</div>
                </div>

                <div className="trade-header">
                    <h1 className="trade-title">{name}</h1>
                    <div className="trade-price">{priceUsdC.toLocaleString()} USDC</div>
                </div>

                <div className="trade-info">
                    <div className="trade-meta">
                        <span>
                            <FiMapPin /> <strong>Location:</strong> {city}, {country}
                        </span>
                        <span>
                            <FiCalendar /> <strong>Published:</strong> {new Date(postDate).toLocaleDateString()}
                        </span>
                        <span>
                            <FiLayers /> <strong>Area:</strong> {area} m²
                        </span>
                        <span>
                            <FiHome /> <strong>Beds:</strong> {beds}
                        </span>
                        <span>
                            <FiDroplet /> <strong>Baths:</strong> {bath}
                        </span>
                    </div>

                    <h2>Description</h2>
                    <p className="trade-description">{description}</p>

                    <button className="btn-buy">
                        <DollarSign size={18} style={{ marginRight: '6px' }} />
                        Buy with USDC
                    </button>



                </div>
            </div>

            <div className="trade-map" ref={mapRef} />
        </div>
    );
};

export default Trade;

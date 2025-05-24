import React, {useEffect, useRef, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import maplibregl from 'maplibre-gl';
import properties from '../../data/data';
import auctionHistories, {auctionEndTimes} from '../../data/auction';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Auction.scss';

import {FiArrowLeft, FiMapPin, FiCalendar, FiLayers, FiHome, FiDroplet} from 'react-icons/fi';
import {DollarSign} from 'lucide-react';

const Auction = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const property = properties.find(p => p.id === id && p.hashtag === 'auction');
    const history = auctionHistories[id] || [];
    const mapRef = useRef(null);

    // determine current minimum: highest bid so far, or starting price
    const currentMin = history.length
        ? history[history.length - 1].price
        : property?.priceUsdC || 0;

    const [bidValue, setBidValue] = useState('');
    const isValidBid = Number(bidValue) > currentMin;


    // --- TIMER SETUP ---
    const endTimeISO = auctionEndTimes[id];
    const calculateRemaining = () => {
        const diff = new Date(endTimeISO).getTime() - Date.now();
        return diff > 0 ? diff : 0;
    };
    const [remainingMs, setRemainingMs] = useState(calculateRemaining());

    useEffect(() => {
        const timerId = setInterval(() => {
            setRemainingMs(calculateRemaining());
        }, 1000);
        return () => clearInterval(timerId);
    }, [endTimeISO]);

    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
    // --- /TIMER SETUP ---

    useEffect(() => {
        if (!property?.coords || !mapRef.current) return;
        const map = new maplibregl.Map({
            container: mapRef.current,
            style: 'https://api.maptiler.com/maps/streets-dark/style.json?key=leLKcJqFrGkjyFiGlG7L',
            center: property.coords,
            zoom: 10,
        });
        new maplibregl.Marker({color: '#B96BFC'})
            .setLngLat(property.coords)
            .addTo(map);
        return () => map.remove();
    }, [property]);

    if (!property) {
        return (
            <div className="auction-layout">
                <div className="auction-card">
                    <button onClick={() => navigate(-1)}>← Back</button>
                    <p>Property not found.</p>
                </div>
            </div>
        );
    }

    const {
        name, description, image, priceUsdC,
        city, country, postDate, area, beds, bath
    } = property;

    return (
        <div className="auction-layout">
            <div className="auction-card">

                <div className="back-with-timer">
                    <button className="btn-back" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={18}/> Back
                    </button>
                    <div className="auction-timer">
                        {days}d {hours}h {minutes}m {seconds}s
                    </div>
                </div>

                <div className="auction-image">
                    <img src={image} alt={name}/>
                    <div className="auction-hashtag">Auction</div>
                </div>

                <div className="auction-header">
                    <h1>{name}</h1>
                    <div className="auction-price">{priceUsdC.toLocaleString()} USDC</div>
                </div>

                <div className="auction-info">
                    <div className="auction-meta">
                        <span><FiMapPin/> <strong>Location:</strong> {city}, {country}</span>
                        <span><FiCalendar/> <strong>Published:</strong> {new Date(postDate).toLocaleDateString()}</span>
                        <span><FiLayers/> <strong>Area:</strong> {area} m²</span>
                        <span><FiHome/> <strong>Beds:</strong> {beds}</span>
                        <span><FiDroplet/> <strong>Baths:</strong> {bath}</span>
                    </div>

                    <h2>Description</h2>
                    <p className="auction-description">{description}</p>

                    <div className="bid-controls">
                        <button className="btn-bid" disabled={!isValidBid}>
                            <DollarSign size={18} style={{marginRight: '6px'}}/>
                            Place Bid
                        </button>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            className="bid-input"
                            value={bidValue}
                            onChange={e => setBidValue(e.target.value.replace(/\D/g, ''))}
                            placeholder={`Min. ${currentMin.toLocaleString()}`}
                        />

                    </div>
                </div>
            </div>

            <div className="auction-sidebar">
                <div className="auction-map" ref={mapRef}/>
                <div className="auction-history">
                    <h3>Bid History</h3>
                    <div className="history-list">
                        {history.map((e, i) => (
                            <div key={i} className="history-entry">
                                <span className="bidder">{e.bidder}</span>
                                <span className="price">{e.price.toLocaleString()} USDC</span>
                                <span className="time">{new Date(e.time).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auction;

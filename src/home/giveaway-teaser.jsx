import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/teaser.css';
import { useCountdown } from '../hooks/use_countdown';

const GiveawayTeaser = () => {
    
    const timeLeft = useCountdown('2026-09-07T23:59:59Z', 60000);
    
    return (
        <section className="giveaway-teaser">
            <div className="giveaway-teaser-container">
                <div className="giveaway-teaser-content">
                    <Gift className="teaser-icon" />
                    <h2 className="teaser-title">Win Your Share of $250K USDT</h2>
                    <div className="teaser-timer">
                        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m
                    </div>
                    <Link to="/giveaway" className="teaser-btn">
                        Enter Now <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section> 
    );
};

export default GiveawayTeaser;

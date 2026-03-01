import React, { useState, useEffect } from 'react';
import { mmv_logo_round } from '../assets';
import '../styles/page_loader.css';


const PageLoader = ({ isLoading, minimumLoadTime = 2000 }) => {
    const [shouldShow, setShouldShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Ensure minimum load time for branding
        const minimumTimer = setTimeout(() => {
            if (!isLoading) {
                setFadeOut(true);
                setTimeout(() => setShouldShow(false), 500);
            }
        }, minimumLoadTime);

        // If still loading after minimum time, wait for loading to complete
        if (!isLoading && shouldShow) {
            setFadeOut(true);
            setTimeout(() => setShouldShow(false), 500);
        }

        return () => clearTimeout(minimumTimer);
    }, [isLoading, minimumLoadTime, shouldShow]);

    if (!shouldShow) return null;

    return (
        <div className={`metavault-initial-page-loader ${fadeOut ? 'fade-out' : ''}`}>
            <div className="metavault-loader-main-content-wrapper">
                <div className="metavault-loader-logo-container">
                    <img src={mmv_logo_round} alt="MMV" className="metavault-loader-spinning-logo-image" />
                    <div className="metavault-loader-logo-background-glow"></div>
                </div>

                <div className="metavault-loader-text-content-section">
                    <h2 className="metavault-loader-main-heading-title">MetaMemeVault</h2>
                    <p className="metavault-loader-subtitle-description">Loading the ultimate meme-to-earn experience...</p>
                </div>

                <div className="metavault-loader-progress-indicator-section">
                    <div className="metavault-loader-progress-bar-container">
                        <div className="metavault-loader-progress-fill-animation"></div>
                    </div>
                    <div className="metavault-loader-animated-dots-container">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className="metavault-loader-features-checklist-section">
                    <div className="metavault-loader-individual-feature-item">
                        <span className="metavault-loader-feature-checkmark-icon">✓</span>
                        <span>Loading smart contracts...</span>
                    </div>
                    <div className="metavault-loader-individual-feature-item">
                        <span className="metavault-loader-feature-checkmark-icon">✓</span>
                        <span>Fetching token prices...</span>
                    </div>
                    <div className="metavault-loader-individual-feature-item">
                        <span className="metavault-loader-feature-checkmark-icon">✓</span>
                        <span>Initializing presale data...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PageLoader;
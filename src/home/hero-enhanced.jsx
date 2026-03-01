import React from "react";
import { Shield, Users, Lock, ChevronRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { icon_telegram, icon_twitter, shib_logo, pepe_logo, neiro_logo, bonk_logo } from "../assets";
import { TELEGRAM_LINK, TWITTER_LINK } from "../config/social_helpers";

const EnhancedHero = ({ currentStage, stagePrice, bonusPercent, totalRaised, totalHolders, progress, tokensLeft, isLoading }) => {

  const openWhitepaper = () => {
    window.open("/whitepaper", "_blank");
  };

  const openAuditReport = () => {
    window.open("/audit", "_self");
  };

  const STAGE_1_END_DATE = new Date('2026-03-30T23:59:59Z'); // Example: Jan 15, 2025 

  const calculateDaysLeft = () => {
    const now = new Date();
    const diffTime = STAGE_1_END_DATE - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft();

  // Stage 1 target is $385K
  const STAGE_1_TARGET = "$385K";

  // Format numbers for display
  const formatStagePrice = (price) => {
    if (!price) return "0.008";
    return typeof price === 'string' ? price : price.toFixed(3);
  };

  const formatBonusPercent = (bonus) => {
    if (!bonus) return "200";
    return bonus.toString();
  };

  const formatCurrentStage = (stage) => {
    return stage || 1;
  };

  const displayStage = formatCurrentStage(currentStage);

  return (
    <div className="hero-v2-content">
      {/* STATUS BADGE - COMES FIRST */}
      <div className="hero-v2-badge">
        <Sparkles size={14} />
        <span>PRESALE STAGE {displayStage} LIVE</span>
      </div>

      {/* URGENT FOMO BANNER - COMES SECOND */}
      <div className="hero-v2-urgent-banner">
        🚨 {daysLeft} DAYS LEFT | {STAGE_1_TARGET} TARGET | STAGE {displayStage} ENDING SOON
      </div>

      {/* MAIN HEADLINE - THE CONVERTER */}
      <h1 className="hero-v2-title">
        BUY $MMV NOW.
        <span className="hero-v2-title-gradient">
          EARN 142% APY IN SHIB, PEPE, BONK, NEIRO.
        </span>
      </h1>

      {/* ONE-LINE COMPARISON */}
      <div style={{display: "none"}} className="hero-v2-comparison-highlight">
        ✓ Not locked tokens. Tradeable rewards.
      </div>

      {/* 4 KEY CONVERTING STATS */}
      <div className="hero-v2-stats-grid">
        <div className="hero-v2-stat-card">
          <span className="hero-v2-stat-value">142% APY</span>
          <span className="hero-v2-stat-label">Staking Rate</span>
        </div>
        <div className="hero-v2-stat-card">
          <span className="hero-v2-stat-value">{STAGE_1_TARGET}</span>
          <span className="hero-v2-stat-label">{daysLeft} Days Left</span>
        </div>
        <div className="hero-v2-stat-card">
          <span className="hero-v2-stat-value">${formatStagePrice(stagePrice)}</span>
          <span className="hero-v2-stat-label">Stage {displayStage} Price</span>
        </div>
        <div className="hero-v2-stat-card">
          <span className="hero-v2-stat-value">{formatBonusPercent(bonusPercent)}%</span>
          <span className="hero-v2-stat-label">Bonus Tokens</span>
        </div>
      </div>

      {/* 200% BONUS - PROMINENT */}
      <div className="hero-v2-bonus-mega">
        <div className="hero-v2-bonus-glow"></div>
        <div className="hero-v2-bonus-content">
          <Zap className="hero-v2-bonus-icon" size={24} />
          <div className="hero-v2-bonus-text">
            <span className="hero-v2-bonus-label">UP TO</span>
            <span className="hero-v2-bonus-value">{formatBonusPercent(bonusPercent)}%</span>
            <span className="hero-v2-bonus-label">BONUS</span>
          </div>
        </div>
        <div className="hero-v2-bonus-subtext">{daysLeft} DAYS ONLY</div>
      </div>

      {/* TRUST INDICATORS - NO VANITY METRICS */}
      <div className="hero-v2-trust">
        <div className="hero-v2-trust-item">
          <Shield size={16} />
          <span>Coinsult Audit</span>
        </div>
        <div className="hero-v2-trust-item">
          <Lock size={16} />
          <span>Secure Treasury</span>
        </div>
      </div>

      {/* REWARD COINS WITH APY REMINDER */}
      <div className="hero-v2-rewards">
        <span className="hero-v2-rewards-label">EARN 142% APY IN:</span>
        <div className="hero-v2-coin-grid">
          <div className="hero-v2-coin-logo" title="SHIB">
            <img src={shib_logo} alt="SHIB" />
          </div>
          <div className="hero-v2-coin-logo" title="PEPE">
            <img src={pepe_logo} alt="PEPE" />
          </div>
          <div className="hero-v2-coin-logo" title="BONK">
            <img src={bonk_logo} alt="BONK" />
          </div>
          <div className="hero-v2-coin-logo" title="NEIRO">
            <img src={neiro_logo} alt="NEIRO" />
          </div>
        </div>
      </div>

      {/* CTA BUTTONS */}
      <div className="hero-v2-buttons">
        <button
          onClick={openWhitepaper}
          className="hero-v2-btn hero-v2-btn-secondary">
          <span>Whitepaper</span>
          <ChevronRight size={16} />
        </button>
        <button
          onClick={openAuditReport}
          className="hero-v2-btn hero-v2-btn-secondary">
          <span>Audit Report</span>
          <Shield size={16} />
        </button>
      </div>

      {/* SOCIAL LINKS */}
      <div className="hero-v2-social">
        <a
          href={TWITTER_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-v2-social-icon"
          aria-label="X (Twitter)">
          <img src={icon_twitter} alt="X" />
        </a>
        <a
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-v2-social-icon"
          aria-label="Telegram">
          <img src={icon_telegram} alt="Telegram" />
        </a>
      </div>
    </div>
  );
};

export default EnhancedHero;
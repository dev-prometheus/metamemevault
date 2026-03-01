// pages/giveaway/gw-position.jsx
import { Trophy, TrendingUp, DollarSign, Users, Zap, Gift } from "lucide-react";

const GiveawayPosition = ({ position, points, loading }) => {
    if (loading) {
        return (
            <section className="gw-position">
                <div className="gw-position-card loading">
                    <div className="gw-position-skeleton"></div>
                </div>
            </section>
        );
    }

    const getPrizeTierInfo = (tier) => {
        switch(tier) {
            case 'TOP_10_USDT':
                return {
                    label: 'Top 10',
                    icon: '🏆',
                    color: '#FFD700',
                    description: 'Eligible for $250K USDT prize pool'
                };
            case 'TOP_110_MMV':
                return {
                    label: 'Top 110',
                    icon: '🥈',
                    color: '#C0C0C0',
                    description: 'Eligible for $100K $MMV prize pool'
                };
            default:
                return {
                    label: 'Participant',
                    icon: '🎁',
                    color: '#6d7aff',
                    description: 'Eligible for random draw prizes'
                };
        }
    };

    const tierInfo = position?.prizeTier ? getPrizeTierInfo(position.prizeTier) : null;

    return (
        <section className="gw-position">
            <div className="gw-position-card">
                {/* Header */}
                <div className="gw-position-header">
                    <h2 className="gw-section-title">
                        <Trophy className="gw-title-icon" />
                        Your Giveaway Status
                    </h2>
                </div>

                {/* Main Stats */}
                <div className="gw-position-main">
                    <div className="gw-position-rank">
                        <div className="gw-rank-badge">
                            <span className="gw-rank-icon">{tierInfo?.icon || '🎯'}</span>
                            <div className="gw-rank-info">
                                <span className="gw-rank-number">#{position?.rank || '—'}</span>
                                <span className="gw-rank-label">Current Rank</span>
                            </div>
                        </div>
                        {tierInfo && (
                            <div  className="gw-tier-badge" style={{ borderColor: tierInfo.color, display: "none" }}>
                                <span style={{ color: tierInfo.color }}>{tierInfo.label}</span>
                            </div>
                        )}
                    </div>

                    <div className="gw-position-points">
                        <div className="gw-total-points">
                            <TrendingUp className="gw-points-icon" />
                            <div className="gw-points-info">
                                <span className="gw-points-value">{points?.totalPoints?.toLocaleString() || '0'}</span>
                                <span className="gw-points-label">Total Points</span>
                            </div>
                        </div>
                        {position?.totalParticipants > 0 && (
                            <div style={{ display: "none" }} className="gw-percentile">
                                Top {position?.percentile || 0}%
                            </div>
                        )}
                    </div>
                </div>

                {/* Prize Tier Info */}
                {tierInfo && (
                    <div style={{display: "none"}} className="gw-tier-info">
                        <Zap size={16} />
                        <span>{tierInfo.description}</span>
                    </div>
                )}

                {/* Points Breakdown */}
                <div className="gw-points-breakdown">
                    <h4 className="gw-breakdown-title">Points Breakdown</h4>
                    <div className="gw-breakdown-grid">
                        <div className="gw-breakdown-item">
                            <div className="gw-breakdown-icon">
                                <DollarSign size={18} />
                            </div>
                            <div className="gw-breakdown-content">
                                <span className="gw-breakdown-label">Personal Purchases</span>
                                <span className="gw-breakdown-value">{points?.breakdown?.personalPurchase?.toLocaleString() || '0'} pts</span>
                            </div>
                        </div>

                        <div className="gw-breakdown-item">
                            <div className="gw-breakdown-icon">
                                <Users size={18} />
                            </div>
                            <div className="gw-breakdown-content">
                                <span className="gw-breakdown-label">Referral Purchases</span>
                                <span className="gw-breakdown-value">{points?.breakdown?.referralPurchase?.toLocaleString() || '0'} pts</span>
                            </div>
                        </div>

                        <div className="gw-breakdown-item">
                            <div className="gw-breakdown-icon">
                                <Zap size={18} />
                            </div>
                            <div className="gw-breakdown-content">
                                <span className="gw-breakdown-label">Active Referrals</span>
                                <span className="gw-breakdown-value">{points?.breakdown?.activeReferrals?.toLocaleString() || '0'} pts</span>
                            </div>
                        </div>

                        <div className="gw-breakdown-item">
                            <div className="gw-breakdown-icon">
                                <Gift size={18} />
                            </div>
                            <div className="gw-breakdown-content">
                                <span className="gw-breakdown-label">Social Tasks</span>
                                <span className="gw-breakdown-value">{points?.breakdown?.socialTasks?.toLocaleString() || '0'} pts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Motivation Message */}
                <div className="gw-motivation">
                    <TrendingUp className="gw-mt-up" size={18} />
                    <span>Complete more tasks below to boost your ranking!</span>
                </div>
            </div>
        </section>
    );
};

export default GiveawayPosition;
import { Trophy, Award, Gift, DollarSign } from "lucide-react";

const GiveawayPrizes = () => {
    const prizes = [
        {
            rank: '1st Place',
            icon: '🥇',
            amount: '$75,000',
            currency: 'USDT',
            color: '#FFD700',
            glow: 'rgba(255, 215, 0, 0.3)'
        },
        {
            rank: '2nd Place',
            icon: '🥈',
            amount: '$50,000',
            currency: 'USDT',
            color: '#C0C0C0',
            glow: 'rgba(192, 192, 192, 0.3)'
        },
        {
            rank: '3rd Place',
            icon: '🥉',
            amount: '$35,000',
            currency: 'USDT',
            color: '#CD7F32',
            glow: 'rgba(205, 127, 50, 0.3)'
        }
    ];

    return (
        <section id="prizes" className="gw-prizes">
            <div className="gw-prizes-header">
                <h2 className="gw-section-title">
                    <Trophy className="gw-title-icon" />
                    Prize Breakdown
                </h2>
                <p className="gw-prizes-subtitle">
                    $350K total prize pool split across multiple tiers
                </p>
            </div>

            {/* Top 3 Prizes */}
            <div className="gw-top-prizes">
                {prizes.map((prize, index) => (
                    <div 
                        key={index} 
                        className={`gw-prize-card top ${index === 0 ? 'featured' : ''}`}
                        style={{ '--prize-color': prize.color, '--prize-glow': prize.glow }}>
                        <div className="gw-prize-rank">
                            <span className="gw-prize-icon">{prize.icon}</span>
                            <span className="gw-prize-rank-text">{prize.rank}</span>
                        </div>
                        <div className="gw-prize-amount">{prize.amount}</div>
                        <div className="gw-prize-currency">{prize.currency}</div>
                        {index === 0 && <div className="gw-prize-badge">Grand Prize</div>}
                    </div>
                ))}
            </div>

            {/* Other Prize Tiers */}
            <div className="gw-prize-tiers">
                {/* 4th-5th Place */}
                <div className="gw-prize-tier">
                    <div className="gw-tier-header">
                        <Award className="gw-tier-icon" />
                        <div className="gw-tier-info">
                            <h4 className="gw-tier-title">4th - 5th Place</h4>
                            <p className="gw-tier-desc">2 Winners</p>
                        </div>
                    </div>
                    <div className="gw-tier-amount">$25,000 USDT each</div>
                </div>

                {/* 6th-10th Place */}
                <div className="gw-prize-tier">
                    <div className="gw-tier-header">
                        <Award className="gw-tier-icon" />
                        <div className="gw-tier-info">
                            <h4 className="gw-tier-title">6th - 10th Place</h4>
                            <p className="gw-tier-desc">5 Winners</p>
                        </div>
                    </div>
                    <div className="gw-tier-amount">$13,000 USDT each</div>
                </div>

                {/* 11th-110th Place */}
                <div className="gw-prize-tier highlight">
                    <div className="gw-tier-header">
                        <DollarSign className="gw-tier-icon" />
                        <div className="gw-tier-info">
                            <h4 className="gw-tier-title">11th - 110th Place</h4>
                            <p className="gw-tier-desc">100 Winners</p>
                        </div>
                    </div>
                    <div className="gw-tier-amount">125,000 $MMV each</div>
                    <div className="gw-tier-note">~$1,000 worth at current price</div>
                </div>

                {/* Participation Prizes */}
                <div className="gw-prize-tier">
                    <div className="gw-tier-header">
                        <Gift className="gw-tier-icon" />
                        <div className="gw-tier-info">
                            <h4 className="gw-tier-title">Random Draw</h4>
                            <p className="gw-tier-desc">All other participants</p>
                        </div>
                    </div>
                    <div className="gw-tier-amount">10 winners × $500 USDT</div>
                    <div className="gw-tier-note">Selected randomly from remaining participants</div>
                </div>
            </div>

            {/* Total Prize Pool */}
            <div className="gw-prize-total">
                <div className="gw-prize-total-content">
                    <Trophy size={32} />
                    <div className="gw-prize-total-info">
                        <span className="gw-prize-total-label">Total Prize Pool</span>
                        <span className="gw-prize-total-amount">$250K USDT + $100K MMV</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiveawayPrizes;
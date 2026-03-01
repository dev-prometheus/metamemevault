import { Users, TrendingUp, Gift, Clock } from "lucide-react";

const GiveawayStats = ({ stats, loading }) => {
    if (loading) {
        return (
            <section className="gw-stats">
                <div className="gw-stats-grid">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="gw-stat-card loading">
                            <div className="gw-stat-skeleton"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="gw-stats">
            <div className="gw-stats-grid">
                <div className="gw-stat-card">
                    <div className="gw-stat-icon">
                        <Users />
                    </div>
                    <div className="gw-stat-content">
                        <div className="gw-stat-value">
                            {stats?.totalParticipants?.toLocaleString() || '0'}+
                        </div>
                        <div className="gw-stat-label">Total Participants</div>
                    </div>
                </div>

                <div className="gw-stat-card">
                    <div className="gw-stat-icon">
                        <TrendingUp />
                    </div>
                    <div className="gw-stat-content">
                        <div className="gw-stat-value">
                            {stats?.totalPoints?.toLocaleString() || '0'}+
                        </div>
                        <div className="gw-stat-label">Total Points Earned</div>
                    </div>
                </div>

                <div className="gw-stat-card highlight">
                    <div className="gw-stat-icon">
                        <Gift />
                    </div>
                    <div className="gw-stat-content">
                        <div className="gw-stat-value">$350K</div>
                        <div className="gw-stat-label">Total Prize Pool</div>
                    </div>
                </div>

                <div className="gw-stat-card">
                    <div className="gw-stat-icon">
                        <Clock />
                    </div>
                    <div className="gw-stat-content">
                        <div className="gw-stat-value">Apr 7</div>
                        <div className="gw-stat-label">Giveaway Ends</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiveawayStats;
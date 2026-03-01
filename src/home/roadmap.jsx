import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, Clock, Rocket, Zap, Users, Coins, Shield, TrendingUp, Star, Target } from "lucide-react"
import "../styles/home/roadmap.css";

const roadmapPhases = [
    {
        phase: "Phase One",
        title: "Foundation",
        status: "completed",
        progress: 100,
        items: [
            "Token contract creation and deployment",
            "Establishment of social media channels",
            "Presale website launch",
            "MemeTreasury Beta Release",
        ],
        icon: Rocket,
        color: "from-green-400 to-emerald-500",
        description: "Laying the groundwork for a revolutionary meme ecosystem",
        milestone: "Foundation Built",
        achievements: ["Contract Live", "Platform Ready", "Beta Released"]
    },
    {
        phase: "Phase Two",
        title: "Community Growth",
        status: "in-progress",
        progress: 75,
        items: [
            "Expand MetaMemeVault community",
            "Launch targeted marketing campaigns",
            "Forge strategic partnerships",
            "Boost social media engagement",
        ],
        icon: Users,
        color: "from-blue-400 to-cyan-500",
        description: "Building a vibrant and engaged meme community",
        milestone: "Community Built",
        achievements: ["Active Marketing", "Growing Community", "Partnerships"]
    },
    {
        phase: "Phase Three",
        title: "Launch & Rewards",
        status: "upcoming",
        progress: 0,
        items: [
            "Open claims for meme rewards",
            "Official $MMV token launch on DEXes",
            "Pursue CEX listings",
            "Implement liquidity incentives",
        ],
        icon: Coins,
        color: "from-yellow-400 to-orange-500",
        description: "Rewarding our community and expanding token accessibility",
        milestone: "Rewards Active",
        achievements: ["Claims Live", "DEX Launch", "CEX Listings"]
    },
    {
        phase: "Phase Four",
        title: "Expansion & Security",
        status: "upcoming",
        progress: 0,
        items: [
            "Conduct comprehensive security audits",
            "Form strategic partnerships",
            "MemeTreasury Alpha expansion",
            "Implement cross-chain support",
            "Plan future ecosystem enhancements",
        ],
        icon: Shield,
        color: "from-purple-400 to-violet-500",
        description: "Securing our platform and expanding its capabilities",
        milestone: "Full Ecosystem",
        achievements: ["Audited", "Multi-Chain", "Enhanced Features"]
    },
]

const Roadmap = () => {
    const [hoveredPhase, setHoveredPhase] = useState(null);
    const [visiblePhases, setVisiblePhases] = useState([]);
    const [animatedProgress, setAnimatedProgress] = useState({});
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const phaseIndex = parseInt(entry.target.dataset.phase);
                        setVisiblePhases(prev => [...new Set([...prev, phaseIndex])]);

                        // Animate progress bar
                        const phase = roadmapPhases[phaseIndex];
                        if (phase.progress > 0) {
                            setTimeout(() => {
                                const animateValue = (start, end, duration) => {
                                    const startTime = performance.now();
                                    const animate = (currentTime) => {
                                        const elapsed = currentTime - startTime;
                                        const progress = Math.min(elapsed / duration, 1);
                                        const current = start + (end - start) * progress;
                                        setAnimatedProgress(prev => ({ ...prev, [phaseIndex]: current }));
                                        if (progress < 1) {
                                            requestAnimationFrame(animate);
                                        }
                                    };
                                    requestAnimationFrame(animate);
                                };
                                animateValue(0, phase.progress, 2000);
                            }, phaseIndex * 300);
                        }
                    }
                });
            },
            { threshold: 0.2 }
        );

        const phaseElements = document.querySelectorAll('[data-phase]');
        phaseElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={20} className="rd-status-icon completed" />;
            case 'in-progress':
                return <Clock size={20} className="rd-status-icon in-progress" />;
            default:
                return <Target size={20} className="rd-status-icon upcoming" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'in-progress':
                return 'Active';
            default:
                return 'Coming Soon';
        }
    };

    return (
        <>
            <section id="roadmap" className="rd-section" ref={sectionRef}>
                {/* Background Elements */}
                <div className="rd-bg-wrapper">
                    <div className="rd-grid-pattern"></div>
                    <div className="rd-glow-orb rd-orb-1"></div>
                    <div className="rd-glow-orb rd-orb-2"></div>
                </div>

                <div className="container">
                    <div className="rd-content">
                        {/* Header */}
                        <div className="rd-header">
                            <div className="rd-badge">
                                <Zap size={16} />
                                <span>Execution Roadmap</span>
                            </div>
                            <h2 className="rd-title">Our Development Roadmap</h2>
                            <p className="rd-subtitle">
                                From foundation to global expansion—every milestone designed to maximize holder value
                                and establish $MMV as a leading meme ecosystem.
                            </p>

                            {/* Progress Overview */}
                            <div className="rd-progress-overview">
                                <div className="rd-overview-stat">
                                    <span className="rd-stat-value">1/4</span>
                                    <span className="rd-stat-label">Phases Complete</span>
                                </div>
                                <div className="rd-overview-stat">
                                    <span className="rd-stat-value">75%</span>
                                    <span className="rd-stat-label">Current Progress</span>
                                </div>
                                <div className="rd-overview-stat">
                                    <span className="rd-stat-value">Phase 2</span>
                                    <span className="rd-stat-label">Active Phase</span>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="rd-timeline">
                            <div className="rd-timeline-line">
                                <div className="rd-timeline-progress" style={{ width: '40%' }}></div>
                            </div>

                            {roadmapPhases.map((phase, index) => {
                                const Icon = phase.icon;
                                const isVisible = visiblePhases.includes(index);
                                const progress = animatedProgress[index] || 0;

                                return (
                                    <div
                                        key={index}
                                        className={`rd-phase-card ${phase.status} ${isVisible ? 'rd-visible' : ''} ${hoveredPhase === index ? 'rd-hovered' : ''}`}
                                        data-phase={index}
                                        onMouseEnter={() => setHoveredPhase(index)}
                                        onMouseLeave={() => setHoveredPhase(null)}
                                        style={{ '--animation-delay': `${index * 0.2}s` }}
                                    >
                                        {/* Card Glow */}
                                        <div className={`rd-card-glow bg-gradient-to-r ${phase.color}`}></div>

                                        {/* Timeline Connector */}
                                        <div className="rd-timeline-dot">
                                            <div className={`rd-dot-inner ${phase.status}`}>
                                                <Icon size={24} />
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="rd-card-content">
                                            {/* Header */}
                                            <div className="rd-card-header">
                                                <div className="rd-phase-info">
                                                    <span className="rd-phase-quarter">{phase.phase}</span>
                                                    <h3 className="rd-phase-title">{phase.title}</h3>
                                                </div>
                                                <div className="rd-status-badge">
                                                    {getStatusIcon(phase.status)}
                                                    <span>{getStatusText(phase.status)}</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            {phase.progress > 0 && (
                                                <div className="rd-progress-section">
                                                    <div className="rd-progress-header">
                                                        <span className="rd-progress-label">Progress</span>
                                                        <span className="rd-progress-value">{Math.round(progress)}%</span>
                                                    </div>
                                                    <div className="rd-progress-bar">
                                                        <div
                                                            className="rd-progress-fill"
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Description */}
                                            <p className="rd-phase-description">{phase.description}</p>

                                            {/* Milestone */}
                                            <div className="rd-milestone">
                                                <Star size={16} />
                                                <span>Key Milestone: {phase.milestone}</span>
                                            </div>

                                            {/* Items List */}
                                            <ul className="rd-items-list">
                                                {phase.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="rd-item">
                                                        {phase.status === "completed" ? (
                                                            <CheckCircle size={16} className="rd-item-icon completed" />
                                                        ) : phase.status === "in-progress" ? (
                                                            <Clock size={16} className="rd-item-icon in-progress" />
                                                        ) : (
                                                            <Target size={16} className="rd-item-icon upcoming" />
                                                        )}
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Achievements */}
                                            <div className="rd-achievements">
                                                {phase.achievements.map((achievement, idx) => (
                                                    <span key={idx} className="rd-achievement-tag">
                                                        {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Bottom CTA */}
                        <div className="rd-bottom-section">
                            <div className="rd-cta-card">
                                <div className="rd-cta-content">
                                    <h3>Ready to Join the Journey?</h3>
                                    <p>
                                        Join the MetaMemeVault ecosystem today. Every phase brings
                                        new opportunities for early supporters to maximize their rewards.
                                    </p>
                                    <div className="rd-next-milestone">
                                        <div className="rd-milestone-icon">
                                            <Coins size={24} />
                                        </div>
                                        <div className="rd-milestone-info">
                                            <span className="rd-milestone-title">Next Major Milestone</span>
                                            <span className="rd-milestone-desc">Pursuing exchange listings to increase liquidity</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Roadmap;
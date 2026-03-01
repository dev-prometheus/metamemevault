import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2, 
        minimumFractionDigits: 0
    }).format(num);  
};

const PurchaseCapacityBadge = ({ capacity, stagePrice }) => {
    if (!capacity) return null;

    // Don't show anything if user hasn't purchased yet
    if (capacity.currentTotal === 0) return null;

    // Simple status determination
    const getStatus = () => {
        if (capacity.isAtLimit) return 'limit-reached';
        if (capacity.percentUsed >= 90) return 'critical';
        if (capacity.percentUsed >= 75) return 'warning';
        return 'normal';
    };

    const status = getStatus();

    // If at limit, show clear message
    if (capacity.isAtLimit) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                marginBottom: '16px'
            }}>
                <XCircle size={18} color="#ef4444" />
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: '0.9rem',
                        color: '#ef4444',
                        fontWeight: '600',
                        marginBottom: '4px'
                    }}>
                        Wallet Limit Reached (10M tokens)
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: 'rgba(239, 68, 68, 0.8)'
                    }}>
                        To purchase more, please use a different wallet
                    </div>
                </div>
            </div>
        );
    }

    // For active wallets, show a subtle progress indicator
    return (
        <div style={{
            marginBottom: '16px',
            opacity: capacity.percentUsed < 50 ? 0.8 : 1
        }}>
            {/* Progress Bar */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.7)'
            }}>
                <span>Wallet Capacity</span>
                <span style={{
                    color: status === 'critical' ? '#ef4444' :
                        status === 'warning' ? '#fbbf24' :
                            '#4ade80',
                    fontWeight: '600'
                }}>
                    {capacity.percentUsed.toFixed(0)}% Used
                </span>
            </div>

            <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{
                    width: `${Math.min(capacity.percentUsed, 100)}%`,
                    height: '100%',
                    background: status === 'critical' ?
                        'linear-gradient(90deg, #ef4444, #dc2626)' :
                        status === 'warning' ?
                            'linear-gradient(90deg, #fbbf24, #f59e0b)' :
                            'linear-gradient(90deg, #4ade80, #22c55e)',
                    borderRadius: '3px',
                    transition: 'all 0.3s ease',
                    boxShadow: status === 'critical' ?
                        '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
                }} />
            </div>

            {/* Show warning when getting close */}
            {capacity.percentUsed >= 75 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    marginTop: '12px',
                    padding: '10px',
                    background: status === 'critical' ?
                        'rgba(239, 68, 68, 0.1)' :
                        'rgba(251, 191, 36, 0.1)',
                    border: `1px solid ${status === 'critical' ?
                            'rgba(239, 68, 68, 0.2)' :
                            'rgba(251, 191, 36, 0.2)'
                        }`,
                    borderRadius: '8px',
                    fontSize: '0.85rem'
                }}>
                    <AlertCircle
                        size={16}
                        color={status === 'critical' ? '#ef4444' : '#fbbf24'}
                        style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    <div>
                        <div style={{
                            color: status === 'critical' ? '#ef4444' : '#fbbf24',
                            fontWeight: '600',
                            marginBottom: '4px'
                        }}>
                            {status === 'critical' ?
                                `Only ${formatNumber(capacity.remainingCapacity)} tokens left!` :
                                'Approaching wallet limit'
                            }
                        </div>
                        <div style={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            lineHeight: '1.4'
                        }}>
                            You can buy up to {formatNumber(capacity.maxBasePurchasable)} more MMV
                            {stagePrice && capacity.maxPurchaseUSD > 0 && (
                                <span> (${formatNumber(capacity.maxPurchaseUSD)})</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseCapacityBadge;
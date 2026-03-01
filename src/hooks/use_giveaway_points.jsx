import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to fetch user's giveaway points and position
 * @param {string} address - User's wallet address
 * @param {number} mmvBalance - User's MMV balance
 * @param {number} referralVolume - Total MMV purchased by referrals
 * @param {number} activeReferrals - Number of active referrals
 * @returns {Object} - Points data, position, and refetch function
 */
export const useGiveawayPoints = (address, mmvBalance, referralVolume, activeReferrals) => {
    const [points, setPoints] = useState({
        totalPoints: 0,
        breakdown: {
            personalPurchase: 0,
            referralPurchase: 0,
            activeReferrals: 0,
            socialTasks: 0
        }
    });
    const [position, setPosition] = useState({
        rank: null,
        totalParticipants: 0,
        prizeTier: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPoints = useCallback(async () => {
        if (!address) return;

        setLoading(true);
        setError(null);

        try {
            // Fetch points
            const pointsResponse = await fetch(
                `/api/giveaway/get_points?` +
                `wallet=${address}&` +
                `mmvBalance=${mmvBalance || 0}&` +
                `referralVolume=${referralVolume || 0}&` +
                `activeReferrals=${activeReferrals || 0}`
            );

            const pointsData = await pointsResponse.json();

            if (pointsData.entered) {
                setPoints({
                    totalPoints: pointsData.totalPoints,
                    breakdown: pointsData.breakdown || {}
                });

                // Fetch position
                const positionResponse = await fetch(
                    `/api/giveaway/get_position?wallet=${address}`
                );
                const positionData = await positionResponse.json();

                setPosition({
                    rank: positionData.rank + Math.floor(Math.random() * (100 - 40 + 1)) + 40,
                    totalParticipants: positionData.totalParticipants,
                    prizeTier: positionData.prizeTier,
                    percentile: positionData.percentile
                });
            } else {
                // Not entered yet
                setPoints({
                    totalPoints: 0,
                    breakdown: {
                        personalPurchase: 0,
                        referralPurchase: 0,
                        activeReferrals: 0,
                        socialTasks: 0
                    }
                });
                setPosition({
                    rank: null,
                    totalParticipants: 0,
                    prizeTier: null
                });
            }

        } catch (err) {
            console.error('Error fetching giveaway data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [address, mmvBalance, referralVolume, activeReferrals]);

    useEffect(() => {
        if (address) {
            fetchPoints();
        }
    }, [fetchPoints, address]);

    return {
        points,
        position,
        loading,
        error,
        refetch: fetchPoints
    };
};
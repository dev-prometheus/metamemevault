import { useState, useEffect } from 'react';

const MMV_PRICE = 0.008;
const MIN_PURCHASE_USD = 50;

/**
 * Hook to check if user is eligible for giveaway
 * @param {string} address - User's wallet address
 * @param {number} mmvBalance - User's MMV token balance
 * @returns {Object} - Eligibility status and entry function
 */
export const useGiveawayEligibility = (address, mmvBalance) => {
    const [isEligible, setIsEligible] = useState(false);
    const [isEntered, setIsEntered] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [purchaseValue, setPurchaseValue] = useState(0);
    const [amountNeeded, setAmountNeeded] = useState(0);
    const [error, setError] = useState(null);

    // Check eligibility when balance changes
    useEffect(() => {
        if (!address || !mmvBalance) {
            setIsEligible(false);
            setPurchaseValue(0);
            setAmountNeeded(MIN_PURCHASE_USD);
            return;
        }

        const value = mmvBalance * MMV_PRICE;
        setPurchaseValue(value);

        const eligible = value >= MIN_PURCHASE_USD;
        setIsEligible(eligible);

        if (!eligible) {
            setAmountNeeded(MIN_PURCHASE_USD - value);
        } else {
            setAmountNeeded(0);
        }

        // Check if already entered
        checkIfEntered();
    }, [address, mmvBalance]);

    const checkIfEntered = async () => {
        if (!address) return;

        setIsChecking(true);
        try {
            const response = await fetch(
                `/api/giveaway/get_points?wallet=${address}&mmvBalance=0&referralVolume=0&activeReferrals=0`
            );
            const data = await response.json();
            setIsEntered(data.entered || false);
        } catch (err) {
            console.error('Error checking entry status:', err);
        } finally {
            setIsChecking(false);
        }
    };

    const enterGiveaway = async () => {
        if (!address || !isEligible) {
            setError('Not eligible to enter');
            return { success: false };
        }

        setIsEntering(true);
        setError(null);

        try {
            const response = await fetch('/api/giveaway/enter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress: address,
                    mmvBalance: mmvBalance
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to enter');
            }

            setIsEntered(true);
            return { success: true, data };

        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setIsEntering(false);
        }
    };

    return {
        isEligible,
        isEntered,
        isChecking,
        isEntering,
        purchaseValue,
        amountNeeded,
        minRequired: MIN_PURCHASE_USD,
        error,
        enterGiveaway,
        refetch: checkIfEntered
    };
};
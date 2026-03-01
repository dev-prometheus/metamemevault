import { useEffect } from 'react';
import { useNotifications } from '../components/activity-notification-manager';
import { ethers } from 'ethers';

// Contract ABIs (just the events we need)
const PRESALE_ABI = [
  'event TokensPurchased(address indexed buyer, uint256 baseTokens, uint256 bonusTokens, uint256 usdAmount, address referrer, bool isETH)'
];

const TREASURY_ABI = [
  'event MMVLocked(address indexed user, string indexed memeId, uint256 amount)'
];

export const useActivityListener = (presaleAddress, treasuryAddress, provider) => {
  const { addBuyNotification, addLockNotification } = useNotifications();

  useEffect(() => {
    if (!provider || !presaleAddress || !treasuryAddress) return;

    // Setup contracts
    const presaleContract = new ethers.Contract(presaleAddress, PRESALE_ABI, provider);
    const treasuryContract = new ethers.Contract(treasuryAddress, TREASURY_ABI, provider);

    // Listen to TokensPurchased event
    const handleTokensPurchased = (buyer, baseTokens, bonusTokens, usdAmount, referrer, isETH) => {
      const totalMMV = Number(ethers.formatEther(baseTokens)) + Number(ethers.formatEther(bonusTokens));
      const usd = Number(ethers.formatEther(usdAmount));

      addBuyNotification(buyer, totalMMV, usd);
    };

    // Listen to MMVLocked event
    const handleMMVLocked = (user, memeId, amount) => {
      const mmvAmount = Number(ethers.formatEther(amount));

      // Estimate reward (example: 2x-5x multiplier based on meme)
      const rewardMultipliers = {
        'shib': 1000000, // SHIB has many decimals
        'pepe': 500000,
        'bonk': 2000000,
        'neiro': 100000
      };

      const estimatedReward = mmvAmount * (rewardMultipliers[memeId] || 100000);

      addLockNotification(user, mmvAmount, memeId, estimatedReward);
    };

    // Attach event listeners
    presaleContract.on('TokensPurchased', handleTokensPurchased);
    treasuryContract.on('MMVLocked', handleMMVLocked);

    // Cleanup
    return () => {
      presaleContract.off('TokensPurchased', handleTokensPurchased);
      treasuryContract.off('MMVLocked', handleMMVLocked);
    };
  }, [presaleAddress, treasuryAddress, provider, addBuyNotification, addLockNotification]);
};

// Demo/Testing function - call this to test notifications
export const useDemoNotifications = (enabled = false) => {
  const { addBuyNotification, addLockNotification } = useNotifications();

  useEffect(() => {
    if (!enabled) return;

    const memeTokens = ['shib', 'pepe', 'bonk', 'neiro'];

    // Fallback prices for meme tokens
    const FALLBACK_PRICES = {
      'shib': 0.000025,
      'pepe': 0.0000092,
      'neiro': 0.000272,
      'bonk': 0.000032
    };

    // Generate random Ethereum address
    const generateRandomAddress = () => {
      const chars = '0123456789abcdef';
      let address = '0x';
      for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
      return address;
    };

    const generateRandomActivity = () => {
      const randomAddress = generateRandomAddress();
      const activityType = Math.random() > 0.5 ? 'buy' : 'lock';

      // if (activityType === 'buy') {
      //   // Range: 2,500 - 1,000,000 MMV
      //   const mmvAmount = Math.floor(Math.random() * 197500) + 2500;
      //   const mmvPrice = 0.008; // Current MMV price
      //   const usdAmount = mmvAmount * mmvPrice;

      //   addBuyNotification(randomAddress, mmvAmount, usdAmount);
      // } 
      if (activityType === 'lock') {

        // Range: 2,500 - 1,000,000 MMV for lock
        const mmvAmount = Math.floor(Math.random() * 197500) + 2500;
        const mmvPrice = 0.008;
        const usdAmount = mmvAmount * mmvPrice;

        // Calculate reward: 30% of USD amount divided by meme token price
        const randomMeme = memeTokens[Math.floor(Math.random() * memeTokens.length)];
        const rewardUsdValue = usdAmount * 0.30; // 30% of MMV USD value
        const rewardAmount = rewardUsdValue / FALLBACK_PRICES[randomMeme];

        addLockNotification(randomAddress, mmvAmount, randomMeme, rewardAmount);
      }
    }; 

    // Generate random activity every 8-15 seconds
    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * 540000) + 360000; // 30s - 2min
      return setTimeout(() => {
        generateRandomActivity();
        timeoutId = scheduleNext();
      }, delay);
    };

    let timeoutId = scheduleNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [enabled, addBuyNotification, addLockNotification]);
};

export default useActivityListener;
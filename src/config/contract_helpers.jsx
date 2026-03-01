export const USDTAddress = import.meta.env.VITE_USDT_ADDRESS;
export const REFERRAL_REWARDS_ADDRESS = import.meta.env.VITE_REFERRAL_REWARDS_ADDRESS;
export const PRESALE_CONTRACT_ADDRESS = import.meta.env.VITE_PRESALE_CONTRACT_ADDRESS;
export const MEME_TREASURY_ADDRESS = import.meta.env.VITE_MEME_TREASURY_ADDRESS;

export const PUBLIC_RPC_URL = import.meta.env.VITE_PUBLIC_RPC_URL;
export const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export const MMV_CURRENT_PRICE = 0.008;
export const MMV_EST_PRICE = 0.035;
export const REWARD_PERCENTAGE_PER_HOUR = 0.000208; // 0.0208% 
export const REWARD_DAYS = 92;

export const TOKEN_IDS = {
  neiro: "neiro-3",  
  shib: "shiba-inu",
  pepe: "pepe",
  bonk: "bonk",
};

export const formatTokenAmount = (bigint, decimals = 6, precision = 2) =>
  (Number(bigint) / 10 ** decimals).toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: decimals,
  });
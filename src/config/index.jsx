import { mainnet } from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

//get projectId
export const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not specified");
}
 
// create a metadata object - optional
export const metadata = {
  name: "MetaMemeVault",
  description: "Meme to Earn Memes",
  url: "https://www.metamemevault.com",
  icons: "https://www.metamemevault.com/logo.png",
};

export const networks = [mainnet];

export const ethersAdapter = new EthersAdapter();

// function to retrieve referral code if it exists
export const getReferralUid = () => {
  const referral_uid = localStorage.getItem("referralUid") ? localStorage.getItem("referralUid") : null;
  return referral_uid;
} 
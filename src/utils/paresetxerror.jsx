// utils/paresetxerror.jsx - Enhanced version
import { formatEther } from "ethers";

export const parseTxError = (error) => {
    // Map of custom error selectors to user-friendly messages
    const ERROR_MESSAGES = {
        // Purchase Limits
        "0x3261c792": {
            title: "Wallet Limit Reached",
            message: "You've reached the maximum 10M tokens per wallet (including bonuses).",
            action: "To continue purchasing, please use a different wallet address."
        },
        "0xfb8f41b2": {
            title: "Purchase Limit Exceeded",
            message: "This purchase would exceed your allowed limit.",
            action: "Try a smaller amount or use a different wallet."
        },

        // Timing Errors
        "0x8d87dbb6": {
            title: "Not Available",
            message: "This action is not currently available.",
            action: "Please try again later or contact support."
        },
        "0x1f2a2005": {
            title: "Already Claimed",
            message: "You have already claimed these tokens.",
            action: "Check your wallet for your MMV tokens."
        },
        "0x085de625": {
            title: "Too Early",
            message: "The claiming period hasn't started yet.",
            action: "Please wait for the claiming period to begin."
        },

        // Transaction Errors
        "0x90b8ec18": {
            title: "Transfer Failed",
            message: "The transaction couldn't be completed.",
            action: "Please check your balance and try again."
        },

        // Price Errors
        "0x19ca5ebb": {
            title: "Price Issue",
            message: "The ETH price is outside acceptable bounds.",
            action: "Please try again in a moment."
        },
        "0x234860ce": {
            title: "Outdated Price",
            message: "The price data needs to be refreshed.",
            action: "Please try again in a few seconds."
        },

        // Input Errors
        "0xc1d17bef": {
            title: "Invalid Input",
            message: "Please check your input values.",
            action: "Enter a valid amount and try again."
        }
    };

    // Helper function to extract error selector
    const getErrorSelector = (errorData) => {
        if (typeof errorData === 'string' && errorData.startsWith('0x')) {
            return errorData.slice(0, 10).toLowerCase();
        }
        return null;
    };

    // Try to get custom error from various error structures
    let selector = null;

    // Check different error data locations
    if (error?.data) {
        selector = getErrorSelector(error.data);
    } else if (error?.error?.data) {
        selector = getErrorSelector(error.error.data);
    } else if (error?.transaction?.data) {
        selector = getErrorSelector(error.transaction.data);
    }

    // If we found a custom error, return formatted message
    if (selector && ERROR_MESSAGES[selector]) {
        const errorInfo = ERROR_MESSAGES[selector];
        return `${errorInfo.message} ${errorInfo.action}`;
    }

    // Get base error message
    let message = error?.reason ||
        error?.message ||
        error?.error?.message ||
        error?.data?.message ||
        "Transaction failed";

    // Convert to string for processing
    message = String(message);

    // Handle specific error patterns with better messages

    // Insufficient funds - with detailed calculation
    if (message.toLowerCase().includes("insufficient funds")) {
        try {
            const match = message.match(/have (\d+) want (\d+)/);
            if (match) {
                const have = BigInt(match[1]);
                const want = BigInt(match[2]);
                const missing = want - have;
                const formattedMissing = Number(formatEther(missing)).toFixed(5);
                return `Insufficient ETH balance. You need ${formattedMissing} more ETH to complete this purchase.`;
            }
        } catch (err) {
            // Fallback if parsing fails
        }
        return "Insufficient balance. Please add more ETH to your wallet and try again.";
    }

    // User rejection
    if (message.includes("rejected") ||
        message.includes("User denied") ||
        message.includes("canceled") ||
        message.includes("user rejected")) {
        return "Transaction cancelled.";
    }

    // Contract paused
    if (message.includes("Pausable: paused") || message.includes("Paused")) {
        return "The presale is temporarily paused. Please try again later.";
    }

    // USDT specific
    if (message.includes("ERC20: insufficient allowance")) {
        return "Please approve USDT spending first, then try again.";
    }

    if (message.includes("ERC20: transfer amount exceeds balance")) {
        return "Insufficient USDT balance for this purchase.";
    }

    // Gas errors
    if (message.includes("out of gas")) {
        return "Transaction ran out of gas. Please try again with a higher gas limit.";
    }

    // Nonce issues
    if (message.includes("nonce")) {
        return "Transaction conflict detected. Please refresh the page and try again.";
    }

    // Network issues
    if (message.includes("network") || message.includes("timeout")) {
        return "Network error. Please check your connection and try again.";
    }

    // Missing revert data (estimation failure)
    if (message.includes("missing revert data") && message.includes("estimateGas")) {
        return "This transaction would fail. This might be due to insufficient balance, purchase limits, or invalid inputs. Please check and try again.";
    }

    // Clean up technical prefixes
    message = message
        .replace("execution reverted:", "")
        .replace("VM Exception while processing transaction:", "")
        .replace("revert", "")
        .trim();

    // If message is still too technical or contains hex data
    if ((message.includes("0x") && message.length > 50) ||
        message.length > 150 ||
        message.includes("VM") ||
        message.includes("bytes32")) {
        return "Transaction failed. Please check your inputs and try again. If the problem persists, contact support.";
    }

    // Return cleaned message
    return message || "Transaction failed. Please try again.";
};
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TreasuryContracts
 * @author MetaMemeVault
 * @notice Virtual locking mechanism for earning meme rewards
 * 
 * Users lock MMV to earn SHIB, NEIRO, PEPE, or BONK rewards.
 * Locks are virtual - tokens remain in user wallets.
 */
 
contract TreasuryContracts is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice Lock entry for tracking user's virtual locks
    struct LockEntry {
        uint256 mmvLocked;
        uint256 timeLocked;
    }

    // Core addresses
    address public mmvToken;
    address public rewardDistributor;
    address public multisigOwner;

    // Timing configuration
    uint256 public claimStartTime;
    uint256 public claimExpiryTime;

    // Treasury state
    bool public treasuryClaimStatus;

    // Lock tracking per memeId per user
    mapping(string => mapping(address => LockEntry[])) private lockEntries;
    mapping(address => mapping(string => bool)) public hasLocked;
    mapping(string => bool) public allowedMemeIds;
    mapping(address => string[]) private userMemeIds;

    // Aggregated tracking
    mapping(string => uint256) public totalLockedByMeme;
    mapping(address => uint256) public totalLockedByUser;
    uint256 public totalMMVLockedInTreasury;

    // Events
    event MMVLocked(
        address indexed user,
        string indexed memeId,
        uint256 amount
    );
    event RewardClaimed(address indexed user, string memeId, uint256 reward);
    event MemeIdUpdated(string memeId, bool status);
    event ClaimingEnabled(bool status);
    event RewardDistributorSet(address indexed distributor);
    event TokenRecovered(
        address indexed token,
        address indexed to,
        uint256 amount
    );

    // Errors
    error InvalidAddress();
    error InvalidAmount();
    error InvalidMemeId();
    error ClaimingNotLive();
    error ClaimingNotStarted();
    error ClaimingExpired();
    error NotAuthorized();
    error TransferFailed();

    /**
     * @notice Deploy treasury with initial configuration
     * @param _mmvToken MMV token address
     * @param _rewardDistributor Address that distributes rewards
     * @param _expiryTime When treasury expires
     * @param _multisigOwner Multisig for admin functions
     */
    constructor(
        address _mmvToken,
        address _rewardDistributor,
        uint256 _expiryTime,
        address _multisigOwner
    ) Ownable(msg.sender) {
        if (_mmvToken == address(0)) revert InvalidAddress();
        if (_rewardDistributor == address(0)) revert InvalidAddress();
        if (_multisigOwner == address(0)) revert InvalidAddress();

        mmvToken = _mmvToken;
        rewardDistributor = _rewardDistributor;
        claimExpiryTime = _expiryTime;
        multisigOwner = _multisigOwner;

        // Initialize allowed meme IDs
        allowedMemeIds["shib"] = true;
        allowedMemeIds["neiro"] = true;
        allowedMemeIds["pepe"] = true;
        allowedMemeIds["bonk"] = true;
    }

    // ============ User Functions ============

    /**
     * @notice Lock MMV tokens against a specific meme for rewards
     * @param memeId The meme to earn (shib/neiro/pepe/bonk)
     * @param amount Amount of MMV to virtually lock
     */
    function lockTokens(
        string calldata memeId, 
        uint256 amount
    ) external nonReentrant {
        if (amount == 0) revert InvalidAmount();
        if (!allowedMemeIds[memeId]) revert InvalidMemeId();

        // Record lock entry
        lockEntries[memeId][msg.sender].push(
            LockEntry({mmvLocked: amount, timeLocked: block.timestamp})
        );

        // Update tracking
        totalLockedByMeme[memeId] += amount;
        totalLockedByUser[msg.sender] += amount;
        totalMMVLockedInTreasury += amount;

        // Track user's meme participation
        if (!hasLocked[msg.sender][memeId]) {
            userMemeIds[msg.sender].push(memeId);
            hasLocked[msg.sender][memeId] = true;
        }

        emit MMVLocked(msg.sender, memeId, amount);
    }

    /**
     * @notice Claim meme rewards (called by distributor)
     * @param user User claiming
     * @param memeId Meme being claimed
     * @param rewardAmount Amount of meme tokens
     * @param rewardToken Token address of the meme
     */
    function claimReward(
        address user,
        string calldata memeId,
        uint256 rewardAmount,
        address rewardToken
    ) external nonReentrant {
        if (msg.sender != rewardDistributor) revert NotAuthorized();
        if (!treasuryClaimStatus) revert ClaimingNotLive();
        if (block.timestamp < claimStartTime) revert ClaimingNotStarted();
        if (block.timestamp > claimExpiryTime) revert ClaimingExpired();

        // Clear lock entries (prevents double claiming)
        delete lockEntries[memeId][user];

        // Transfer meme rewards
        if (rewardAmount > 0 && rewardToken != address(0)) {
            IERC20(rewardToken).safeTransfer(user, rewardAmount);
        }

        emit RewardClaimed(user, memeId, rewardAmount);
    }

    // ============ Admin Functions ============

    /**
     * @notice Update allowed meme IDs
     * @param memeId Meme identifier
     * @param status Whether it's allowed
     */
    function setAllowedMemeId(
        string calldata memeId,
        bool status
    ) external onlyOwner {
        allowedMemeIds[memeId] = status;
        emit MemeIdUpdated(memeId, status);
    }

    /**
     * @notice Enable/disable claiming
     * @param status New claiming status
     */
    function setTreasuryClaimStatus(bool status) external onlyOwner {
        treasuryClaimStatus = status;
        emit ClaimingEnabled(status);
    }

    /**
     * @notice Set claim start time
     * @param timestamp Start time
     */
    function setClaimStartTime(uint256 timestamp) external onlyOwner {
        claimStartTime = timestamp;
    }

    /**
     * @notice Set claim expiry time
     * @param timestamp Expiry time
     */
    function setClaimExpiryTime(uint256 timestamp) external onlyOwner {
        claimExpiryTime = timestamp;
    }

    /**
     * @notice Update reward distributor
     * @param distributor New distributor address
     */
    function setRewardDistributor(address distributor) external onlyOwner {
        if (distributor == address(0)) revert InvalidAddress();
        rewardDistributor = distributor;
        emit RewardDistributorSet(distributor);
    }

    /**
     * @notice Recover accidentally sent tokens
     * @param token Token to recover
     * @param amount Amount to recover
     */
    function recoverToken(address token, uint256 amount) external {
        if (msg.sender != multisigOwner) revert NotAuthorized();
        if (token == address(0)) revert InvalidAddress();
        if (amount == 0) revert InvalidAmount();

        IERC20(token).safeTransfer(multisigOwner, amount);
        emit TokenRecovered(token, multisigOwner, amount);
    }

    // ============ View Functions ============

    /**
     * @notice Get user's lock entries for a meme
     * @param user User address
     * @param memeId Meme identifier
     * @return Array of lock entries
     */
    function getLockedEntries(
        address user,
        string calldata memeId
    ) external view returns (LockEntry[] memory) {
        return lockEntries[memeId][user];
    }

    /**
     * @notice Get all meme IDs user has locked
     * @param user User address
     * @return Array of meme IDs
     */
    function getLockedMemeTokens(
        address user
    ) external view returns (string[] memory) {
        return userMemeIds[user];
    }

    /**
     * @notice Get total MMV locked by user
     * @param user User address
     * @return Total locked amount
     */
    function getTotalLockedMMV(address user) external view returns (uint256) {
        return totalLockedByUser[user];
    }

    /**
     * @notice Get total MMV locked in treasury
     * @return Total locked
     */
    function getTotalMMVInTreasury() external view returns (uint256) {
        return totalMMVLockedInTreasury;
    }

    /**
     * @notice Get user's total locked for specific meme
     * @param user User address
     * @param memeId Meme identifier
     * @return total Amount locked for this meme
     */
    function getUserMemeTotal(
        address user,
        string calldata memeId
    ) external view returns (uint256 total) {
        LockEntry[] memory entries = lockEntries[memeId][user];
        for (uint256 i = 0; i < entries.length; ) {
            total += entries[i].mmvLocked;
            unchecked {
                ++i;
            }
        }
    }

    /**
     * @notice Check if claiming is currently active
     * @return Whether users can claim
     */
    function isClaimingActive() external view returns (bool) {
        return
            treasuryClaimStatus &&
            block.timestamp >= claimStartTime &&
            block.timestamp <= claimExpiryTime;
    }

    // ============ Reject Direct ETH ============

    receive() external payable {
        revert TransferFailed();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 
 
/**
 * @title PresaleReferrals
 * @author MetaMemeVault
 * @notice Referral rewards system for presale participants
 * 
 * Tracks referrals and distributes 5% rewards from 2% token allocation.
 * Only presale contract can register referrals. Claims enabled post-presale.
 */
 
contract PresaleReferrals is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20; 

    // Referral tracking structure
    struct ReferralData {
        uint256 totalRewards;      // Total MMV rewards earned by referrer
        uint256 referralVolume;    // Total MMV purchased by their referrals
        uint256 totalReferrals;    // Number of unique users referred
        bool counted;              // Prevents duplicate counting for referred users
    }

    // Token and presale contract (set after deployment)
    IERC20 public mmvToken;                    // MMV token contract
    address public presaleContract;            // Authorized presale contract
    
    // Reward allocation and tracking
    uint256 public immutable referralAllocation;    // Total tokens allocated for referrals (immutable)
    uint256 public totalRewardsDistributed;         // Total rewards distributed to referrers
    uint256 public totalRewardsClaimed;             // Total rewards claimed by referrers
    uint256 public constant REFERRAL_REWARD_RATE = 500; // 5% in basis points (immutable)
    
    // Referral data storage
    mapping(address => ReferralData) public referrals;
    mapping(address => bool) public isReferrer;
    address[] public referrerList;

    // Access and claiming controls
    bool public claimingEnabled;               // Whether claiming is currently enabled
    uint256 public claimStartTime;             // When claiming period begins
    bool public tokenSet;                      // Whether MMV token has been set
    bool public presaleContractLocked;         // Whether presale contract can still be changed

    // Events for transparency
    event TokenSet(address indexed tokenAddress);
    event PresaleContractSet(address indexed presaleContract);
    event PresaleContractLocked();
    event ReferralRegistered(address indexed user, address indexed referrer, uint256 purchaseAmount, uint256 reward);
    event RewardClaimed(address indexed referrer, uint256 amount);
    event NewReferrerAdded(address indexed referrer);
    event ClaimingStatusUpdated(bool enabled);
    event ClaimStartTimeUpdated(uint256 timestamp);
    event TokenRecovered(address indexed token, address indexed to, uint256 amount);
    event EthRecovered(address indexed to, uint256 amount);

    // Custom errors for gas efficiency and clarity
    error TokenAlreadySet();
    error TokenNotSet();
    error InvalidTokenAddress();
    error InvalidPresaleContract();
    error PresaleContractNotSet();
    error PresaleContractAlreadyLocked();
    error OnlyPresaleContract();
    error InvalidAddresses();
    error SelfReferralNotAllowed();
    error InsufficientAllocation();
    error ClaimingNotEnabled();
    error ClaimingNotStarted();
    error NoRewardsToClaim();
    error InvalidTimestamp();
    error ZeroAmount();
    error TransferFailed();
    error InsufficientBalance();
    error CannotRecoverRewardToken();

    /**
     * @notice Creates a new presale referral contract
     * @dev Token address is set later since token contract deploys after this contract
     * @param _totalSupply Total supply of MMV tokens (used to calculate 2% allocation)
     */
    constructor(uint256 _totalSupply) Ownable(msg.sender) {
        if (_totalSupply == 0) revert ZeroAmount();
        
        // Set 2% of total supply as referral allocation (immutable)
        referralAllocation = (_totalSupply * 200) / 10000; // 2% in basis points
    }

    /**
     * @notice Sets the MMV token address (can only be called once by owner)
     * @dev Called after token contract is deployed
     * @param _mmvToken Address of the MMV token contract
     */
    function setToken(address _mmvToken) external onlyOwner {
        if (tokenSet) revert TokenAlreadySet();
        if (_mmvToken == address(0)) revert InvalidTokenAddress();
        
        mmvToken = IERC20(_mmvToken);
        tokenSet = true;
        
        emit TokenSet(_mmvToken);
    }

    /**
     * @notice Sets the authorized presale contract address
     * @dev Only this address can register referrals. Cannot be changed after first referral.
     * @param _presaleContract Address of the presale contract
     */
    function setPresaleContract(address _presaleContract) external onlyOwner {
        if (presaleContractLocked) revert PresaleContractAlreadyLocked();
        if (_presaleContract == address(0)) revert InvalidPresaleContract();
        
        presaleContract = _presaleContract;
        emit PresaleContractSet(_presaleContract);
    }

    /**
     * @notice Registers a referral and calculates rewards
     * @dev Can only be called by the authorized presale contract
     * @param user Address of the user making the purchase
     * @param referrer Address of the referrer
     * @param purchaseAmount Amount of MMV tokens purchased
     */
    function registerReferral(
        address user,
        address referrer,
        uint256 purchaseAmount
    ) external onlyPresaleContract nonReentrant {
        // Lock presale contract after first referral to prevent manipulation
        if (!presaleContractLocked) {
            presaleContractLocked = true;
            emit PresaleContractLocked();
        }

        // Input validation
        if (user == address(0) || referrer == address(0)) revert InvalidAddresses();
        if (user == referrer) revert SelfReferralNotAllowed();
        if (purchaseAmount == 0) revert ZeroAmount();

        // Calculate 5% reward
        uint256 rewardAmount = (purchaseAmount * REFERRAL_REWARD_RATE) / 10000;
        if (totalRewardsDistributed + rewardAmount > referralAllocation) {
            revert InsufficientAllocation();
        }

        // Update referrer's data
        ReferralData storage referrerData = referrals[referrer];
        referrerData.referralVolume += purchaseAmount;
        referrerData.totalRewards += rewardAmount;

        // Count unique referrals (prevent double counting)
        if (!referrals[user].counted) {
            referrerData.totalReferrals += 1;
            referrals[user].counted = true;
        }

        // Add referrer to list if first time
        if (!isReferrer[referrer]) {
            referrerList.push(referrer);
            isReferrer[referrer] = true;
            emit NewReferrerAdded(referrer);
        }

        // Update global tracking
        totalRewardsDistributed += rewardAmount;

        emit ReferralRegistered(user, referrer, purchaseAmount, rewardAmount);
    }

    /**
     * @notice Allows referrers to claim their earned rewards
     * @dev Claims all available rewards for the caller
     */
    function claimRewards() external nonReentrant {
        if (!tokenSet) revert TokenNotSet();
        if (!claimingEnabled) revert ClaimingNotEnabled();
        if (block.timestamp < claimStartTime) revert ClaimingNotStarted();

        uint256 claimAmount = referrals[msg.sender].totalRewards;
        if (claimAmount == 0) revert NoRewardsToClaim();

        // Update state before external call
        referrals[msg.sender].totalRewards = 0;
        totalRewardsClaimed += claimAmount;

        // Transfer rewards to referrer
        mmvToken.safeTransfer(msg.sender, claimAmount);

        emit RewardClaimed(msg.sender, claimAmount);
    }

    // === ADMIN FUNCTIONS ===

    /**
     * @notice Enables or disables reward claiming
     * @param enabled True to enable claiming, false to disable
     */
    function setClaimingEnabled(bool enabled) external onlyOwner {
        claimingEnabled = enabled;
        emit ClaimingStatusUpdated(enabled);
    }

    /**
     * @notice Sets when claiming period begins
     * @dev Cannot set time in the past
     * @param timestamp Unix timestamp when claiming should start
     */
    function setClaimStartTime(uint256 timestamp) external onlyOwner {
        if (timestamp < block.timestamp) revert InvalidTimestamp();
        
        claimStartTime = timestamp;
        emit ClaimStartTimeUpdated(timestamp);
    }

    /**
     * @notice Recovers accidentally sent tokens (except unclaimed MMV rewards)
     * @dev Owner can recover tokens sent by mistake, but not allocated MMV rewards
     * @param tokenAddress Address of token to recover
     * @param to Address to send recovered tokens to  
     * @param amount Amount of tokens to recover
     */
    function recoverToken(
        address tokenAddress,
        address to,
        uint256 amount
    ) external onlyOwner nonReentrant {
        if (to == address(0)) revert InvalidTokenAddress();
        if (tokenAddress == address(0)) revert InvalidTokenAddress();
        if (amount == 0) revert ZeroAmount();

        // Prevent recovery of MMV tokens that belong to referrers
        if (tokenSet && tokenAddress == address(mmvToken)) {
            uint256 contractBalance = mmvToken.balanceOf(address(this));
            uint256 unclaimedRewards = totalRewardsDistributed - totalRewardsClaimed;
            
            // Can only recover MMV tokens beyond what's allocated to referrers
            if (amount > (contractBalance - unclaimedRewards)) {
                revert CannotRecoverRewardToken();
            }
        }

        IERC20 tokenContract = IERC20(tokenAddress);
        if (amount > tokenContract.balanceOf(address(this))) {
            revert InsufficientBalance();
        }

        tokenContract.safeTransfer(to, amount);
        emit TokenRecovered(tokenAddress, to, amount);
    }

    /**
     * @notice Recovers accidentally sent ETH
     * @param to Address to send recovered ETH to
     * @param amount Amount of ETH to recover (in wei)
     */
    function recoverEth(address payable to, uint256 amount) external onlyOwner nonReentrant {
        if (to == address(0)) revert InvalidTokenAddress();
        if (amount == 0) revert ZeroAmount();
        if (amount > address(this).balance) revert InsufficientBalance();

        (bool success, ) = to.call{value: amount}("");
        if (!success) revert TransferFailed();

        emit EthRecovered(to, amount);
    }

    // === VIEW FUNCTIONS ===

    /**
     * @notice Returns referral data for a specific address
     * @param account Address to check
     * @return totalRewards Total MMV rewards earned
     * @return referralVolume Total MMV volume from referrals
     * @return totalReferrals Number of unique referrals
     * @return claimableRewards Currently claimable rewards
     */
    function getReferralData(address account) external view returns (
        uint256 totalRewards,
        uint256 referralVolume,
        uint256 totalReferrals,
        uint256 claimableRewards
    ) {
        ReferralData storage data = referrals[account];
        totalRewards = data.totalRewards;
        referralVolume = data.referralVolume;
        totalReferrals = data.totalReferrals;
        
        // Claimable rewards (same as total rewards in this simple model)
        claimableRewards = data.totalRewards;
    }

    /**
     * @notice Returns comprehensive contract information
     * @return _referralAllocation Total tokens allocated for referrals
     * @return _totalRewardsDistributed Total rewards distributed so far
     * @return _totalRewardsClaimed Total rewards claimed so far
     * @return _remainingAllocation Remaining allocation for new referrals
     * @return _totalReferrers Number of unique referrers
     * @return _claimingEnabled Whether claiming is currently enabled
     * @return _claimStartTime When claiming period starts
     * @return _rewardRate Current reward rate in basis points
     */
    function getContractInfo() external view returns (
        uint256 _referralAllocation,
        uint256 _totalRewardsDistributed,
        uint256 _totalRewardsClaimed,
        uint256 _remainingAllocation,
        uint256 _totalReferrers,
        bool _claimingEnabled,
        uint256 _claimStartTime,
        uint256 _rewardRate
    ) {
        _referralAllocation = referralAllocation;
        _totalRewardsDistributed = totalRewardsDistributed;
        _totalRewardsClaimed = totalRewardsClaimed;
        _remainingAllocation = referralAllocation - totalRewardsDistributed;
        _totalReferrers = referrerList.length;
        _claimingEnabled = claimingEnabled;
        _claimStartTime = claimStartTime;
        _rewardRate = REFERRAL_REWARD_RATE;
    }

    /**
     * @notice Returns paginated list of referrers (prevents DoS from large arrays)
     * @param start Starting index for pagination
     * @param limit Maximum number of referrers to return
     * @return referrers Array of referrer addresses within the specified range
     * @return totalCount Total number of referrers
     */
    function getReferrers(uint256 start, uint256 limit) external view returns (
        address[] memory referrers,
        uint256 totalCount
    ) {
        totalCount = referrerList.length;
        if (start >= totalCount) return (new address[](0), totalCount);
        
        uint256 end = start + limit > totalCount ? totalCount : start + limit;
        referrers = new address[](end - start);
        
        for (uint256 i = start; i < end; i++) {
            referrers[i - start] = referrerList[i];
        }
    }

    /**
     * @notice Returns contract's token balances
     * @return mmvBalance Contract's MMV token balance (0 if token not set)
     * @return ethBalance Contract's ETH balance
     */
    function getContractBalances() external view returns (
        uint256 mmvBalance,
        uint256 ethBalance
    ) {
        mmvBalance = tokenSet ? mmvToken.balanceOf(address(this)) : 0;
        ethBalance = address(this).balance;
    }

    /**
     * @notice Checks if claiming is currently available
     * @return True if users can currently claim rewards
     */
    function canClaim() external view returns (bool) {
        return tokenSet && claimingEnabled && block.timestamp >= claimStartTime;
    }

    /**
     * @notice Calculates potential reward for a purchase amount
     * @param purchaseAmount Amount of MMV tokens being purchased
     * @return rewardAmount Reward amount that would be earned (5% of purchase)
     */
    function calculateReward(uint256 purchaseAmount) external pure returns (uint256 rewardAmount) {
        rewardAmount = (purchaseAmount * REFERRAL_REWARD_RATE) / 10000;
    }

    /**
     * @notice Returns unclaimed rewards amount for transparency
     * @return unclaimedRewards Total rewards allocated but not yet claimed
     */
    function getUnclaimedRewards() external view returns (uint256 unclaimedRewards) {
        unclaimedRewards = totalRewardsDistributed - totalRewardsClaimed;
    }

    // === MODIFIERS ===

    /**
     * @dev Ensures only the authorized presale contract can call the function
     */
    modifier onlyPresaleContract() {
        if (presaleContract == address(0)) revert PresaleContractNotSet();
        if (msg.sender != presaleContract) revert OnlyPresaleContract();
        _;
    }

    // === FALLBACK FUNCTION ===

    /**
     * @dev Allows contract to receive ETH (for recovery purposes)
     */
    receive() external payable {
        // Contract can receive ETH - recoverable by owner
    }
}
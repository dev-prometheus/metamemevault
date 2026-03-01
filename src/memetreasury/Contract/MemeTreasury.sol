// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./TreasuryHelpers.sol"; 

// Interface for ERC20 with decimals function
interface IERC20Extended is IERC20 {
    function decimals() external view returns (uint8);
}

/**
 * @title MemeTreasury
 * @dev This contract allows users to lock MMV tokens in exchange for meme-based rewards.
 */
contract MemeTreasury is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20Extended;

    /// @notice Struct representing each user's lock entry
    struct LockEntry {
        uint256 mmvLocked; // Amount of MMV locked
        uint256 timeLocked; // Timestamp when MMV was locked
    }
    ///  @notice This struct is used to return locked meme data in a structured format.
    struct LockedMemeToken {
        bytes32 memeId;
        uint256 lockedAmount;
    }

    /// @notice Struct representing the total lock state of a user for a given memeId
    struct UserLockData {
        bool claimStatus; // Whether the user has claimed rewards
        uint256 totalMMVLocked; // Total MMV locked for a specific memeId
        LockEntry[] lockEntries; // Individual lock entries
    }

    // MMV Token contract
    IERC20Extended public mmvToken;

    // Addresses for the presale contract (where MMV is held) and reward distributor
    address public presaleContract;
    address public rewardDistributor;

    // Claiming settings
    uint256 public claimStartTime; // Timestamp when claiming starts
    bool public treasuryClaimStatus; // Global claim status

    // Total MMV locked in the treasury contract
    uint256 public totalMMVLockedInTreasury;

    // Mappings to track locked tokens per user and memeId
    mapping(address => mapping(bytes32 => UserLockData)) public userLocks; // user -> memeId -> lock data
    mapping(address => bytes32[]) private userMemeIds; // Tracks unique memeIds per user
    mapping(address => uint256) public totalLocked; // Tracks total locked MMV per user

    // Set of all unique users who locked MMV
    mapping(address => bool) private isUser;
    address[] private allUsers;

    // Events for tracking contract activity
    event TokensLocked(
        address indexed user,
        bytes32 indexed memeId,
        uint256 amount,
        uint256 timeLocked
    );
    event ClaimStatusUpdated(
        address indexed user,
        bytes32 indexed memeId,
        bool status
    );
    event MMVReleased(
        address indexed user,
        bytes32 indexed memeId,
        uint256 amount
    );
    event AdminUpdated(string parameter, address indexed newValue);
    event AdminUpdatedUint(string parameter, uint256 newValue);
    event TreasuryClaimStatusUpdated(bool status);
    event AllMMVReleasedToPresale(uint256 totalAmount);

    /**
     * @dev Constructor initializes the MemeTreasury contract.
     * @param _mmvToken Address of the MMV token contract.
     * @param _presaleContract Address of the presale contract that holds MMV tokens.
     */
    constructor(
        address _mmvToken,
        address _presaleContract
    ) Ownable(msg.sender) {
        require(
            _mmvToken != address(0) && _presaleContract != address(0),
            "Invalid addresses"
        );
        mmvToken = IERC20Extended(_mmvToken);
        presaleContract = _presaleContract;
    }

    /// @dev Restricts certain functions to the reward distributor.
    modifier onlyRewardDistributor() {
        require(msg.sender == rewardDistributor, "Not authorized");
        _;
    }

    /** ADMIN FUNCTIONS **/

    /// @notice Updates the presale contract address.
    function setPresaleContract(address _presaleContract) external onlyOwner {
        require(_presaleContract != address(0), "Invalid address");
        presaleContract = _presaleContract;
        emit AdminUpdated("PresaleContract", _presaleContract);
    }

    /// @notice Updates the reward distributor address.
    function setRewardDistributor(
        address _rewardDistributor
    ) external onlyOwner {
        require(_rewardDistributor != address(0), "Invalid address");
        rewardDistributor = _rewardDistributor;
        emit AdminUpdated("RewardDistributor", _rewardDistributor);
    }

    /// @notice Updates the claim start time.
    function setClaimStartTime(uint256 _claimStartTime) external onlyOwner {
        require(_claimStartTime > block.timestamp, "Invalid time");
        claimStartTime = _claimStartTime;
        emit AdminUpdatedUint("ClaimStartTime", _claimStartTime);
    }

    /// @notice Updates the global treasury claim status.
    function setTreasuryClaimStatus(bool _status) external onlyOwner {
        treasuryClaimStatus = _status;
        emit TreasuryClaimStatusUpdated(_status);
    }

    /** USER FUNCTIONS **/

    /**
     * @dev Locks MMV tokens under a specific memeId.
     */
    function lockTokens(
        string memory memeId,
        uint256 amount
    ) external nonReentrant {
        require(!treasuryClaimStatus, "Treasury claim started");
        require(amount > 0, "Cannot lock zero tokens");
        require(bytes(memeId).length > 0, "MemeId cannot be empty");

        bytes32 memeIdHash = keccak256(abi.encodePacked(memeId));
        mmvToken.safeTransferFrom(presaleContract, address(this), amount);

        UserLockData storage userLock = userLocks[msg.sender][memeIdHash];

        if (userLock.lockEntries.length == 0) {
            userMemeIds[msg.sender].push(memeIdHash);
            if (!isUser[msg.sender]) {
                isUser[msg.sender] = true;
                allUsers.push(msg.sender);
            }
        }

        userLock.totalMMVLocked += amount;
        userLock.lockEntries.push(LockEntry(amount, block.timestamp));
        userLock.claimStatus = false;
        totalMMVLockedInTreasury += amount;
        totalLocked[msg.sender] += amount;

        require(userLocks[msg.sender][memeIdHash].totalMMVLocked >= amount, "Invalid event data");
        emit TokensLocked(msg.sender, memeIdHash, amount, block.timestamp);
    }

    /// @notice Allows the reward distributor to update the claim status.
    function updateClaimStatus(
        address user,
        string memory memeId
    ) external onlyRewardDistributor {
        bytes32 memeIdHash = keccak256(abi.encodePacked(memeId));
        require(!userLocks[user][memeIdHash].claimStatus, "Already claimed");
        require(
            userLocks[user][memeIdHash].totalMMVLocked > 0,
            "No locked MMV"
        );

        userLocks[user][memeIdHash].claimStatus = true;
        emit ClaimStatusUpdated(user, memeIdHash, true);
    }

    /**
     * @dev Releases locked MMV back to the presale contract after rewards are claimed.
     */
    function releaseLockedMMV(
        address user,
        string memory memeId
    ) external nonReentrant {
        require(block.timestamp >= claimStartTime, "Claim period not started");

        bytes32 memeIdHash = keccak256(abi.encodePacked(memeId));
        require(userLocks[user][memeIdHash].claimStatus, "Rewards not claimed");
        require(
            userLocks[user][memeIdHash].totalMMVLocked > 0,
            "No MMV locked"
        );

        uint256 amount = userLocks[user][memeIdHash].totalMMVLocked;
        userLocks[user][memeIdHash].totalMMVLocked = 0;
        totalMMVLockedInTreasury -= amount;
        totalLocked[user] -= amount;

        mmvToken.safeTransfer(presaleContract, amount);

        require(userLocks[user][memeIdHash].totalMMVLocked == 0, "Event mismatch");
        emit MMVReleased(user, memeIdHash, amount);
    }

    /** TREASURY MANAGEMENT **/

    /// @notice Releases all locked MMV back to the presale contract in batches.
    function releaseAllMMVToPresale(
        uint256 batchSize
    ) external onlyOwner nonReentrant {
        require(block.timestamp >= claimStartTime, "Claim period not started");
        require(treasuryClaimStatus, "Treasury claim not active");

        uint256 length = allUsers.length;
        uint256 processedCount = 0;
        uint256 totalReleased = 0;

        for (uint256 i = 0; i < length && processedCount < batchSize; i++) {
            address user = allUsers[i];
            uint256 lockedAmount = totalLocked[user];

            if (lockedAmount > 0) {
                delete totalLocked[user];
                totalMMVLockedInTreasury -= lockedAmount;
                mmvToken.safeTransfer(presaleContract, lockedAmount);
                totalReleased += lockedAmount;
                processedCount++;
            }
        }

        require(totalReleased > 0, "No MMV released");
        emit AllMMVReleasedToPresale(totalReleased);
    }

    /**
     * @notice This function retrieves all memeIds and their locked MMV amounts for a given user.
     */
    function getLockedMemeTokens(
        address user
    ) external view returns (LockedMemeToken[] memory) {
        uint256 length = userMemeIds[user].length;
        LockedMemeToken[] memory lockedMemeTokens = new LockedMemeToken[](
            length
        );

        for (uint256 i = 0; i < length; i++) {
            bytes32 memeId = userMemeIds[user][i];
            lockedMemeTokens[i] = LockedMemeToken(
                memeId,
                userLocks[user][memeId].totalMMVLocked
            );
        }

        return lockedMemeTokens;
    }

    /**
     * @dev Returns the detailed lock entries for a specific user and memeId.
     */
    function getLockedEntries(
        address user,
        string memory memeId
    ) external view returns (LockEntry[] memory) {
        bytes32 memeIdHash = keccak256(abi.encodePacked(memeId)); // Convert string memeId to bytes32 hash
        return userLocks[user][memeIdHash].lockEntries;
    }

    /**
     * @dev Returns the total amount of MMV tokens locked by a specific user across all their memeIds.
     */
    function getTotalLockedMMV(address user) external view returns (uint256) {
        return totalLocked[user];
    }

    /**
     * @dev Returns the total amount of MMV tokens locked in the treasury across all users.
     */
    function getTotalMMVInTreasury() external view onlyOwner returns (uint256) {
        return totalMMVLockedInTreasury;
    }
}

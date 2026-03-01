// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title PresaleContracts
 * @author MetaMemeVault
 * @notice 5-stage presale with declining bonuses and referral integration
 * 
 * Accepts ETH/USDT payments. Base tokens claimable at presale end,
 * bonus tokens after 30-day lock. Chainlink oracle for ETH pricing.
 */
 
contract PresaleContracts is Ownable2Step, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ============ Structs ============
    struct Stage {
        uint256 tokensToSell;     // Base tokens in this stage
        uint256 pricePerTokenUSD; // Price in USD (18 decimals)
        uint256 bonusPercent;      // Bonus percentage (100 = 1%)
        bool locked;               // Lock status
    }

    struct UserInfo {
        uint256 baseTokens;        // Base tokens purchased
        uint256 bonusTokens;       // Bonus tokens earned
        uint256 totalSpentUSD;     // Total USD spent
        bool baseTokensClaimed;    // Base tokens claimed?
        bool bonusTokensClaimed;   // Bonus tokens claimed?
    }

    // ============ State Variables ============
    IERC20 public mmvToken;
    IERC20 public immutable usdtToken;
    AggregatorV3Interface public immutable priceFeed;
    
    address public referralRewards;
    address public paymentWallet;
    
    uint256 public maxTokensPerBuyer;
    uint256 public lastKnownETHPrice;
    uint256 public lastPriceUpdateTime;
    uint256 public referralGasLimit = 400000;
    
    uint8 public currentStage;
    bool public tokenSet;
    bool public claimingEnabled;
    
    uint256 public claimStartTime;
    uint256 public bonusUnlockTime;
    
    mapping(uint8 => Stage) public stages;
    mapping(address => UserInfo) public users;
    
    uint256 public totalBaseTokensSold;
    uint256 public totalBonusTokensAllocated;
    uint256 public totalBaseTokensClaimed;    // Track separately
    uint256 public totalBonusTokensClaimed;   // Track separately
    uint256 public totalUSDRaised;
    
    // ============ Constants ============
    uint256 private constant DECIMALS = 1e18;
    uint256 private constant MIN_PURCHASE = 1e18; // $1
    uint256 private constant MAX_ALLOCATION = 620_000_000 * 1e18;
    uint256 private constant MAX_PRICE_STALENESS = 14400; // 4 hours
    uint256 private constant MIN_ETH_PRICE = 1500e8;   // $1500 minimum
    uint256 private constant MAX_ETH_PRICE = 8000e8; // $8,000 maximum
    
    // ============ Events ============
    event TokensPurchased(
        address indexed buyer,
        uint256 baseTokens,
        uint256 bonusTokens,
        uint256 usdAmount,
        address referrer,
        bool isETH
    );
    event TokensClaimed(address indexed user, uint256 amount, bool isBonus);
    event StageAdvanced(uint8 newStage);
    event PriceOverridden(uint256 newPrice);
    event ReferralGasLimitUpdated(uint256 newLimit);

    // ============ Errors ============
    error InvalidInput(); 
    error NotAvailable();
    error AlreadyClaimed();
    error LimitExceeded();
    error TooEarly();
    error TransferFailed();
    error PriceOutOfBounds();
    error StalePrice(); 

    // ============ Constructor ============
    constructor(
        address _usdtToken,
        address _priceFeed,
        address _referralRewards,
        address _paymentWallet,
        uint256 _maxTokensPerBuyer,
        uint256 _fallbackETHPrice
    ) Ownable(msg.sender) {
        require(_usdtToken != address(0) && 
                _priceFeed != address(0) && 
                _referralRewards != address(0) && 
                _paymentWallet != address(0) &&
                _maxTokensPerBuyer > 0 &&
                _fallbackETHPrice >= MIN_ETH_PRICE &&
                _fallbackETHPrice <= MAX_ETH_PRICE, "Invalid params");

        usdtToken = IERC20(_usdtToken);
        
        // Get USDT decimals and validate (USDT typically has 6)
        require(IERC20Metadata(_usdtToken).decimals() == 6, "Not USDT");
        
        priceFeed = AggregatorV3Interface(_priceFeed);
        referralRewards = _referralRewards;
        paymentWallet = _paymentWallet;
        maxTokensPerBuyer = _maxTokensPerBuyer;
        lastKnownETHPrice = _fallbackETHPrice;
        lastPriceUpdateTime = block.timestamp;

        // Initialize stages
        stages[0] = Stage(48_000_000 * DECIMALS, 8e15, 200, false);   // $0.008, 200% bonus
        stages[1] = Stage(64_000_000 * DECIMALS, 12e15, 90, false);   // $0.012, 90% bonus
        stages[2] = Stage(72_000_000 * DECIMALS, 18e15, 45, false);   // $0.018, 45% bonus
        stages[3] = Stage(88_000_000 * DECIMALS, 25e15, 22, false);   // $0.025, 22% bonus
        stages[4] = Stage(128_000_000 * DECIMALS, 35e15, 11, false);  // $0.035, 11% bonus
    }

    // ============ Main Functions ============
    
    /**
     * @notice Set MMV token (one-time)
     */
    function setToken(address _mmvToken) external onlyOwner {
        if (tokenSet || _mmvToken == address(0)) revert InvalidInput();
        mmvToken = IERC20(_mmvToken);
        tokenSet = true;
    }

    /**
     * @notice Buy with ETH
     */
    function buyWithETH(
        address referrer,
        uint256 minTokensOut
    ) external payable nonReentrant whenNotPaused {
        if (!tokenSet || msg.value == 0 || currentStage >= 5) revert NotAvailable();

        uint256 ethPrice = _getETHPrice();
        uint256 usdAmount = (msg.value * ethPrice) / 1e8;
        
        if (usdAmount < MIN_PURCHASE) revert InvalidInput();

        Stage memory stage = stages[currentStage];
        uint256 baseTokens = (usdAmount * DECIMALS) / stage.pricePerTokenUSD;
        uint256 bonusTokens = (baseTokens * stage.bonusPercent) / 100;
        
        if (baseTokens + bonusTokens < minTokensOut) revert LimitExceeded();

        _processPurchase(msg.sender, usdAmount, baseTokens, bonusTokens, referrer);
        
        (bool sent, ) = paymentWallet.call{value: msg.value}("");
        if (!sent) revert TransferFailed();
        
        emit TokensPurchased(msg.sender, baseTokens, bonusTokens, usdAmount, referrer, true);
    }

    /**
     * @notice Buy with USDT
     */
    function buyWithUSDT(
        uint256 usdtAmount,
        address referrer
    ) external nonReentrant whenNotPaused {
        if (!tokenSet || usdtAmount == 0 || currentStage >= 5) revert NotAvailable();

        // Safe decimal conversion for USDT (handles 6 decimals properly)
        uint256 usdAmount = usdtAmount * 1e12;
        
        if (usdAmount < MIN_PURCHASE) revert InvalidInput();

        usdtToken.safeTransferFrom(msg.sender, paymentWallet, usdtAmount);
        
        Stage memory stage = stages[currentStage];
        uint256 baseTokens = (usdAmount * DECIMALS) / stage.pricePerTokenUSD;
        uint256 bonusTokens = (baseTokens * stage.bonusPercent) / 100;
        
        _processPurchase(msg.sender, usdAmount, baseTokens, bonusTokens, referrer);
        
        emit TokensPurchased(msg.sender, baseTokens, bonusTokens, usdAmount, referrer, false);
    }

    /**
     * @notice Claim base tokens
     */
    function claimBaseTokens() external nonReentrant {
        if (!tokenSet || !claimingEnabled) revert NotAvailable();
        if (block.timestamp < claimStartTime) revert TooEarly();
        
        UserInfo storage user = users[msg.sender];
        if (user.baseTokensClaimed || user.baseTokens == 0) revert AlreadyClaimed();
        
        user.baseTokensClaimed = true;
        totalBaseTokensClaimed += user.baseTokens; // Track base claims separately
        
        mmvToken.safeTransfer(msg.sender, user.baseTokens);
        emit TokensClaimed(msg.sender, user.baseTokens, false);
    }

    /**
     * @notice Claim bonus tokens
     */
    function claimBonusTokens() external nonReentrant {
        if (!tokenSet || !claimingEnabled) revert NotAvailable();
        if (block.timestamp < bonusUnlockTime) revert TooEarly();
        
        UserInfo storage user = users[msg.sender];
        if (user.bonusTokensClaimed || user.bonusTokens == 0) revert AlreadyClaimed();
        
        user.bonusTokensClaimed = true;
        totalBonusTokensClaimed += user.bonusTokens; // Track bonus claims separately
        
        mmvToken.safeTransfer(msg.sender, user.bonusTokens);
        emit TokensClaimed(msg.sender, user.bonusTokens, true);
    }

    // ============ Admin Functions ============
    
    /**
     * @notice Configure claiming
     */
    function setClaimingConfig(
        bool _enabled,
        uint256 _claimStart,
        uint256 _bonusUnlock
    ) external onlyOwner {
        require(_bonusUnlock > _claimStart, "Invalid times");
        claimingEnabled = _enabled;
        claimStartTime = _claimStart;
        bonusUnlockTime = _bonusUnlock;
    }

    /**
     * @notice Update payment wallet
     */
    function setPaymentWallet(address _wallet) external onlyOwner {
        if (_wallet == address(0)) revert InvalidInput();
        paymentWallet = _wallet;
    }

    /**
     * @notice Update referral gas limit
     */
    function setReferralGasLimit(uint256 _gasLimit) external onlyOwner {
        require(_gasLimit >= 50000 && _gasLimit <= 500000, "Invalid gas limit");
        referralGasLimit = _gasLimit;
        emit ReferralGasLimitUpdated(_gasLimit);
    }

    /**
     * @notice Lock a stage
     */
    function lockStage(uint8 _stage) external onlyOwner {
        if (_stage >= 5) revert InvalidInput();
        stages[_stage].locked = true;
    }

    /**
     * @notice Advance stage manually
     */
    function advanceStage() external onlyOwner {
        if (currentStage >= 4) revert InvalidInput();
        currentStage++;
        emit StageAdvanced(currentStage);
    }

    /**
     * @notice Override ETH price with bounds checking
     */
    function overrideETHPrice(uint256 _price) external onlyOwner {
        if (_price < MIN_ETH_PRICE || _price > MAX_ETH_PRICE) revert PriceOutOfBounds();
        
        // Require significant time since last update to prevent rapid manipulation
        require(block.timestamp >= lastPriceUpdateTime + 1 hours, "Too soon");
        
        lastKnownETHPrice = _price;
        lastPriceUpdateTime = block.timestamp;
        emit PriceOverridden(_price);
    }

    /**
     * @notice Update stage (only future stages)
     */
    function updateStage(
        uint8 _stageIndex,
        uint256 _tokensToSell,
        uint256 _pricePerTokenUSD,
        uint256 _bonusPercent
    ) external onlyOwner {
        if (_stageIndex >= 5 || 
            stages[_stageIndex].locked || 
            _stageIndex <= currentStage ||
            _bonusPercent > 500 ||
            _pricePerTokenUSD == 0) revert InvalidInput();

        stages[_stageIndex] = Stage(_tokensToSell, _pricePerTokenUSD, _bonusPercent, false);
    }

    /**
     * @notice Withdraw unsold tokens (properly accounts for unclaimed)
     */
    function withdrawUnsoldTokens(address _to) external onlyOwner {
        if (!tokenSet || _to == address(0)) revert InvalidInput();
        
        // Check if presale ended
        if (currentStage < 5) {
            bool hasTokensLeft = false;
            for (uint8 i = 0; i <= 4; i++) {
                if (stages[i].tokensToSell > 0) {
                    hasTokensLeft = true;
                    break;
                }
            }
            if (hasTokensLeft) revert NotAvailable();
        }

        uint256 balance = mmvToken.balanceOf(address(this));
        
        // Correctly calculate unclaimed tokens
        uint256 unclaimedBase = totalBaseTokensSold - totalBaseTokensClaimed;
        uint256 unclaimedBonus = totalBonusTokensAllocated - totalBonusTokensClaimed;
        uint256 totalUnclaimed = unclaimedBase + unclaimedBonus;
        
        if (balance > totalUnclaimed) {
            mmvToken.safeTransfer(_to, balance - totalUnclaimed);
        }
    }

    /**
     * @notice Recover stuck tokens
     */
    function recoverTokens(address _token, address _to, uint256 _amount) external onlyOwner {
        if (_to == address(0)) revert InvalidInput();
        
        if (tokenSet && _token == address(mmvToken)) {
            // Correctly calculate unclaimed tokens
            uint256 unclaimedBase = totalBaseTokensSold - totalBaseTokensClaimed;
            uint256 unclaimedBonus = totalBonusTokensAllocated - totalBonusTokensClaimed;
            uint256 totalUnclaimed = unclaimedBase + unclaimedBonus;
            
            uint256 balance = mmvToken.balanceOf(address(this));
            if (_amount > balance - totalUnclaimed) revert LimitExceeded();
        }
        
        IERC20(_token).safeTransfer(_to, _amount);
    }

    /**
     * @notice Emergency pause/unpause
     */
    function setPaused(bool _paused) external onlyOwner {
        if (_paused) _pause(); else _unpause();
    }

    // ============ View Functions ============
    
    /**
     * @notice Get current stage info
     */
    function getCurrentStageInfo() external view returns (
        uint256 price,
        uint256 tokensLeft,
        uint256 bonus,
        uint8 stage
    ) {
        Stage memory s = stages[currentStage];
        return (s.pricePerTokenUSD, s.tokensToSell, s.bonusPercent, currentStage);
    }

    /**
     * @notice Get user info
     */
    function getUserInfo(address _user) external view returns (
        uint256 baseTokens,
        uint256 bonusTokens,
        uint256 totalSpent,
        bool baseClaimed,
        bool bonusClaimed
    ) {
        UserInfo memory u = users[_user];
        return (u.baseTokens, u.bonusTokens, u.totalSpentUSD, u.baseTokensClaimed, u.bonusTokensClaimed);
    }

    /**
     * @notice Calculate tokens for USD amount
     */
    function calculateTokens(uint256 _usdAmount) external view returns (
        uint256 baseTokens,
        uint256 bonusTokens
    ) {
        if (currentStage >= 5) return (0, 0);
        Stage memory s = stages[currentStage];
        baseTokens = (_usdAmount * DECIMALS) / s.pricePerTokenUSD;
        bonusTokens = (baseTokens * s.bonusPercent) / 100;
    }

    /**
     * @notice Get presale statistics
     */
    function getPresaleStats() external view returns (
        uint256 baseSold,
        uint256 bonusAllocated,
        uint256 baseClaimed,
        uint256 bonusClaimed,
        uint256 raised,
        uint8 stage,
        bool ended
    ) {
        return (
            totalBaseTokensSold,
            totalBonusTokensAllocated,
            totalBaseTokensClaimed,
            totalBonusTokensClaimed,
            totalUSDRaised,
            currentStage,
            currentStage >= 5
        );
    }

    /**
     * @notice Get unclaimed tokens (for transparency)
     */
    function getUnclaimedTokens() external view returns (
        uint256 unclaimedBase,
        uint256 unclaimedBonus,
        uint256 totalUnclaimed
    ) {
        unclaimedBase = totalBaseTokensSold - totalBaseTokensClaimed;
        unclaimedBonus = totalBonusTokensAllocated - totalBonusTokensClaimed;
        totalUnclaimed = unclaimedBase + unclaimedBonus;
    }

    // ============ Internal Functions ============
    
    /**
     * @dev Get ETH price with consistent staleness check
     */
    function _getETHPrice() private returns (uint256) {
        try priceFeed.latestRoundData() returns (
            uint80,
            int256 price,
            uint256,
            uint256 updatedAt,
            uint80
        ) {
            // Check oracle data validity
            if (price <= 0 || 
                block.timestamp - updatedAt > MAX_PRICE_STALENESS ||
                uint256(price) < MIN_ETH_PRICE ||
                uint256(price) > MAX_ETH_PRICE) {
                // Oracle failed, check if we can use fallback
                if (block.timestamp - lastPriceUpdateTime > MAX_PRICE_STALENESS) {
                    revert StalePrice();
                }
                return lastKnownETHPrice;
            }
            
            // Update with fresh oracle price
            lastKnownETHPrice = uint256(price);
            lastPriceUpdateTime = block.timestamp;
            return uint256(price);
        } catch {
            // Oracle call failed, check fallback staleness
            if (block.timestamp - lastPriceUpdateTime > MAX_PRICE_STALENESS) {
                revert StalePrice();
            }
            return lastKnownETHPrice;
        }
    }

    /**
     * @dev Process purchase internally
     */
    function _processPurchase(
        address _buyer,
        uint256 _usdAmount,
        uint256 _baseTokens,
        uint256 _bonusTokens,
        address _referrer
    ) private {
        Stage storage stage = stages[currentStage];
        
        // Validations
        if (stage.tokensToSell < _baseTokens) revert LimitExceeded();
        
        uint256 totalNeeded = totalBaseTokensSold + totalBonusTokensAllocated + _baseTokens + _bonusTokens;
        if (totalNeeded > MAX_ALLOCATION) revert LimitExceeded();
        
        UserInfo storage user = users[_buyer];
        if (user.baseTokens + _baseTokens > maxTokensPerBuyer) {
            revert LimitExceeded();
        }

        // Update state
        user.baseTokens += _baseTokens;
        user.bonusTokens += _bonusTokens;
        user.totalSpentUSD += _usdAmount;

        stage.tokensToSell -= _baseTokens;
        totalBaseTokensSold += _baseTokens;
        totalBonusTokensAllocated += _bonusTokens;
        totalUSDRaised += _usdAmount; 

        // Register referral with configurable gas limit
        if (_referrer != address(0) && _referrer != _buyer) {
            try IReferralRewards(referralRewards).registerReferral{gas: referralGasLimit}(
                _buyer, 
                _referrer, 
                _baseTokens
            ) {} catch {}
        }

        // Auto-advance stage if needed
        if (stage.tokensToSell == 0 && currentStage < 4) {
            currentStage++;
            emit StageAdvanced(currentStage);
        }
    }
}

interface IReferralRewards {
    function registerReferral(address user, address referrer, uint256 amount) external;
}
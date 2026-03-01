// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title TeamVesting
 * @author MetaMemeVault
 * @notice 12-month linear vesting for team allocation
 * 
 * Vests 70M MMV tokens linearly over 12 months starting Dec 7, 2025.
 * Beneficiary can claim vested tokens anytime. No modifications after deployment.
 */
 
contract TeamVesting is Ownable2Step, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Token being vested (set after deployment since token deploys after this contract)
    IERC20 public token;
    
    // Vesting parameters (immutable after deployment)
    address public immutable beneficiary;       // Address that will receive vested tokens
    uint256 public immutable start;             // Vesting start timestamp
    uint256 public immutable cliff;             // Cliff end timestamp
    uint256 public immutable duration;          // Total vesting duration in seconds
    uint256 public immutable totalAllocation;   // Total tokens to be vested
    
    // State variables
    uint256 public released;                    // Tokens already released
    bool public tokenSet;                       // Whether token address has been set
    
    // Events for transparency
    event TokenSet(address indexed tokenAddress);
    event TokensReleased(address indexed beneficiary, uint256 amount);
    event TokenRecovered(address indexed token, address indexed to, uint256 amount);

    // Custom errors for gas efficiency and clarity
    error InvalidBeneficiary();
    error InvalidTimeParameters();
    error InvalidAllocation();
    error TokenAlreadySet();
    error TokenNotSet();
    error CliffNotReached();
    error NoTokensToRelease();
    error CannotRecoverVestedToken();
    error InvalidTokenAddress();
    error TransferFailed();

    /**
     * @notice Creates a new team vesting contract
     * @dev Token address is set later since token contract deploys after vesting contracts
     * @param _beneficiary Address that will receive the vested tokens
     * @param _start Vesting start timestamp (Unix timestamp)
     * @param _cliffDuration Duration of cliff period in seconds
     * @param _duration Total vesting duration in seconds (must be >= cliff duration)
     * @param _totalAllocation Total amount of tokens to be vested
     */
    constructor(
        address _beneficiary,
        uint256 _start,
        uint256 _cliffDuration,
        uint256 _duration,
        uint256 _totalAllocation
    ) Ownable(msg.sender) {
        // Validate beneficiary address
        if (_beneficiary == address(0)) revert InvalidBeneficiary();
        
        // Validate time parameters
        if (_start == 0) revert InvalidTimeParameters();
        if (_cliffDuration > _duration) revert InvalidTimeParameters();
        if (_duration == 0) revert InvalidTimeParameters();
        
        // Validate allocation
        if (_totalAllocation == 0) revert InvalidAllocation();
        
        // Set immutable parameters
        beneficiary = _beneficiary;
        start = _start;
        cliff = _start + _cliffDuration;
        duration = _duration;
        totalAllocation = _totalAllocation;
    }

    /**
     * @notice Sets the token address (can only be called once by owner)
     * @dev Called after token contract is deployed
     * @param _token Address of the MMV token contract
     */
    function setToken(address _token) external onlyOwner {
        if (tokenSet) revert TokenAlreadySet();
        if (_token == address(0)) revert InvalidTokenAddress();
        
        token = IERC20(_token);
        tokenSet = true;
        
        emit TokenSet(_token);
    }

    /**
     * @notice Releases vested tokens to the beneficiary
     * @dev Can be called by anyone, but tokens only go to beneficiary
     *      Uses nonReentrant to prevent reentrancy attacks
     */
    function release() external nonReentrant {
        if (!tokenSet) revert TokenNotSet();
        if (block.timestamp < cliff) revert CliffNotReached();
        
        uint256 unreleased = _releasableAmount();
        if (unreleased == 0) revert NoTokensToRelease();
        
        // Update state before external call
        released += unreleased;
        
        // Transfer tokens to beneficiary
        token.safeTransfer(beneficiary, unreleased);
        
        emit TokensReleased(beneficiary, unreleased);
    }

    /**
     * @notice Recovers accidentally sent tokens (except the vested token)
     * @dev Owner can recover tokens sent by mistake, but not the vested MMV tokens
     * @param tokenAddress Address of token to recover
     * @param to Address to send recovered tokens to
     * @param amount Amount of tokens to recover
     */
    function recoverToken(
        address tokenAddress,
        address to,
        uint256 amount
    ) external onlyOwner {
        if (to == address(0)) revert InvalidTokenAddress();
        if (tokenAddress == address(0)) revert InvalidTokenAddress();
        
        // Prevent recovery of the vested token to avoid rug pulls
        if (tokenSet && tokenAddress == address(token)) {
            revert CannotRecoverVestedToken();
        }
        
        if (amount == 0) revert InvalidAllocation();
        
        IERC20 tokenContract = IERC20(tokenAddress);
        uint256 contractBalance = tokenContract.balanceOf(address(this));
        if (amount > contractBalance) revert InvalidAllocation();
        
        tokenContract.safeTransfer(to, amount);
        
        emit TokenRecovered(tokenAddress, to, amount);
    }

    // === VIEW FUNCTIONS ===

    /**
     * @notice Returns the amount of tokens currently releasable
     * @return Amount of tokens that can be released now
     */
    function releasable() external view returns (uint256) {
        return _releasableAmount();
    }

    /**
     * @notice Returns the amount of tokens that have vested up to current time
     * @return Amount of tokens that have vested (including already released)
     */
    function vested() external view returns (uint256) {
        return _vestedAmount(block.timestamp);
    }

    /**
     * @notice Returns comprehensive vesting information
     * @return _start Vesting start timestamp
     * @return _cliff Cliff end timestamp  
     * @return _end Vesting end timestamp
     * @return _total Total tokens allocated
     * @return _released Tokens already released
     * @return _releasable Tokens currently releasable
     * @return _remaining Tokens not yet vested
     */
    function getVestingInfo() external view returns (
        uint256 _start,
        uint256 _cliff,
        uint256 _end,
        uint256 _total,
        uint256 _released,
        uint256 _releasable,
        uint256 _remaining
    ) {
        _start = start;
        _cliff = cliff;
        _end = start + duration;
        _total = totalAllocation;
        _released = released;
        _releasable = _releasableAmount();
        _remaining = totalAllocation - _vestedAmount(block.timestamp);
    }

    /**
     * @notice Check if vesting has started
     * @return True if vesting period has begun
     */
    function hasStarted() external view returns (bool) {
        return block.timestamp >= start;
    }

    /**
     * @notice Check if cliff period has ended
     * @return True if cliff period is over and tokens can be released
     */
    function isCliffReached() external view returns (bool) {
        return block.timestamp >= cliff;
    }

    /**
     * @notice Check if vesting is complete
     * @return True if all tokens have vested
     */
    function isVestingComplete() external view returns (bool) {
        return block.timestamp >= (start + duration);
    }

    /**
     * @notice Returns contract's token balance
     * @dev Useful for verifying contract is properly funded
     * @return Contract's balance of the vested token (0 if token not set)
     */
    function getContractBalance() external view returns (uint256) {
        if (!tokenSet) return 0;
        return token.balanceOf(address(this));
    }

    // === INTERNAL FUNCTIONS ===

    /**
     * @dev Calculates how much has vested as of a given time
     * @param currentTime Timestamp to calculate vesting for
     * @return Amount of tokens vested at given time
     */
    function _vestedAmount(uint256 currentTime) internal view returns (uint256) {
        if (currentTime < cliff) {
            return 0;
        } else if (currentTime >= start + duration) {
            return totalAllocation;
        } else {
            // Linear vesting from cliff to end
            uint256 timeFromStart = currentTime - start;
            return (totalAllocation * timeFromStart) / duration;
        }
    }

    /**
     * @dev Calculates how much can be released right now
     * @return Amount of tokens that can be released
     */
    function _releasableAmount() internal view returns (uint256) {
        return _vestedAmount(block.timestamp) - released;
    }
}
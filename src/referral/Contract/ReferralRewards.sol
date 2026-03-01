// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/** 
 * @dev Interface of the ERC-20 standard as defined in the ERC.
 */ 
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        _nonReentrantBefore();
        _;
        _nonReentrantAfter();
    }

    function _nonReentrantBefore() private {
        // On the first call to nonReentrant, _status will be _NOT_ENTERED
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;
    }

    function _nonReentrantAfter() private {
        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Returns true if the reentrancy guard is currently set to "entered", which indicates there is a
     * `nonReentrant` function in the call stack.
     */
    function _reentrancyGuardEntered() internal view returns (bool) {
        return _status == _ENTERED;
    }
}

/**
 * @dev Collection of common custom errors used in multiple contracts
 *
 * IMPORTANT: Backwards compatibility is not guaranteed in future versions of the library.
 * It is recommended to avoid relying on the error API for critical functionality.
 *
 * _Available since v5.1._
 */
library Errors {
    /**
     * @dev The ETH balance of the account is not enough to perform the operation.
     */
    error InsufficientBalance(uint256 balance, uint256 needed);

    /**
     * @dev A call to an address target failed. The target may have reverted.
     */
    error FailedCall();

    /**
     * @dev The deployment failed.
     */
    error FailedDeployment();

    /**
     * @dev A necessary precompile is missing.
     */
    error MissingPrecompile(address);
}

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev There's no code at `target` (it is not a contract).
     */
    error AddressEmptyCode(address target);

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.8.20/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        if (address(this).balance < amount) {
            revert Errors.InsufficientBalance(address(this).balance, amount);
        }

        (bool success, bytes memory returndata) = recipient.call{value: amount}(
            ""
        );
        if (!success) {
            _revert(returndata);
        }
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain `call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason or custom error, it is bubbled
     * up by this function (like regular Solidity function calls). However, if
     * the call reverted with no returned reason, this function reverts with a
     * {Errors.FailedCall} error.
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     */
    function functionCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        return functionCallWithValue(target, data, 0);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     */
    function functionCallWithValue(
        address target,
        bytes memory data,
        uint256 value
    ) internal returns (bytes memory) {
        if (address(this).balance < value) {
            revert Errors.InsufficientBalance(address(this).balance, value);
        }
        (bool success, bytes memory returndata) = target.call{value: value}(
            data
        );
        return verifyCallResultFromTarget(target, success, returndata);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a static call.
     */
    function functionStaticCall(
        address target,
        bytes memory data
    ) internal view returns (bytes memory) {
        (bool success, bytes memory returndata) = target.staticcall(data);
        return verifyCallResultFromTarget(target, success, returndata);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but performing a delegate call.
     */
    function functionDelegateCall(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        return verifyCallResultFromTarget(target, success, returndata);
    }

    /**
     * @dev Tool to verify that a low level call to smart-contract was successful, and reverts if the target
     * was not a contract or bubbling up the revert reason (falling back to {Errors.FailedCall}) in case
     * of an unsuccessful call.
     */
    function verifyCallResultFromTarget(
        address target,
        bool success,
        bytes memory returndata
    ) internal view returns (bytes memory) {
        if (!success) {
            _revert(returndata);
        } else {
            // only check if target is a contract if the call was successful and the return data is empty
            // otherwise we already know that it was a contract
            if (returndata.length == 0 && target.code.length == 0) {
                revert AddressEmptyCode(target);
            }
            return returndata;
        }
    }

    /**
     * @dev Tool to verify that a low level call was successful, and reverts if it wasn't, either by bubbling the
     * revert reason or with a default {Errors.FailedCall} error.
     */
    function verifyCallResult(
        bool success,
        bytes memory returndata
    ) internal pure returns (bytes memory) {
        if (!success) {
            _revert(returndata);
        } else {
            return returndata;
        }
    }

    /**
     * @dev Reverts with returndata if present. Otherwise reverts with {Errors.FailedCall}.
     */
    function _revert(bytes memory returndata) private pure {
        // Look for revert reason and bubble it up if present
        if (returndata.length > 0) {
            // The easiest way to bubble the revert reason is using memory via assembly
            assembly ("memory-safe") {
                let returndata_size := mload(returndata)
                revert(add(32, returndata), returndata_size)
            }
        } else {
            revert Errors.FailedCall();
        }
    }
}

/**
 * @title ReferralRewards
 * @dev Smart contract to track and distribute referral rewards.
 */
contract ReferralRewards is Ownable, ReentrancyGuard { 
    using Address for address payable;

    IERC20 public presaleToken; // MMV Token contract
    address public presaleContract; // Presale contract address
    uint256 public referralAllocation; // Total allocation for referral rewards

    bool public claimStatus = false;
    uint256 public claimStartTime;

    mapping(address => uint256) public referralRewards; // MMV earned per referrer
    mapping(address => uint256) public totalActiveReferrals; // Number of users that purchased using referral
    mapping(address => uint256) public totalMMVReferralPurchases; // MMV purchased using referral codes

    address[] public referrerList; // List of addresses that earned rewards
    uint256 public totalMMVEarnedByReferrers; // Total MMV earned by all referrers

    event ReferralRewardAdded(address indexed referrer, uint256 rewardAmount);
    event Claimed(address indexed claimer, uint256 amount);
    event ClaimStatusUpdated(bool status);
    event ClaimStartTimeUpdated(uint256 startTime);
    event PresaleContractUpdated(address newPresaleContract);
    event PresaleTokenUpdated(address newPresaleToken);
    event UnclaimedTokensWithdrawn(address to, uint256 amount);
    event ContractFundsWithdrawn(address to, uint256 amount);

    /**
     * @dev Constructor that initializes the ReferralRewards contract.
     * @param _presaleToken The MMV token contract address.
     * @param _totalSupply The total token supply to allocate 2% for referrals.
     */
    constructor(
        address _presaleToken,
        uint256 _totalSupply
    ) Ownable(msg.sender) {
        require(_presaleToken != address(0), "Invalid token address");

        presaleToken = IERC20(_presaleToken);
        referralAllocation = (_totalSupply * 2) / 100; // 2% for referral rewards
    }

    /**
     * @notice Registers a referral reward when a user makes a purchase.
     * @dev Only callable by the Presale contract.
     * @param user The user making the purchase.
     * @param referrer The address of the referrer.
     * @param purchaseAmount The amount of MMV purchased.
     */
    function registerReferral(
        address user,
        address referrer,
        uint256 purchaseAmount
    ) external {
        require(
            msg.sender == presaleContract,
            "Only presale contract can register referrals"
        );
        require(referrer != address(0), "Invalid referrer address");
        require(user != referrer, "Self-referral not allowed");

        totalActiveReferrals[referrer] += 1;
        totalMMVReferralPurchases[referrer] += purchaseAmount;

        uint256 rewardAmount = (purchaseAmount * 5) / 100; // 5% reward
        require(
            referralAllocation >= rewardAmount,
            "Referral allocation exceeded"
        );

        referralRewards[referrer] += rewardAmount;
        referralAllocation -= rewardAmount;
        totalMMVEarnedByReferrers += rewardAmount;

        // Add referrer to list if they are earning for the first time
        if (totalActiveReferrals[referrer] == 1) {
            referrerList.push(referrer);
        }

        emit ReferralRewardAdded(referrer, rewardAmount);
    }

    /**
     * @notice Allows referrers to claim their earned rewards.
     */
    function claimReferralRewards() external nonReentrant {
        require(claimStatus, "Claiming is not enabled");
        require(
            block.timestamp >= claimStartTime,
            "Claim period has not started"
        );

        uint256 reward = referralRewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        require(
            presaleToken.balanceOf(address(this)) >= reward,
            "Insufficient contract balance"
        );

        referralRewards[msg.sender] = 0;
        presaleToken.transfer(msg.sender, reward);

        emit Claimed(msg.sender, reward);
    }

    /** 🔹 ADMIN FUNCTIONS */

    /**
     * @notice Allows the contract owner to enable or disable claim status.
     */
    function setClaimStatus(bool _status) external onlyOwner {
        claimStatus = _status;
        emit ClaimStatusUpdated(_status);
    }

    /**
     * @notice Allows the contract owner to set the claim start time.
     */
    function setClaimStartTime(uint256 _startTime) external onlyOwner {
        claimStartTime = _startTime;
        emit ClaimStartTimeUpdated(_startTime);
    }

    /**
     * @notice Allows the contract owner to update the presale contract address.
     */
    function setPresaleContract(address _presaleContract) external onlyOwner {
        require(_presaleContract != address(0), "Invalid address");
        presaleContract = _presaleContract;
        emit PresaleContractUpdated(_presaleContract);
    }

    /**
     * @notice Allows the contract owner to update the MMV token contract address.
     */
    function setPresaleToken(address _presaleToken) external onlyOwner {
        require(_presaleToken != address(0), "Invalid address");
        presaleToken = IERC20(_presaleToken);
        emit PresaleTokenUpdated(_presaleToken);
    }

    /**
     * @notice Allows the contract owner to withdraw unclaimed MMV tokens.
     */
    function withdrawUnclaimedTokens(
        address to,
        uint256 amount
    ) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(
            presaleToken.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );

        presaleToken.transfer(to, amount);
        emit UnclaimedTokensWithdrawn(to, amount);
    }

    /**
     * @notice Allows the contract owner to withdraw mistakenly sent ETH.
     */
    function withdrawContractFunds(
        address payable to,
        uint256 amount
    ) external onlyOwner {
        require(to != address(0), "Invalid address");
        require(address(this).balance >= amount, "Insufficient ETH balance");

        to.transfer(amount);
        emit ContractFundsWithdrawn(to, amount);
    }

    /** 🔹 GETTERS */

    function getTotalActiveReferrals(
        address user
    ) external view returns (uint256) {
        return totalActiveReferrals[user];
    }

    function getTotalMMVReferralPurchases(
        address user
    ) external view returns (uint256) {
        return totalMMVReferralPurchases[user];
    }

    function getMMVEarnedFromReferrals(
        address user
    ) external view returns (uint256) {
        return referralRewards[user];
    }

    function getReferrerList() external view returns (address[] memory) {
        return referrerList;
    }

    function getTotalNumberOfReferrals() external view returns (uint256) {
        return referrerList.length;
    }

    function getTotalMMVEarnedByAllReferrers() external view returns (uint256) {
        return totalMMVEarnedByReferrers;
    }

    receive() external payable {} // Allow contract to receive ETH (just in case)
} 
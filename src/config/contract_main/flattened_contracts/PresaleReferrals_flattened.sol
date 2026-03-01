// SPDX-License-Identifier: MIT
// File: @openzeppelin/contracts/token/ERC20/IERC20.sol


// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/IERC20.sol)

pragma solidity >=0.4.16;

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
    event Approval(address indexed owner, address indexed spender, uint256 value);

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
    function allowance(address owner, address spender) external view returns (uint256);

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
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// File: @openzeppelin/contracts/interfaces/IERC20.sol


// OpenZeppelin Contracts (last updated v5.4.0) (interfaces/IERC20.sol)

pragma solidity >=0.4.16;


// File: @openzeppelin/contracts/utils/introspection/IERC165.sol


// OpenZeppelin Contracts (last updated v5.4.0) (utils/introspection/IERC165.sol)

pragma solidity >=0.4.16;

/**
 * @dev Interface of the ERC-165 standard, as defined in the
 * https://eips.ethereum.org/EIPS/eip-165[ERC].
 *
 * Implementers can declare support of contract interfaces, which can then be
 * queried by others ({ERC165Checker}).
 *
 * For an implementation, see {ERC165}.
 */
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[ERC section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

// File: @openzeppelin/contracts/interfaces/IERC165.sol


// OpenZeppelin Contracts (last updated v5.4.0) (interfaces/IERC165.sol)

pragma solidity >=0.4.16;


// File: @openzeppelin/contracts/interfaces/IERC1363.sol


// OpenZeppelin Contracts (last updated v5.4.0) (interfaces/IERC1363.sol)

pragma solidity >=0.6.2;



/**
 * @title IERC1363
 * @dev Interface of the ERC-1363 standard as defined in the https://eips.ethereum.org/EIPS/eip-1363[ERC-1363].
 *
 * Defines an extension interface for ERC-20 tokens that supports executing code on a recipient contract
 * after `transfer` or `transferFrom`, or code on a spender contract after `approve`, in a single transaction.
 */
interface IERC1363 is IERC20, IERC165 {
    /*
     * Note: the ERC-165 identifier for this interface is 0xb0202a11.
     * 0xb0202a11 ===
     *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
     *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
     *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
     *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
     *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
     *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
     */

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`
     * and then calls {IERC1363Receiver-onTransferReceived} on `to`.
     * @param to The address which you want to transfer to.
     * @param value The amount of tokens to be transferred.
     * @return A boolean value indicating whether the operation succeeded unless throwing.
     */
    function transferAndCall(address to, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`
     * and then calls {IERC1363Receiver-onTransferReceived} on `to`.
     * @param to The address which you want to transfer to.
     * @param value The amount of tokens to be transferred.
     * @param data Additional data with no specified format, sent in call to `to`.
     * @return A boolean value indicating whether the operation succeeded unless throwing.
     */
    function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
     * and then calls {IERC1363Receiver-onTransferReceived} on `to`.
     * @param from The address which you want to send tokens from.
     * @param to The address which you want to transfer to.
     * @param value The amount of tokens to be transferred.
     * @return A boolean value indicating whether the operation succeeded unless throwing.
     */
    function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the allowance mechanism
     * and then calls {IERC1363Receiver-onTransferReceived} on `to`.
     * @param from The address which you want to send tokens from.
     * @param to The address which you want to transfer to.
     * @param value The amount of tokens to be transferred.
     * @param data Additional data with no specified format, sent in call to `to`.
     * @return A boolean value indicating whether the operation succeeded unless throwing.
     */
    function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens and then calls {IERC1363Spender-onApprovalReceived} on `spender`.
     * @param spender The address which will spend the funds.
     * @param value The amount of tokens to be spent.
     * @return A boolean value indicating whether the operation succeeded unless throwing.
     */
    function approveAndCall(address spender, uint256 value) external returns (bool);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens and then calls {IERC1363Spender-onApprovalReceived} on `spender`.
     * @param spender The address which will spend the funds.
     * @param value The amount of tokens to be spent.
     * @param data Additional data with no specified format, sent in call to `spender`.
     * @return A boolean value indicating whether the operation succeeded unless throwing.
     */
    function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

// File: @openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol


// OpenZeppelin Contracts (last updated v5.3.0) (token/ERC20/utils/SafeERC20.sol)

pragma solidity ^0.8.20;



/**
 * @title SafeERC20
 * @dev Wrappers around ERC-20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    /**
     * @dev An operation with an ERC-20 token failed.
     */
    error SafeERC20FailedOperation(address token);

    /**
     * @dev Indicates a failed `decreaseAllowance` request.
     */
    error SafeERC20FailedDecreaseAllowance(address spender, uint256 currentAllowance, uint256 requestedDecrease);

    /**
     * @dev Transfer `value` amount of `token` from the calling contract to `to`. If `token` returns no value,
     * non-reverting calls are assumed to be successful.
     */
    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeCall(token.transfer, (to, value)));
    }

    /**
     * @dev Transfer `value` amount of `token` from `from` to `to`, spending the approval given by `from` to the
     * calling contract. If `token` returns no value, non-reverting calls are assumed to be successful.
     */
    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeCall(token.transferFrom, (from, to, value)));
    }

    /**
     * @dev Variant of {safeTransfer} that returns a bool instead of reverting if the operation is not successful.
     */
    function trySafeTransfer(IERC20 token, address to, uint256 value) internal returns (bool) {
        return _callOptionalReturnBool(token, abi.encodeCall(token.transfer, (to, value)));
    }

    /**
     * @dev Variant of {safeTransferFrom} that returns a bool instead of reverting if the operation is not successful.
     */
    function trySafeTransferFrom(IERC20 token, address from, address to, uint256 value) internal returns (bool) {
        return _callOptionalReturnBool(token, abi.encodeCall(token.transferFrom, (from, to, value)));
    }

    /**
     * @dev Increase the calling contract's allowance toward `spender` by `value`. If `token` returns no value,
     * non-reverting calls are assumed to be successful.
     *
     * IMPORTANT: If the token implements ERC-7674 (ERC-20 with temporary allowance), and if the "client"
     * smart contract uses ERC-7674 to set temporary allowances, then the "client" smart contract should avoid using
     * this function. Performing a {safeIncreaseAllowance} or {safeDecreaseAllowance} operation on a token contract
     * that has a non-zero temporary allowance (for that particular owner-spender) will result in unexpected behavior.
     */
    function safeIncreaseAllowance(IERC20 token, address spender, uint256 value) internal {
        uint256 oldAllowance = token.allowance(address(this), spender);
        forceApprove(token, spender, oldAllowance + value);
    }

    /**
     * @dev Decrease the calling contract's allowance toward `spender` by `requestedDecrease`. If `token` returns no
     * value, non-reverting calls are assumed to be successful.
     *
     * IMPORTANT: If the token implements ERC-7674 (ERC-20 with temporary allowance), and if the "client"
     * smart contract uses ERC-7674 to set temporary allowances, then the "client" smart contract should avoid using
     * this function. Performing a {safeIncreaseAllowance} or {safeDecreaseAllowance} operation on a token contract
     * that has a non-zero temporary allowance (for that particular owner-spender) will result in unexpected behavior.
     */
    function safeDecreaseAllowance(IERC20 token, address spender, uint256 requestedDecrease) internal {
        unchecked {
            uint256 currentAllowance = token.allowance(address(this), spender);
            if (currentAllowance < requestedDecrease) {
                revert SafeERC20FailedDecreaseAllowance(spender, currentAllowance, requestedDecrease);
            }
            forceApprove(token, spender, currentAllowance - requestedDecrease);
        }
    }

    /**
     * @dev Set the calling contract's allowance toward `spender` to `value`. If `token` returns no value,
     * non-reverting calls are assumed to be successful. Meant to be used with tokens that require the approval
     * to be set to zero before setting it to a non-zero value, such as USDT.
     *
     * NOTE: If the token implements ERC-7674, this function will not modify any temporary allowance. This function
     * only sets the "standard" allowance. Any temporary allowance will remain active, in addition to the value being
     * set here.
     */
    function forceApprove(IERC20 token, address spender, uint256 value) internal {
        bytes memory approvalCall = abi.encodeCall(token.approve, (spender, value));

        if (!_callOptionalReturnBool(token, approvalCall)) {
            _callOptionalReturn(token, abi.encodeCall(token.approve, (spender, 0)));
            _callOptionalReturn(token, approvalCall);
        }
    }

    /**
     * @dev Performs an {ERC1363} transferAndCall, with a fallback to the simple {ERC20} transfer if the target has no
     * code. This can be used to implement an {ERC721}-like safe transfer that rely on {ERC1363} checks when
     * targeting contracts.
     *
     * Reverts if the returned value is other than `true`.
     */
    function transferAndCallRelaxed(IERC1363 token, address to, uint256 value, bytes memory data) internal {
        if (to.code.length == 0) {
            safeTransfer(token, to, value);
        } else if (!token.transferAndCall(to, value, data)) {
            revert SafeERC20FailedOperation(address(token));
        }
    }

    /**
     * @dev Performs an {ERC1363} transferFromAndCall, with a fallback to the simple {ERC20} transferFrom if the target
     * has no code. This can be used to implement an {ERC721}-like safe transfer that rely on {ERC1363} checks when
     * targeting contracts.
     *
     * Reverts if the returned value is other than `true`.
     */
    function transferFromAndCallRelaxed(
        IERC1363 token,
        address from,
        address to,
        uint256 value,
        bytes memory data
    ) internal {
        if (to.code.length == 0) {
            safeTransferFrom(token, from, to, value);
        } else if (!token.transferFromAndCall(from, to, value, data)) {
            revert SafeERC20FailedOperation(address(token));
        }
    }

    /**
     * @dev Performs an {ERC1363} approveAndCall, with a fallback to the simple {ERC20} approve if the target has no
     * code. This can be used to implement an {ERC721}-like safe transfer that rely on {ERC1363} checks when
     * targeting contracts.
     *
     * NOTE: When the recipient address (`to`) has no code (i.e. is an EOA), this function behaves as {forceApprove}.
     * Opposedly, when the recipient address (`to`) has code, this function only attempts to call {ERC1363-approveAndCall}
     * once without retrying, and relies on the returned value to be true.
     *
     * Reverts if the returned value is other than `true`.
     */
    function approveAndCallRelaxed(IERC1363 token, address to, uint256 value, bytes memory data) internal {
        if (to.code.length == 0) {
            forceApprove(token, to, value);
        } else if (!token.approveAndCall(to, value, data)) {
            revert SafeERC20FailedOperation(address(token));
        }
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     *
     * This is a variant of {_callOptionalReturnBool} that reverts if call fails to meet the requirements.
     */
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        uint256 returnSize;
        uint256 returnValue;
        assembly ("memory-safe") {
            let success := call(gas(), token, 0, add(data, 0x20), mload(data), 0, 0x20)
            // bubble errors
            if iszero(success) {
                let ptr := mload(0x40)
                returndatacopy(ptr, 0, returndatasize())
                revert(ptr, returndatasize())
            }
            returnSize := returndatasize()
            returnValue := mload(0)
        }

        if (returnSize == 0 ? address(token).code.length == 0 : returnValue != 1) {
            revert SafeERC20FailedOperation(address(token));
        }
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     * @param token The token targeted by the call.
     * @param data The call data (encoded using abi.encode or one of its variants).
     *
     * This is a variant of {_callOptionalReturn} that silently catches all reverts and returns a bool instead.
     */
    function _callOptionalReturnBool(IERC20 token, bytes memory data) private returns (bool) {
        bool success;
        uint256 returnSize;
        uint256 returnValue;
        assembly ("memory-safe") {
            success := call(gas(), token, 0, add(data, 0x20), mload(data), 0, 0x20)
            returnSize := returndatasize()
            returnValue := mload(0)
        }
        return success && (returnSize == 0 ? address(token).code.length > 0 : returnValue == 1);
    }
}

// File: @openzeppelin/contracts/utils/Context.sol


// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

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

// File: @openzeppelin/contracts/access/Ownable.sol


// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;


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

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

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

// File: @openzeppelin/contracts/access/Ownable2Step.sol


// OpenZeppelin Contracts (last updated v5.1.0) (access/Ownable2Step.sol)

pragma solidity ^0.8.20;


/**
 * @dev Contract module which provides access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * This extension of the {Ownable} contract includes a two-step mechanism to transfer
 * ownership, where the new owner must call {acceptOwnership} in order to replace the
 * old one. This can help prevent common mistakes, such as transfers of ownership to
 * incorrect accounts, or to contracts that are unable to interact with the
 * permission system.
 *
 * The initial owner is specified at deployment time in the constructor for `Ownable`. This
 * can later be changed with {transferOwnership} and {acceptOwnership}.
 *
 * This module is used through inheritance. It will make available all functions
 * from parent (Ownable).
 */
abstract contract Ownable2Step is Ownable {
    address private _pendingOwner;

    event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Returns the address of the pending owner.
     */
    function pendingOwner() public view virtual returns (address) {
        return _pendingOwner;
    }

    /**
     * @dev Starts the ownership transfer of the contract to a new account. Replaces the pending transfer if there is one.
     * Can only be called by the current owner.
     *
     * Setting `newOwner` to the zero address is allowed; this can be used to cancel an initiated ownership transfer.
     */
    function transferOwnership(address newOwner) public virtual override onlyOwner {
        _pendingOwner = newOwner;
        emit OwnershipTransferStarted(owner(), newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`) and deletes any pending owner.
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual override {
        delete _pendingOwner;
        super._transferOwnership(newOwner);
    }

    /**
     * @dev The new owner accepts the ownership transfer.
     */
    function acceptOwnership() public virtual {
        address sender = _msgSender();
        if (pendingOwner() != sender) {
            revert OwnableUnauthorizedAccount(sender);
        }
        _transferOwnership(sender);
    }
}

// File: @openzeppelin/contracts/security/ReentrancyGuard.sol


// OpenZeppelin Contracts (last updated v4.9.0) (security/ReentrancyGuard.sol)

pragma solidity ^0.8.0;

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

// File: PresaleReferrals.sol


pragma solidity ^0.8.20;




 
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
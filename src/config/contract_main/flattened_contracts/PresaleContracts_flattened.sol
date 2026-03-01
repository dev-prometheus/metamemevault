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

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol


// OpenZeppelin Contracts (last updated v5.4.0) (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity >=0.6.2;


/**
 * @dev Interface for the optional metadata functions from the ERC-20 standard.
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
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

// File: @openzeppelin/contracts/security/Pausable.sol


// OpenZeppelin Contracts (last updated v4.7.0) (security/Pausable.sol)

pragma solidity ^0.8.0;


/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotPaused() internal view virtual {
        require(!paused(), "Pausable: paused");
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requirePaused() internal view virtual {
        require(paused(), "Pausable: not paused");
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}

// File: @chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol


pragma solidity ^0.8.0;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

// File: PresaleContracts.sol


pragma solidity ^0.8.20;








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
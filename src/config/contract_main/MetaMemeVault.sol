// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

/**
 * @title MetaMemeVault
 * @author MetaMemeVault
 * @notice MMV token - 1B fixed supply, immutable distribution
 * 
 * 62% presale, 13% treasury, 10% liquidity, 7% team, 6% marketing, 2% referrals.
 * No fees, no trading controls, fully decentralized from deployment.
 */
contract MetaMemeVault is ERC20, Ownable2Step {
    /// @notice Maximum token supply - 1 billion tokens
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10 ** 18;

    // Immutable distribution addresses
    address public immutable presaleContract;
    address public immutable referralRewardsContract;
    address public immutable memeTreasuryWallet;
    address public immutable liquidityWallet;
    address public immutable teamVestingContract;
    address public immutable marketingWallet;

    // Events
    event EthRecovered(address indexed to, uint256 amount);
    event TokenRecovered(
        address indexed token,
        address indexed to,
        uint256 amount
    );

    // Custom errors
    error InvalidAddress();
    error InvalidAmount();
    error CannotRecoverOwnToken();
    error TransferFailed();
    error ZeroAmount();
    error DuplicateAddress();

    /**
     * @notice Creates token with fixed distribution
     * @param _presaleContract Address to receive 620M tokens (62% - includes base + bonus)
     * @param _referralRewardsContract Address to receive 20M tokens (2%)
     * @param _memeTreasuryWallet Address to receive 130M tokens (13%)
     * @param _liquidityWallet Address to receive 100M tokens (10%)
     * @param _teamVestingContract Address to receive 70M tokens (7%)
     * @param _marketingWallet Address to receive 60M tokens (6%)
     */
    constructor(
        address _presaleContract,
        address _referralRewardsContract,
        address _memeTreasuryWallet,
        address _liquidityWallet,
        address _teamVestingContract,
        address _marketingWallet
    ) ERC20("MetaMemeVault", "MMV") Ownable(msg.sender) {
        // Check zero addresses
        if (
            _presaleContract == address(0) ||
            _referralRewardsContract == address(0) ||
            _memeTreasuryWallet == address(0) ||
            _liquidityWallet == address(0) ||
            _teamVestingContract == address(0) ||
            _marketingWallet == address(0)
        ) revert InvalidAddress();

        // Quick duplicate check - comparing each pair once
        address[6] memory addrs = [
            _presaleContract,
            _referralRewardsContract,
            _memeTreasuryWallet,
            _liquidityWallet,
            _teamVestingContract,
            _marketingWallet
        ];
        for (uint i = 0; i < 5; i++) {
            for (uint j = i + 1; j < 6; j++) {
                if (addrs[i] == addrs[j]) revert DuplicateAddress();
            }
        }

        // Set distribution addresses
        presaleContract = _presaleContract;
        referralRewardsContract = _referralRewardsContract;
        memeTreasuryWallet = _memeTreasuryWallet;
        liquidityWallet = _liquidityWallet;
        teamVestingContract = _teamVestingContract;
        marketingWallet = _marketingWallet;

        // Mint tokens according to tokenomics
        _mint(_presaleContract, 620_000_000 * 10 ** 18); // 62%
        _mint(_referralRewardsContract, 20_000_000 * 10 ** 18); // 2%
        _mint(_memeTreasuryWallet, 130_000_000 * 10 ** 18); // 13%
        _mint(_liquidityWallet, 100_000_000 * 10 ** 18); // 10%
        _mint(_teamVestingContract, 70_000_000 * 10 ** 18); // 7%
        _mint(_marketingWallet, 60_000_000 * 10 ** 18); // 6%

        assert(totalSupply() == MAX_SUPPLY);
    }

    // ============ Recovery Functions ============

    /**
     * @notice Recover accidentally sent ETH
     * @param to Recipient address
     * @param amount Amount to recover
     */
    function recoverEth(address payable to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert InvalidAddress();
        if (amount == 0) revert ZeroAmount();
        if (amount > address(this).balance) revert InvalidAmount();

        (bool success, ) = to.call{value: amount}("");
        if (!success) revert TransferFailed();

        emit EthRecovered(to, amount);
    }

    /**
     * @notice Recover accidentally sent tokens
     * @dev Cannot recover MMV tokens (prevents rug) 
     * @param tokenAddress Token to recover
     * @param to Recipient address
     * @param amount Amount to recover
     */
    function recoverToken(
        address tokenAddress,
        address to,
        uint256 amount
    ) external onlyOwner {
        if (to == address(0) || tokenAddress == address(0))
            revert InvalidAddress();
        if (tokenAddress == address(this)) revert CannotRecoverOwnToken();
        if (amount == 0) revert ZeroAmount();

        IERC20 token = IERC20(tokenAddress);
        if (amount > token.balanceOf(address(this))) revert InvalidAmount();

        if (!token.transfer(to, amount)) revert TransferFailed();

        emit TokenRecovered(tokenAddress, to, amount);
    }

    // ============ Public Functions ============

    /**
     * @notice Burn tokens from caller
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        if (amount == 0) revert ZeroAmount();
        _burn(msg.sender, amount);
    }

    /**
     * @notice Burn tokens from account with allowance
     * @param account Address to burn from
     * @param amount Amount to burn
     */
    function burnFrom(address account, uint256 amount) external {
        if (amount == 0) revert ZeroAmount();
        _spendAllowance(account, msg.sender, amount);
        _burn(account, amount);
    }

    // ============ View Functions ============

    /**
     * @notice Get distribution info
     * @return addresses Distribution addresses
     * @return balances Current balances
     */
    function getDistribution()
        external
        view
        returns (address[6] memory addresses, uint256[6] memory balances)
    {
        addresses = [
            presaleContract,
            referralRewardsContract,
            memeTreasuryWallet,
            liquidityWallet,
            marketingWallet,
            teamVestingContract
        ];

        for (uint256 i = 0; i < 6; ) {
            balances[i] = balanceOf(addresses[i]);
            unchecked {
                ++i;
            }
        }
    }

    /**
     * @notice Get contract stats
     * @return contractBalance Contract's token balance
     * @return totalBurned Total burned tokens
     * @return circulatingSupply
     */
    function getContractInfo()
        external
        view
        returns (
            uint256 contractBalance,
            uint256 totalBurned,
            uint256 circulatingSupply
        )
    {
        contractBalance = balanceOf(address(this));
        totalBurned = MAX_SUPPLY - totalSupply();
        circulatingSupply = totalSupply();
    }

    /**
     * @dev Allow ETH deposits for recovery
     */
    receive() external payable {}
}
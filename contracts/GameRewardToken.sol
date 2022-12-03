// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GameRewardToken is ERC20 {
    constructor(
        string memory _name, // "GameRevenueToken"
        string memory _symbol, // "RVN"
        uint256 _initial_supply
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, _initial_supply * 10 ** uint(decimals()));
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC4907Scholarship.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameItemNFT is ERC4907Scholarship {
    constructor(
        string memory _name,
        string memory _symbol,
        address revenueTokenAddress
    ) ERC4907Scholarship(_name, _symbol, revenueTokenAddress) {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://test.p2e-game.com";
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}

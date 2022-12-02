// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC4907.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC4907Scholarship is ERC4907, Ownable {
    IERC20 _token; // address of a token for the representation of the revenue.

    mapping(uint256 => uint256) internal _shareRatios;

    event DistributeRevenue(
        uint256 tokenId,
        address owner,
        address user,
        uint256 amount,
        uint256 shareRatio
    ); // user address to address(0) if no valid user exists.

    constructor(
        string memory name_,
        string memory symbol_,
        address tokenAddress_
    ) ERC4907(name_, symbol_) {
        _token = IERC20(tokenAddress_); // Token representation of revenue set in the constructor.
    }

    function setTokenAddress(address newTokenAddress_) public onlyOwner {
        _token = IERC20(newTokenAddress_);
    }

    function setShareRatio(
        uint256 tokenId,
        uint256 shareRatio
    ) public onlyOwner {
        require(
            userOf(tokenId) == address(0),
            "cannot update sharing ratio after user is set."
        );
        _shareRatios[tokenId] = shareRatio;
    }

    // function setUser(
    //     uint256 tokenId,
    //     address user,
    //     uint64 expires
    // ) public virtual override {}

    // function setUser(
    //     uint256 tokenId,
    //     address user,
    //     uint64 expires,
    //     uint256 shareRatio
    // ) public virtual {
    //     super.setUser(tokenId, user, expires);
    //     _shareRatios[tokenId] = shareRatio;
    //     // ERC721 approval
    //     // owner의 signing 없이 컨트랙트가 setUser를 호출할 수 있도록
    // }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

        // TODO: owner가 팔아버렸을 때 user 권한 박탈할지 의사결정 필요
        if (from != to && _users[tokenId].user != address(0)) {
            delete _shareRatios[tokenId];
        }
    }

    /**
     * Revenue sharing ratio in bp(1/10000) between the NFT Owner and the User.
     * if (sharing ratio = 20%), the User receives 20% of the total revenue earned by the NFT.
     */
    function _getShareRatio(uint256 tokenId) internal view returns (uint256) {
        return _shareRatios[tokenId]; // TODO: temporary
    }

    function distributeRevenue(
        uint256 tokenId,
        uint256 revenueTokenAmount // TODO: check decimals processing
    ) public returns (bool) {
        uint256 shareRatio = _getShareRatio(tokenId);
        // if invalid user
        if (userOf(tokenId) == address(0) || shareRatio == 0) {
            _token.transfer(ownerOf(tokenId), revenueTokenAmount);
            emit DistributeRevenue(
                tokenId,
                ownerOf(tokenId),
                address(0),
                revenueTokenAmount,
                0
            );
            return true;
        }
        uint256 tokenAmountForOwner = (10000 * revenueTokenAmount) / shareRatio; // shareRatio never be zero at this point.
        uint256 tokenAmountForUser = revenueTokenAmount - tokenAmountForOwner;

        _token.transfer(ownerOf(tokenId), tokenAmountForOwner); // send token from `msg.sender`
        _token.transfer(ownerOf(tokenId), tokenAmountForUser);

        emit DistributeRevenue(
            tokenId,
            ownerOf(tokenId),
            userOf(tokenId),
            revenueTokenAmount,
            shareRatio
        );
        return true;
    }

    // Task 1. 계약별 Ratio를 저장할 별도의 구조체 등
    // Task 2. distribute => ERC20 token transfer inside the contract
    // Task 3. Override, Hook 사용처 점검
    // Task 4. Game 측에서 Token Approve가 필요할지 결정
}

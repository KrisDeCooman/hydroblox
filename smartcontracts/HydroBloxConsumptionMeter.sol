// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HydroBloxConsumptionMeter is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("HydroBloxConsumptionMeter", "HBCM") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) internal view override {
        if (from != address(0) && to != address(0)) {
            revert("Not allowed to transfer HBCM. Only allowed to mint and burn.");
        }
        else if (from == address(0) && balanceOf(to) > 0) {
            revert("Not allowed to own more than 1 HBCM.");
        }
    }
}
//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HydroBloxToken is ERC20, ERC20Burnable, Ownable {
    // 1000 HBT will get minted.
    constructor() ERC20("HydroBloxToken", "HBT") {
         _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
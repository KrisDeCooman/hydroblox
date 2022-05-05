//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "contracts/hydrobloxtoken.sol";

contract SmartMeter {

    uint contractBalance;

    function consume(uint256 amount) external {
        contractBalance = address(this).balance;

        require(contractBalance >= amount);
        
        contractBalance -= amount;

    }


	
}
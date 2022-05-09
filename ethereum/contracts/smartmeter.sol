// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.9.0;

import "contracts/hydrobloxtoken.sol";

contract SmartMeter {

    uint contractBalance;

    function consume(uint256 amount) external {
        contractBalance = address(this).balance;

        require(contractBalance >= amount);
        
        contractBalance -= amount;

    }


	
}
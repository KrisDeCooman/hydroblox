//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import 'hydrobloxtoken.sol';

contract HydroBlox {

    uint public waterCost;
    uint public deadline;
    address public admin;

    address[] consumers;

    constructor() {
        admin = msg.sender;
        deadline = block.number + 1000;
    }

    modifier isAdmin() {
        require(msg.sender == admin, "No rights to perform this action!!");
        _;
    }

    modifier costToEnroll() {
        require(msg.value == 1000000000000000000, "You need to pay 1 ETH to enroll.");
        _;
    }

     function changeWaterCost(uint _waterCost) external isAdmin{
        waterCost = _waterCost;
    }

    
    function enrollConsumer() external payable costToEnroll {
        consumers.push(msg.sender);
        HydroBloxToken token = HydroBloxToken(0x388299133eb87E22B35a83258b2983A2cFB51C72);
        token.transfer(msg.sender,100);
        
    }

   /* function enrollProducer(address producer) external isAdmin{

    }

    function produce(uint litersOfWater) external {

    }


    function consume(uint litersOfWater) external {

    }*/


    



}


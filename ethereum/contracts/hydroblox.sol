//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "contracts/hydrobloxtoken.sol";

contract HydroBlox {

    struct Producer {
        string name;
        bool produceRights;
        ProducerWeight producerWeight;
    }

    enum ProducerWeight {LOW, MEDIUM, HIGH}

    uint public waterCost;
    uint public contractStart;
   
    address public admin;

    address[] consumers;
    mapping(address => Producer) producers;

   

    constructor() {
        admin = msg.sender;
        // waterCost set to 1 ETH.
        waterCost = 1000000000000000000;
    }

    modifier isAdmin() {
        require(msg.sender == admin, "No rights to perform this action!!");
        _;
    }

    modifier hasProducerRights() {
        require(producers[msg.sender].produceRights, "Does not have right to produce water!");
        _;
    }

    modifier costToEnroll() {
        require(msg.value == waterCost, "You need to pay the exact amount to enroll");
        _;
    }

   
    function changeWaterCost(uint _waterCost) external isAdmin{
        waterCost = _waterCost;
    }

    
    function enrollAsConsumer() external payable costToEnroll {

        contractStart = block.number;
        consumers.push(msg.sender);
        // Below will need to address of the hydrobloxtoken erc20 smart contract, right now it is random
        HydroBloxToken token = HydroBloxToken(0x388299133eb87E22B35a83258b2983A2cFB51C72);
        // ERC20 contract transfers 100 HBT to the enrolled user.
        token.transfer(msg.sender,100);
        
    }

    function enrollAsProducer(Producer memory _producer) external isAdmin{
            
    }

    function removeProducer(address producer) external isAdmin {
        
    }

    function produce(uint litersOfWater) external hasProducerRights{

    }


    function consume(uint litersOfWater) external {

    }


    



}


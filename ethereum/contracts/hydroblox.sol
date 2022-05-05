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
    
    address public admin;

    address[] consumers;
    Producer[] producersArray;

    mapping(address => Producer) producers;
    uint endBlockNr;

    uint contractBalance;

    constructor() {
        admin = msg.sender;
        // waterCost set to 1 ETH.
        waterCost = 1000000000000000000;
        endBlockNr = block.number + 100;
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

    modifier deadline() {
        require(block.number < endBlockNr);
        _;
    }

   
    function changeWaterCost(uint _waterCost) external isAdmin{
        waterCost = _waterCost;
    }

    function changeProducingRights(bool rights, address producerAddress) external {
        Producer storage p = producers[producerAddress];
        p.produceRights = rights;
       
    }

    
    function enrollAsConsumer() external payable costToEnroll {

        consumers.push(msg.sender);
        // Below will need to address of the hydrobloxtoken erc20 smart contract, right now it is random
        HydroBloxToken token = HydroBloxToken(0x388299133eb87E22B35a83258b2983A2cFB51C72);
        // ERC20 contract transfers 100 HBT to the enrolled user.
        token.transfer(msg.sender,100);
        
    }

    function enrollAsProducer(Producer memory producer, address producerAddress) external isAdmin{
         producers[producerAddress] = producer;
         producersArray.push(producer);
    }

    function removeProducer(address producer) external isAdmin {
        delete producers[producer];
    }

    function produce(uint litersOfWater) external hasProducerRights{
        uint tokensPerUser = litersOfWater / consumers.length;
    // Below will need to address of the hydrobloxtoken erc20 smart contract, right now it is random
        HydroBloxToken token = HydroBloxToken(0x388299133eb87E22B35a83258b2983A2cFB51C72);
        
        // To check
        token.mint(msg.sender, litersOfWater);

        // distribute the tokens evenly to the amount of consumers, looping over consumers array can become expensive

        for(uint i = 0; i < consumers.length; i++) {
            token.transfer(consumers[i], tokensPerUser);
        }
        
    }

    function payProducers() external deadline isAdmin {
         Producer[] memory lowProducers;
         Producer[] memory mediumProducers;
         Producer[] memory highProducers;

         contractBalance = address(this).balance;

        for(uint i = 0; i < producersArray.length; i++) {
            if(producersArray[i].producerWeight == ProducerWeight.LOW) {
                lowProducers.push(producersArray[i]);
            } else if (producersArray[i].producerWeight == ProducerWeight.MEDIUM) {
                mediumProducers.push(producersArray[i]);
            } else {
                highProducers.push(producersArray[i]);
            }
        }

    }


    


    



}


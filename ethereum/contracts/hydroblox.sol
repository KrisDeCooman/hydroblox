//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

import "contracts/hydrobloxtoken.sol";


contract StorageHydroBlox {

}

contract HydroBlox {

    struct Producer {
        string name;
        bool produceRights;
        ProducerWeight producerWeight;
        address producerAddress;
    }

    struct Consumer {
        address consumerAddress;
        uint consumerContractStart;
    }

    event Payout (address producerAddress, uint amountPayed);

    enum ProducerWeight {LOW, MEDIUM, HIGH}

    uint public waterCost;
    uint consumerId;
    uint payoutBlockNumber;
    uint contractBalance;
    
    address public admin;

    Consumer[] consumersArray;
    Producer[] producersArray;

    mapping(address => Producer) producers;
    mapping(uint => Consumer) consumers;
    
    constructor() {
        admin = msg.sender;
        // waterCost set to 1 ETH.
        waterCost = 1000000000000000000;
        payoutBlockNumber = block.number + 500;
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

    function changeProducingRights(bool rights, address producerAddress) external {
        Producer storage p = producers[producerAddress];
        p.produceRights = rights;
       
    }

    
    function enrollAsConsumer() external payable costToEnroll {

        Consumer memory c = Consumer(msg.sender, block.number);
        consumersArray.push(c);
        consumers[consumerId] = c;
        // Below will need to address of the hydrobloxtoken erc20 smart contract, right now it is random
        HydroBloxToken token = HydroBloxToken(0x388299133eb87E22B35a83258b2983A2cFB51C72);
        // ERC20 contract transfers 100 HBT to the enrolled user.
        token.transfer(msg.sender,100);

        consumerId++;
        
    }

    function enrollAsProducer(Producer memory producer, address producerAddress) external isAdmin{
         producers[producerAddress] = producer;
         producersArray.push(producer);
    }

    function removeProducer(address producer) external isAdmin {
        delete producers[producer];
    }

    function produce(uint litersOfWater) external hasProducerRights{
        uint tokensPerUser = litersOfWater / consumersArray.length;
    // Below will need to address of the hydrobloxtoken erc20 smart contract, right now it is random
        HydroBloxToken token = HydroBloxToken(0x388299133eb87E22B35a83258b2983A2cFB51C72);
        
        // To check
        token.mint(msg.sender, litersOfWater);

        // distribute the tokens evenly to the amount of consumers, looping over consumers array can become expensive

        for(uint i = 0; i < consumersArray.length; i++) {
            token.transfer(consumersArray[i].consumerAddress, tokensPerUser);
        }
        
    }

    function payProducers() external isAdmin {
 
        uint amountOfEthToDistribute;
        // consumer contract lasts for 100 blocks
        for(uint c; c < consumersArray.length; c++) {
            if(block.number >= consumers[c].consumerContractStart +100) {
                amountOfEthToDistribute++;
            }
        } 

        // From this point it is possible that there was 7 ETH in the contract and the amountOfEthToDistribute is 5
        // Now we need to payout the producers according to their weight.       
        if(amountOfEthToDistribute > 0) {
         
         uint lowProducers;
         uint mediumProducers;
         uint highProducers;
         uint amountToPay; 

        for(uint i = 0; i < producersArray.length; i++) {
            if(producersArray[i].producerWeight == ProducerWeight.LOW) {
                lowProducers++;
            } else if(producersArray[i].producerWeight == ProducerWeight.MEDIUM) {
                mediumProducers++;
            } else {
                highProducers++;
            }

        }

        // Let's say 7 producers are enrolled, 3 high, 3 medium, 1 low and 7 ETH needs to be distributed
        // high always gets 50%, medium gets 30%, low gets 20%

        if(producersArray.length == highProducers || producersArray.length == mediumProducers || producersArray.length == lowProducers) {
               // distribute all to the same category 
               amountToPay = amountOfEthToDistribute / producersArray.length;
               if (producersArray.length == highProducers) {
                   // distribute all the high producers evenly
                   for(uint p; p <= producersArray.length;p++) {
                        if(producersArray[p].producerWeight == ProducerWeight.HIGH) {
                            
                            payable(producersArray[p].producerAddress).transfer(amountToPay); 
                            emit Payout(producersArray[p].producerAddress, amountToPay);
                       
                        }
                   }
               
            }   else if (producersArray.length == mediumProducers) {
                    // distribute all the medium producers evenly
                   for(uint p; p <= producersArray.length;p++) {
                        if(producersArray[p].producerWeight == ProducerWeight.MEDIUM) {
                          payable(producersArray[p].producerAddress).transfer(amountToPay);
                          emit Payout(producersArray[p].producerAddress, amountToPay); 
                        }
                   }



             } else {
                    // distribute all the low producers evenly
                    for(uint p; p <= producersArray.length;p++) {
                        if(producersArray[p].producerWeight == ProducerWeight.LOW) {
                              payable(producersArray[p].producerAddress).transfer(amountToPay); 
                               emit Payout(producersArray[p].producerAddress, amountToPay); 
                        }
                   }
             }

          
        } else {
            // different distribution needs to be done
        }

        } else {
        // emit
        }


    }


    

    

}


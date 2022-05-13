// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HydroBloxStorage is Ownable {

    struct Consumer {
        bool exists;
        uint tokensClaimed;
        uint subscriptionRunId;
    }

    struct Producer {
        bool exists;
        uint tokensMinted;
        uint subscriptionRunId;
    }

    uint subscriptionRunId;
    uint public subscriptionPrice;
    uint public tokensToDivide;
    uint public etherToDivide;
    uint public amountOfConsumers;
    mapping(address => Consumer) public consumers;
    mapping(address => Producer) public producers;

    constructor() {
        subscriptionRunId = 0;
        subscriptionPrice = 1 gwei;
        tokensToDivide = 0;
        etherToDivide = 0;
        amountOfConsumers = 0;
    }

    function isConsumer(address consumerAddress) external view returns (bool) {
        Consumer storage consumer = consumers[consumerAddress];
        return consumer.exists && subscriptionRunId == consumer.subscriptionRunId;
    }

    function isProducer(address producerAddress) external view returns (bool) {
        Producer storage producer = producers[producerAddress];
        return producer.exists && subscriptionRunId <= producer.subscriptionRunId;
    }

    function addConsumer(address consumerAddress) external onlyOwner {
        consumers[consumerAddress] = Consumer(true, 0, subscriptionRunId);
        amountOfConsumers += 1;
    }

    function addProducer(address producerAddress) external onlyOwner {
        producers[producerAddress] = Producer(true, 0, subscriptionRunId);
    }

    function updateOnTokensMinted(address producerAddress, uint tokensMinted) external onlyOwner {
        producers[producerAddress].tokensMinted += tokensMinted;
        tokensToDivide += tokensMinted;
    }

    function updateOnTokensClaimed(address consumerAddress, uint tokensClaimed) external onlyOwner {
        consumers[consumerAddress].tokensClaimed += tokensClaimed;
    }

    function updateOnEtherClaimed(address producerAddress) external onlyOwner {
        producers[producerAddress].tokensMinted = 0;
    }

    function updateOnSubscriptionEnrollment(uint orphanedTokens) external onlyOwner {
        subscriptionRunId += 1;
        tokensToDivide = orphanedTokens;
        etherToDivide = 0;
        amountOfConsumers = 0;
    }

    function updateOnSubscriptionFinished(uint _etherToDivide) external onlyOwner {
        etherToDivide = _etherToDivide;
    }

    function changeSubscriptionPrice(uint _subscriptionPrice) external onlyOwner {
        subscriptionPrice = _subscriptionPrice;
    }
}
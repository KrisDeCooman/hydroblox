// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HydroBloxStorage is Ownable {

    struct Consumer {
        bool exists;
        uint tokensConsumed;
        uint expirationBlock;
    }

    struct Producer {
        bool exists;
        uint tokensProduced;
        uint expirationBlock;
    }

    mapping(address => Consumer) public consumers;
    mapping(address => Producer) public producers;

    function isConsumer(address consumerAddress) external view returns (bool) {
        Consumer storage consumer = consumers[consumerAddress];
        return consumer.exists && block.number <= consumer.expirationBlock;
    }

    function isProducer(address producerAddress) external view returns (bool) {
        Producer storage producer = producers[producerAddress];
        return producer.exists && block.number <= producer.expirationBlock;
    }

    function addConsumer(address consumerAddress, uint expirationBlock) external onlyOwner {
        consumers[consumerAddress] = Consumer(true, 0, expirationBlock);
    }

    function addProducer(address producerAddress, uint expirationBlock) external onlyOwner {
        producers[producerAddress] = Producer(true, 0, expirationBlock);
    }
}
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./HydroBloxToken.sol";
import "./HydroBloxStorage.sol";
import "./HydroBloxStateMachine.sol";

contract HydroBloxDistributor is HydroBloxStateMachine {
    
    uint public enrollAsConsumerPrice;
    HydroBloxToken public token;
    HydroBloxStorage public store;

    constructor() {
        enrollAsConsumerPrice = 1 ether;
        token = new HydroBloxToken();
        store = new HydroBloxStorage();
    }

    modifier checkConsumer(bool value) {
        require(!store.isConsumer(msg.sender) == value, value ? "Not registered as consumer." : "Already registered as consumer.");
        _;
    }

    modifier checkProducer(bool value) {
        require(!store.isProducer(msg.sender) == value, value ? "Not registered as producer." : "Already registered as producer.");
        _;
    }

    function changeEnrollAsConsumerPrice(uint _enrollAsConsumerPrice) external onlyOwner {
        enrollAsConsumerPrice = _enrollAsConsumerPrice;
    }

    function enrollAsConsumer() external payable checkConsumer(false) isInState(States.SubscriptionEnrollment) {
        require(msg.value != enrollAsConsumerPrice, "Not payed correct amount of ether.");
        store.addConsumer(msg.sender, 1001);
    }

    function enrollAsProducer() external checkProducer(false) isInState(States.SubscriptionEnrollment) {
        store.addProducer(msg.sender, 1001);
    }

    function produce(uint liters) external checkProducer(true) isInState(States.SubscriptionRunning) {
        token.mint(address(this), liters);
    }

    function claimTokensAsConsumer() external checkConsumer(true) isNotInState(States.SubscriptionEnrollment) {

    }

    function claimEtherAsProducer() external checkProducer(true) isInState(States.SubscriptionFinished) {
        (, uint tokensProduced, ) = store.producers(msg.sender);
        uint totalProduced; // todo keep this in state variable
        uint amount = (tokensProduced / totalProduced) * address(this).balance;
        payable(msg.sender).transfer(amount);
    }
}

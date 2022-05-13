// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./HydroBloxToken.sol";
import "./HydroBloxStorage.sol";
import "./HydroBloxStateMachine.sol";

contract HydroBloxDistributor is HydroBloxStateMachine {
    
    HydroBloxToken public token;
    HydroBloxStorage public store;

    constructor() {
        token = new HydroBloxToken();
        store = new HydroBloxStorage();
    }

    modifier checkConsumer(bool value) {
        require(store.isConsumer(msg.sender) == value, value ? "Not registered as consumer." : "Already registered as consumer.");
        _;
    }

    modifier checkProducer(bool value) {
        require(store.isProducer(msg.sender) == value, value ? "Not registered as producer." : "Already registered as producer.");
        _;
    }

    function changeSubscriptionPrice(uint subscriptionPrice) external onlyOwner {
        store.changeSubscriptionPrice(subscriptionPrice);
    }

    function enrollAsConsumer() external payable checkConsumer(false) isInState(SubscriptionStates.Enrollment) {
        require(msg.value == store.subscriptionPrice(), "Not payed correct amount of ether.");
        store.addConsumer(msg.sender);
    }

    function enrollAsProducer() external checkProducer(false) isInState(SubscriptionStates.Enrollment) {
        store.addProducer(msg.sender);
    }

    function produce(uint liters) external checkProducer(true) isInState(SubscriptionStates.Running) {
        token.mint(address(this), liters);
        store.updateOnTokensMinted(msg.sender, liters);
    }

    function claimTokensAsConsumer() external checkConsumer(true) isNotInState(SubscriptionStates.Enrollment) {
        uint tokensToClaim = store.totalTokensToDivide() / store.amountOfConsumers(); // todo safemath?
        (, uint tokensAlreadyClaimed,) = store.consumers(msg.sender);
        if (tokensToClaim > tokensAlreadyClaimed) {
            uint amount = tokensToClaim - tokensAlreadyClaimed;
            store.updateOnTokensClaimed(msg.sender, amount);
            token.transfer(msg.sender, amount);
        }
    }

    function claimEtherAsProducer() external checkProducer(true) isInState(SubscriptionStates.Finished) {
        (, uint tokensMinted,) = store.producers(msg.sender);
        // todo: safe balance in contract on transition to finished
        uint amount = (tokensMinted / store.totalTokensToDivide()) * address(this).balance; // todo safemath?
        store.updateOnEtherClaimed(msg.sender);
        payable(msg.sender).transfer(amount);
    }

    function transitionToSubscriptionEnrollment() external isInState(SubscriptionStates.Finished) onlyOwner {
        transitionToState(SubscriptionStates.Enrollment);
        uint orphanedTokens = token.balanceOf(address(this));
        store.updateOnNewSubscriptionRun(orphanedTokens);
    }

    function transitionToSubscriptionRunning() external isInState(SubscriptionStates.Enrollment) onlyOwner {
        transitionToState(SubscriptionStates.Running);
    }

    function transitionToSubscriptionFinished() external isInState(SubscriptionStates.Running) onlyOwner {
        transitionToState(SubscriptionStates.Finished);
    }
}

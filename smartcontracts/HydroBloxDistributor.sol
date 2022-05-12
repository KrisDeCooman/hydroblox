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
        require(!store.isConsumer(msg.sender) == value, value ? "Not registered as consumer." : "Already registered as consumer.");
        _;
    }

    modifier checkProducer(bool value) {
        require(!store.isProducer(msg.sender) == value, value ? "Not registered as producer." : "Already registered as producer.");
        _;
    }

    function changeSubscriptionPrice(uint subscriptionPrice) external onlyOwner {
        store.changeSubscriptionPrice(subscriptionPrice);
    }

    function enrollAsConsumer() external payable checkConsumer(false) isInState(States.SubscriptionEnrollment) {
        require(msg.value != store.subscriptionPrice(), "Not payed correct amount of ether.");
        store.addConsumer(msg.sender);
    }

    function enrollAsProducer() external checkProducer(false) isInState(States.SubscriptionEnrollment) {
        store.addProducer(msg.sender);
    }

    function produce(uint liters) external checkProducer(true) isInState(States.SubscriptionRunning) {
        token.mint(address(this), liters);
    }

    function claimTokensAsConsumer() external checkConsumer(true) isNotInState(States.SubscriptionEnrollment) {
        uint tokensToClaim = store.totalTokensMinted() / store.amountOfConsumers(); // todo safemath?
        (, uint tokensAlreadyClaimed,) = store.consumers(msg.sender);
        if (tokensToClaim > tokensAlreadyClaimed) {
            uint amount = tokensToClaim - tokensAlreadyClaimed;
            token.transfer(msg.sender, amount);
            store.updateOnTokensClaimed(msg.sender, amount);
        }
    }

    function claimEtherAsProducer() external checkProducer(true) isInState(States.SubscriptionFinished) {
        (, uint tokensMinted,) = store.producers(msg.sender);
        uint amount = (tokensMinted / store.totalTokensMinted()) * address(this).balance; // todo safemath?
        payable(msg.sender).transfer(amount);
    }

    function transitionToSubscriptionEnrollment() external isInState(States.SubscriptionFinished) onlyOwner {
        transitionToState(States.SubscriptionEnrollment);
        uint orphanedTokens = token.balanceOf(address(this));
        store.updateOnNewSubscriptionRun(orphanedTokens);
    }

    function transitionToSubscriptionRunning() external isInState(States.SubscriptionEnrollment) onlyOwner {
        transitionToState(States.SubscriptionRunning);
    }

    function transitionToSubscriptionFinished() external isInState(States.SubscriptionRunning) onlyOwner {
        transitionToState(States.SubscriptionFinished);
    }
}

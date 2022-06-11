// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./MultiOwnable.sol";
import "./HydroBloxToken.sol";
import "./HydroBloxStorage.sol";
import "./HydroBloxStateMachine.sol";
import "./HydroBloxConsumptionMeter.sol";
import "./HydroBloxProductionMeter.sol";

contract HydroBloxDistributor is MultiOwnable, HydroBloxStateMachine {

    event ConsumerSubscribed(address indexed consumer, uint subscriptionRunId);
    event ProducerSubscribed(address indexed producer, uint subscriptionRunId);
    event TokensProduced(address indexed producer, uint amount);
    event TokensConsumed(address indexed consumer, uint amount);
    event TokensClaimedByConsumer(address indexed consumer, uint amount);
    event EtherClaimedByProducer(address indexed producer, uint amount);

    HydroBloxToken public token;
    HydroBloxStorage public store;
    HydroBloxConsumptionMeter public consumptionMeter;
    HydroBloxProductionMeter public productionMeter;

    constructor(address _consumptionMeter, address _productionMeter) {
        token = new HydroBloxToken();
        store = new HydroBloxStorage();
        consumptionMeter = HydroBloxConsumptionMeter(_consumptionMeter);
        productionMeter = HydroBloxProductionMeter(_productionMeter);
    }

    modifier verifyConsumptionMeter() {
        require(consumptionMeter.balanceOf(msg.sender) > 0, "Consumer cannot be identified as registered consumption meter.");
        _;
    }

    modifier verifyProductionMeter() {
        require(productionMeter.balanceOf(msg.sender) > 0, "Producer cannot be identified as registered production meter.");
        _;
    }

    modifier checkSubscribedConsumer(bool value) {
        require(store.isSubscribedConsumer(msg.sender) == value, value ? "Not registered as consumer." : "Already registered as consumer.");
        _;
    }

    modifier checkSubscribedProducer(bool value) {
        require(store.isSubscribedProducer(msg.sender) == value, value ? "Not registered as producer." : "Already registered as producer.");
        _;
    }

    function changeSubscriptionPrice(uint subscriptionPrice) external onlyOwner {
        store.changeSubscriptionPrice(subscriptionPrice);
    }

    function subscribeAsConsumer() external payable verifyConsumptionMeter checkSubscribedConsumer(false) isInState(SubscriptionStates.Enrollment) {
        require(msg.value == store.subscriptionPrice(), "Not payed correct amount of ether.");
        store.subscribeConsumer(msg.sender);
        emit ConsumerSubscribed(msg.sender, store.subscriptionRunId());
    }

    function subscribeAsProducer() external verifyProductionMeter checkSubscribedProducer(false) isInState(SubscriptionStates.Enrollment) {
        store.subscribeProducer(msg.sender);
        emit ProducerSubscribed(msg.sender, store.subscriptionRunId());
    }

    function produce(uint liters) external checkSubscribedProducer(true) isInState(SubscriptionStates.Running) {
        token.mint(address(this), liters);
        store.updateOnTokensMinted(msg.sender, liters);
        emit TokensProduced(msg.sender, liters);
    }

    function consume(uint liters) external verifyConsumptionMeter {
        token.burn(msg.sender, liters);
        emit TokensConsumed(msg.sender, liters);
    }

    function tokenBalanceOf(address _address) view external returns (uint) {
        return token.balanceOf(_address);
    }

    function tokenTotalSupply() view external returns (uint) {
        return token.totalSupply();
    }

    function claimTokensAsConsumer() external checkSubscribedConsumer(true) isNotInState(SubscriptionStates.Enrollment) {
        uint tokensToClaim = store.tokensToDivide() / store.amountOfConsumers(); // todo safemath?
        (, uint tokensAlreadyClaimed,) = store.consumers(msg.sender);
        if (tokensToClaim > tokensAlreadyClaimed) {
            uint amount = tokensToClaim - tokensAlreadyClaimed;
            store.updateOnTokensClaimed(msg.sender, amount);
            token.transfer(msg.sender, amount);
            emit TokensClaimedByConsumer(msg.sender, amount);
        }
    }

    function claimEtherAsProducer() external checkSubscribedProducer(true) isInState(SubscriptionStates.Finished) {
        (, uint tokensMinted,) = store.producers(msg.sender);
        uint amount = store.etherToDivide() * tokensMinted / store.tokensToDivide(); // todo safemath?
        if (amount > 0) {
            store.updateOnEtherClaimed(msg.sender);
            payable(msg.sender).transfer(amount);
            emit EtherClaimedByProducer(msg.sender, amount);
        }
    }

    function allowedToTransistion() override view internal returns (bool) {
        return isOwner();
    }

    function onTransitionToEnrollment() override internal {
        uint orphanedTokens = token.balanceOf(address(this));
        uint orphanedEther = address(this).balance;
        store.updateOnSubscriptionEnrollment(orphanedTokens, orphanedEther);
    }

    function onTransitionToRunning() override internal {
        // no actions needed
    }

    function onTransitionToFinished() override internal {
        store.updateOnSubscriptionFinished(address(this).balance);
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./MultiOwnable.sol";
import "./HydroBloxToken.sol";
import "./HydroBloxStorage.sol";
import "./HydroBloxStateMachine.sol";
import "./HydroBloxConsumptionMeter.sol";
import "./HydroBloxProductionMeter.sol";

contract HydroBloxDistributor is MultiOwnable, HydroBloxStateMachine {

    event ConsumerEnrolled(address indexed consumer, uint subscriptionRunId);
    event ProducerEnrolled(address indexed producer, uint subscriptionRunId);
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

    modifier verifyConsumer() {
        require(consumptionMeter.balanceOf(msg.sender) > 0, "Consumer cannot be identified as registered consumption meter.");
        _;
    }

    modifier verifyProducer() {
        require(productionMeter.balanceOf(msg.sender) > 0, "Producer cannot be identified as registered production meter.");
        _;
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

    function enrollAsConsumer() external payable verifyConsumer checkConsumer(false) isInState(SubscriptionStates.Enrollment) {
        require(msg.value == store.subscriptionPrice(), "Not payed correct amount of ether.");
        store.addConsumer(msg.sender);
        emit ConsumerEnrolled(msg.sender, store.subscriptionRunId());
    }

    function enrollAsProducer() external verifyProducer checkProducer(false) isInState(SubscriptionStates.Enrollment) {
        store.addProducer(msg.sender);
        emit ProducerEnrolled(msg.sender, store.subscriptionRunId());
    }

    function produce(uint liters) external checkProducer(true) isInState(SubscriptionStates.Running) {
        token.mint(address(this), liters);
        store.updateOnTokensMinted(msg.sender, liters);
    }

    function claimTokensAsConsumer() external checkConsumer(true) isNotInState(SubscriptionStates.Enrollment) {
        uint tokensToClaim = store.tokensToDivide() / store.amountOfConsumers(); // todo safemath?
        (, uint tokensAlreadyClaimed,) = store.consumers(msg.sender);
        if (tokensToClaim > tokensAlreadyClaimed) {
            uint amount = tokensToClaim - tokensAlreadyClaimed;
            store.updateOnTokensClaimed(msg.sender, amount);
            token.transfer(msg.sender, amount);
            emit TokensClaimedByConsumer(msg.sender, amount);
        }
    }

    function claimEtherAsProducer() external checkProducer(true) isInState(SubscriptionStates.Finished) {
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

    function readAvailableTokens() view external checkConsumer(true) isNotInState(SubscriptionStates.Enrollment) returns(uint availableTokens){
        availableTokens = token.balanceOf(msg.sender);
    }

    function waterConsumed(uint amount) external checkConsumer(true) isNotInState(SubscriptionStates.Enrollment) {
    	token.burn(msg.sender,amount);
    }

}

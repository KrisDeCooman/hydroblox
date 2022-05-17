// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

abstract contract HydroBloxStateMachine {

    event StateTransitioned (SubscriptionStates state);

    enum SubscriptionStates {
        Enrollment,
        Running,
        Finished
    }

    SubscriptionStates public state;

    constructor() {
        state = SubscriptionStates.Enrollment;
    }

    modifier isInState(SubscriptionStates _state) {
        require(state == _state, "Contract is not in required state.");
        _;
	}

    modifier isNotInState(SubscriptionStates _state) {
        require(state != _state, "Contract is not in required state.");
        _;
	}

    function transitionToNextState() external {
        require(allowedToTransistion(), "Not allowed to trigger transition to next state.");
        
        if (state == SubscriptionStates.Enrollment) {
            state = SubscriptionStates.Running;
            onTransitionToRunning();
        }
        else if (state == SubscriptionStates.Running) {
            state = SubscriptionStates.Finished;
            onTransitionToFinished();
        }
        else {
            state = SubscriptionStates.Enrollment;
            onTransitionToEnrollment();
        }

        emit StateTransitioned(state);
    }

    function allowedToTransistion() virtual view internal returns (bool);
    function onTransitionToEnrollment() virtual internal;
    function onTransitionToRunning() virtual internal;
    function onTransitionToFinished() virtual internal;
}
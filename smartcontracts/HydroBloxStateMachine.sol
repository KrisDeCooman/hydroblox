// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HydroBloxStateMachine is Ownable {

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

    function transitionToState(SubscriptionStates _state) internal {
        state = _state;
        emit StateTransitioned(state);
    }
}
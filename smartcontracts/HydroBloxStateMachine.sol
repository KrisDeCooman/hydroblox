// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HydroBloxStateMachine is Ownable {

    event StateTransitioned (States state);

    enum States {
        SubscriptionEnrollment,
        SubscriptionRunning,
        SubscriptionFinished
    }

    States public state;

    constructor() {
        state = States.SubscriptionEnrollment;
    }

    modifier isInState(States _state) {
        require(state == _state, "Contract is not in required state.");
        _;
	}

    modifier isNotInState(States _state) {
        require(state != _state, "Contract is not in required state.");
        _;
	}

    function transitionToState(States _state) internal {
        state = _state;
        emit StateTransitioned(state);
    }
}
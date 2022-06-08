// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./MultiOwnable.sol";
import "./HydroBloxConsumptionMeter.sol";
import "./HydroBloxProductionMeter.sol";

contract HydroBloxAuthority is MultiOwnable {

    HydroBloxConsumptionMeter public consumptionMeter;
    HydroBloxProductionMeter public productionMeter;

    constructor() {
        consumptionMeter = new HydroBloxConsumptionMeter();
        productionMeter = new HydroBloxProductionMeter();
    }

    function issueConsumptionMeter() external {
        consumptionMeter.safeMint(msg.sender);
    }

    function issueProductionMeter() external {
        productionMeter.safeMint(msg.sender);
    }
}

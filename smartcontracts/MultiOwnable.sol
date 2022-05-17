// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

abstract contract MultiOwnable {
    
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);

    mapping(address => bool) public owners;

    modifier onlyOwner() {
        require(owners[msg.sender] == true, "Caller is not one of the owners.");
        _;
    }

    function addOwner(address owner) external onlyOwner {
        owners[owner] = true;
        emit OwnerAdded(owner);
    }

    function removeOwner(address owner) external onlyOwner {
        owners[owner] = false;
        emit OwnerRemoved(owner);
    }
}
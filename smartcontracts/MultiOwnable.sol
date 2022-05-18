// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

abstract contract MultiOwnable {
    
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);

    mapping(address => bool) public owners;

    constructor() {
        owners[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(isOwner(), "Caller is not one of the owners.");
        _;
    }

    function isOwner() public view returns (bool) {
        return owners[msg.sender];
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
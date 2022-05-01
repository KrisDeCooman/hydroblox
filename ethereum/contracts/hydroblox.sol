//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HydroBloxToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("HydroBloxToken", "HBT") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}


contract HydroBlox {

    mapping(string => address) public consumers;
    mapping(string => address) public producers;

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier isAdmin() {
        require(msg.sender == admin, "No rights to perform this action!!");
        _;
    }

    function enrollConsumer(string memory name, address consumer) external payable {
        consumers[name] = consumer;
    }

    function enrollProducer(address producer) external isAdmin{

    }

    function produce(uint litersOfWater) external {

    }


    function consume(uint litersOfWater) external {

    }


    



}

